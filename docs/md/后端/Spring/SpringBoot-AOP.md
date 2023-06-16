# SpringBoot + AOP



## 1：基本概念

底层是动态代理

切面（ASPECT）：横切关注点 被模块化 的特殊对象。即，它是一个类。
通知（Advice）：切面必须要完成的工作。即，它是类中的一个方法。
目标（Target）：被通知对象。
代理（Proxy）：向目标对象应用通知之后创建的对象。
切入点（PointCut）：切面通知执行的 “地点”的定义。
连接点（JointPoint）：与切入点匹配的执行点。..

Before: 前置通知, 在方法执行之前执行，前置通知不会影响连接点的执行，除非此处抛出异常
After: 后置通知, 在连接点正常执行完成后执行，如果连接点抛出异常，则不会执行
AfterRunning: 返回通知, 在方法返回结果之后执行
AfterThrowing: 异常通知, 在方法抛出异常之后执行
Around: 环绕通知, 围绕着方法执行，比如一个方法调用的前后。这是最强大的通知类型，能在方法调用前后自定义一些操作。


## 2：导入依赖
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
```
## 3: AOP编写

```java
package com.itcast.cattle.cas.aspect;

import com.alibaba.fastjson2.JSON;
import com.itcast.cattle.cas.annotation.SysLog;
import com.itcast.cattle.cas.logmodel.OperationLog;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Aspect
@Component
public class Aspect {


    /**
     * 切入点。表示在标有@Log注解的方法中进行切入，com.example.demo.log.Log为Log类所在的路径，需自行修改
     * <p>
     * execution()：用于匹配方法执行的连接点
     * args(): 用于匹配当前执行的方法传入的参数为指定类型的执行方法
     * this(): 用于匹配当前AOP代理对象类型的执行方法；注意是AOP代理对象的类型匹配，这样就可能包括引入接口也类型匹配；
     * target(): 用于匹配当前目标对象类型的执行方法；注意是目标对象的类型匹配，这样就不包括引入接口也类型匹配；
     * within(): 用于匹配指定类型内的方法执行；
     * args():于匹配当前执行的方法传入的参数持有指定注解的执行；
     * target():用于匹配当前目标对象类型的执行方法，其中目标对象持有指定的注解；
     * within():用于匹配所以持有指定注解类型内的方法；
     * annotation:用于匹配当前执行方法持有指定注解的方法；
     */
    @Pointcut("@annotation(com.itcast.cattle.cas.annotation.SysLog),execution(* com.itcast.cattle.cas.controller.*.*(..))")
    public void sysLog() {
    }

    /**
     * 环绕通知, 围绕着方法执行
     */
    @Around("sysLog()")
    public Object around(ProceedingJoinPoint pjp) {
        //在pjp.proceed()之前会运行的逻辑任务，相当于@Before
        log.info("环绕通知");
        Object proceed = null;
        try {
            proceed = pjp.proceed();
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return proceed;
    }

    /**
     * 前置通知, 在方法执行之前执行
     */
    @Before(value = "sysLog()")
    public void recordLog(JoinPoint joinPoint) {
        log.info("前缀通知");
    }

    /**
     * 正常返回通知[出现异常不执行]，拦截用户操作日志，连接点正常执行完成后执行， 如果连接点抛出异常，则不会执行
     *
     * @param joinPoint 切入点
     * @param keys      为接口返回的结果
     */
    @AfterReturning(value = "sysLog()", returning = "keys")
    public void saveOperLog(JoinPoint joinPoint, Object keys) {
        log.info("正常返回后通知");
    }

    /**
     * 异常返回通知，用于拦截异常日志信息 连接点抛出异常后执行
     *
     * @param joinPoint 切入点
     * @param e         异常信息
     */
    @AfterThrowing(pointcut = "sysLog()", throwing = "e")
    public void saveExceptionLog(JoinPoint joinPoint, Throwable e) {
        log.info("异常返回后通知");
    }

    /**
     * 后置通知[无视异常], 在连接点正常执行完成后执行
     */
    @After("sysLog()")
    public void after() {
        log.info("后置通知");
    }
}
```