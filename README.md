# QianMusic
![QianMusic](https://love.mytx.fun/854424096132435968.png)

一款基于**网易云音乐API** + **Vue3** 技术栈开发的高品质音乐Web应用

## 项目预览
![项目展示界面](https://love.mytx.fun/854424432792440832.png)

## 项目地址
Github: [https://github.com/YYY887/music.git](https://github.com/YYY887/music.git)

## ✨ 技术栈
- 核心框架：Vue3
- 数据来源：网易云音乐开放API
- 运行环境：Node.js

## 🚀 两种部署方式 (默认端口：7749)
### 方式一：本地源码启动 (推荐开发/本地使用)
```bash
# 克隆项目
git clone https://github.com/YYY887/music.git

# 进入项目目录
cd music

# 安装依赖
npm install

# 启动项目 (端口固定7749)
node app.js
```
启动成功后，浏览器访问: `http://localhost:7749` 即可使用

### 方式二：Docker 容器部署 (推荐线上/快速部署)
```bash
# 拉取镜像并启动 端口7749
docker run -d --name QianMusic -p 7749:7749 yyy887/qianmusic
```
启动成功后，浏览器访问: `http://服务器IP:7749` 即可使用

---
作者qq 3449837914
