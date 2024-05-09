import { defineConfig } from 'vitepress'
import { blogTheme } from './blog-theme'

// 导航栏
import { navMenus } from "./perimeter/nav"
import { sidebarMenus } from "./perimeter/sidebar";


export default defineConfig({
  // 忽略死链接
  ignoreDeadLinks: true,
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  lang: 'zh-cn',
  title: '技术笔记',
  description: '豆腐脑吃甜的',
  lastUpdated: true,
  // github page base: '/项目名/'
  base: '/cattle-blog/',
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head:[
    ['link', { rel: 'icon', href: '/cattle-blog/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/favicon.ico',
    // 导航栏
    nav: navMenus,
    // 侧边栏
    sidebar: sidebarMenus,
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',
    /*右侧大概配置 展示h1-h6*/
    outline: [0,2],
    // 此功能虽是默认提供，也可以通过配置来定制默认的文字。
    docFooter: { prev: '上一篇', next: '下一篇' },
    // footer: {
    //   copyright:
    //       "Copyright © 2022 Cattle-Doc 笔记 <a target='_blank' href='https://beian.miit.gov.cn'>皖ICP备2022011262号-1</a>"
    // },
  }
})
