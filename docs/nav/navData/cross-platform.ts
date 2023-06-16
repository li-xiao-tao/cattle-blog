import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

export const CrossPlatformNavData: NavData = {
    title:'跨平台',
    items:[
        {
            icon: 'https://www.electronjs.org/zh/assets/img/favicon.ico',
            title: 'Electron',
            desc: '使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序。',
            link: 'https://www.electronjs.org/zh/',
            github: 'https://github.com/electron/electron'
        },
        {
            icon: 'https://flutter.cn/assets/images/cn/flutter-icon.png',
            title: 'Flutter',
            desc: 'Flutter 官方文档中文版，包含 SDK 下载、最新特性介绍、代码示例、开发文档、中文社区等内容。',
            link: 'https://flutter.cn/',
            github: ''
        },
        {
            icon: "https://tauri.app/meta/favicon-144x144.png",
            title: "Tauri",
            desc: "构建跨平台的快速、安全、前端隔离应用。",
            link: "https://tauri.app/zh-cn/",
            github:'https://github.com/tauri-apps/tauri'
        },
        {
            icon: "https://web-assets.dcloud.net.cn/unidoc/zh/icon.png?v=1556263038788",
            title: "uni-app",
            desc: "uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。",
            link: "https://uniapp.dcloud.net.cn/",
            github:'https://github.com/dcloudio/uni-app'
        },
       
        {
            icon: "https://getpino.io/pino-tree.png",
            title: "Pino",
            desc: "Very low overhead Node.js logger",
            link: "https://getpino.io/#/"
        },
        {
            icon: "https://verdaccio.org/zh-CN/img/logo/uk/verdaccio-tiny-uk-no-bg.svg",
            title: "Verdaccio",
            desc: "一个基于 Node.js 的轻量级私有仓库",
            link: "https://verdaccio.org/zh-cn/"
        },
        {
            icon: "https://socket.io/zh-CN/images/favicon.png",
            title: "Socket.IO",
            desc: "Socket.IO 是一个库，可以在客户端和服务器之间实现 低延迟, 双向 和 基于事件的 通信。",
            link: "https://socket.io/zh-CN/"
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
    ]
}