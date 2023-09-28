# solon-feign 

## 依赖

```xml
        <dependency>
            <groupId>org.noear</groupId>
            <artifactId>feign-solon-plugin</artifactId>
        </dependency>
        <!--Feign的编码器和解码器，以使用Jackson库进行对象的序列化和反序列化。-->
        <dependency>
            <groupId>com.netflix.feign</groupId>
            <artifactId>feign-jackson</artifactId>
            <version>${feign.version}</version>
        </dependency>
```

## 代码示例

 - 启动类 + @EnableFeignClient

```java
@FeignClient(name = "biying-service", url = "https://www.baidu.com", configuration = JacksonConfig.class)
public interface RemoteService {

    @RequestLine("GET /aa/bb?id={id}")
    RestResponse<Map<String, Object>> getDetails(@HeaderMap Map<String, String> headers,@Param("demandId") Integer id);


    @RequestLine("GET /aa/aa")
    @Headers({"Content-Type: application/json;charset=UTF-8", "Cookie: {token}"})
    RestResponse<List<Map<String, Object>>> getEnv(@Param("token") String token);


    /**
     * @param body 传入JSON  ("%7B\"id\": \"{id}\", \"name\": \"{name}\"%7D")
     * @param headers headers
     * @return
     */
    @Body("{body}")
    @RequestLine("POST /a/aa")
    RestResponse<Integer> save(@Param("body") String body, @HeaderMap Map<String, String> headers);

}
```

```java

import feign.Feign;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.solon.FeignClient;
import feign.solon.FeignConfiguration;

public class JacksonConfig implements FeignConfiguration {
    @Override
    public Feign.Builder config(FeignClient client, Feign.Builder builder) {
        return builder.encoder(new JacksonEncoder())
                .decoder(new JacksonDecoder());
    }
}
```

- 调用

```java
    @Inject
    private RemoteService remoteService;
    
    @ApiOperation("getDetails")
    @Mapping(value = "/getDetails", method = MethodType.GET)
    public RestResponse<Map<String, Object>> getDetails(@Param(required = true) Integer id) {

        HashMap<String, String> map = new HashMap<>(2);
        map.put("Content-Type","application/json;charset=UTF-8");
        map.put("Cookie","JSESSIONID=asdsad");
        return remoteService.getDetails(map,id);
    }
```
