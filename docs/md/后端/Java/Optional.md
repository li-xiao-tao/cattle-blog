# DATE —— Optional
## DATE

```java
compareTo()方法的返回值，date1小于date2返回-1，date1大于date2返回1，相等返回0
```

## Optional
```java
public static void main(String[] args) {
        Liststring list = null;
        Liststring newList = Optional.ofNullable(list).orElse(Lists.newArrayList());
        String s = null;　　　　　
        String result = Optional.ofNullable(s).orElse("值为空“);
　　　　　
        newList.forEach(x -> System.out.println(x));
    }
```

如果list集合不为空，将list集合赋值给newList；如果list集合为空创建一个空对象集合赋值给newList，保证list集合永远不为空，也就避免了空指针异常。（为了更好的理解，分开写了，比较庸俗，实际工作中都是一行搞定，哈哈哈）
