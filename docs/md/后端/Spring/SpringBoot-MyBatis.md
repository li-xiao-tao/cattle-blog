# 简介

官网https://mybatis.net.cn/

### 什么是 MyBatis？

MyBatis 是一款优秀的持久层框架，它支持自定义 SQL、存储过程以及高级映射。MyBatis 免除了几乎所有的 JDBC
代码以及设置参数和获取结果集的工作。MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java
Objects，普通老式 Java 对象）为数据库中的记录。

# SpringBoot整合MyBatis

## 1.依赖

```xml
        <!--  mybatis  -->
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
        <!--  Mysql数据库驱动  -->
<dependency>
<groupId>mysql</groupId>
<artifactId>mysql-connector-java</artifactId>
<scope>runtime</scope>
</dependency>
```

## 2.修改配置文件 application.yml

```yaml
# 服务器端口
server:
  port: 8080
# Spring Boot 的数据源配置
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/use_redis?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=true&serverTimezone=GMT%2B8
    username: root
    password: root
    driver-class-name: com.mysql.jdbc.Driver
    # 使用druid数据源
    type: com.alibaba.druid.pool.DruidDataSource
    filters: stat
    maxActive: 20
    initialSize: 1
    maxWait: 60000
    minIdle: 1
    timeBetweenEvictionRunsMillis: 60000
    minEvictableIdleTimeMillis: 300000
    validationQuery: select 'x'
    testWhileIdle: true
    testOnBorrow: false
    testOnReturn: false
    poolPreparedStatements: true
    maxPoolPreparedStatementPerConnectionSize: 20
    maxOpenPreparedStatements: 20

# mybatis 配置
mybatis:
  mapper-locations:
    - classpath:mapper/*.xml
    - classpath*:com/**/mapper/*.xml
```

### 2.1当你的配置文件是`application.yaml` `yaml`后缀时

```sh
#报错

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.
```

```sh
#原因

maven构建时没有成功构建
```

```sh
#解决方案

 	<build>
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.yml</include>
                    <include>**/*.yaml</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.yml</include>
                    <include>**/*.yaml</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
```

## 3.Mapper接口编写

```java

@Mapper
public interface SysUserMapper {

    /**
     * 根据用户ID查询用户信息
     *
     * @param userId 用户ID
     * @return 用户信息
     */
    User queryUserById(Long userId);
}
```

### 3.1 @Mapper 和 @MapperScan("com.itcast.cattle.mybatis.mapper")

| | @Mapper | @MapperScan({"com.itcast.cattle.mybatis.mapper","com.itcast.cattle.user.mapper"}) |
|--| :-------- | :----------------------------------------------------------: |
| 使用位置 | 每个Mapper接口上 | SpringBoot启动类上 |
| 区别 | 是对单个接口类的注解。单个操作。 | 是对整个包下的所有的接口类的注解。是批量的操作。使用 `@MapperScan` 后，接口类
就不需要使用 `@Mapper` 注解。 |

## 4.映射器文件Mapper.xml编写

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--Mapper接口-->
<mapper namespace="com.itcast.cattle.mybatis.mapper.SysUserMapper">
    <!-- 通用查询映射结果 --><!--数据库对于实体类-->
    <resultMap id="baseResultMap" type="com.itcast.cattle.mybatis.model.User">
        <id column="user_id" property="userId"/>
        <result column="username" property="username"/>
    </resultMap>

    <!--DML语句-->
    <select id="queryUserById" resultMap="baseResultMap">
        select *
        from sys_user
        where user_id = #{userId}
    </select>
</mapper>

