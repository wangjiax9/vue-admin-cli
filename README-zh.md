## Build Setup

``` bash

# Clone project
git clone https://github.com/PanJiaChen/vueAdmin-template.git

# Install dependencies
npm install

# 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# serve with hot reload at localhost:9528
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
`````

- 如要开启本地调试（图片上传）修改{PROJECT-HOME}/src/main.js：`_LOCAL_DEBUG` 改为 `true`，
同时修改 `window.ypw_token`的值
- {PROJECT-HOME}/server.js 可以用于本地mock数据或转发请求