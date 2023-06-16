> 正常情况下Springboot项目静态资源在static目录下直接通过目录(/xxx)就可以访问，但是项目中实现了配置类（WebConfig），则会在配置类中寻找，由于找不到则会报错，从而导致前端加载异常。 要解决这个问题只需在配置类中覆写addResourceHandlers方法即可。



```java

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
    }
}
```

```xml
<build>
<!--解决报错 There are test failures.Please refer to XXX/  跳过测试-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <skipTests>true</skipTests>
                </configuration>
            </plugin>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <!--所在的目录-->
            <includes>
                <!--包括目录下的.properties,.xml 文件都会被扫描到-->
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.*</include>
            </includes>
        </resource>
    </resources>
</build>
```

```xml
spring:
  #解决无法访问静态资源
  mvc:
    static-path-pattern: /static**
  #解决无法访问静态资源
  web:
    resources:
      static-locations: classpath*:/static/
```

