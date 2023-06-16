## Knife4j 		API接口测试工具

### Knife4 4.0.0 -- 推荐使用

- **推荐使用，解决因SpringBoot版本太高，配置类可以用application.yaml 配置**

**SpringBoot2.7.6版**

#### **1.0导入依赖**

```xml
<!--引入Knife4j的官方start包,该指南选择Spring Boot版本<3.0,开发者需要注意-->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-openapi2-spring-boot-starter</artifactId>
    <version>4.0.0</version>
</dependency>
```

#### **2.application.yaml**

```yaml
# knife4j的增强配置，不需要增强可以不配
knife4j:
  # 个性化配置
  setting:
    language: zh_cn
  # 是否开启刀4j增强模式
  enable: true
  # 是否在生产环境中？如果是，则当前无法访问所有文档，默认值为 false
  #production: true
  openapi:
    title: ${spring.application.name}
    # 简介
    description: redis集群 + Lettuce
    email: 123456@qq.com
    # 作者
    concat: QWQ
    # 服务地址
    url: https://localhost:8080/doc.html
    version: v4.0
    # 许可证
    license: Apache 2.0
    # 许可网站
    license-url: https://stackoverflow.com/
    terms-of-service-url: https://stackoverflow.com/
    # 分组
    group:
      redis:
        group-name: 分组名称
        api-rule: package
        api-rule-resources:
          - com.itcast.cattle.redis.controller
```



### Knife4 3.0.3

- 使用Knife4j2.0.6及以上的版本，Spring Boot的版本必须大于等于2.2.x

访问url http://localhost:8080/doc.html

**SpringBoot2.6.3版**

**注意: 启动类注解**

```
@EnableWebMvc//解决swagger启动失败

spring:
  mvc:
    pathmatch:
      # springboot2.6.2与swagger/knife4j版本冲突问题的 matching-strategy是path_pattern_parser，改为之前的ant_path_matcher
      matching-strategy: ANT_PATH_MATCHER #springboot2.6.x如果不加该配置会报错
```

#### **1.0导入依赖**

```xml
###父模块
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.github.xiaoymin</groupId>
            <artifactId>knife4j-dependencies</artifactId>
            <!--在引用时请在maven中央仓库搜索2.X最新版本号-->
            <version>3.0.3</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>


        ##子模块
<dependencies>
    <dependency>
        <groupId>com.github.xiaoymin</groupId>
        <artifactId>knife4j-spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```

#### **2.0配置类**

```java
import com.github.xiaoymin.knife4j.spring.annotations.EnableKnife4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@EnableKnife4j
public class Knife4jConfig {

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .useDefaultResponseMessages(false)
                .apiInfo(apiInfo())
                .select()
                //////////////////////////////////////
                //注意，这里必须是controller层包名////
                ////////////////////////////////////
                .apis(RequestHandlerSelectors.basePackage("com.itcast.devops.controller"))
                .paths(PathSelectors.any())
                .build();

    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .description("redis接口测试文档")
                .contact(new Contact("redis", "https://github.com.lenve", "123456@qq.com"))
                .version("v1.1.0")
                .title("API测试文档")
                .build();
    }

}
```

### **开发示例**

:::=tabs
::Controller-1

```java
package com.itcast.devops.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "首页模块")
@RestController
@ApiResponses(value = {
        @ApiResponse(code = 200, message = "成功"),
        @ApiResponse(code = 400, message = "失败"),
        @ApiResponse(code = 401, message = "缺少参数")})
public class IndexController {


    @ApiOperation(value = "向客人问好")
    @GetMapping("/sayHi")
    public ResponseEntity<String> sayHi(@ApiParam("需求id") @RequestParam(value = "name") String name) {
        return ResponseEntity.ok("Hi:" + name);
    }
}

```

::Controller-2

```java
package com.itcast.devops.controller;


import com.itcast.devops.pojo.User;
import io.swagger.annotations.*;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@Api(tags = "用户接口")//描述UserController的信息
public class UserController {

    @ApiOperation(value = "查询用户", notes = "根据id查询用户")
    @ApiImplicitParam(paramType = "path", name = "id", value = "用户id", required = true)
    @GetMapping("/user/query/{id}")
    public String getUserById(@PathVariable Integer id) {
        return "/user/" + id;
    }

    @ApiResponses({
            @ApiResponse(code = 200, message = "删除成功"),
            @ApiResponse(code = 500, message = "删除失败")})
    @ApiOperation(value = "删除用户", notes = "根据id删除用户")
    @DeleteMapping("/user/delete/{id}")
    public Integer deleteUserById(@PathVariable Integer id) {
        return id;
    }

    @ApiOperation(value = "添加用户", notes = "添加一个用户，传入用户名和性别")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "username", value = "用户名", required = true, defaultValue = "张三"),
            @ApiImplicitParam(paramType = "query", name = "sex", value = "性别", required = true, defaultValue = "女")
    })
    @PostMapping("/user")
    public String addUser(@RequestParam String username, @RequestParam String sex) {
        return username + "," + sex;
    }

    @ApiOperation(value = "修改用户", notes = "根据传入的用户信息修改用户")
    @PutMapping("/user")
    public String updateUser(@RequestBody User user) {
        return user.toString();
    }

    @GetMapping("/ignore")
    @ApiIgnore
    public void ignoreMethod() {
    }


}

```

::Model

```java
package com.itcast.devops.pojo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@ApiModel(value = "用户实体")
public class User {

    @ApiModelProperty(value = "id")
    private Integer id;

    @ApiModelProperty(value = "用户名")
    private String username;

    @ApiModelProperty(value = "性别，0男，1女")
    private Integer sex;

}
```

:::

