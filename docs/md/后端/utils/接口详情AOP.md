# 接口详情AOP
```java
@Slf4j
@Aspect
@Component
public class TimingAspect {

    @Around("execution(* com.cattle.controller..*.*(..))")
    public Object log(ProceedingJoinPoint joinPoint) throws Throwable {

        // import com.fasterxml.jackson.databind.ObjectMapper;
        ObjectMapper objectMapper = new ObjectMapper();

        // 获取HttpServletRequest对象
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        long startTime = System.currentTimeMillis();

        // 获取请求参数进行打印
        Signature signature = joinPoint.getSignature();
        MethodSignature methodSignature = (MethodSignature) signature;
        // 类名 swagger中文注释名
        String classCommentName = methodSignature.getMethod().getDeclaringClass().getAnnotation(Api.class).tags()[0];
        String[] sourceName = signature.getDeclaringTypeName().split("\\.");
        String className = sourceName[sourceName.length - 1] + "[" + classCommentName + "]";
        // 方法名 swagger中文注释名
        String methodCommentName = methodSignature.getMethod().getAnnotation(ApiOperation.class).value();
        String methodName = signature.getName() + "[" + methodCommentName + "]";

        // 参数名数组
        String[] parameterNames = ((MethodSignature) signature).getParameterNames();
        // 构造参数组集合
        List<Object> argList = new ArrayList<>();
        for (Object arg : joinPoint.getArgs()) {
            // request/response无法使用toJSON
            if (arg instanceof HttpServletRequest) {
                argList.add("request");
            } else if (arg instanceof HttpServletResponse) {
                argList.add("response");
            } else {
                argList.add(JSON.toJSON(arg));
            }
        }

        Object proceed = joinPoint.proceed();

        long endTime = System.currentTimeMillis();
        log.info("\n-----------------------------------------------------------------接口请求日志-----------------------------------------------------------------\n" +
                        "**客户端IP** {}\n\n**接口地址url** {}\n\n" +
                        "**请求类型 **{}\n\n**执行耗时 **{}\n\n**swagger注释** {} -> {}\n\n" +
                        "**接受参数名称** {}\n\n**请求参数**\n\n```\n{}\n```\n\n**响应结果**\n\n```\n{}\n```",
                request.getRemoteAddr(), request.getRequestURL(),
                request.getMethod(), getElapsedTimeStr(endTime - startTime), className, methodName, parameterNames,
                objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(argList),
                objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(proceed)
        );
        return proceed;
    }

    /**
     * 获取耗时描述
     *
     * @param elapsedTime
     * @return
     */
    private static String getElapsedTimeStr(long elapsedTime) {
        if (elapsedTime < 1000) {
            return String.format("%s毫秒", elapsedTime);
        } else if (elapsedTime < 60000) {
            return String.format("%.2f秒", (elapsedTime * 1.0) / 1000);
        }
        return String.format("%.2f分钟", (elapsedTime * 1.0) / 1000 / 60);
    }
}
```