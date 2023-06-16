import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// 前端学习资料
export const StudyDataNavData: NavData =
{
    title: "前端学习资料",
    items: [
        {
            icon: "https://developer.mozilla.org/apple-touch-icon.6803c6f0.png",
            title: "MDN | Web 开发者指南",
            desc: "Mozilla 的开发者平台，提供了大量关于 HTML、CSS 和 JavaScript 的详细文档以及广泛的 Web API 参考资",
            link: "https://developer.mozilla.org/zh-CN"
        },
        {
            icon: "https://static.runoob.com/images/favicon.ico",
            title: "菜鸟教程",
            desc: "学的不仅是技术，更是梦想！",
            link: "https://www.runoob.com"
        },
        {
            icon: "https://nodejsred.oss-cn-shanghai.aliyuncs.com/nodejs_roadmap-logo.jpeg?x-oss-process=style/may",
            title: "Nodejs技术栈",
            desc: "本文档是作者 @五月君 从事 Node.js 开发以来的学习历程。",
            link: "https://www.nodejs.red"
        },
        {
            icon: "https://es6.ruanyifeng.com/favicon.ico",
            title: "ECMAScript 6 入门",
            desc: "阮一峰的经典ES6入门",
            link: "https://es6.ruanyifeng.com/"
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