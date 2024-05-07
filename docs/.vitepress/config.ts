import { getThemeConfig, defineConfig } from '@sugarat/theme/node'
// 导航栏
import { navMenus } from "./perimeter/nav"
import { sidebarMenus } from "./perimeter/sidebar";


const blogTheme = getThemeConfig({
  // 切换原生和blog模式
  //blog: false,
  // 文章默认作者
  author: '豆腐脑吃甜的',
  // 开启tabs
  tabs: true,
  // 友链
  friend: [
    // {
    //   nickname: '开源作者',
    //   des: '',
    //   avatar:'https://avatars.githubusercontent.com/u/49076004?v=4',
    //   url: 'https://linweiyuan.github.io/'
    // }
  ],
  // 推荐文章
  recommend: {
    showSelf: true,
    title: '🔍 相关文章',
    nextText: '换一组',
    pageSize: 9,
    empty: '暂无推荐文章'
  },
  // 用于控制首页右侧的精选文章内容，其中精选的文章由 frontmatter: sticky 进行控制
  hotArticle:{
    title: '🔥 精选文章',
    nextText: '换一组',
    pageSize: 9,
    empty: '暂无精选内容'
  },
  // 用于设置首页的自定义内容
  home: {
    name: '',
    motto: '',
    inspiring: '',
    pageSize: 6
  },
  article: {
    /**
     * 是否展示文章的预计阅读时间
     */
    readingTime: true,
    /**
     * 是否隐藏文章页的封面展示
     */
    hiddenCover: false
  }
})

export default {
  // 忽略死链接
  ignoreDeadLinks: true,
  extends: blogTheme,
  lang: 'zh-cn',
  title: '技术笔记',
  description: '豆腐脑吃甜的',
  vite: {
    optimizeDeps: {
      include: ['element-plus'],
      // 预构建排除依赖
      exclude: ['@sugarat/theme','vitepress-plugin-tabs']
    }
  },
  lastUpdated: true,
  themeConfig: {
    logo: '/favicon.ico',
    // 导航栏
    nav: navMenus,
    // 侧边栏
    sidebar: sidebarMenus,
    lastUpdatedText: '上次更新于',
    /*右侧大概配置 展示h1-h6*/
    outline: [0,2],
    // 此功能虽是默认提供，也可以通过配置来定制默认的文字。
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      copyright:
          "Copyright © 2022 Cattle-Doc 笔记 <a target='_blank' href='https://beian.miit.gov.cn'>皖ICP备2022011262号-1</a>"
    },
  },
  // github page base: '/项目名/'
  base: '/cattle-blog/',
  head:[
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ]
}
