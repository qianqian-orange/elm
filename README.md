### 迷你饿了么
### 运行项目
+ 把代码clone本地
+ 进入项目目录执行`cnpm install`
+ 对于客户端渲染
  + 执行`npm run dev`
  + 进入server目录执行`cnpm install`
  + 在server目录下执行`npm start`
  + 打开浏览器输入http://localhost:8080即可
+ 对于服务端渲染
  + 进入server目录执行`npm run dev:ssr`
  + 打开浏览器输入http://localhost:4000/elm即可
### 打包项目
+ 对于客户端渲染
  + 在项目目录下执行`npm run build:dll`
  + 接着执行`npm run build`
  + 打包后的项目可以在server/public目录下查看
  + 运行打包后的项目，在server目录下执行`npm start`
  + 打开浏览器输入http://localhost:4000/elm即可
+ 对于服务端渲染
  + 在项目目录下执行`npm run build:ssr`
  + 打包后的项目可以在server/public目录下查看
  + 运行打包后的项目，在server目录下执行`npm run start:ssr`，注意需要先全局安装pm2，如果您不想安装修改一下命令即可。
  + 打开浏览器输入http://localhost:4000/elm即可
### 注意
+ 项目目录和server目录都需要安装依赖，我使用的是cnpm, 如果您使用npm的话可能安装node-sass的时候会报错，
解决方案：`npm i -D node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/`,
不过还是推荐使用cnpm
### 更多
+ 微信号：wxid_xzt5e3wgaxdh22
+ 手机号：15815219774
+ 文章：https://juejin.im/post/5f067cfe5188252e382a5156
+ 如果有什么问题欢迎加我的微信或者在文章评论区留言，我会及时给予答复。

