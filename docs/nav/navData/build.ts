import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// 编译&构建&打包
export const BuildNavData: NavData =
{
    title: "编译&构建&打包",
    items: [
        {
            icon: "https://www.webpackjs.com/icon_180x180.png",
            title: "Webpack 中文网",
            desc: "一个用于现代 JavaScript 应用程序的静态模块打包工具",
            link: "https://www.webpackjs.com"
        },
        {
            icon: "https://cn.vitejs.dev/logo.svg",
            title: "Vite 中文文档",
            desc: "下一代前端工具链",
            link: "https://cn.vitejs.dev"
        },
        {
            icon: "https://www.rollupjs.com/img/favicon.png",
            title: "Rollup",
            desc: "Rollup 是一个 JavaScript 模块打包器",
            link: "https://www.rollupjs.com"
        },
        {
            icon: "https://www.babeljs.cn/img/favicon.png",
            title: "Babel",
            desc: "Babel 是一个 JavaScript 编译器",
            link: "https://www.babeljs.cn"
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
        }, {
            icon: "",
            title: "",
            desc: "",
            link: ""
        }, {
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