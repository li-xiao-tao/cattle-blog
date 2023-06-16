## 【缓存篇】Spring Boot Cache 组合 Redis 实践缓存

**写在最前**

本文在 【缓存篇】Spring Boot 整合 Redis 缓存数据 基础上优化 Redis 在 Spring Boot 中缓存实践！

**Spring Cache 介绍**

Spring Cache 是 Spring 提供的一整套的缓存解决方案。虽然它本身并没有提供缓存的实现，但是它提供了一整套的接口和代码规范、配置、注解等。

Spring Cache 利用了 AOP，实现了基于注解的缓存功能，并且进行了合理的抽象，业务代码不用关心底层是使用了什么缓存框架，只需要简单地加一个注解，就能实现缓存功能了。比如
Redis、Ehcache，我们也就不用关心操作缓存的细节。

支持的缓存中间件
> caffeine：Caffeine 是一种高性能的缓存库，基于 Google Guava。
>
>couchbase：CouchBase是一款非关系型 JSON 文档数据库。
>
>generic：由泛型机制和 static 组合实现的泛型缓存机制。
>
>hazelcast：一个高度可扩展的数据分发和集群平台，可用于实现分布式数据存储、数据缓存。
>
>infinispan：分布式的集群缓存系统。
>
>jcache：JCache 作为缓存。它是 JSR107 规范中提到的缓存规范。
>
>redis：用 Redis 作为缓存。
>
>simple：用内存作为缓存。
>
**常用注解**

|注解	|  说明 
|  ----  | ----  |
|@EnableCaching	|开启缓存功能，一般放在启动类上
|@Cacheable	|使用该注解的方法当缓存存在时，会从缓存中获取数据而不执行方法，当缓存不存在时，会执行方法并把返回结果存入缓存中。一般使用在查询方法上
|@CachePut	|使用该注解的方法每次执行时都会把返回结果存入缓存中。一般使用在新增方法上
|@CacheEvict	|使用该注解的方法执行时会清空指定的缓存。一般使用在更新或删除方法上

> 注解属性：

- value：缓存名称（必填），指定缓存的命名空间；
- key：用于设置在命名空间中的缓存key值，可以使用SpEL表达式定义；
- unless：条件符合则不缓存；
- condition：条件符合则缓存；

### 1.添加项目依赖

```java
<!--redis 依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 2.开启缓存
> 启动类上添加 @EnableCaching 注解启动缓存功能

```java

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/** @author Strive */
@MapperScan("com.cache.mapper")
@SpringBootApplication
@EnableCaching
public class SpringbootCacheApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootCacheApplication.class, args);
    }
}
```

### 3.修改缓存使用

- 原 Redis 缓存使用：

```java

/**
 * 根据用户ID查询用户信息
 *
 * @param userId 用户ID
 * @return 用户信息
 */
public cattleUser queryUserById(Long userId){
        log.info("根据用户ID查询用户信息");

        // 查询缓存中是否有查询的数据
        String userJson=redisService.get(USER_REDIS_KEY+userId);

        // 缓存中没有数据则去数据库查询
        if(StrUtil.isBlank(userJson)){
        log.info("缓存中没有数据则去数据库查询");
        cattleUser cattleUser=sysUserMapper.selectById(userId);

        // 查询的结果放入缓存
        redisService.set(USER_REDIS_KEY+userId,JSONUtil.toJsonStr(cattleUser));

        // 返回查询到的数据
        return cattleUser;
        }

        log.info("缓存中有对应数据直接返回");
        // 缓存中有对应数据直接返回
        return JSONUtil.toBean(userJson,cattleUser.class);
}
```

- 改造后 Redis 缓存使用：

```java

/**
 * 根据用户ID查询用户信息
 *
 * @param userId 用户ID
 * @return 用户信息
 */
@Cacheable(
        value = REDIS_KEY_DATABASE,
        key = USER_REDIS_KEY + "+#userId",
        unless = "#result==null")
public cattleUser queryUserById(Long userId){
        log.info("根据用户ID查询用户信息");
        return sysUserMapper.selectById(userId);
        }
```

### 4.测试接口

- 第一次请求
  日志输出如下：

```java
2022-04-21 14:03:00.563INFO 40900---[nio-8080-exec-2]c.c.m.cache.service.cattleUserService:根据用户ID查询用户信息
        Creating a new SqlSession
        SqlSession[org.apache.ibatis.session.defaults.DefaultSqlSession@21b10bb6]was not registered for synchronization because synchronization is not active
        2022-04-21 14:03:00.582INFO 40900---[nio-8080-exec-2]com.zaxxer.hikari.HikariDataSource:HikariPool-1-Starting...
        2022-04-21 14:03:01.406INFO 40900---[nio-8080-exec-2]com.zaxxer.hikari.HikariDataSource:HikariPool-1-Start completed.
        JDBC Connection[HikariProxyConnection@1095569943wrapping com.mysql.cj.jdbc.ConnectionImpl@1f903c0]will not be managed by Spring
        ==>Preparing:SELECT user_id,username FROM sys_user WHERE user_id=?
        ==>Parameters:2(Long)
        <==Columns:user_id,username
        <==Row:2,Strive
        <==Total:1
        Closing non transactional SqlSession[org.apache.ibatis.session.defaults.DefaultSqlSession@21b10bb6]
