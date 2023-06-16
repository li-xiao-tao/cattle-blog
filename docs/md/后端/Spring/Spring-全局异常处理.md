### 异常分类处理最佳实践

#### 【1】异常处理方案

* 业务异常：
  发送对应消息传递给用户，提醒规范操作（一般是由客户操纵不当引起的）
* 系统异常：
  发送固定消息传递给用户，安抚用户
  发送特定消息给运维人员，提醒维护
  记录日志
* 其他异常：
  发送固定消息传递给用户，安抚用户
  发送特定消息给编程人员，提醒维护
  纳入预期范围内
  记录日志

#### 【2】自定义异常

1.以业务异常和系统异常为例：

1.1 自定义业务异常类：

```java
package com.pp.ex;

/**
 * 自定义业务异常
 */
public class BusinessException extends RuntimeException {
    public BusinessException() {
    }

    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public BusinessException(Throwable cause) {
        super(cause);
    }

    public BusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
```

1.2 定义系统异常：

```java
package com.pp.ex;

/**
 * 定义系统异常
 * 一般系统异常都是：
 *  eg:数据库连接不上
 *      io
 *      socket,
 *     服务组件不可用
 */
public class SystemException extends Exception {
    public SystemException() {
    }

    public SystemException(String message) {
        super(message);
    }

    public SystemException(String message, Throwable cause) {
        super(message, cause);
    }

    public SystemException(Throwable cause) {
        super(cause);
    }

    public SystemException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
```

#### 【3】定义异常分类管理器

```java
package com.pp.exhandler;

import com.pp.ex.BusinessException;
import com.pp.ex.SystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * 定义全局异常分类管理器
 */
@ControllerAdvice
public class GlobalExceptioinHandler {
    //处理业务异常
    @ExceptionHandler(BusinessException.class)
    @ResponseBody
    public String handlerBusinessException(BusinessException bex) {
        System.out.println(bex.getMessage());
        return bex.getMessage();
    }

    /**
     * 处理系统异常，
     * 方案：出现异常，跳转到error.jsp页面下
     * @param sex
     * @return
     */
    @ExceptionHandler(SystemException.class)
    public ModelAndView handlerSystemException(SystemException sex) {
        //调用短信接口、邮箱接口、微信公众号等给运维发送错误信息
        //log4j打印日志
        ModelAndView mv = new ModelAndView();
        mv.addObject("msg", sex.getMessage());
        //安抚用户
        mv.setViewName("error");
        return mv;
    }
}
```

#### 【4】模拟业务异常代码示例

```java

@Slf4j
@RestController
@RequestMapping("/user")
public class Controller {
    /**
     * 模拟业务异常
     * url:localhost:8080/registerUser?name=zhang
     * @param name
     * @return
     */
    @RequestMapping("/registerUser")
    public String register(String name) {
        //判断，如果name长度小于6，那么抛出业务异常
        if (name == null || name.trim().length() < 6) {
            throw new BusinessException("your name length < 6");
        }
        return name;
    }

    /**
     * 模拟系统异常
     * @return
     * @throws SystemException
     */
    @RequestMapping("/linkDb")
    public String linkDb() throws SystemException {
        try {
            //模拟系统异常
            throw new SQLException();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
            throw new SystemException("db linked error");
        }
        return null;
    }
}
```

**总之，通过自定义异常将所有的异常现象进行分类管理，方便后期维护；**  