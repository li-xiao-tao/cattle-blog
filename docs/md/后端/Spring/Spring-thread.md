# spring整合线程池

搭建spring或者springboot环境；

## 1.1 配置线程池

```java
package com.swagger.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * @author laofang
 * @description
 * @date 2021-06-08
 */
@Configuration
@EnableAsync//线程池加入spring支持
public class ExecutorConfig {

    @Bean("asyncServiceExecutor")
    public ThreadPoolTaskExecutor asyncServiceExecutor(){
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        //配置核心线程数
        executor.setCorePoolSize(5);
        //配置最大线程数
        executor.setMaxPoolSize(5);
        //配置队列大小
        executor.setQueueCapacity(99999);
        //配置线程池中的线程的名称前缀
        executor.setThreadNamePrefix("async-service-");
        //等待所有任务结束后再关闭线程池
        executor.setWaitForTasksToCompleteOnShutdown(true);
        // rejection-policy：当pool已经达到max size的时候，如何处理新任务
        // CALLER_RUNS：不在新线程中执行任务，而是有调用者所在的线程来执行
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        //执行初始化
        executor.initialize();
        return executor;
    }

}
```

## 1.2 定义测试业务

```java
//无返回值的业务逻辑
@Component
public class TaskServiceA {

    @Async("asyncServiceExecutor")
    public void add() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        System.out.println("add run....");
    }

    @Async("asyncServiceExecutor")
    public void update() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        System.out.println("update run....");
    }

    @Async("asyncServiceExecutor")
    public void delete() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        System.out.println("delete run....");
    }

}
```

同步执行add(),update(),delete()时，执行时间大致为3s；

 @Async注解表示每次调用开启一个新的线程异步执行，执行时间大大缩短；

```java
@Component
public class TaskServiceB {

    public String add() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        return "add";
    }

    public String update() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        return "update";
    }

    public String delete() throws InterruptedException {
        TimeUnit.SECONDS.sleep(1);
        return "delete";
    }

}
```

测试：

```java
@RestController
public class TaskController {

    @Autowired
    private TaskServiceA taskServiceA;

    @Autowired
    private TaskServiceB taskServiceB;

    @Autowired
    private ThreadPoolTaskExecutor asyncServiceExecutor;

    /**
     * 异步调用
     * time=0s
     * @return
     * @throws InterruptedException
     */
    @GetMapping("/task0")
    public String asyncTask0() throws InterruptedException {
        long start = System.currentTimeMillis();
        taskServiceA.add();
        taskServiceA.delete();
        taskServiceA.update();
        long end = System.currentTimeMillis();
        System.out.println((end-start)/1000);
        return "success";
    }

    /**
     * 同步执行
     * time=3s
     * @return
     * @throws InterruptedException
     */
    @GetMapping("/task1")
    public String syncTask() throws InterruptedException {
        long start = System.currentTimeMillis();
        String add = taskServiceB.add();
        String delete = taskServiceB.delete();
        String update = taskServiceB.update();
        long end = System.currentTimeMillis();
        System.out.println((end-start)/1000);
        return add+"||"+delete+"||"+update;
    }

    /**
     * 利用Callable异步执行业务逻辑，并返回执行结果
     * time 大致为1s
     * @return
     * @throws InterruptedException
     * @throws ExecutionException
     */
    @GetMapping("/task2")
    public String asyncTask() throws InterruptedException, ExecutionException {
        long start = System.currentTimeMillis();
        Future<String> futureAdd = asyncServiceExecutor.submit(() -> {
            String result = null;
            try {
                result= taskServiceB.add();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return result;
        });

        Future<String> futureDelete = asyncServiceExecutor.submit(() -> {
            String result = null;
            try {
                result= taskServiceB.delete();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return result;
        });


        Future<String> futureUpdate = asyncServiceExecutor.submit(() -> {
            String result = null;
            try {
                result= taskServiceB.update();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            return result;
        });
        String add = futureAdd.get();
        String delete = futureDelete.get();
        String update = futureUpdate.get();
        long end = System.currentTimeMillis();
        System.out.println((end-start)/1000);
        return add+"||"+delete+"||"+update;
    }
}
```



