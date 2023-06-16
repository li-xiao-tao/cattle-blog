## 1.在需要的方法上使用

```java
    @RedisLock
    @PostMapping(value = "redisLock")
    @ApiOperation(httpMethod = "POST", value = "锁")
    public User redisLock(@RequestBody User user) {
        // 需要加锁的逻辑
    return user;
    }
```


## 2.自定义注解

```java
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Redisson分布式锁
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface RedisLock {
}
```

## 3.自定义切面类

```java
/**
 * Redisson分布式锁切面方法
 */
@Slf4j
@Aspect
@Component
public class RedisLockAspect {

    @Autowired
    private RedissonClient redissonClient;


    @Pointcut("@annotation(com.niwodai.devops.annotation.RedisLock)")
    public void redisLock() {
    }

    /**
     * 环绕通知, 围绕着方法执行
     */
    @Around("redisLock()")
    public Object around(ProceedingJoinPoint pjp) {
        //在pjp.proceed()之前会运行的逻辑任务，相当于@Before
        Object proceed = null;
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        // 用户请求唯一标识，获取当前sessionId
        String sessionId = attributes.getSessionId();
        // 用户请求的uri
        String uri = attributes.getRequest().getServletPath();
        // 针对用户对应接口的唯一key
        String key = sessionId + "-" + uri;
        RLock lock = redissonClient.getLock(key);
        try {
            if (lock.tryLock(3, TimeUnit.SECONDS)) {
                proceed = pjp.proceed();
            }
        } catch (Throwable e) {
            log.error(e + "");
            throw new BusinessException(ErrorCodeEnums.ERROR_400.getCode(), e.getMessage(), e);
        } finally {
            if (lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
        return proceed;
    }

    /**
     * 业务开始处理前执行
     *
     * @param joinPoint
     * @return
     * @throws BusinessException 抛出自定义异常，由全局异常处理捕获
     */
    //定义切入点规则并且是使用了PreDupRequest注解的接口
    @Before(value = "redisLock()")
    public void before(JoinPoint joinPoint) throws BusinessException {

        log.info("前缀通知");
    }


    /**
     * 正常返回通知[出现异常不执行]，拦截用户操作日志，连接点正常执行完成后执行， 如果连接点抛出异常，则不会执行
     *
     * @param joinPoint 切入点
     * @param keys      为接口返回的结果
     */
    @AfterReturning(value = "redisLock()", returning = "keys")
    public void saveOperLog(JoinPoint joinPoint, Object keys) {
        log.info("正常返回后通知");
    }

    /**
     * 异常返回通知，用于拦截异常日志信息 连接点抛出异常后执行
     *
     * @param joinPoint 切入点
     * @param e         异常信息
     */
    @AfterThrowing(pointcut = "redisLock()", throwing = "e")
    public void saveExceptionLog(JoinPoint joinPoint, Throwable e) {
        log.info("异常返回后通知");
    }

    /**
     * 后置通知[无视异常], 在连接点正常执行完成后执行
     */
    @After("redisLock()")
    public void after() {
        log.info("后置通知");
    }
}
```
