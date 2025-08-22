import { banner, lyric } from '@neteaseapireborn/api'
banner({ type: 0 }).then((res) => {
  console.log(res)
})
lyric({
  id: '33894312',
}).then((res) => {
  console.log(res)
})
