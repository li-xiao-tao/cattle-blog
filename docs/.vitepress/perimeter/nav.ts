// 导航栏
export interface NavItem {
  icon?: string;
  text: string;
  link: string;
}

export interface NavMenu {
  text: string;
  collapsible: boolean;
  collapsed: boolean;
  items: NavItem[];
}

export const navMenus: NavMenu[] = [
  {
    text: "后端文档链接",
    // 是否可折叠
    collapsible: true,
    // 默认是否折叠
    collapsed: true,
    items: [
      { icon: "github",text: 'Java 8官方文档', link: 'https://docs.oracle.com/javase/8/docs/api/index.html'},
      { text: 'Spring文档中文版', link: 'https://www.springcloud.cc/spring-reference.html' },
      { text: 'Spring Boot官方文档', link: 'https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle' },
      { text: 'Spring Cloud官方文档', link: 'https://spring.io/projects/spring-cloud' },
      { text: 'Maven官方文档', link: 'http://maven.apache.org/guides' },
      { text: 'Tomcat 8官方文档', link: 'http://tomcat.apache.org/tomcat-8.0-doc/index.html' },
      { text: 'Redisson中文教程', link: 'https://www.bookstack.cn/read/redisson-doc-cn/overview.md' },
      { text: 'Git中文教程', link: 'https://git-scm.com/book/zh/v2' },
      { text: 'Nginx中文文档', link: 'https://www.nginx.cn/doc/index.html' },
      { text: 'Kafka中文文档', link: 'https://kafka.apachecn.org' },
      { text: 'Mybatis中文文档', link: 'https://mybatis.org/mybatis-3/zh/index.html' },
      { text: '微信小程序官方文档', link: 'https://developers.weixin.qq.com/miniprogram/dev/framework' },
      { text: 'RabbitMQ官方文档', link: 'https://www.rabbitmq.com/documentation.html' },
      { text: 'RocketMQ官方文档', link: 'http://rocketmq.apache.org/docs/quick-start' },
      { text: 'Elasticsearch官方文档', link: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.htm' },
      { text: 'MyBatis-Plus 官网', link: 'https://baomidou.com/' },
      { text: 'hutool', link: 'https://www.hutool.cn/' },
      { text: 'gitlab 中文官网', link: 'https://docs.gitlab.cn/' },
      { text: 'knife4j官网', link: 'https://doc.xiaominfo.com/' },
      { text: 'sa-token官网', link: 'https://sa-token.dev33.cn/' },
    ]
  },
  {
    text: "前端文档链接",
    // 是否可折叠
    collapsible: true,
    // 默认是否折叠
    collapsed: true,
    items: [
      { text: 'Mongoose', link: 'http://www.mongoosejs.net' },
      { text: 'Vue3', link: 'https://cn.vuejs.org' },
      { text: 'Vue2', link: 'https://v2.cn.vuejs.org' },
      { text: 'Vue-Router', link: 'https://router.vuejs.org/zh' },
      { text: 'Pinia', link: 'https://pinia.web3doc.top' },
      { text: 'TypeORM', link: 'https://typeorm.bootcss.com' },
      { text: 'Vite', link: 'https://cn.vitejs.dev' },
      { text: 'React', link: 'https://react.docschina.org' },
      { text: 'Nestjs', link: 'https://docs.nestjs.cn' },
      { text: 'Koa', link: 'https://www.koajs.com.cn' },
      { text: 'Vant2', link: 'https://vant-contrib.gitee.io/vant/v2/' },
      { text: 'Vant3', link: 'https://vant-contrib.gitee.io/vant/v3/#/zh-CN' },
      { text: 'ElementUI', link: 'https://element.eleme.cn/#/zh-CN' },
      { text: 'Element Plus', link: 'https://element-plus.org/zh-CN/#/zh-CN' },
      { text: 'qiankun', link: 'https://qiankun.umijs.org/zh' },
      { text: 'Yapi', link: 'https://hellosean1025.github.io/yapi/index.html' },
      { text: 'Nuxt3', link: 'https://www.nuxtjs.org.cn/' },
      { text: 'Naive UI', link: 'https://www.naiveui.com/zh-CN/os-theme' },
      { text: 'varlet', link: 'https://varlet.gitee.io/varlet-ui/#/zh-CN/index' },
      { text: 'NutUI', link: 'https://nutui.jd.com/#/' },
      { text: 'Echarts', link: 'https://echarts.apache.org/zh/index.html' },
    ]
  },
  {
    text: "前端学习链接",
    // 是否可折叠
    collapsible: true,
    // 默认是否折叠
    collapsed: true,
    items: [
      { text: "Node.js全栈", link: "/md/nodejs/nodemon.html" },
      { text: "Vue+TS", link: "/md/vue-ts/Vue3笔记.html" },
    ]
  },
  {
    text: "算法",
    // 是否可折叠
    collapsible: true,
    // 默认是否折叠
    collapsed: true,
    items: [
      { text: "无向图", link: "/md/算法/无向图.md" }
    ]
  },
  {
    text: "工具箱",
    // 是否可折叠
    collapsible: true,
    // 默认是否折叠
    collapsed: true,
    items: [
      { text: "Json工具箱", link: "/components-md/JsonFormatter.md" },
      { text: "UUID", link: "/components-md/UUID.md" }
    ]
  }
]
