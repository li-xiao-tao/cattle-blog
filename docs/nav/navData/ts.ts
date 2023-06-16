import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// Typescript
export const TsNavData: NavData =
{
    title: "TypeScript",
    items: [
        {
            icon: "https://ts.xcatliu.com/favicon.png",
            title: "Typescript入门教程",
            desc: "TS入门必备教材",
            link: "https://ts.xcatliu.com"
        },
        {
            icon: "https://typescript.bootcss.com/images/typescript-icon.svg",
            title: "Typescript",
            desc: "TypeScript 为 JavaScript 添加了可选的类型、类和模块系统。TypeScript 支持大规模 JavaScript 应用程序开发",
            link: "https://typescript.bootcss.com"
        },
        {
            icon: "https://jkchao.github.io/typescript-book-chinese/logo.png",
            title: "深入理解 TypeScript",
            desc: "TS中文查询手册",
            link: "https://jkchao.github.io/typescript-book-chinese/#why"
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