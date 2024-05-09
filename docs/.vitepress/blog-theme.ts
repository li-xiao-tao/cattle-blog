// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
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
  },
  oml2d: {
    mobileDisplay: true,
    models: [
      {
        path: 'https://model.oml2d.com/HK416-1-normal/model.json',
        position: [0, 60],
        scale: 0.08,
        stageStyle: {
          height: 450
        }
      },
      {
        path: "https://model.oml2d.com/cat-black/model.json"
      },
      {
        path: 'https://registry.npmmirror.com/oml2d-models/latest/files/models/Senko_Normals/senko.model3.json'
      },
    ]
  },
})

export { blogTheme }