```

MyBatis 的真正强大在于它的语句映射，这是它的魔力所在。由于它的异常强大，映射器的 XML 文件就显得相对简单。如果拿它跟具有相同功能的
JDBC 代码进行对比，你会立即发现省掉了将近 95% 的代码。MyBatis 致力于减少使用成本，让用户能更专注于 SQL 代码。

SQL 映射文件只有很少的几个顶级元素（按照应被定义的顺序列出）：

- `cache` – 该命名空间的缓存配置。
- `cache-ref` – 引用其它命名空间的缓存配置。
- `resultMap` – 描述如何从数据库结果集中加载对象，是最复杂也是最强大的元素。
- `sql` – 可被其它语句引用的可重用语句块。
- `insert` – 映射插入语句。
- `update` – 映射更新语句。
- `delete` – 映射删除语句。
- `select` – 映射查询语句。

## 5.插入数据返回主键id

- `useGeneratedKeys="true"`表示使用数据库自动增长的主，**首先表中主键是自增主键id**

- `keyProperty="id"`实体类字段，设置自增主键返回字段(用户在插入数据之后获取相应主键)

- `keyColumn="id"`数据库字段

- 案例：

- ```xml
  <insert id="insert" keyColumn="id" keyProperty="id" parameterType="com.itcast.cattle.mybatis.model.Student"
      useGeneratedKeys="true">
  insert into student (`name`, sex, cardId)
  values (#{name,jdbcType=VARCHAR}, #{sex,jdbcType=TINYINT}, #{cardid,jdbcType=INTEGER})
  </insert>
  ```

## 6.一对一

### 1.返回类中包含另一个对象

```java
@ApiModel(value = "student")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Student {
    @ApiModelProperty(value = "")
    private Integer id;

    @ApiModelProperty(value = "")
    private String name;

    @ApiModelProperty(value = "")
    private Integer sex;

    @ApiModelProperty(value = "")
    private Integer cardid;

	# 包含属性类
    private Studentcard studentcard;
}
```

```java
@ApiModel(value = "studentcard")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Studentcard {
    @ApiModelProperty(value = "")
    private Integer id;

    @ApiModelProperty(value = "")
    private Integer studentid;

    @ApiModelProperty(value = "")
    private LocalDate startdate;

    @ApiModelProperty(value = "")
    private LocalDate enddate;
}
```

### 2.xml

```xml
    <resultMap id="BaseAndStudentcardResultMap" type="com.itcast.cattle.mybatis.model.Student">
        <id column="id" jdbcType="INTEGER" property="id"/>
        <result column="name" jdbcType="VARCHAR" property="name"/>
        <result column="sex" jdbcType="TINYINT" property="sex"/>
        <result column="cardId" jdbcType="INTEGER" property="cardid"/>
        <!-- 一对一级联查询 -->
        <association property="studentcard"  javaType="com.itcast.cattle.mybatis.model.Studentcard">
            <id column="id" jdbcType="INTEGER" property="id"/>
            <result column="studentId" jdbcType="INTEGER" property="studentid"/>
            <result column="startDate" jdbcType="DATE" property="startdate"/>
            <result column="endDate" jdbcType="DATE" property="enddate"/>
        </association>
    </resultMap>



    <select id="findStudentById" resultMap="BaseAndStudentcardResultMap">
        select *
        from student s1 left join studentcard s2
        on s1.id = s2.studentId where s1.id = #{id}
    </select>
```

### 3.mapper接口

```java
public interface StudentMapper {


    Student findStudentById(@Param("id") Integer id);
}
```

### 4.返回结构

```json
{
  "id": 1,
  "name": "C语言中文网",
  "sex": 0,
  "cardid": 1,
  "studentcard": {
    "id": 1,
    "studentid": 1,
    "startdate": "2021-03-01",
    "enddate": "2021-03-11"
  }
}
```





## 7.一对多

### 1.返回类中包含另一个List对象

```java
@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "用户实体类", description = "用户信息描述类")
public class User {

    @ApiModelProperty(value = "用户id")
    private Long userId;

    @ApiModelProperty(value = "用户名")
    private String username;

    private List<Order> orders;
}
```

```java
@ApiModel(value="`order`")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @ApiModelProperty(value="")
    private Integer id;

    @ApiModelProperty(value="")
    private Integer ordernum;

    @ApiModelProperty(value="")
    private Integer userid;
}
```

### 2.xml

```xml
    <resultMap id="baseAndOrderResultMap" type="com.itcast.cattle.mybatis.model.User">
        <id column="user_id" property="userId"/>
        <result column="username" property="username"/>
        <collection property="orders" ofType="com.itcast.cattle.mybatis.model.Order" javaType="java.util.List">
            <id column="id" jdbcType="INTEGER" property="id" />
            <result column="ordernum" jdbcType="INTEGER" property="ordernum" />
            <result column="userId" jdbcType="INTEGER" property="userid" />
        </collection>
    </resultMap>
    <!--DML语句-->
    <select id="queryUserById" resultMap="baseAndOrderResultMap">
        select *
        from sys_user u left join `order` o on u.user_id = o.userId
        where user_id = #{userId}
    </select>
```

### 3.mapper

```java
public interface SysUserMapper {

    User queryUserById(Long userId);
}
```



### 4.返回结构

```json
{
  "userId": 1,
  "username": "admin",
    # 多个订单
  "orders": [
    {
      "id": 1,
      "ordernum": 20200107,
      "userid": 1
    },
    {
      "id": 4,
      "ordernum": 20200645,
      "userid": 1
    }
  ]
}
```



