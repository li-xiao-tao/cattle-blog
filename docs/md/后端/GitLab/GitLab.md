# GitLab-API

- 导入依赖
- 配置Bean  GitLabApi
- `api`接口

# 1、导入依赖

```
<dependency>
    <groupId>org.gitlab4j</groupId>
    <artifactId>gitlab4j-api</artifactId>
    <version>5.0.1</version>
</dependency>
```
# 2、GitlabConfig

```java
import org.gitlab4j.api.GitLabApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author QWQ
 */
@Configuration
public class GitlabConfig {

    @Bean
    public GitLabApi getGitlabApi() {
        // 创建一个 GitLabApi 实例来与您的 GitLab 服务器通信
        GitLabApi gitLabApi = new GitLabApi("http://127.0.0.1:8022/", "G8amx7reiGQcfLs7VBhg");
        //GitLabApi gitLabApi = GitLabApi.oauth2Login("http://127.0.0.1:8022/", "username","password");
        // 连接超时 读取超时
        gitLabApi.setRequestTimeout(1000, 5000);
        return gitLabApi;
    }
}

```

# 3、Api

:::=tabs
::用户Controller

```java
package com.itcast.cattle.gitlab.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.models.Email;
import org.gitlab4j.api.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @program: log
 * @description:
 * @author: lixiaotao
 * @create: 2023-02-21 17:23
 **/
@Slf4j
@RestController
@Api(tags = "GitLab用户接口")
@RequestMapping("/gitlabUser")
public class GitlabUserController {

    @Autowired
    private GitLabApi gitLabApi;

    @ApiOperation("获取所有的用户")
    @GetMapping("/getUsers")
    public List<User> getUsers() throws GitLabApiException {


        return gitLabApi.getUserApi().getUsers();
    }

    @ApiOperation("获取指定用户")
    @GetMapping("/getUsersById")
    public User getUsersById(@RequestParam Long userId) throws GitLabApiException {


        return gitLabApi.getUserApi().getUser(userId);
    }

    @ApiOperation("通过用户名或邮箱查询用户")
    @GetMapping("/findUsersByEmailOrUsername")
    public List<User> findUsersByEmailOrUsername(@ApiParam("用户名或邮箱") @RequestParam String emailOrUsername) throws GitLabApiException {


        return gitLabApi.getUserApi().findUsers(emailOrUsername);
    }

    @ApiOperation("通过邮箱获取用户")
    @GetMapping("/getUsersByEmail")
    public User getUserByEmail(@RequestParam String email) throws GitLabApiException {


        return gitLabApi.getUserApi().getUserByEmail(email);
    }

    @ApiOperation("获取当前用户")
    @PostMapping("/getCurrentUser")
    public User getCurrentUser() throws GitLabApiException {


        return gitLabApi.getUserApi().getCurrentUser();
    }

    @ApiOperation("获取可选用户")
    @PostMapping("/getOptionalUser")
    public User getOptionalUser(@RequestParam Long userId) throws GitLabApiException {


        return gitLabApi.getUserApi().getOptionalUser(userId).get();
    }

//    @ApiOperation("获取活跃用户")
//    @PostMapping("/getActiveUsers")
//    public List<User> getActiveUsers() throws GitLabApiException {
//
//
//        return gitLabApi.getUserApi().getActiveUsers();
//    }

    @ApiOperation("创建用户")
    @PostMapping("/createUser")
    public User createUser(@ApiParam("新用户的密码") @RequestParam String password,
                           @ApiParam("是否发送密码重置链接") @RequestParam boolean resetPassword) throws GitLabApiException {


        User user = new User();
        user.setName("cattle");
        user.setUsername("123456");
        user.setEmail("123456@qq.com");
        return gitLabApi.getUserApi().createUser(user, password, resetPassword);
    }

    @ApiOperation("修改用户")
    @PostMapping("/updateUser")
    public User updateUser(@ApiParam("新用户的密码") @RequestParam String password) throws GitLabApiException {


        User user = new User();
        user.setId(2L);
        user.setName("cattle");
        user.setUsername("123456");
        user.setEmail("123456@qq.com");
        return gitLabApi.getUserApi().updateUser(user, password);
    }

    @ApiOperation("获取所有邮箱信息")
    @PostMapping("/getEmails")
    public List<Email> getEmails() throws GitLabApiException {


        return gitLabApi.getUserApi().getEmails();
    }

}

```

