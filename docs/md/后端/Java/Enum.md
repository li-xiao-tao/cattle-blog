# 枚举

## 写法一

```java
@Getter
@AllArgsConstructor
public enum NumberEnum {
    /**
     *
     */
    ONE(1, "ONE"),
    TWO(2, "TWO"),
    THREE(3, "THREE"),
    ;

    private Integer code;
    private String value;

    public static String of(String type) {
        return cache().get(type);
    }

    public static Map<Integer, String> cache() {
        return Stream.of(NumberEnum.values()).collect(Collectors.toMap(NumberEnum::getCode, NumberEnum::getValue));
    }
}
```



## 写法二

```JAVA
@Getter
@AllArgsConstructor
public enum NumberEnum {
    /**
     *
     */
    ONE(1, "ONE"),
    TWO(2, "TWO"),
    THREE(3, "THREE"),
    ;

    private Integer code;
    private String value;
    
    /**
     * Function.identity() 返回对象本身
     */
    private static final Map<Integer, NumberEnum> cache = Stream.of(NumberEnum.values()).collect(Collectors.toMap(NumberEnum::getCode, Function.identity()));

    public static NumberEnum of(String type) {
        return cache.get(type);
    }
    
}
```

## 区别

- 根据场景选择
  - 写法一适合数据需要时才构建的
  - 写法二适合项目初始数据

