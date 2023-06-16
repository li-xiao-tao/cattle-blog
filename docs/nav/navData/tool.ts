import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}
// 常用工具
export const ToolNavData: NavData = {
    title: "常用工具",
    items: [
        {
            icon: "https://caniuse.com/img/favicon-128.png",
            title: "Can I use",
            desc: "前端 API 兼容性查询",
            link: "https://caniuse.com"
        },
        {
            icon: "https://tool.lu/favicon.ico",
            title: "在线工具",
            desc: "开发人员的工具箱",
            link: "https://tool.lu"
        },
        {
            icon: "/icons/json-cn.ico",
            title: "JSON 中文网",
            desc: "JSON 在线解析及格式化验证",
            link: "https://www.json.cn"
        },
        {
            icon: "https://www.bootcdn.cn/assets/ico/favicon.ico",
            title: "BootCDN",
            desc: "稳定、快速、免费的前端开源项目 CDN 加速服务。",
            link: "https://www.bootcdn.cn"
        },
        {
            icon: "https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg",
            title: "iconfont",
            desc: "一个专业而且强大的图标库",
            link: "https://www.iconfont.cn"
        },
        {
            icon: "https://www.emojiall.com/favicon.ico",
            title: "Emoji",
            desc: "Emoji表情大全，你想要的表情，这里都有",
            link: "https://www.emojiall.com/zh-hans"
        },
        {
            icon: "https://www.digitalocean.com/_next/static/media/favicon.594d6067.ico",
            title: "专业Nginx配置",
            desc: "配置高性能、安全、稳定的NGINX服务器的最简单方法。",
            link: "https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN"
        },
        {
            icon: "https://any-rule.vercel.app/favicon.ico",
            title: "正则大全",
            desc: "常用正则大全, 支持web / vscode / idea / Alfred Workflow多平台",
            link: "https://any-rule.vercel.app/"
        },
        {
            icon: "data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20height%3D%221em%22%20width%3D%221em%22%3E%20%3Cpath%20d%3D%22m21.66%2010.44-.98%204.18c-.84%203.61-2.5%205.07-5.62%204.77-.5-.04-1.04-.13-1.62-.27l-1.68-.4c-4.17-.99-5.46-3.05-4.48-7.23l.98-4.19c.2-.85.44-1.59.74-2.2%201.17-2.42%203.16-3.07%206.5-2.28l1.67.39c4.19.98%205.47%203.05%204.49%207.23Z%22%20fill%3D%22%23c9d1d9%22%2F%3E%20%3Cpath%20d%3D%22M15.06%2019.39c-.62.42-1.4.77-2.35%201.08l-1.58.52c-3.97%201.28-6.06.21-7.35-3.76L2.5%2013.28c-1.28-3.97-.22-6.07%203.75-7.35l1.58-.52c.41-.13.8-.24%201.17-.31-.3.61-.54%201.35-.74%202.2l-.98%204.19c-.98%204.18.31%206.24%204.48%207.23l1.68.4c.58.14%201.12.23%201.62.27Zm2.43-8.88c-.06%200-.12-.01-.19-.02l-4.85-1.23a.75.75%200%200%201%20.37-1.45l4.85%201.23a.748.748%200%200%201-.18%201.47Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3Cpath%20d%3D%22M14.56%2013.89c-.06%200-.12-.01-.19-.02l-2.91-.74a.75.75%200%200%201%20.37-1.45l2.91.74c.4.1.64.51.54.91-.08.34-.38.56-.72.56Z%22%20fill%3D%22%23228e6c%22%20%2F%3E%20%3C%2Fsvg%3E",
            title: "Quick Reference",
            desc: "为开发人员分享快速参考备忘清单【速查表】",
            link: "https://wangchujiang.com/reference/index.html"
        },
        {
            icon: "https://www.jsdelivr.com/favicon.ico",
            title: "JSDelivr",
            desc: "一个免费的CDN开源项目",
            link: "https://www.jsdelivr.com/"
        },
        {
            icon: "https://transform.tools/static/favicon.png",
            title: "transform",
            desc: "各类数据格式与对象转换",
            link: "https://transform.tools"
        },
        {
            icon: "https://astexplorer.net/favicon.png",
            title: "AST Explorer",
            desc: "一个 Web 工具，用于探索由各种解析器生成的 AST 语法树",
            link: "https://astexplorer.net/"
        },
        {
            icon: "https://rahuldkjain.github.io/gh-profile-readme-generator/icons/icon-144x144.png?v=040f54e2f6c858e0a3dcf568c3f2b6f1",
            title: "Github主页生成器",
            desc: "一个Github 个人主页 README 生成器",
            link: "https://rahuldkjain.github.io/gh-profile-readme-generator"
        },
        {
            icon: "https://ray.so/favicon.png",
            title: "代码图片生成器",
            desc: "8 种配色、快捷键，把代码变成精美的图片",
            link: "https://ray.so"
        },
        {
            icon: "https://colorhunt.co/img/color-hunt-icon-192.png?v4",
            title: "Color Hunt",
            desc: "拥有多套配色方案，并能看到配色方案的受欢迎程度。",
            link: "https://colorhunt.co"
        },
        {
            icon: "https://cdn-static-devbit.csdn.net/web-devbit-static/favicon.ico",
            title: "猿如意",
            desc: "猿如意是一款面向开发者的辅助开发工具箱，包含了效率工具、开发工具下载，教程文档，代码片段搜索，全网搜索等功能模块。帮助开发者提升开发效率，帮你从“问题”找到“答案”。",
            link: "https://devbit.csdn.net"
        },
        {
            icon: 'https://cms.boardmix.cn/images/board.ico',
            title: 'Boardmix',
            desc: 'Boardmix博思白板，集自由布局、画笔、便签、多媒体呈现、脑图、文档多种创意表达能力于一体，激发团队创造力无限延伸',
            link: 'https://boardmix.cn'
        },
        {
            icon: "https://ssl.gstatic.com/pagespeed/insights/ui/logo/favicon_48.png",
            title: "PageSpeed",
            desc: "在线网站性能评测工具",
            link: "https://pagespeed.web.dev"
        },
        {
            icon: "https://www.processon.com/public_login/favicon.983368c6.ico",
            title: "ProcessOn",
            desc: "专业强大的作图工具，支持多人实时在线协作，可用于原型图、UML、BPMN、网络拓扑图等多种图形绘制",
            link: "https://www.processon.com/"
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