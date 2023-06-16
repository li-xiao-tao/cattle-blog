# Vue - 路由拆分

## 原路由配置

```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

```

## 拆分后

- `const routes`、`export const router`不要改变量名，规范就是叫这个。

```js
// @ts-nocheck  // 忽略全文 ts 报错
import { createRouter, createWebHistory } from 'vue-router' // 导入 Vue Router 相关函数
import HomeRouter from '@/router/models/home-router.ts' // 导入 HomeRouter 组件

const routes = [HomeRouter] // 定义路由配置数组

export const router = createRouter({ // 创建路由器实例，并导出
  history: createWebHistory(import.meta.env.BASE_URL), // 指定路由的历史模式为 HTML5
  routes // 将路由配置数组传递给 createRouter 函数
})

export default router; // 导出路由器实例。
```

- @/ 是一个别名，指向项目根目录，可以用于简化路径的书写；
- ts-nocheck 是 TypeScript 中的一种指令，它的作用是忽略当前文件中的 TypeScript 错误；
- createWebHistory 函数用于创建路由的历史记录模式，其中 import.meta.env.BASE_URL 变量是在 Vue CLI 项目中预定义的变量，它表示应用程序的基础 URL；
- createRouter 函数用于创建路由器实例，它接受一个选项对象作为参数，其中 routes 属性用于指定路由配置数组；
- export const 和 export default 用于导出模块中的变量或对象，其中 export const 导出的是常量，export default 导出的是默认值。

```js
/**
 * 功能说明：路由：主页面
 */
import homeView from '@/views/HomeView.vue';

const homeRouter = {
  path: '/',
  component: homeView,
  redirect: '/',
  meta: {
    group: 'home' // 路由元信息，指定路由分组为home
  },
  children: [
    {
      path: '/',
      meta: {
        title: 'Home', // 路由元信息，指定路由显示的标题为Home
        position: 'top', // 路由元信息，指定路由在菜单中的位置为顶部
        icon: 'icon-motai', // 路由元信息，指定路由显示的图标为icon-motai
        group: 'tools' // 路由元信息，指定路由分组为tools
      },
      component: homeView
    },
    {
      path: 'zi',
      meta: {
        title: 'zi', // 路由元信息，指定路由显示的标题为zi
        position: 'top', // 路由元信息，指定路由在菜单中的位置为顶部
        icon: 'icon-motai', // 路由元信息，指定路由显示的图标为icon-motai
        group: 'tools' // 路由元信息，指定路由分组为tools
      },
      component: () => import('../../views/AboutView.vue')
    }
  ]
};

export default homeRouter;
```

