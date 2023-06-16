# Jenkins
- 导入依赖
- 配置`Bean JenkinsApi`
- `api`接口

# 导入依赖
```xml
    <dependency>
        <groupId>io.github.cdancy</groupId>
        <artifactId>jenkins-rest</artifactId>
        <version>1.0.0</version>
        <classifier>all</classifier>
    </dependency>
```

# JenkinsApi

```java
import com.cdancy.jenkins.rest.JenkinsClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JenkinsConfig {


    @Bean
    public JenkinsClient getJenkinsClient() {
        return JenkinsClient.builder()
                .endPoint("http://127.0.0.1:8101/")
                .apiToken("cattle:110d76bcb69f29776b040ee3c13b87a325")
                .build();
    }
}
```

# API

```java
package com.itcast.cattle.cas.controller;

import com.cdancy.jenkins.rest.JenkinsClient;
import com.cdancy.jenkins.rest.domain.common.IntegerResponse;
import com.cdancy.jenkins.rest.domain.common.RequestStatus;
import com.cdancy.jenkins.rest.domain.job.BuildInfo;
import com.cdancy.jenkins.rest.domain.job.JobInfo;
import com.cdancy.jenkins.rest.domain.job.ProgressiveText;
import com.cdancy.jenkins.rest.features.ConfigurationAsCodeApi;
import com.cdancy.jenkins.rest.features.JobsApi;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.QueryParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @program: log
 * @description:
 * @author: lixiaotao
 * @create: 2023-02-24 18:09
 **/
@Slf4j
@RestController
@Api(tags = "Jenkins接口")
@RequestMapping("/jenkins")
public class JenkinsController {


    @Autowired
    private JenkinsClient jenkinsClient;

    @PostMapping("/api")
    public void api() {
        ConfigurationAsCodeApi configuration = jenkinsClient.api().configurationAsCodeApi();
        // 任务管理（任务信息、创建、修改）
        JobsApi jobsApi = jenkinsClient.api().jobsApi();
        // 插件管理（插件信息、安装插件）
        jenkinsClient.api().pluginManagerApi();
        // 任务队列相关（队列状态）
        jenkinsClient.api().queueApi();
        // 系统哈希值信息（用于防御CSRF攻击）
        jenkinsClient.api().crumbIssuerApi();
        // Jenkins系统状态（版本、路径）
        jenkinsClient.api().systemApi().systemInfo();
        //jenkinsClient.api().systemApi().cancelQuietDown();
        //jenkinsClient.api().systemApi().quietDown();
        jenkinsClient.api().userApi().get();
    }

    @ApiOperation("获取任务信息  GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/api/json")
    @GetMapping("/jobsApi/jobInfo")
    public JobInfo jobsApi(@RequestParam String optionalFolderPath,@RequestParam  String jobName) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().jobInfo(optionalFolderPath, jobName);
    }
    @ApiOperation("build-info 获取构筑信息  GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/{number}/api/json")
    @GetMapping("/jobsApi/buildInfo")
    public BuildInfo jobsApi(@RequestParam String optionalFolderPath, @RequestParam  String jobName, @RequestParam Integer buildNumber) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().buildInfo(optionalFolderPath, jobName,buildNumber);
    }


    @ApiOperation("从 XML 文件中加载任务配置并创建任务  POST http://127.0.0.1:8080/{optionalFolderPath}createItem")
    @PostMapping("/jobsApi/")
    public RequestStatus jobsApi(@RequestParam String optionalFolderPath, @RequestParam  String jobName, @RequestParam String configXML) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().create(optionalFolderPath, jobName,configXML);
    }

    @ApiOperation("update-config 获取任务配置文件  GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/config.xml")
    @GetMapping("/jobsApi/config")
    public String getConfig(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().config(optionalFolderPath, jobName);
    }

    @ApiOperation("update-config 更新任务配置文件  POST http://127.0.0.1:8080/{optionalFolderPath}job/{name}/config.xml")
    @PostMapping("/jobsApi/config")
    public Boolean updateConfig(@RequestParam String optionalFolderPath, @RequestParam  String jobName, @RequestParam String configXML) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().config(optionalFolderPath, jobName,configXML);
    }

    @ApiOperation("get-description 获取任务描述  GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/description")
    @GetMapping("/jobsApi/description")
    public String getDescription(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().description(optionalFolderPath, jobName);
    }

    @ApiOperation("set-description 设置任务描述  POST http://127.0.0.1:8080/{optionalFolderPath}job/{name}/description")
    @PostMapping("/jobsApi/description")
    public Boolean updateDescription(@RequestParam String optionalFolderPath, @RequestParam  String jobName, @RequestParam String description) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().description(optionalFolderPath, jobName,description);
    }

    @ApiOperation("delete 删除任务 POST http://127.0.0.1:8080/{optionalFolderPath}job/{name}/doDelete")
    @PostMapping("/jobsApi/delete")
    public RequestStatus delete(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().delete(optionalFolderPath, jobName);
    }

    @ApiOperation("enable允许任务 POST http://127.0.0.1:8080/{optionalFolderPath}job/{name}/enable")
    @PostMapping("/jobsApi/enable")
    public Boolean enable(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().enable(optionalFolderPath, jobName);
    }

    @ApiOperation("disable禁止任务 POST http://127.0.0.1:8080/{optionalFolderPath}job/{name}/disable")
    @PostMapping("/jobsApi/disable")
    public Boolean disable(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {
        // 任务管理（任务信息、创建、修改）
        return jenkinsClient.api().jobsApi().disable(optionalFolderPath, jobName);
    }

    @ApiOperation("build构建 POST http://127.0.0.1:8080/{optionalFolderPath}job/{name}/build")
    @PostMapping("/jobsApi/build")
    public IntegerResponse build(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {

        return jenkinsClient.api().jobsApi().build(optionalFolderPath, jobName);
    }

    @ApiOperation("build-with-params 使用参数创建任务   POST http://127.0.0.1:8080/{optionalFolderPath}job/{name}/buildWithParameters")
    @PostMapping("/jobsApi/buildWithParameters")
    public IntegerResponse buildWithParameters(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {

        Map<String, List<String>> payload = new HashMap<>();
        return jenkinsClient.api().jobsApi().buildWithParameters(optionalFolderPath, jobName,payload);
    }

    @ApiOperation("last-build-number 获取上次构建序号  GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/lastBuild/buildNumber")
    @GetMapping("/jobsApi/lastBuildNumber")
    public Integer lastBuildNumber(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {

        return jenkinsClient.api().jobsApi().lastBuildNumber(optionalFolderPath, jobName);
    }

    @ApiOperation("last-build-timestamp 获取上次构建时间戳  GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/lastBuild/buildTimestamp")
    @GetMapping("/jobsApi/lastBuildTimestamp")
    public String lastBuildTimestamp(@RequestParam String optionalFolderPath, @RequestParam  String jobName) {

        return jenkinsClient.api().jobsApi().lastBuildTimestamp(optionalFolderPath, jobName);
    }

    @ApiOperation("progressive-text 获取构建控制台输出  GET http://127.0.0.1:8080/{optionalFolderPath}job/{name}/lastBuild/logText/progressiveText")
    @GetMapping("/jobsApi/progressiveText")
    public ProgressiveText progressiveText(@RequestParam String optionalFolderPath, @RequestParam  String jobName,@RequestParam Integer buildNumber,@RequestParam Integer start) {

        return jenkinsClient.api().jobsApi().progressiveText(optionalFolderPath, jobName,buildNumber,start);
    }

}

```
