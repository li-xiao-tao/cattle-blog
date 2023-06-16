# Vue3基础-项目创建

- 官网https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application

- 确保安装的Node

## 1.项目初始化

```sh
npm init vue@latest
```

## 2.命令说明

- 键盘左右键选择，右键选择yes

```sh
✔ 项目名称：…<您的项目名称>
✔ 添加TypeScript…否/是
✔ 添加JSX支持…否/是
✔ 为单页应用程序开发添加Vue路由器…否/是
✔ 添加Pinia进行状态管理…否/是
✔ 为单元测试添加Vitest…否/是
✔ 为单元和端到端测试添加Cypress…否/是
✔ 为代码质量添加ESLint…否/是
✔ 为代码格式添加Prettier…否/是
```

- 推荐全部`yes`（不包括测试）

## 3.项目结构

```sh
.
├── node_modules // 依赖包位置
├── public // 公共资源目录，通常包括favicon.ico和其他静态文件
│   └── favicon.ico
├── src // 源代码目录，包含应用程序的所有源代码
│   ├── assets // 存放所有静态资源的目录，包括CSS、图片和其他文件
│   │   ├── base.css
│   │   ├── logo.svg
│   │   └── main.css
│   ├── components // 组件目录，包含应用程序中所有可重用组件的源代码
│   │   ├── HelloWorld.vue
│   │   ├── icons
│   │   │   ├── IconCommunity.vue
│   │   │   ├── IconDocumentation.vue
│   │   │   ├── IconEcosystem.vue
│   │   │   ├── IconSupport.vue
│   │   │   └── IconTooling.vue
│   │   ├── TheWelcome.vue
│   │   └── WelcomeItem.vue
│   ├── router // 存放Vue Router路由配置的目录
│   │   └── index.js
│   ├── stores // 存放Vuex状态管理的代码的目录
│   │   └── counter.ts
│   │── views // 视图目录，包含应用程序的所有视图组件
│   │   ├── AboutView.vue
│   │   └── HomeView.vue
│   ├── App.vue // 根组件，是应用程序的主要Vue组件
│   └── main.ts // 应用程序的入口文件
├── env.d.ts // 在TypeScript中定义全局变量的文件
├── index.html // 应用程序的HTML入口文件
├── package.json // 应用程序的依赖和脚本配置文件
├── README.md // 应用程序的说明文档
├── tsconfig.json // TypeScript编译器的配置文件
├── tsconfig.node.json // Node.js环境的TypeScript编译器的配置文件
└── vite.config.ts // Vite构建工具的配置文件
```

## 4.配置`vite.config.ts`

- 实现修改端口

```vue
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 添加这个实现修改端口
  server:{
    //端口
    port:3000,
    host: 'localhost',
    //启动后打开网页
    open:true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',  // 后台接口域名
        ws: true,        //如果要代理 websockets，配置这个参数
        secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,  //是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})


```

## 5.安装`ElementUI`

```shell
npm install element-plus --save
```

- 配置`main.js`

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 添加
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(createPinia())
app.use(router)
// 添加
app.use(ElementPlus)

app.mount('#app')


```

## 6.安装`axios`

```shell
npm install axios
```
