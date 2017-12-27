## 本地环境搭建

#### 首先你需要 Node.js 4+ 和 NPM 3+

```shell
git clone http://git.babybus.com/liuzhaozhi/bb-element.git
npm run dev

# open http://localhost:8085
```

#### 如果国内用户觉得安装慢可以使用 yarn 搭配 taobao registry

```shell
npm i yarn -g
yarn config set registry https://registry.npm.taobao.org
yarn
npm run dev

# open http://localhost:8085
```

#### To build:

```shell
npm run dist
```

### CDN
目前可以通过 [unpkg.com/element-ui](https://unpkg.com/element-ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
```

:::tip
我们建议使用 CDN 引入 Element 的用户在链接地址上锁定版本，以免将来 Element 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

### Hello world
通过 CDN 的方式我们可以很容易地使用 Element 写出一个 Hello world 页面。[在线演示](https://jsfiddle.net/hzfpyvg6/14/)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- 引入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<body>
  <div id="app">
    <el-button @click="visible = true">按钮</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>欢迎使用 Element</p>
    </el-dialog>
  </div>
</body>
  <!-- 先引入 Vue -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: function() {
        return { visible: false }
      }
    })
  </script>
</html>
```
如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：快速上手。
