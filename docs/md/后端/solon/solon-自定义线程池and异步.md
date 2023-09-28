# solon-自定义线程池&异步

## 依赖
 - solon-web 依赖自带
 - 启动类+@EnableAsync
```xml
<dependency>
    <groupId>org.noear</groupId>
    <artifactId>solon.scheduling</artifactId>
</dependency>
```
## 实际使用

```java
package com.example.provider.service.async;

import org.noear.solon.annotation.Component;
import org.noear.solon.scheduling.annotation.Async;

//定义个服务
@Component
public class AsyncTask {
    //会被异步运行（提交到异步执行器运行）//不要返回值（返回也拿不到）
    @Async
    public void test(String hint){
        System.out.println(Thread.currentThread().getName());
    }
}
```

```java
    @Inject
    private AsyncTask asyncTask;


    @ApiOperation("hello")
    @Mapping(value = "/hello", method = MethodType.GET)
    public void hello(@Param(required = true) String name) {
        asyncTask.test("asdsad");
    }
```


## 自定义线程池

```java
package com.example.provider.base.thread;

import org.noear.solon.annotation.Component;
import org.noear.solon.core.aspect.Invocation;
import org.noear.solon.scheduling.annotation.Async;
import org.noear.solon.scheduling.async.AsyncExecutor;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * 异步 & 自定义线程池
 *
 * @author lixiaotao
 */
@Component
public class AsyncExecutorImpl implements AsyncExecutor {

    private final ThreadPoolExecutor executor;

    public AsyncExecutorImpl() {
        // 核心线程数
        int corePoolSize = 5;
        // 最大线程数
        int maximumPoolSize = 10;
        // 线程空闲时间
        long keepAliveTime = 60L;
        // 时间单位 毫秒
        TimeUnit unit = TimeUnit.SECONDS;
        // 队列容量 不填 10000 就是无限
        BlockingQueue<Runnable> workQueue = new LinkedBlockingQueue<>(10000);
        // 线程工厂
        //ThreadFactory threadFactory = Executors.defaultThreadFactory();
        CustomThreadFactory factory = new CustomThreadFactory("solon-MyThread");
        // 拒绝策略 -- 超过就报错
        //RejectedExecutionHandler handler = new ThreadPoolExecutor.AbortPolicy();
        // 超过就由 根据调用execute方法的线程来执行被拒绝的任务
        ThreadPoolExecutor.CallerRunsPolicy policy = new ThreadPoolExecutor.CallerRunsPolicy();
        this.executor = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, factory, policy);
    }

    @Override
    public Future submit(Invocation inv, Async anno) throws Throwable {
        if (inv.method().getReturnType().isAssignableFrom(Future.class)) {
            return (Future) inv.invoke();
        } else {
            return executor.submit(() -> {
                try {
                    return inv.invoke();
                } catch (Throwable e) {
                    throw new RuntimeException(e);
                }
            });
        }
    }
}

```


## 自定义线程池名称


```java
package com.example.provider.base.thread;

import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

public class CustomThreadFactory implements ThreadFactory {
    private final AtomicInteger threadNumber = new AtomicInteger(1);
    private final String namePrefix;

    public CustomThreadFactory(String namePrefix) {
        this.namePrefix = namePrefix;
    }

    public Thread newThread(Runnable runnable) {
        Thread thread = Executors.defaultThreadFactory().newThread(runnable);
        thread.setName(namePrefix + "-" + threadNumber.getAndIncrement());
        return thread;
    }
}

```
