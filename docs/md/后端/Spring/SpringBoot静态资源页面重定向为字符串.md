**@Controller与@RestController区别如下**

- @RestController is a stereotype annotation that combines @ResponseBody and @Controller.

**意思是：**

- @RestController注解相当于@ResponseBody ＋ @Controller合在一起的作用。

- 1)如果只是使用@RestController注解Controller，则Controller中的方法无法返回jsp页面，配置的视图解析器InternalResourceViewResolver不起作用，返回的内容就是Return 里的内容。

- 例如：本来应该到success.jsp页面的，则其显示success.

- 2)如果需要返回到指定页面，则需要用 @Controller配合视图解析器InternalResourceViewResolver才行。

- 3)如果需要返回JSON，XML或自定义mediaType内容到页面，则需要在对应的方法上加上@ResponseBody注解。

**Spring Boot @RestController重定向redirect**

- Spring MVC项目中页面重定向一般使用return "redirect:/other/controller/";即可。而Spring Boot使用了@RestController注解，上述写法只能返回字符串

**解决方法如下**

- 将一个HttpServletResponse参数添加到处理程序方法然后调用response.sendRedirect("some-url");

```
@RestController
public class FooController {
  @RequestMapping("/foo")
  void handleFoo(HttpServletResponse response) throws IOException {
    response.sendRedirect("some-url");
  }
}
```



[**Spring Boot项目@RestController如何使用重定向redirect - 开发技术 - 亿速云 (yisu.com)**](https://www.yisu.com/zixun/610000.html)