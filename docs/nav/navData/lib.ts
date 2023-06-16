import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// JavaScript框架类库
export const LibNavData: NavData =
{
    title: "JavaScript框架类库",
    items: [
        {
            icon: "https://svelte.dev/svelte-logo-horizontal.svg",
            title: "Svelte",
            desc: "将声明性组件转换为精准高效更新 DOM 的 JavaScript 代码",
            link: "https://svelte.dev"
        },
        {
            icon: "/icons/jquery.svg",
            title: "jQuery中文文档",
            desc: "一个兼容多浏览器的 JavaScript 框架",
            link: "https://jquery.cuishifeng.cn"
        },
        {
            icon: "https://www.lodashjs.com/img/lodash.png",
            title: "Lodash",
            desc: "Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。",
            link: "https://www.lodashjs.com"
        },
        {
            icon: "https://rxjs.tech/assets/images/logos/Rx_Logo_S.png",
            title: "RxJS",
            desc: "RxJS 是一个使用可观察序列编写异步和基于事件的程序的库。",
            link: "https://rxjs.tech"
        },
        {
            icon: "https://echarts.apache.org/zh/images/favicon.png?_v_=20200710_1",
            title: "Echarts",
            desc: "一个基于 JavaScript 的开源可视化图表库",
            link: "https://echarts.apache.org/zh/index.html"
        },
        {
            icon: "https://dayjs.fenxianglu.cn/assets/favicon.png",
            title: "Dayjs",
            desc: "Day.js是一个极简的JavaScript库，可以为现代浏览器解析、验证、操作和显示日期和时间。",
            link: "https://dayjs.fenxianglu.cn"
        },
        {
            icon: "https://www.axios-http.cn/assets/favicon.ico",
            title: "Axios",
            desc: "Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js",
            link: "https://www.axios-http.cn"
        },
        {
            icon: "https://socket.io/zh-CN/images/logo.svg",
            title: "socket.io",
            desc: "最好的websockets通信库",
            link: "https://socket.io/zh-CN"
        },
        {
            icon: "https://pincman.com/assets/ideal-img/20210421133351.7ebb8ac.249.png",
            title: "localforage",
            desc: "最优秀的浏览器数据库管理类库",
            link: "https://localforage.docschina.org"
        },
        {
            icon: '',
            title: '',
            desc: '',
            link: '',
            github: ''
        },
        {
            icon: '',
            title: '',
            desc: '',
            link: '',
            github: ''
        },
        {
            icon: '',
            title: '',
            desc: '',
            link: '',
            github: ''
        }

    ]
}