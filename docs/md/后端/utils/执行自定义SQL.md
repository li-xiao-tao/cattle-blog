## Controller

```java

@RestController
@RequestMapping("/sql")
public class SqlController {

    @Resource
    SqlMapper sqlMapper;

    @PostMapping("/delete")
    public RestResponse delete(@RequestParam("sql") String sql) {
        return RestResponse.ok(sqlMapper.delete(sql));
    }

    @PostMapping("/insert")
    public RestResponse insert(@RequestParam("sql") String sql) {
        return RestResponse.ok(sqlMapper.insert(sql));
    }

    @PostMapping("/update")
    public RestResponse update(@RequestParam("sql") String sql) {
        return RestResponse.ok(sqlMapper.update(sql));
    }

    @PostMapping("/select")
    public RestResponse select(@RequestParam("sql") String sql) {
        return RestResponse.ok(sqlMapper.select(sql));
    }
}
```

## Mapper

```java
public interface SqlMapper {
    List<LinkedHashMap<String, Object>> select(@Param("sql") String sql);

    int insert(@Param("sql") String sql);

    int update(@Param("sql") String sql);

    int delete(@Param("sql") String sql);
}
```

## Mapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="mapper.SqlMapper">

    <select id="select" parameterType="java.lang.String" resultType="java.util.LinkedHashMap">
        ${sql}
    </select>
    <insert id="insert" parameterType="java.lang.String">
        ${sql}
    </insert>
    <update id="update" parameterType="java.lang.String">
        ${sql}
    </update>
    <delete id="delete" parameterType="java.lang.String">
        ${sql}
    </delete>
</mapper>
```
