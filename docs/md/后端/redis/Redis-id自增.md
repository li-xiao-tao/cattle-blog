### **redis id自增**

- 访问一次id+1

```java
@Autowired 
RedissonClient redissonClient;

Long conut = redissonClient.getAtomicLong("KEY").incrementAndGet();
```

