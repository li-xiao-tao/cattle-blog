## 1.0：重写MVC  addCorsMappings  过滤器方式

```java
@Override
public void addCorsMappings(CorsRegistry registry){
    registry.addMapping("/**")
    // #允许向该服务器提交请求的URI，*表示全部允许
    .allowedOrigins("*")
    .allowedMethods("GET","POST","PUT","DELETE","HEAD","OPTIONS")
    // #允许访问的头信息,*表示全部
    .allowedHeaders("*")
    // 允许cookies跨域
    .allowCredentials(true)
    // 预检请求的缓存时间（秒），即在这个时间段里，对于相同的跨域请求不会再预检了
    .maxAge(18000L);
}
```

## 2.0：Filter 拦截器

```java
@Configuration
public class CorsConfig {

    @Value("${cors.allowedHeader}")
    String allowedHeader;
    @Value("${cors.allowedOrigins}")
    String allowedOrigins;

//配置跨域
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        // 设置允许跨域请求的域名
        config.addAllowedOrigin(allowedOrigins);
        // 是否允许证书
         config.setAllowCredentials(true);
        // 设置允许的方法
        config.addAllowedMethod("*");
        // 允许任何头
        config.addAllowedHeader(allowedHeader);
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration("/**", config);
        return new CorsFilter(configSource);
    }

// 注册的路由拦截器
    @Bean
    public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
        @Override
        public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new SaRouteInterceptor())
                .addPathPatterns("/admin/**")
                .excludePathPatterns("/admin/login");
        }
    };
  }
}

```

## 3.0：spring-boot 注解

- springboot自带跨域注解，可以放在RestController的类上或者方法上，还能自定义那些域名可以跨域，非常灵活

```java
@CrossOrigin
//@CrossOrigin(origins = "*", allowedHeaders = "*")
```

