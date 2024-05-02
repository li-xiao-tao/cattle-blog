// 侧边栏
export interface SidebarItem {
    icon?: string;
    text: string;
    link: string;
}

export interface SidebarMenu {
    text: string;
    collapsible: boolean;
    collapsed: boolean;
    items: SidebarItem[];
}

export const sidebarMenus: SidebarMenu[] = [
    {
        //icon: "",
        text: "Java",
        // 是否可折叠
        collapsible: true,
        // 默认是否折叠
        collapsed: true,
        items: [
            { text: "Java新特性", link: "/md/后端/Java/Java8新特性.md" },
            { text: "BigDecimal详解", link: "/md/后端/Java/Java中BigDecimal详解及应用.md" },
            { text: "Spring-Excel", link: "/md/后端/Excel/Excel.md" },
            { text: "Spring-GitLab", link: "/md/后端/GitLab/GitLab.md" },
            { text: "Spring-Jenkins", link: "/md/后端/Jenkins/Jenkins.md" },
            { text: "Mybatis-Plus", link: "/md/后端/Mybatis-Plus/Mybatis-Plus.md" },
            { text: "Mysql-sql优化", link: "/md/后端/Mysql/Mysql-sql优化.md" },
            { text: "Mysql应用优化", link: "/md/后端/Mysql/Mysql应用优化.md" },
            { text: "SQL优化企业实战", link: "/md/后端/Mysql/SQL优化企业实战.md" },
            { text: "Enum", link: "/md/后端/Java/Enum.md" },
        ]
    },
    {
        //icon: "",
        text: "SpringBoot",
        // 是否可折叠
        collapsible: true,
        // 默认是否折叠
        collapsed: true,
        items: [
            { text: "模板引擎/FreeMarker", link: "/md/后端/Spring/模板引擎/FreeMarker.md" },
            { text: "Spring", link: "/md/后端/Spring/Spring.md" },
            { text: "Spring3种跨域解决方案", link: "/md/后端/Spring/Spring3种跨域解决方案.md" },
            { text: "Spring-AOP", link: "/md/后端/Spring/Spring-AOP.md" },
            { text: "Spring-IOC-1", link: "/md/后端/Spring/Spring-IOC-1.md" },
            { text: "SpringMVC-1", link: "/md/后端/Spring/SpringMVC-1.md" },
            { text: "SpringMVC-2", link: "/md/后端/Spring/SpringMVC-2.md" },
            { text: "Spring-IOC-JdbcTemplate-2", link: "/md/后端/Spring/Spring-IOC-JdbcTemplate-2.md" },
            { text: "Spring-thread", link: "/md/后端/Spring/Spring-thread.md" },
            { text: "Spring-webflux", link: "/md/后端/Spring/Spring-webflux.md" },
            { text: "Spring-全局异常处理", link: "/md/后端/Spring/Spring-全局异常处理.md" },
            { text: "SpringBoot-1", link: "/md/后端/Spring/SpringBoot-1.md" },
            { text: "SpringBoot-2", link: "/md/后端/Spring/SpringBoot-2.md" },
            { text: "SpringBoot-AOP", link: "/md/后端/Spring/SpringBoot-AOP.md" },
            { text: "SpringBoot-Druid", link: "/md/后端/Spring/SpringBoot-Druid.md" },
            { text: "SpringBoot-Dubbo", link: "/md/后端/Spring/SpringBoot-Dubbo.md" },
            { text: "SpringBoot-Elasticsearch-Easy-Es", link: "/md/后端/Spring/SpringBoot-Elasticsearch-Easy-Es.md" },
            { text: "SpringBoot-Gateway", link: "/md/后端/Spring/SpringBoot-Gateway.md" },
            { text: "SpringBoot-JJWT", link: "/md/后端/Spring/SpringBoot-JJWT.md" },
            { text: "SpringBoot-MyBatis", link: "/md/后端/Spring/SpringBoot-MyBatis.md" },
            { text: "SpringBoot-OpenFeign", link: "/md/后端/Spring/SpringBoot-OpenFeign.md" },
            { text: "SpringBoot-RabbitMQ", link: "/md/后端/Spring/SpringBoot-RabbitMQ.md" },
            { text: "SpringBoot-Redis", link: "/md/后端/Spring/SpringBoot-Redis.md" },
            { text: "SpringBoot-RestTemplate", link: "/md/后端/Spring/SpringBoot-RestTemplate.md" },
            { text: "SpringBoot-修改启动图标", link: "/md/后端/Spring/SpringBoot-修改启动图标.md" },
            { text: "SpringBoot-定时任务", link: "/md/后端/Spring/SpringBoot-定时任务.md" },
            { text: "SpringBoot-日志", link: "/md/后端/Spring/SpringBoot-日志.md" },
            { text: "SpringBoot启动流程", link: "/md/后端/Spring/SpringBoot启动流程.md" },
            { text: "SpringBoot热更新", link: "/md/后端/Spring/SpringBoot热更新.md" },
            { text: "SpringBoot静态资源页面无法访问", link: "/md/后端/Spring/SpringBoot静态资源页面无法访问.md" },
            { text: "SpringBoot静态资源页面重定向为字符串", link: "/md/后端/Spring/SpringBoot静态资源页面重定向为字符串.md" },
            { text: "Spring-Authorization-Server", link: "/md/后端/Spring/spring-authorization-server/SAS.md" },
            { text: "SpringBoot-阿里Excel", link: "/md/后端/Spring/SpringBoot-Excel.md" },
        ]
    },
    {
        text: "杂",
        collapsible: true,
        collapsed: true,
        items: [
            { text: "JAVA环境变量", link: "/md/后端/Java/Java环境变量.md" },
            { text: "Map排序", link: "/md/后端/Java/Map排序.md" },
            { text: "Optional", link: "/md/后端/Java/Optional.md" },
            { text: "线程池", link: "/md/后端/Java/多线程/线程池.md" },
            { text: "多线程学习篇", link: "/md/后端/Java/多线程/多线程学习篇.md" },
            { text: "高频多线程相关面试题", link: "/md/后端/Java/多线程/高频多线程相关面试题.md" },
            { text: "锁", link: "/md/后端/Java/锁.md" },
            { text: "IO", link: "/md/后端/Java/IO/IO.md" },
            { text: "Json", link: "/md/后端/Java/alibaba/Json.md" },
            { text: "Nacos", link: "/md/后端/Java/alibaba/nacos.md" },
            { text: "Knife4j", link: "/md/杂/Knife4j.md" },
            { text: "分布式事务", link: "/md/杂/分布式事务.md" },
            { text: "页面展示时间和数据库差8小时", link: "/md/杂/页面展示时间和数据库差8小时.md" },         
            { text: "nginx", link: "/md/后端/nginx/nginx.md" },
            { text: "企业微信api", link: "/md/后端/QWapi/企业微信api.md" },
            { text: "Jedis", link: "/md/后端/redis/Jedis.md" },
            { text: "redis", link: "/md/后端/redis/redis.md" },
            { text: "Redis-id自增", link: "/md/后端/redis/Redis-id自增.md" },
            { text: "Redis-interview", link: "/md/后端/redis/Redis-interview.md" },
            { text: "Redis-plus", link: "/md/后端/redis/Redis-plus.md" },
            { text: "Redisson框架", link: "/md/后端/redis/Redisson框架.md" },
            { text: "Redis单点【主从】", link: "/md/后端/redis/Redis单点【主从】.md" },
            { text: "Redis批处理", link: "/md/后端/redis/Redis批处理.md" },
            { text: "Redis持久化", link: "/md/后端/redis/Redis持久化.md" },
            { text: "Redis的删除策略", link: "/md/后端/redis/Redis的删除策略.md" },
            { text: "PostgreSQL", link: "/md/后端/SQL/PostgreSQL.md" },
            { text: "SQL", link: "/md/后端/SQL/SQL.md" },
            { text: "SQL-EXPLAIN语法", link: "/md/后端/数据库执行计划EXPLAIN/EXPLAIN语法-explain语法.md" },
            { text: "常用注解", link: "/md/后端/注解开发/常用注解.md" },
            { text: "注解", link: "/md/后端/注解开发/注解.md" },
            { text: "正则", link: "/md/正则/正则.md" },
            { text: "获取外网IP", link: "/md/杂/外网IP.md" },
        ]
    },
    {
        text: "前端",
        // 是否可折叠
        collapsible: true,
        // 默认是否折叠
        collapsed: true,
        items: [
            { text: "安装NVM-VUE", link: "/md/前端/Vue/安装NVM-VUE.md" },
            { text: "创建Vue项目-ElementUI-axios", link: "/md/前端/Vue/创建Vue项目-ElementUI-axios.md" },
            { text: "Vue基础", link: "/md/前端/Vue/Vue基础.md" },
            { text: "Vue-router模块拆分", link: "/md/前端/Vue/Vue-router模块拆分.md" },
            { text: "Vue登录Demo", link: "/md/前端/Vue/Vue登录Demo.md" },
            { text: "Vue适配移动端", link: "/md/前端/Vue/Vue适配移动端.md" },
            { text: "样式学习", link: "/md/前端/Vue/样式学习.md" },
            { text: "组件-代码提示", link: "/md/前端/VUE组件/代码提示.md" },
            { text: "组件-WangEditor富文本", link: "/md/前端/VUE组件/WangEditor富文本.md" },
        ]
    },
    {
        text: "前端学习记录",
        // 是否可折叠
        collapsible: true,
        // 默认是否折叠
        collapsed: true,
        items: [
            { text: "Day01Html", link: "/md/前端/Html/Day01-html.md" },
            { text: "Day02CSS", link: "/md/前端/Html/Day02-css.md" },
        ]
    },
    {
        text: "运维",
        // 是否可折叠
        collapsible: true,
        // 默认是否折叠
        collapsed: true,
        items: [
            { text: "通配SSL证书", link: "/md/运维/杂/通配SSL证书.md" },
            { text: "Cenos常用命令", link: "/md/运维/CenOS/常用命令.md" },
            { text: "Cenos基本开发软件安装", link: "/md/运维/CenOS/Linux基本软件安装.md" },
            { text: "Shell脚本编程", link: "/md/运维/Shell/Shell脚本编程.md" },
            { text: "Docker安装", link: "/md/运维/Docker/Docker安装.md" },
            { text: "DockerFile", link: "/md/运维/Docker/DockerFile.md" },
            { text: "Docker高级", link: "/md/运维/Docker/Docker高级.md" },
            { text: "IDEA-Docker打包镜像", link: "/md/运维/Docker/IDEA-Docker打包镜像.md" },
            { text: "自用Docker-Compose", link: "/md/运维/Docker/自用Docker-Compose.md" },
        ]
    },
    {
        text: "Docker容器",
        // 是否可折叠
        collapsible: true,
        // 默认是否折叠
        collapsed: true,
        items: [
            { text: "1.Docker-Mysql", link: "/md/运维/Docker容器/1.Docker-Mysql.md" },
            { text: "2.Docker-PostgreSQL", link: "/md/运维/Docker容器/2.Docker-PostgreSQL.md" },
            { text: "3.Docker-单机Redis", link: "/md/运维/Docker容器/3.Docker-单机Redis.md" },
            { text: "4.Docker-集群Redis.md", link: "/md/运维/Docker容器/4.Docker-集群Redis.md" },
            { text: "5.Docker-dragonfly垂直redis", link: "/md/运维/Docker容器/5.Docker-dragonfly垂直redis.md" },
            { text: "6.Docker-kibana", link: "/md/运维/Docker容器/6.Docker-kibana.md" },
            { text: "6.Docker-Elasticsearch", link: "/md/运维/Docker容器/6.Docker-Elasticsearch.md" },
            { text: "6.Docker-Elasticsearch可视化", link: "/md/运维/Docker容器/6.Docker-Elasticsearch可视化elastic_view.md" },
            { text: "7.Docker-GitLab", link: "/md/运维/Docker容器/7.Docker-GitLab.md" },
            { text: "7.Docker-onedev轻量级GitLab", link: "/md/运维/Docker容器/7.Docker-onedev轻量级GitLab.md" },
            { text: "8.Docker-Jenkins", link: "/md/运维/Docker容器/8.Docker-Jenkins.md" },
            { text: "8.Jenkins-流水线", link: "/md/运维/Jenkins流水线.md" },
            { text: "9.Docker-Dubbo", link: "/md/运维/Docker容器/9.Docker-Dubbo.md" },
            { text: "10.Docker-Elastic-Job", link: "/md/运维/Docker容器/10.Docker-Elastic-Job.md" },
            { text: "11.Docker-Nexus私服", link: "/md/运维/Docker容器/11.Docker-Nexus私服.md" },
            { text: "12.Docker-Nacos", link: "/md/运维/Docker容器/12.Docker-Nacos.md" },
            { text: "13.Docker-RabbitMQ", link: "/md/运维/Docker容器/13.Docker-RabbitMQ.md" },
            { text: "14.Docker-Rancher", link: "/md/运维/Docker容器/14.Docker-Rancher.md" },
            { text: "15.Docker-Sentinel", link: "/md/运维/Docker容器/15.Docker-Sentinel.md" },
            { text: "16.Docker-xxl-job", link: "/md/运维/Docker容器/16.Docker-xxl-job.md" },
            { text: "17.Docker-堡垒机jumpserver", link: "/md/运维/Docker容器/17.Docker-堡垒机jumpserver.md" },
            { text: "101.Docker-可视化Portainer", link: "/md/运维/Docker容器/101.Docker-可视化Portainer.md" },
            { text: "103.Docker-IDEA", link: "/md/运维/Docker容器/103.Docker-IDEA.md" },
            { text: "104.Docker-VScode", link: "/md/运维/Docker容器/104.Docker-VScode.md" },
            { text: "105.Docker-NginxProxyManager", link: "/md/运维/Docker容器/105.Docker-NginxProxyManager.md" },
            { text: "106.Docker-FRP内网穿透", link: "/md/运维/Docker容器/106.Docker-FRP内网穿透.md" },
            { text: "107.Docker-密码管理器bitwarden", link: "/md/运维/Docker容器/107.Docker-密码管理器bitwarden.md" },
            { text: "108.Docker-私人网盘cloudreve", link: "/md/运维/Docker容器/108.Docker-私人网盘cloudreve.md" },
            { text: "109.Docker-画图drawio", link: "/md/运维/Docker容器/109.Docker-画图drawio.md" },
            { text: "110.Docker-网页webssh", link: "/md/运维/Docker容器/110.Docker-网页webssh.md" },
            { text: "111.Docker-Reader小说", link: "/md/运维/Docker容器/111.Docker-Reader小说.md" },
        ]
    },
    {
        //icon: "",
        text: "轮子",
        // 是否可折叠
        collapsible: true,
        // 默认是否折叠
        collapsed: true,
        items: [
            {text: "List校验", link: "/md/后端/utils/List校验.md"},
            {text: "BigDecimal详解", link: "/md/后端/Java/接口详情AOP.md"},
        ]
    },
]
