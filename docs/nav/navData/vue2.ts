import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// Vue2生态
export const Vue2NavData: NavData = {
    title: "Vue2 生态",
    items: [
        {
            icon: "https://cn.vuejs.org/logo.svg",
            title: "Vue 2",
            desc: "渐进式 JavaScript 框架",
            link: "https://v2.cn.vuejs.org"
        },
        {
            icon: "https://cn.vuejs.org/logo.svg",
            title: "Vue Router",
            desc: "Vue.js 的官方路由\n为 Vue.js 提供富有表现力、可配置的、方便的路由",
            link: "https://router.vuejs.org/zh"
        },
        {
            icon: "https://nuxt.com/icon.png",
            title: "Nuxt.js",
            desc: "一个基于 Vue.js 的通用应用框架",
            link: "https://nuxt.com"
        },
        {
            icon: "https://raw.githubusercontent.com/ElemeFE/element/dev/examples/assets/images/element-logo-small.svg",
            title: "Element UI",
            desc: "Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库",
            link: "https://element.eleme.cn/#/zh-CN"
        },
        {
            icon: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
            title: "Vant",
            desc: "轻量、可定制的移动端 Vue2 组件库",
            link: "https://vant-ui.github.io/vant/v2/#/zh-CN"
        },
        {
            icon: "https://webapp.didistatic.com/static/webapp/shield/Cube-UI_logo.ico",
            title: "Cube UI",
            desc: "基于 Vue.js 实现的精致移动端组件库",
            link: "https://didi.github.io/cube-ui"
        },
        {
            icon: "https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png",
            title: "NutUI",
            desc: "京东风格的轻量级移动端组件库",
            link: "https://nutui.jd.com"
        },
        {
            icon: "https://aliyuncdn.antdv.com/v2/assets/logo.1ef800a8.svg",
            title: "Ant Design Vue",
            desc: "Ant Design 的 Vue 实现，开发和服务于企业级后台产品",
            link: "https://www.antdv.com/components/overview-cn"
        },
        {
            icon: 'https://static.tdesign.tencent.com/vue-next/favicon.ico',
            title: 'TDesign',
            desc: 'TDesign 适配桌面端的组件库，适合在 Vue2 技术栈项目中使用。',
            link: 'https://tdesign.tencent.com/vue',
            github: 'https://github.com/Tencent/tdesign-vue'
        },
        {
            icon: "",
            title: "",
            desc: "",
            link: ""
        },
        {
            icon: "",
            title: "",
            desc: "",
            link: ""
        },
        {
            icon: "",
            title: "",
            desc: "",
            link: ""
        }, {
            icon: "",
            title: "",
            desc: "",
            link: ""
        }
    ]

}