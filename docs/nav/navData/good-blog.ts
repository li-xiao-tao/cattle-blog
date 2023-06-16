import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// 优秀博客
export const GoodBlogNavData: NavData =
{
    title: "优秀博客",
    items: [
        {
            icon: "https://www.disnox.top/img/favicon.ico",
            title: "尚宇的小站",
            desc: "📺 尚宇的小站",
            link: "https://www.disnox.top"
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