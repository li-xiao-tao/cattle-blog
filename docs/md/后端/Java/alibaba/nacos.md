## CP和AP

- CP与AP的选择

> CP：我们服务可以不能用，但必须要保证数据的一致性。
> AP:数据可以短暂不一致，但最终是需要一致的，无论如何都要保证服务的可用。
> 只取舍：有在CP和AP选择一个平衡点，大多数都是选择AP模式。

- CAP原则：cap理论是针对分布式数据库而言的，它是指在一个分布式系统中，一致性（Consistency，C）、可用性（Availability，A）、分区容错性（Partition
  Tolerance, P）三者不可兼得。

- nacos支持AP(可用性 | 分区容错性) 和 CP(一致性 | 分区容错性)两种 默认是AP

## 服务的健康检查

**分为两种模式：1 agent上报模式，2 服务端主动检测**

- 1、 agent上报模式

> 客户端（注册在nacos上的其它微服务实例）健康检查。
> 客户端通过心跳上报方式告知服务端(nacos注册中心)健康状态；
> 默认心跳间隔5秒；
> nacos会在超过15秒未收到心跳后将实例设置为不健康状态；
> 超过30秒将实例删除；

- 2 、服务端主动检测

> 服务端健康检查。
> nacos主动探知客户端健康状态，默认间隔为20秒；
> 健康检查失败后实例会被标记为不健康，不会被立即删除。

### 热更新

```
spring:
  application:
    # 服务名
    name: @project.artifactId@
  profiles:
    # 开发环境
    active: @pom.profile.name@
  cloud:
    nacos:
      server-addr: 192.168.112.128
      config:
        # 文件后缀
        file-extension: yml
        namespace: dev
        # 启用
        enabled: true
        #group:
#        shared-configs:
#          - data-id: redis.yml
#            #此配置是热更新的关键
#            refresh: true
        # [值越大优先级越高]
        extension-configs[0]:
          data-id: redis.yml
          #此配置是热更新的关键
          refresh: true
        extension-configs[1]:
          data-id: mysql.yml
          #此配置是热更新的关键
          refresh: true
```

**@RefreshScope + @Value("${cattle.redis.ip}")**

```
@Slf4j
@RefreshScope
@RestController
@RequestMapping("/nacos")
public class NacosController {

    @Value("${cattle.redis.ip}")
    private String redisIp;
    @Value("${cattle.mysql.ip}")
    private String mysqlIp;

    @GetMapping("/getIp")
    public String getIp() {
        log.info("redisIp==" + redisIp);
        log.info("mysqlIp==" + mysqlIp);
        return mysqlIp + "\r\n" +redisIp;
    }
}
```