::代码组

```java
package com.itcast.cattle.gitlab.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.models.Group;
import org.gitlab4j.api.models.GroupParams;
import org.gitlab4j.api.models.Member;
import org.gitlab4j.api.models.Visibility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * @program: log
 * @description:
 * @author: lixiaotao
 * @create: 2023-02-21 17:23
 **/
@Slf4j
@RestController
@Api(tags = "GitLab组接口")
@RequestMapping("/gitlabGroup")
public class GitlabGroupController {

    @Autowired
    private GitLabApi gitLabApi;

    @ApiOperation("获取所有组")
    @GetMapping("/getGroups")
    public List<Group> getGroups() throws GitLabApiException {

        return gitLabApi.getGroupApi().getGroups();
    }

    @ApiOperation("获取指定组")
    @GetMapping("/getGroup")
    public Group getGroup(@ApiParam("组id或者组名") @RequestParam String groupIdOrPath) throws GitLabApiException {

        return gitLabApi.getGroupApi().getGroup(groupIdOrPath);
    }

    @ApiOperation("获取所有人员")
    @GetMapping("/getAllMembers")
    public List<Member> getAllMembers(@ApiParam("组id或者组名") @RequestParam String groupIdOrPath) throws GitLabApiException {


        return gitLabApi.getGroupApi().getAllMembers(groupIdOrPath);
    }

    @ApiOperation("获取指定人员")
    @GetMapping("/getMember")
    public Member getMember(@ApiParam("组id或者组名") @RequestParam String groupIdOrPath,
                            @ApiParam("用户id") @RequestParam Long userId) throws GitLabApiException {


        return gitLabApi.getGroupApi().getMember(groupIdOrPath, userId);
    }

    @ApiOperation("添加人员")
    @GetMapping("/addMember")
    public Member addMember(@ApiParam("组id或者组名") @RequestParam String groupIdOrPath,
                            @ApiParam("用户id") @RequestParam Long userId,
                            @ApiParam("用户权限级别 20=查看者、30=开发者、40=管理员、50=超级管理员")
                            @RequestParam Integer accessLevel) throws GitLabApiException {


        return gitLabApi.getGroupApi().addMember(groupIdOrPath, userId, accessLevel);
    }

    @ApiOperation("修改人员")
    @GetMapping("/updateMember")
    public Member updateMember(@ApiParam("组id或者组名") @RequestParam String groupIdOrPath,
                            @ApiParam("用户id") @RequestParam Long userId,
                            @ApiParam("用户权限级别 20=查看者、30=开发者、40=管理员、50=超级管理员")
                            @RequestParam Integer accessLevel,
                            @ApiParam("用户过期时间") @RequestParam Date expiresAt) throws GitLabApiException {


        return gitLabApi.getGroupApi().updateMember(groupIdOrPath, userId, accessLevel);
    }

    @ApiOperation("删除人员")
    @GetMapping("/removeMember")
    public String removeMember(@ApiParam("组id或者组名") @RequestParam String groupIdOrPath,
                               @ApiParam("用户id") @RequestParam Long userId) throws GitLabApiException {

        try {
            gitLabApi.getGroupApi().getMember(groupIdOrPath, userId);
        } catch (GitLabApiException e) {
            throw new RuntimeException("用户不存在");
        }
        gitLabApi.getGroupApi().removeMember(groupIdOrPath, userId);
        try {
            gitLabApi.getGroupApi().getMember(groupIdOrPath, userId);
        } catch (GitLabApiException e) {
            return "true";
        }
        return "true";
    }


    @ApiOperation("获取子组--传入代码组id或者名称")
    @GetMapping("/getSubGroups")
    public List<Group> getSubGroups(@RequestParam String groupIdOrPath) throws GitLabApiException {

        return gitLabApi.getGroupApi().getSubGroups(groupIdOrPath);
    }

    @ApiOperation("添加代码组")
    @GetMapping("/addGroup")
    public Group addGroup() throws GitLabApiException {

        Group group = new Group();
        group.setName("cattle");
        group.setPath("cattle");
        group.setDescription("cattle牛");
        return gitLabApi.getGroupApi().addGroup(group);
    }

    @ApiOperation("创建代码组")
    @GetMapping("/createGroup")
    public Group createGroup() throws GitLabApiException {

        GroupParams params = new GroupParams();
        params.withDescription("创建组中文描述");
        params.withName("webui");
        params.withPath("webui");
        params.withVisibility("public");
        return gitLabApi.getGroupApi().createGroup(params);
    }

    @ApiOperation("修改代码组")
    @GetMapping("/updateGroup")
    public Group updateGroup() throws GitLabApiException {

        Group group = new Group();
        group.setId(2L);
        group.setName("cattle");
        group.setPath("cattle");
        group.setDescription("cattle中文描述");
        // 代码组 可视度 只能是 PUBLIC公开 和 INTERNAL内部
        group.setVisibility(Visibility.PUBLIC);
        return gitLabApi.getGroupApi().updateGroup(group);
    }

    @ApiOperation("删除代码组")
    @GetMapping("/deleteGroup")
    public String deleteGroup(@ApiParam("组id或者组名") @RequestParam String groupIdOrPath) throws GitLabApiException {

        try {
            gitLabApi.getGroupApi().getGroup(groupIdOrPath);
        } catch (GitLabApiException e) {
            throw new RuntimeException("代码组不存在");
        }
        gitLabApi.getGroupApi().deleteGroup(groupIdOrPath);
        try {
            gitLabApi.getGroupApi().getGroup(groupIdOrPath);
        } catch (GitLabApiException ignored) {

        }
        return "true";
    }
}

```

