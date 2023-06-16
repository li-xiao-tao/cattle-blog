
## 接口编写
```java
import java.util.function.Supplier;

public interface RedisLockService {

    /**
     * Redisson 分布式锁操作
     * <!-- 默认锁的有效时间【看门狗】 30s 建议使用，当业务超过自定义有效时间时，线程会释放锁-->
     *
     * @param lockName 锁的名称
     * @param waitTime 获取锁的最长时间 默认 秒
     * @param supplier 执行的方法  Lambda表达式 () -> {}
     * @param <T>      执行方法的返回值
     */
    <T> void tryLock(String lockName, Long waitTime, Supplier<T> supplier);

    /**
     * Redisson 分布式锁操作
     *
     * @param lockName  锁的名称
     * @param waitTime  获取锁的最长时间
     * @param leaseTime 租赁时间（锁的有效时间，默认30s）
     * @param supplier  执行的方法  Lambda表达式 () -> {}
     * @param <T>       执行方法的返回值
     * @return
     */
    <T> T tryLock(String lockName, Long waitTime, Long leaseTime, Supplier<T> supplier);
}
```
## 接口实现编写
```java
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.validation.constraints.NotNull;
import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;

/**
 * @description: Lock锁工具类
 * @author: lixiaotao
 * @create: 2023-01-05 13:56
 **/
@Slf4j
@Component
public class RedisLockServiceImpl implements RedisLockService {

    @Resource
    private RedissonClient redissonClient;


    /**
     * Redisson 分布式锁操作
     *
     * @param lockName 锁的名称
     * @param waitTime 获取锁的时间
     * @param supplier 执行的方法  Lambda表达式 () -> {}
     * @param <T>      执行方法的返回值
     */
    @Override
    public <T> void tryLock(@NotNull String lockName, @NotNull Long waitTime, @NotNull Supplier<T> supplier) {
        // 获取锁
        RLock lock = redissonClient.getLock(lockName);
        // 加锁并设置失效时间
        try {
            if (lock.tryLock(waitTime, TimeUnit.SECONDS)) {
                // 执行函数获取返回值
                supplier.get();
            }
        } catch (Exception e) {
            log.error("Something Wrong with:", e);
        } finally {
            // 释放锁
            if (lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    /**
     * Redisson 分布式锁操作
     *
     * @param lockName  锁的名称
     * @param waitTime  获取锁的时间
     * @param leaseTime 租赁时间（锁的有效时间，默认30s）
     * @param supplier  执行的方法  Lambda表达式 () -> {}
     * @param <T>       执行方法的返回值
     * @return
     */
    @Override
    public <T> T tryLock(@NotNull String lockName, @NotNull Long waitTime, @NotNull Long leaseTime, @NotNull Supplier<T> supplier) {
        // 获取锁
        RLock lock = redissonClient.getLock(lockName);
        // 加锁并设置失效时间
        try {
            if (lock.tryLock(waitTime, leaseTime, TimeUnit.SECONDS)) {
                // 执行函数获取返回值
                return supplier.get();
            }
        } catch (Exception e) {
            log.error("Something Wrong with:", e);
        } finally {
            // 释放锁
            if (lock.isLocked() && lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
        return null;
    }
}
```
## 调用
```java
        @Autowired
        private RedisLockService redisLockService;

        redisLockService.tryLock(RedisKeys.DEMAND_ASSESS_LOCK + dto.getId(), 3L, () -> 方法 );
```