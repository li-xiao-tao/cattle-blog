## Pinia 的优点

- Vue2 和 Vue3 都支持，这让我们同时使用 Vue2 和 Vue3 的小伙伴都能很快上手。
- pinia 中只有 state、getter、action，抛弃了 Vuex 中的 Mutation，Vuex 中 mutation 一直都不太受小伙伴们的待见，pinia 直接抛弃它了，这无疑减少了我们工作量。
- pinia 中 action 支持同步和异步，Vuex 不支持
- 良好的 Typescript 支持，毕竟我们 Vue3 都推荐使用 TS 来编写，这个时候使用 pinia 就非常合适了
- 无需再创建各个模块嵌套了，Vuex 中如果数据过多，我们通常分模块来进行管理，稍显麻烦，而 pinia 中每个 store 都是独立的，互相不影响。
- 体积非常小，只有 1KB 左右。
- pinia 支持插件来扩展自身功能。
- 支持服务端渲染。

## 基本用法

安装 Pinia

```shell
npm install pinia -S
```

在 main.js 中引入 Pinia

```js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.mount('#app');
```



定义一个 store

::: tip 创建store的方式一
使用 defineStore() 定义一个 Store 。defineStore() 第一个参数是 storeId，第二个参数是一个选项对象：
:::

```js
// src/stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```



::: tip 创建store的方式二
defineStore() 第一个参数是 storeId ，第二个参数传入一个函数来定义 Store ：
:::

```js
// src/stores/counter.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```



### 在组件中使用store

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
// 以下三种方式都会被 devtools 跟踪
counterStore.count++
counterStore.$patch({ count: counterStore.count + 1 })
counterStore.increment()
</script>

<template>
  <div>{{ counterStore.count }}</div>
  <div>{{ counterStore.doubleCount }}</div>
</template>
```





参考文章：https://juejin.cn/post/7155225174151790622

https://www.jianshu.com/p/c2990fc831ca

https://zhuanlan.zhihu.com/p/533233367

https://juejin.cn/post/7057439040911441957

https://juejin.cn/post/7154579554034515982

https://juejin.cn/post/7079785777692934174

- https://juejin.cn/post/7078281612013764616
- https://juejin.cn/post/7049196967770980389
- https://juejin.cn/post/7057439040911441957
- https://juejin.cn/post/7155225174151790622
- https://juejin.cn/post/7194620691839205435
- https://juejin.cn/post/7154579554034515982
- https://juejin.cn/post/7036745610954801166
- https://juejin.cn/post/7006108454028836895
- https://juejin.cn/post/7112691686085492767
- https://juejin.cn/post/7119832691339444255
- https://juejin.cn/post/7068113574043844622
- https://juejin.cn/post/7164957663522979848
- https://juejin.cn/post/7149553176227053605

pinia 持久化缓存的问题参考

- https://blog.csdn.net/m0_56986233/article/details/125966561
- https://www.weipxiu.com/8343.html
- https://www.jianshu.com/p/c2990fc831ca
- https://www.cnblogs.com/younghxp/p/16225717.html
- https://blog.csdn.net/dnpao/article/details/127912544
- https://blog.csdn.net/G_ing/article/details/128192480

- vite：创建和管理 vue 项目
- pinia：状态管理
- axios：网络请求
- vite-plugin-mock：提供登录的 mock 接口
- pinia-plugin-persistedstate：状态持久化插件
- vueuse：vue 的 hooks 插件推荐

## Vue Hooks 推荐使用

- https://inhiblab-core.gitee.io/docs/hooks/
