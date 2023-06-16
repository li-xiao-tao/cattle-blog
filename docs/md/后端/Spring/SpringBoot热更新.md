# SpringBoot更新

- 配置IDEA

- 方式一：依赖devtools
- 方式二：插件JRebel and XRebel

# 1. IDEA配置

:::=tabs
::汉化IDEA

**设置1**

文件->设置->构建、执行、部署->编译器

勾选：`自动构建项目`

**设置2 -低版本IDEA：**

快捷键：ctrl+alt+shift+/

选择：注册表

勾选：`compiler.automake.allow.when.app.running`

**设置2 高版本IDEA**

文件->设置->高级设置->编译器

勾选：`即使开发的应用程序当前正在运行，也允许自动make启动`

::英文IDEA

**设置1**

File->Setting->Build,Execution,Deployment->Compile

勾选：`Make project automatically`

**设置2  低版本IDEA：**

快捷键：ctrl+alt+shift+/

选择：Registry

勾选：`compiler.automake.allow.when.app.running`

**设置2 高版本IDEA：**

File->Settings --> Advanced Settings --> Compiler

勾选：`Allow auto-make to srart even if developed application is currently running`

:::

# 2.devtools

- 可热更新`resources`静态资源
- 不可以`JRebel`启动

## 2.1 POM依赖

```yml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <!-- 这个需要为 true 热部署才有效 -->
            <optional>true</optional>
            <!--只在运行时起作用  打包时不打进去-->
            <scope>runtime</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <!--fork :  如果没有该项配置，肯定devtools不会起作用，即应用不会restart -->
                    <fork>true</fork>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

## 2.2 配置application.yml

```yml
spring:
  # 热部署
  devtools:
    restart:
      # 设置开启热部署
      enabled: true
      # 重启目录
      additional-paths: src/main/java
      ## 设置哪些资源变动后不触发热部署，会覆盖默认的exclude内容（资源不会触发重启，但会触发实时重新加载）
      # exclude: WEB-INF/**,static/**
      ## 监控额外的路径（优先于exclude）
      # additional-paths: src/main/java
    # 设置热更新
    livereload:
      # 设置实时更新
      enabled: true
      # 配置实时编译的服务端口
      port: 9898
      # 文件变化轮询间隔时间，单位毫秒，默认为1000ms
      # polling: 1000
      # 配置忽略的文件类型，使用正则表达式，可以用于提升性能
      # trigger-file: ^.*\.((jsp)|(css)|(js))$
  freemarker:
    #页面不加载缓存，修改即时生效
    cache: false
```

## 2.3 更新文件

快捷键：Ctrl + Shift + F9

# 3.JRebel and XRebel

- 无法更新`resources`静态资源

## 3.1 插件

- JRebel and XRebel
  - 更新java类
  - 自己百度破解，建议2022.4.1前版本，后面版本破解使用需要本地启个服务(更复杂了)
- JRebel mybatisPlus extension
  - 更新mybatis xml

## 3.2 更新文件

快捷键：Ctrl + Shift + F9

## 3.3使用方式

- 需要以`Rebel`启动

# 4.总结



| 热更新方式 |           依赖`devtools`            | 插件`Rebel`  |
| :--------: | :---------------------------------: | :----------: |
|    优点    | 可以跟新可热更新`resources`静态资源 |     无法     |
|    缺点    |            更新速度`慢`             | 更新速度`快` |
|            |                                     |              |





