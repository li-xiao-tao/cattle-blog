# 参数校验 - List

```java
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * List 参数校验 注解
 *
 * @author lixiaotao
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ListNotEmptyValidator.class)
@Documented
public @interface ListNotEmpty {

    String message() default "List must not be empty";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};


    /**
     * 不能 为 null 或 “”
     *
     * @return "不能为null 或 '' "
     */
    boolean notEmpty() default false;

    /**
     *
     * 自定义
     * 这些参数不能传
     *
     * @return
     */
    //String[] getVerify() default a{};
}
```
```java
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.List;

/**
 * List 参数校验 注解
 *
 * @author lixiaotao
 */
public class ListNotEmptyValidator implements ConstraintValidator<ListNotEmpty, List<?>> {


    private Boolean notEmpty;

    @Override
    public void initialize(ListNotEmpty constraintAnnotation) {
        notEmpty = constraintAnnotation.notEmpty();
    }

    @Override
    public boolean isValid(List<?> list, ConstraintValidatorContext context) {
        // 校验失败，List不能为空
        if (list == null || list.isEmpty()) {
            return false;
        }
        if (notEmpty) {
            context.disableDefaultConstraintViolation(); // 禁用默认的校验错误消息
            for (Object o : list) {
                if (o == null || "".equals(o)) {
                    context.buildConstraintViolationWithTemplate("不能为null 或 '' ").addConstraintViolation();
                    return false;
                }
            }
        }
        return true;
    }
}
```

