import type { NavLink } from "../components/type"

type NavData = {
    title: string
    items: NavLink[]
}

// 前端运维
export const SreNavData: NavData =
{
    title: "前端DevOps",
    items: [
        {
            icon: "https://app.gitbook.com/public/emojis/1f680.png?v=6.0.0",
            title: "Docker从入门到实践",
            desc: "最好的Docker与K8S入门电子书",
            link: "https://yeasy.gitbook.io/docker_practice/"
        },
        {
            icon: "https://kubernetes.io/images/favicon.png",
            title: "kubernetes官网",
            desc: "最流行的容器编排管理工具",
            link: "https://kubernetes.io/zh-cn/"
        },
        {
            icon: "https://www.kubernetes.org.cn/img/2018/07/cropped-con999-32x32.png",
            title: "k8s中文社区",
            desc: "学习K8S必上的中文社区",
            link: "https://www.kubernetes.org.cn/"
        },
        {
            icon: "https://www.jenkins.io/zh/sites/default/files/jenkins_favicon.ico",
            title: "Jenkins",
            desc: "Jenkins中文文档",
            link: "https://www.jenkins.io/zh/doc"
        },
        {
            icon: "https://wangchujiang.com/linux-command/img/favicon.ico",
            title: "Linux命令搜索",
            desc: "Linux命令搜索引擎:最专业的Linux命令大全，内容包含Linux命令手册、详解、学习，值得收藏的Linux命令速查手册。",
            link: "https://wangchujiang.com/linux-command/"
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