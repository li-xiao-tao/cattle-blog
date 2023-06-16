# SpringBoot整合JJWT实现Token登录认证

- 导入依赖
- 增加 `application.yml`
- 创建`JwtUtil`
- 自定义包装返回
- 自定义`HandlerInterceptor`
- 自定义`WebMvcConfigurationSupport`

# 1、导入`JWT`依赖

```xml
<!--jjwt 用来解析token-->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

# 2、增加 `application.yml`

```yaml
# jwt 配置
jwt:
  # header:凭证(校验的变量名)
  header: Authorization
  # 有效期1天(单位:s)
  expire: 5184000
  # secret: 秘钥(普通字符串) 不能太短，太短可能会导致报错
  secret: 123456
  # 签发者
  issuer: cattle
  # token前缀
  tokenPrefix: "Bearer "
```

# 3、创建`JwtUtil`

- 创建`token`
- 解析`token`

```java
package com.itcast.cattle.cas.utils;

import com.itcast.cattle.cas.exception.BusinessException;
import com.itcast.cattle.cas.model.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: xiang
 * @Date: 2021/5/11 21:11
 * <p>
 * JwtToken生成的工具类
 * JWT token的格式：header.payload.signature
 * header的格式（算法、token的类型）,默认：{"alg": "HS512","typ": "JWT"}
 * payload的格式 设置：（用户信息、创建时间、生成时间）
 * signature的生成算法：
 * HMACSHA512(base64UrlEncode(header) + "." +base64UrlEncode(payload),secret)
 */
@Slf4j
@Getter
@Component
public class JWTUtils {

    //存进客户端的token的key名
    @Value("${jwt.header}")
    private String header;
    //token前缀
    @Value("${jwt.tokenPrefix}")
    private String tokenPrefix;
    //签名密钥
    @Value("${jwt.secret}")
    private String secret;
    //有效期
    @Value("${jwt.expire}")
    private Long expireTime;
    //签发者
    @Value("${jwt.issuer}")
    private String iss;

    /**
     * 创建TOKEN
     */
    public String createToken(User user) {
        //Jwt头
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");

        Map<String, Object> claims = new HashMap<>();
        //自定义有效载荷部分
        claims.put("id", user.getId());
        claims.put("username", user.getUsername());

        return tokenPrefix + Jwts.builder()
                //发证人
                .setIssuer(iss)
                //Jwt头
                .setHeader(header)
                //有效载荷
                .setClaims(claims)
                //设定签发时间
                .setIssuedAt(new Date())
                //设定过期时间
                .setExpiration(new Date(System.currentTimeMillis() + expireTime * 1000))
                //使用HS256算法签名，PRIVATE_KEY为签名密钥
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    /**
     * jwt 验证token
     *
     * @param jwt
     */
    public Claims parseJWT(String jwt) {

        Claims claims;
        try {
            claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(jwt).getBody();
        } catch (Exception e) {
            log.error("Parse JWT error " + e.getMessage());
            return null;
        }
        return claims;
    }

    /**
     * 从token中获取用户信息
     *
     * @param token
     * @return
     */
    public User validateToken(String token) {
        //解析token后，从有效载荷取出值
        Integer id = (Integer) getClaimsFromToken(token).get("id");
        String username = (String) getClaimsFromToken(token).get("username");
        String email = (String) getClaimsFromToken(token).get("email");
        //封装为User对象
        User user = new User();
        user.setId(id);
        user.setUsername(username);

        return user;
    }

    /**
     * 获取有效载荷
     *
     * @param token
     * @return
     */
    public Claims getClaimsFromToken(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    //设定解密私钥
                    .setSigningKey(secret)
                    //传入Token
                    .parseClaimsJws(token)
                    //获取载荷类
                    .getBody();
        } catch (Exception e) {
            return null;
        }
        return claims;
    }

    /**
     * 检查token是否需要更新
     *
     * @param token
     * @return
     */
    public boolean isNeedUpdate(String token) {
        //获取token过期时间
        Date expiresAt = null;
        try {
            expiresAt = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
        } catch (Exception e) {
            throw new BusinessException("token验证失败");
        }
        //如果剩余过期时间少于过期时常的一般时 需要更新
        return (expiresAt.getTime() - System.currentTimeMillis()) < (expireTime >> 1);
    }
}

```

# 4、自定义包装返回

```java
package com.itcast.cattle.cas.response;

import com.alibaba.fastjson2.JSONObject;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Setter
@Getter
@Accessors(chain = true)
public class Result<T> {

    /**
     * 调用是否成功标识，0：成功，-1:系统繁忙，此时请开发者稍候再试 详情见[ExceptionCode]
     */
    @ApiModelProperty(value = "响应编码:0/200-请求处理成功")
    private int code;
    /**
     * 调用结果
     */
    @ApiModelProperty(value = "响应数据")
    private T data;
    /**
     * 结果消息，如果调用成功，消息通常为空T
     */
    @ApiModelProperty(value = "提示消息")
    private String msg;

    public static <T> Result<T> build(int code, T data, String msg) {
        return new Result<T>().setCode(code).setMsg(msg).setData(data);
    }

    /**
     * 请求成功消息
     *
     * @return RPC调用结果
     */
    public static <E> Result<Boolean> success() {
        return build(200, null, "ok");
    }

