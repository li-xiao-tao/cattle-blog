import type { NavLink } from "./components/type"
import { Vue2NavData } from './navData/vue2'
import { Vue3NavData } from "./navData/vue3"
import { ToolNavData } from './navData/tool'
import { ReactNavData } from "./navData/react"
import { NodeNavData } from "./navData/node"
import { TsNavData } from "./navData/ts"
import { LibNavData } from "./navData/lib"
import { BuildNavData } from "./navData/build"
import { SreNavData } from "./navData/sre"
import { CssNavData } from "./navData/css"
import { StudyDataNavData } from './navData/study-data'
import { GoodBlogNavData } from "./navData/good-blog"
import { SiteGenerateNavData } from "./navData/site-generate"
import { CrossPlatformNavData } from "./navData/cross-platform"

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  ToolNavData,
  Vue2NavData,
  Vue3NavData,
  ReactNavData,
  NodeNavData,
  TsNavData,
  LibNavData,
  BuildNavData,
  SreNavData,
  CssNavData,
  CrossPlatformNavData,
  StudyDataNavData,
  GoodBlogNavData,
  SiteGenerateNavData
]




// https://sfc.vuejs.org/
// 轻量级的 vue3 playground，可以实时预览效果，实时查看编译后的 js 代码（包括 ssr 的）和提取出的 css 代码


// https://template-explorer.vuejs.org/
// vue3 的模板解析工具，学习源码必备


// https://jsrun.net/app/49pKp
// 跟上面是同一个网站，你如果觉得自己编辑器的代码主题颜色不好看，那你可以用它来慢慢调



// https://colorsinspo.com/
// 如果你想搞一个自己的组件库，网站，不知道配色的就可以自己来配色


// https://www.jsv9000.app/
// EventLoop 可视化

// www.iconfont.cn/
// https://iconpark.oceanengine.com/official
// https://cli.vuejs.org/zh/
// https://reactnative.cn/
// https://blog.poetries.top/browser-working-principle/: 浏览器工作原理与实战
// https://interview.poetries.top/ 前端进阶之旅
// https://webpack.wuhaolin.cn/ 深入浅出webpack
// https://zh.javascript.info/ 现代javascript教程
// https://yuchengkai.cn/ 前端进阶之道
// https://chokcoco.github.io/CSS-Inspiration/#/
// https://wangdoc.com/javascript/
// https://blog.poetries.top/node-learning-notes/
// https://tgideas.qq.com/doc/index.html
// https://guide.aotu.io/index.html
// https://tool.lu/nav/
// https://www.typescriptlang.org/zh/play
// https://wujie-micro.github.io/doc/-无界为前端