```

- 第二次请求
  logback-spring.xml 增加缓存日志输出或者配置文件增加缓存日志输出

```java

<!--Spring Cache 日志-->
<logger name="org.springframework.cache"level="trace"/>

        logging.level.org.springframework.cache=TRACE

        日志输出如下：

        2022-04-21 14:05:50.566TRACE 38512---[nio-8080-exec-1]o.s.cache.interceptor.CacheInterceptor:Computed cache key'user:info:2'for operation Builder[public com.csp.cattle.cache.model.cattleUser com.csp.cattle.cache.service.cattleUserService.queryUserById(java.lang.Long)]caches=[cattle]|key=''user:info:'+#userId'|keyGenerator=''|cacheManager=''|cacheResolver=''|condition=''|unless='#result==null'|sync='false'
        2022-04-21 14:05:51.371TRACE 38512---[nio-8080-exec-1]o.s.cache.interceptor.CacheInterceptor:Cache entry for key'user:info:2'found in cache'cattle'
```

## 【锁篇】 Spring Boot 整合 redisson 锁

### 1.导入依赖

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
</dependency>
```

### 2.编写配置文件 application.yml

```yaml
server:
  port: 9999
spring:
  # 数据库配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://192.168.112.128:3306/sas?characterEncoding=utf-8&useSSL=false&serverTimezone=UTC&rewriteBatchedStatements=true
    username: root
    password: root
    type: com.alibaba.druid.pool.DruidDataSource
    druid:
      initial-size: 5                                       # 初始化大小
      min-idle: 10                                          # 最小连接数
      max-active: 20                                        # 最大连接数
      max-wait: 60000                                       # 获取连接时的最大等待时间
      min-evictable-idle-time-millis: 300000                # 一个连接在池中最小生存的时间，单位是毫秒
      time-between-eviction-runs-millis: 60000              # 多久才进行一次检测需要关闭的空闲连接，单位是毫秒
      filters: stat                                         # 配置扩展插件：stat-监控统计，log4j-日志，wall-防火墙（防止SQL注入），去掉后，监控界面的sql无法统计   ,wall
      validation-query: SELECT 1                            # 检测连接是否有效的 SQL语句，为空时以下三个配置均无...
        loadBalancer: !<org.redisson.connection.balancer.RoundRobinLoadBalancer> { }
        subscriptionConnectionMinimumIdleSize: 1
        subscriptionConnectionPoolSize: 50
        slaveConnectionMinimumIdleSize: 24
        slaveConnectionPoolSize: 64
        masterConnectionMinimumIdleSize: 24
        masterConnectionPoolSize: 64
        readMode: "SLAVE"
        subscriptionMode: "SLAVE"
        nodeAddresses:
          - "redis://192.168.112.128:6379"
          - "redis://192.168.112.128:6380"
          - "redis://192.168.112.128:6381"
          - "redis://192.168.112.128:6382"
          - "redis://192.168.112.128:6383"
          - "redis://192.168.112.128:6384"
        scanInterval: 1000
        pingConnectionInterval: 0
        keepAlive: false
        tcpNoDelay: false
      threads: 16
      nettyThreads: 32
      codec: !<org.redisson.codec.MarshallingCodec> { }
      transportMode: "NIO"

# 配置日志输出 使用默认控制台打印
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl

```

### 3.示例

```java
package com.itcast.cattle.markdown.controller;

import lombok.RequiredArgsConstructor;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

/**
 * @author QWQ 2022/3/12
 */
@RestController
@RequiredArgsConstructor
public class RedissonController {

    private final RedisTemplate<String, Object> redisTemplate;

    private final RedissonClient redissonClient;
    ;

    @RequestMapping("count")
    public String count() {

        Long count = 0L;
        //防止缓存穿透，加锁
        RLock lock = redissonClient.getLock("REDIS_LOCK");
        try {
            //配置看门狗 等待时间 看门狗有效时间30s  时间单位
            boolean tryLock = lock.tryLock(3,  TimeUnit.SECONDS);
            //如果加锁成功
            if (tryLock) {
                //业务逻辑
                count = redisTemplate.opsForValue().increment("count");
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            // 释放锁
            if (lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
        return "访问人数为" + count + "人";
    }
}


```

### 4.看门狗

- 不要自己设置锁的有效时间，设置后，当你的业务超过自己设置的有效时间后会自动释放锁
- 看门狗默认时间30s，可在配置参数中改默认时间
- 每隔10秒检查一次锁的过期时间，如果锁的过期时间小于30秒，看门狗会将锁的过期时间设置为默认值30秒。
- 如果业务超过30s，锁会续加30s，继续每10s一次检查，直至业务结束，一直占用锁。