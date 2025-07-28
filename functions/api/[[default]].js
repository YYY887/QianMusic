const { serveNcmApi } = require('../../server')

// 默认配置
const defaultEnv = {
  ENABLE_GENERAL_UNBLOCK: 'true',
  ENABLE_FLAC: 'true',
  SELECT_MAX_BR: 'true',
  UNBLOCK_SOURCE: 'pyncmd,qq,kuwo,migu,kugou',
  FOLLOW_SOURCE_ORDER: 'true',
  CORS_ALLOW_ORIGIN: '*',
  ENABLE_PROXY: 'false',
  PROXY_URL: '',
  NETEASE_COOKIE: '',
  JOOX_COOKIE: '',
  MIGU_COOKIE: '',
  QQ_COOKIE: '',
  YOUTUBE_KEY: ''
}

let app = null

export async function onRequest(context) {
  const { request, env } = context

  // 合并默认配置和环境变量
  Object.keys(defaultEnv).forEach(key => {
    process.env[key] = env[key] || defaultEnv[key]
  })

  if (!app) {
    app = await serveNcmApi({
      checkVersion: false // 禁用版本检查，避免在边缘函数环境中发起不必要的网络请求
    })
  }

  return new Promise((resolve) => {
    let body = []
    request.arrayBuffer().then(buffer => {
      if (buffer.byteLength > 0) {
        body = Buffer.from(buffer)
      }
      
      // 构造 Express 兼容的请求对象
      const req = new Proxy(request, {
        get: (target, prop) => {
          switch(prop) {
            case 'body':
              return body
            case 'query':
              return Object.fromEntries(new URL(request.url).searchParams)
            case 'cookies':
              return Object.fromEntries(
                request.headers.get('cookie')?.split(';')
                  .map(cookie => cookie.trim().split('='))
                  .map(([key, value]) => [key, decodeURIComponent(value)]) || []
              )
            default:
              return target[prop]
          }
        }
      })

      // 构造 Express 兼容的响应对象
      const res = {
        status: (code) => {
          res.statusCode = code
          return res
        },
        set: (headers) => {
          Object.entries(headers).forEach(([key, value]) => {
            res.headers[key] = value
          })
          return res
        },
        send: (body) => {
          const response = new Response(
            typeof body === 'string' ? body : JSON.stringify(body),
            {
              status: res.statusCode || 200,
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                ...res.headers
              }
            }
          )
          resolve(response)
        },
        statusCode: 200,
        headers: {}
      }

      // 处理请求
      app.handle(req, res)
    })
  })
}