    public static <E> Result<E> success(E data) {
        return build(200, data, "ok");
    }

    public static <E> Result<E> success(E data, String msg) {
        return build(200, data, msg);
    }

    /**
     * 请求失败消息
     *
     * @param msg
     * @return
     */
    public static <E> Result<E> fail(int code, String msg) {
        return build(code, null, msg);
    }

    public static <E> Result<E> fail(String msg) {
        return fail(400, msg);
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}

```



# 5、自定义`HandlerInterceptor`

- 拦截所有接口，判断token

```java
package com.itcast.cattle.cas.filter;

import com.alibaba.fastjson2.JSONObject;
import com.itcast.cattle.cas.exception.ExceptionCode;
import com.itcast.cattle.cas.response.Result;
import com.itcast.cattle.cas.utils.JWTUtils;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 拦截器：验证用户是否登录
 * 实现了WebMvcConfigurationSupport  需要重写addInterceptors
 */
@Slf4j
@Component
public class UserLoginInterceptor implements HandlerInterceptor {

    @Autowired
    private JWTUtils jwtUtils;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //设置response响应数据类型为json和编码为utf-8
        response.setContentType("application/json;charset=utf-8");

        //http的header中获得token
        String head = request.getHeader(jwtUtils.getHeader());
        if (head == null || head.equals("")) {
            log.error("token无效");
            response.getWriter().write(JSONObject.toJSONString(Result.fail(ExceptionCode.UNAUTHORIZED.getCode(), ExceptionCode.UNAUTHORIZED.getMsg())));
            return false;
        }
        String token = head.replace(jwtUtils.getTokenPrefix(), "");
        //token不存在
        if (token.equals("")) {
            log.error("token无效");
            response.getWriter().write(JSONObject.toJSONString(Result.fail(ExceptionCode.UNAUTHORIZED.getCode(), ExceptionCode.UNAUTHORIZED.getMsg())));
            return false;
        }
        //验证token
        Claims claims = jwtUtils.parseJWT(token);
        if (claims == null) {
            log.error("token无效");
            response.getWriter().write(JSONObject.toJSONString(Result.fail(ExceptionCode.UNAUTHORIZED.getCode(), ExceptionCode.UNAUTHORIZED.getMsg())));
            return false;
        }
        //更新token有效时间 (如果需要更新其实就是产生一个新的token)
        if (jwtUtils.isNeedUpdate(token)) {
            String newToken = jwtUtils.createToken(jwtUtils.validateToken(token));
            response.setHeader(jwtUtils.getHeader(), newToken);
        }


        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}

```

# 6、自定义`WebMvcConfigurationSupport`

- 注册自定义`HandlerInterceptor`
- 放开全部静态文件和登录注册等接口

```java
package com.itcast.cattle.cas.config;

import com.itcast.cattle.cas.filter.UserLoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/**
 * 重写addResourceHandlers 实现访问不到static资源问题
 */
@Configuration
public class WebConfig extends WebMvcConfigurationSupport {

    @Autowired
    private UserLoginInterceptor userLoginInterceptor;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .addResourceLocations("classpath:/META-INF/resources/");
        //配置 swagger knife4j 访问静态资源路径
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("doc.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

    /**
     * 没有定义ViewResolver。项目中有一个配置类继承了WebMvcConfigurationSupport（用于配置swagger），结果其中没有配置ViewResolver。定义一下这个Bean就好了
     * https://www.cnblogs.com/gdme1320/p/9391067.html
     *
     * @param registry
     */
    @Override
    protected void configureViewResolvers(ViewResolverRegistry registry) {
        registry.viewResolver(new InternalResourceViewResolver());
    }

    /**
     * 自定义拦截，需要重写此方法
     *
     * @param registry
     */
    @Override
    protected void addInterceptors(InterceptorRegistry registry) {
        //super.addInterceptors(registry);
        registry.addInterceptor(userLoginInterceptor)
                //拦截
                .addPathPatterns("/**")
                //不拦截 登录 注册 发送邮箱
                .excludePathPatterns(
                        "/auth/login",
                        "/auth/hello",
                        "/auth/registerUser",
                        "/auth/registerUser",
                        "/auth/sendMailCode",
                        "/resources/**",
                        "/static/**",
                        "/public/**",
                        "/*.html",
                        "/*.js",
                        "/*.css",
                        "/swagger-resources/**"
                )
        ;

    }
}

```

# 7、登录

```java
/**
 * @author QWQ
 */
@Slf4j
@RestController
@Api(tags = "用户接口")
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private JWTUtils jwtUtils;

    @PostMapping("/login")
    @ApiOperation(value = "登录", notes = "username password 必传")
    public Result login(@RequestBody User user, HttpServletResponse response) {
        log.info("登录:" + user.toString());
        if (StringUtils.isEmpty(user.getUsername()) && StringUtils.isEmpty(user.getPassword())) {
            throw new BusinessException(ExceptionCode.UNAUTHORIZED.getCode(), "账号密码不能为空");
        }
        //把token返回
        response.setHeader(jwtUtils.getHeader(), jwtUtils.createToken(user));
        return Result.success();
    }
}
```