::代码库Controller

```java
package com.itcast.cattle.gitlab.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.gitlab4j.api.GitLabApi;
import org.gitlab4j.api.GitLabApiException;
import org.gitlab4j.api.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * @program: log
 * @description:
 * @author: lixiaotao
 * @create: 2023-02-21 17:23
 **/
@Slf4j
@RestController
@Api(tags = "GitLab库接口")
@RequestMapping("/gitlabProjects")
public class GitlabProjectsController {

    @Autowired
    private GitLabApi gitLabApi;

    @ApiOperation("获取所有的项目")
    @PostMapping("/getProjects")
    public List<Project> gitlab() throws GitLabApiException {


        // 获取您的帐户有权访问的项目列表
        // 列表
        //List<Project> projects = gitLabApi.getProjectApi().getProjects(1);
        //分页
        return gitLabApi.getProjectApi().getProjects(1, 2);
    }

    @ApiOperation("获取成员项目")
    @PostMapping("/getMemberProjects")
    public List<Project> getMemberProjects() throws GitLabApiException {


        return gitLabApi.getProjectApi().getMemberProjects();
    }

    @ApiOperation("获取指定项目--1.传入项目名要[代码组/项目名]---2.项目id")
    @GetMapping("/getOptionalProject")
    public Project getOptionalProject(@RequestParam String projectId) {


        return gitLabApi.getProjectApi().getOptionalProject(projectId).get();
    }

    @ApiOperation("获取存档项目--和获取指定项目差不多")
    @GetMapping("/archiveProject")
    public Project archiveProject(@RequestParam String projectId) throws GitLabApiException {


        return gitLabApi.getProjectApi().archiveProject(projectId);
    }

    @ApiOperation("分叉项目")
    @GetMapping("/forkProject")
    public Project forkProject(@RequestParam String projectId, @RequestParam String namespace) throws GitLabApiException {


        return gitLabApi.getProjectApi().forkProject(projectId, namespace);
    }

    @ApiOperation("获取自有项目")
    @GetMapping("/getOwnedProjects")
    public List<Project> getOwnedProjects() throws GitLabApiException {


        return gitLabApi.getProjectApi().getOwnedProjects();
    }

    @ApiOperation("获取用户项目")
    @GetMapping("/getUserProjects")
    public List<Project> getUserProjects(@RequestParam String userIdOrName) throws GitLabApiException {

        ProjectFilter filter = new ProjectFilter();
        return gitLabApi.getProjectApi().getUserProjects(userIdOrName, filter);
    }

    @ApiOperation("获取项目用户")
    @GetMapping("/getProjectUsers")
    public List<ProjectUser> getProjectUsers(@RequestParam String projectIdOrPath) throws GitLabApiException {

        return gitLabApi.getProjectApi().getProjectUsers(projectIdOrPath);
    }

    @ApiOperation("创建新项目")
    @PostMapping("/createProject")
    public Project createProject() {


        // Create a new project
        Project projectSpec = new Project()
                // 项目名
                .withName("cattle")
                // 项目描述
                .withDescription("学习")
                // 归属代码组
                .withNamespaceId(3)
                .withIssuesEnabled(true)
                .withMergeRequestsEnabled(true)
                .withWikiEnabled(true)
                .withSnippetsEnabled(true)
                .withPublic(true);

        Project newProject = null;
        try {
            newProject = gitLabApi.getProjectApi().createProject(projectSpec);
        } catch (GitLabApiException e) {
            throw new RuntimeException(e);
        }
        return newProject;
    }

    @ApiOperation("更新项目")
    @PostMapping("/updateProject")
    public Project updateProject() {


        // Create a new project
        Project projectSpec = new Project()
                .withId(1L)
                // 项目名
                .withName("cattle")
                // 项目描述
                .withDescription("cattle学习")
                // 归属代码组
                .withNamespaceId(2)
                // git 路径
                .withPath("cattle")
                // 私有 公共 内部
                .withVisibility(Visibility.PRIVATE);

        Project newProject = null;
        try {
            newProject = gitLabApi.getProjectApi().updateProject(projectSpec);
        } catch (GitLabApiException e) {
            throw new RuntimeException(e);
        }
        return newProject;
    }

    @ApiOperation("删除项目")
    @PostMapping("/deleteProject")
    public void deleteProject(@ApiParam("库id或者组名") @RequestParam String groupIdOrPath) throws GitLabApiException {


        gitLabApi.getProjectApi().deleteProject(groupIdOrPath);
    }


    @ApiOperation("获取所有成员")
    @GetMapping("/getMembers")
    public List<Member> getMembers(@ApiParam("库id或者组名") @RequestParam String projectId) throws GitLabApiException {


        return gitLabApi.getProjectApi().getMembers(projectId);
    }

    @ApiOperation("获取指定成员")
    @GetMapping("/getMember")
    public Member getMember(@ApiParam("库id或者组名") @RequestParam String projectId, @RequestParam Long userId) throws GitLabApiException {


        return gitLabApi.getProjectApi().getMember(projectId, userId);
    }

    @ApiOperation("添加成员")
    @GetMapping("/addMember")
    public Member addMember(@ApiParam("库id或者组名") @RequestParam String groupIdOrPath,
                            @ApiParam("用户id") @RequestParam Long userId,
                            @ApiParam("用户权限级别 20=查看者、30=开发者、40=管理员、50=超级管理员")
                            @RequestParam Integer accessLevel) throws GitLabApiException {


        return gitLabApi.getProjectApi().addMember(groupIdOrPath, userId, accessLevel);
    }

    @ApiOperation("修改成员")
    @GetMapping("/updateMember")
    public Member updateMember(@ApiParam("库id或者组名") @RequestParam String groupIdOrPath,
                               @ApiParam("用户id") @RequestParam Long userId,
                               @ApiParam("用户权限级别 20=查看者、30=开发者、40=管理员、50=超级管理员")
                               @RequestParam Integer accessLevel,
                               @ApiParam("用户过期时间") @RequestParam Date expiresAt) throws GitLabApiException {


        return gitLabApi.getProjectApi().updateMember(groupIdOrPath, userId, accessLevel, expiresAt);
    }


    @ApiOperation("获取项目分支，传入项目id")
    @GetMapping("/getProtectedBranches")
    public List<ProtectedBranch> getProtectedBranches(@RequestParam Long projectId) {


        List<ProtectedBranch> branches = null;
        try {
            branches = gitLabApi.getProtectedBranchesApi().getProtectedBranches(projectId);
        } catch (GitLabApiException e) {
            throw new RuntimeException(e);
        }
        return branches;
    }


}

```

:::