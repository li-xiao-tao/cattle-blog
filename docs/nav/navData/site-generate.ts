import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// 站点生成
export const SiteGenerateNavData: NavData =
{
    title: "站点生成",
    items: [
        {
            icon: "https://th.bing.com/th?id=ODLS.03d4b04b-fba3-4d82-94b2-5b39cb7d6e69&w=16&h=16&o=6&pid=1.2",
            title: "VitePress",
            desc: "由Vite、Vue驱动的静态网站生成器",
            link: "https://process1024.github.io/vitepress/"
        },
        {
            icon: "https://vuepress.vuejs.org/logo.png",
            title: "VuePress",
            desc: "Vue 驱动的静态网站生成器",
            link: "https://vuepress.vuejs.org/zh"
        },
        {
            icon: "https://hexo.io/icon/favicon-32x32.png",
            title: "Hexo",
            desc: "快速、简洁且高效的博客框架",
            link: "https://hexo.io/zh-cn/"
        },
        {
            icon: "https://docusaurus.io/zh-CN/img/docusaurus.ico",
            title: "Docusaurus",
            desc: "Docusaurus 会帮助你在极短时间内搭建漂亮的文档网站。",
            link: "https://docusaurus.io/zh-CN/docs"
        },
        {
            icon: "https://docsify.js.org/_media/favicon.ico",
            title: "docsify",
            desc: "docsify 可以快速帮你生成文档网站",
            link: "https://docsify.js.org/#/zh-cn"
        },
        {
            icon: "https://halo.run/themes/theme-official-v2/assets/favicons/favicon-32x32.png",
            title: "Halo",
            desc: "强大易用的开源建站工具。",
            link: "https://halo.run"
        },
        {
            icon: "https://astro.build/favicon.svg",
            title: "Astro",
            desc: "Astro 是集多功能于一体的 Web 框架，用于构建快速、以内容为中心的网站。",
            link: "https://docs.astro.build/zh-cn/getting-started"
        },
        {
            icon: "https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png",
            title: "Dumi",
            desc: "为组件研发而生的静态站点框架",
            link: "https://d.umijs.org/"
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