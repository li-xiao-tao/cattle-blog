# 定时任务

## Spring3 方式一

### 一：在启动类上加上开启注解
```java
@EnableScheduling
```

### 二：定时任务类
```java
import com.niwodai.devops.mapper.SqlMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @author lixiaotao
 */
@Slf4j
@Component("taskJob")
public class TaskJob {

    @Resource
    private SqlMapper sqlMapper;

    @Scheduled(cron = "0 0/3 * * * ?")
    public void sqlJob() {
        sqlMapper.update("update dps_user set departid ='1020190000051040' ,deptname = 'Devops' where id = 5");
        log.info("定时任务成功sql：{}", "update dps_user set departid ='1020190000051040' ,deptname = 'Devops' where id = 5");

        sqlMapper.delete("delete from dps_user where is_deleted = 1 or status = 0");
        log.info("定时任务成功sql：{}", "delete from dps_user where is_deleted = 1 or status = 0");
    }
}
```

- @Scheduled(cron = "0 0/3 * * * ?") crod方式 `"0 0/3 * * * ?"`

- @Scheduled(fixedDelay = 5000) 自上次结束之后5秒再执行，以毫秒为单位。
 - @Scheduled(fixedDelayString = "1000") @Scheduled(fixedDelayStirng="${interval}")
    是字符串的形式，支持占位符。可以从配置文件中拿`application.properties`

- @Scheduled(fixedRate = 5000) 自上次执行之后5秒再执行，以毫秒为单位。
 - @Scheduled(fixedRateString = "1000") @Scheduled(fixedRateStirng="${interval}")
    是字符串的形式，支持占位符。可以从配置文件中拿`application.properties`

- @Scheduled(initialDelay=1000,fixedRate=1000) //首次运行延迟1s 表示首次延迟多长时间后执行，单位毫秒，之后按照
 -@Scheduled(initialDelayString = "${initialDelay}",cron = "0 0 0 14 4 ?")  //按照配置文件initialDelay指定的时间首次延迟,并于每年4月14日0时0分0秒执行
    













