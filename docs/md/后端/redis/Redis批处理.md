# Redis批处理

- 场景- 给redis客户端存入10万的数据

## for循环

```java
        long l1 = System.currentTimeMillis();
        for (int i = 0; i < 10000; i++) {
            //redisUtil.set("key"+i, i);
            template.opsForValue().set("key"+i, i);
        }
        long l2 = System.currentTimeMillis();
        log.info("for循环处理时间 "+(l2-l1));
```





## Pipe Line 批处理，管道技术

```java
        long l1 = System.currentTimeMillis();
        template.executePipelined((RedisCallback<Object>) connection -> {
            for (int i = 0; i < 10000; i++) {
                connection.stringCommands().set(("key"+i).getBytes(),String.valueOf(i).getBytes());
            }
            return null;
        });
        long l2 = System.currentTimeMillis();
        log.info("redis批处理 "+(l2-l1));
```


## 实际时间和插入数据量比较

| 插入数据量 | for耗时 | Pipe Line耗时 |
| :--------: | :-----: | :-----------: |
|   10000    |  10282  |      567      |
|   100000   |  85077  |      237      |
|  1000000   | 999312  |     4524      |

