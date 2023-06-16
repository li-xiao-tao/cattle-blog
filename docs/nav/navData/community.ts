import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// 社区
export const communityNavData: NavData = {
    title: "社区",
    items: [
        {
            title: "Github",
            icon: {
                svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>'
            },
            desc: "一个面向开源及私有软件项目的托管平台",
            link: "https://github.com"
        },
        {
            icon: "https://gitee.com/favicon.ico",
            title: "Gitee",
            desc: "企业级 DevOps 研发管理平台",
            link: "https://gitee.com"
        },
        {
            title: "稀土掘金",
            icon: "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/apple-touch-icon.png",
            desc: "面向全球中文开发者的技术内容分享与交流平台",
            link: "https://juejin.cn"
        },
        {
            title: "CSDN",
            icon: "https://g.csdnimg.cn/static/logo/favicon32.ico",
            desc: "CSDN是全球知名中文IT技术交流平台，包含原创博客、精品问答、职业培训、技术论坛、资源下载等产品服务,提供原创、优质、完整内容的专业IT技术开发社区。",
            link: "https://www.csdn.net"
        },
        {
            title: "SegmentFault 思否",
            icon: "https://static.segmentfault.com/main_site_next/0dc4bace/touch-icon.png",
            desc: "技术问答开发者社区",
            link: "https://segmentfault.com"
        },
        {
            title: "博客园",
            icon: "/icons/cnblogs.svg",
            desc: "博客园是一个面向开发者的知识分享社区",
            link: "https://www.cnblogs.com"
        },
        {
            title: "知乎",
            icon: "https://static.zhihu.com/heifetz/assets/apple-touch-icon-60.362a8eac.png",
            desc: "中文互联网高质量的问答社区和创作者聚集的原创内容平台",
            link: "https://juejin.cn"
        },
        {
            icon: "https://echarts.apache.org/zh/images/favicon.png?_v_=20200710_1",
            title: "Echarts社区",
            desc: "Echarts学习交流社区，案例广泛",
            link: "https://www.makeapie.cn/echarts"
        },
        {
            icon: "https://leetcode.cn/favicon.ico",
            title: "力扣(LeetCode)",
            desc: "全球极客挚爱的技术成长平台。",
            link: "https://leetcode.cn"
        },
        {
            icon: "https://docschina.org/favicon.ico",
            title: "印记中文",
            desc: "印记中文 - 深入挖掘国外前端新领域。",
            link: "https://docschina.org"
        },
        {
            icon: "https://static2.cnodejs.org/public/images/cnode_icon_32.png",
            title: "CNode",
            desc: "最好的Node.js中文社区",
            link: "https://cnodejs.org"
        },
        {
            icon: "https://eleduck.com/static/favicon.ico",
            title: "电鸭",
            desc: "远程工作、自由职业、兼职外包,自由从这开始",
            link: "https://eleduck.com"
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
        },
        {
            icon: "",
            title: "",
            desc: "",
            link: ""
        }
    ]
}