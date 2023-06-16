## 1. logback 日志

###  1.依赖SpingBoot本身集成`logback`、`slf4j`日志

```xml
<!-- springboot相关依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <!-- 这个相关依赖不能被排除 -->
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

### **2.application.yaml**

- logback.xml—>application.properties—>logback-spring.xml.
- **<springProperty/>获取application.properties 里的变量，日志xml就不能使用logback.xml，而是logback-spring.xml.
```yaml
logging:
  config: classpath:logback-spring.xml
```

### **3.resources --> logback-spring.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>


<configuration debug="false" scan="false">
    <springProperty scop="context" name="spring.application.name" source="spring.application.name" defaultValue=""/>
    <property name="log.path" value="./data/logs/${spring.application.name}"/>
    <!-- 彩色日志格式 -->
    <property name="CONSOLE_LOG_PATTERN"
              value="${CONSOLE_LOG_PATTERN:-%clr(%d{yyyy-MM-dd HH:mm:ss.SSS}){faint} %clr(${LOG_LEVEL_PATTERN:-%5p}) %clr(${PID:- }){magenta} %clr(---){faint} %clr([%15.15t]){faint} %clr(%-40.40logger{39}){cyan} %clr(:){faint} %m%n${LOG_EXCEPTION_CONVERSION_WORD:-%wEx}}"/>
    <!-- 彩色日志依赖的渲染类 -->
    <conversionRule conversionWord="clr" converterClass="org.springframework.boot.logging.logback.ColorConverter"/>
    <conversionRule conversionWord="wex"
                    converterClass="org.springframework.boot.logging.logback.WhitespaceThrowableProxyConverter"/>
    <conversionRule conversionWord="wEx"
                    converterClass="org.springframework.boot.logging.logback.ExtendedWhitespaceThrowableProxyConverter"/>
    <!-- 控制台日志输出 -->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>${CONSOLE_LOG_PATTERN}</pattern>
        </encoder>
    </appender>

    <!-- 日志文件调试输出 -->
    <appender name="info" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/info.log</file>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!--filter：用于过滤日志
            level：匹配等级是INFO
            onMatch：当匹配时ACCEPT
            onMismatch：不匹配时DENY，不匹配的过滤掉
            -->
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level -&#45;&#45; [%thread] %logger Line:%-3L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- 日志归档 -->
            <fileNamePattern>${log.path}/%d{yyyy-MM, aux}/info.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <!--日志文档保留最大大小-->
            <maxFileSize>50MB</maxFileSize>
            <!--日志文档保留天数-->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>
    <!-- 日志文件调试输出 -->
    <appender name="warn" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/warn.log</file>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level -&#45;&#45; [%thread] %logger Line:%-3L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- 日志归档 -->
            <fileNamePattern>${log.path}/%d{yyyy-MM, aux}/warn.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <!--日志文档保留最大大小-->
            <maxFileSize>50MB</maxFileSize>
            <!--日志文档保留天数-->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>
    <!-- 日志文件调试输出 -->
    <appender name="debug" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/debug.log</file>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level -&#45;&#45; [%thread] %logger Line:%-3L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- 日志归档 -->
            <fileNamePattern>${log.path}/%d{yyyy-MM, aux}/debug.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <!--日志文档保留最大大小-->
            <maxFileSize>50MB</maxFileSize>
            <!--日志文档保留天数-->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>

    <!-- 日志文件错误输出 -->
    <appender name="error" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!-- 正在记录的日志文档的路径及文档名 -->
        <file>${log.path}/error.log</file>
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>ERROR</level>
        </filter>
        <!--日志文档输出格式-->
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level -&#45;&#45; [%thread] %logger Line:%-3L - %msg%n</pattern>
            <charset>UTF-8</charset>
        </encoder>
        <!-- 日志记录器的滚动策略，按日期，按大小记录 -->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!-- 日志归档 -->
            <fileNamePattern>${log.path}/%d{yyyy-MM}/error.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <!--日志文档保留最大大小-->
            <maxFileSize>50MB</maxFileSize>
            <!--日志文档保留天数-->
            <maxHistory>30</maxHistory>
        </rollingPolicy>
    </appender>

    <!--nacos 心跳 INFO 屏蔽-->
    <logger name="com.alibaba.nacos" level="OFF">
        <appender-ref ref="error"/>
    </logger>

    <!-- 开发、测试环境，额外指定不同包下不同的日志等级 -->
    <springProfile name="dev,test">
        <logger name="org.springframework.web" level="ERROR">
        </logger>
        <logger name="org.springboot.sample" level="ERROR">
        </logger>
        <logger name="com.ipage.work" level="INFO">
        </logger>
    </springProfile>

    <!-- 生产环境 -->
    <springProfile name="prod">
        <logger name="org.springframework.web" level="ERROR">
        </logger>
        <logger name="org.springboot.sample" level="ERROR">
        </logger>
        <logger name="com.ipage.work" level="INFO">
        </logger>
    </springProfile>

    <!-- 日志级别  从高到低 OFF、FATAL、ERROR、WARN、INFO、DEBUG、TRACE、 ALL-->
    <root level="INFO">
        <appender-ref ref="debug"/>
        <appender-ref ref="info"/>
        <appender-ref ref="warn"/>
        <appender-ref ref="error"/>
        <appender-ref ref="console"/>
    </root>
</configuration>

```

## 2.log4j2 日志

###  1.依赖`slf4j2`日志

```xml
<!-- springboot相关依赖 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter</artifactId>
    <!-- 排除依赖 -->
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-log4j2</artifactId>
</dependency>
```

### **2.application.yaml**

```yaml
logging:
  config: classpath:log4j2-spring.xml
```

### **3.resources --> log4j2-spring.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!--Configuration后面的status，这个用于设置log4j2自身内部的信息输出，可以不设置，当设置成trace时，你会看到log4j2内部各种详细输出 -->
<!--monitorInterval：Log4j能够自动检测修改配置 文件和重新配置本身，设置间隔秒数 -->
<configuration monitorInterval="5">
    <!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL -->

    <!--变量配置 -->
    <Properties>
        <!--
         %date 或 %d{yyyy-MM-dd HH:mm:ss.SSS}：表示输出到毫秒的时间
         %t 或 %thread：输出当前线程的名称
         %X：按MDC输出日志，使用示例：在日志打印前执行MDC.put("httpRequestId", requestId)，打印之后执行MDC.remove("httpRequestId")
         %-5level：输出日志级别，-5表示左对齐并且固定输出5个字符，如果不足在右边补空格
         %logger{80}：输出logger名称
         %msg：输出日志内容
         %n：换行
         -->
        <!-- 格式化输出：%date表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度 %msg：日志消息，%n是换行符 -->
        <!-- %logger{36} 表示 Logger 名字最长36个字符 -->

        <!-- 定义日志存储的路径，不要配置相对路径 -->
        <property name="app_name" value="app" />
        <property name="log_path" value="./data/logs/${app_name}" />
    </Properties>

    <appenders>
        <!--输出到控制台-->
        <console name="Console" target="system_out">
            <!--输出日志的格式 -->
            <PatternLayout pattern="%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %clr{[%4t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx" charset="UTF-8"/>
            <!--控制台只输出level及其以上级别的信息（onMatch），其他的直接拒绝（onMismatch） -->
            <ThresholdFilter level="debug" onMatch="accept" onMismatch="deny" />
        </console>

        <!-- 这个会打印出所有的info及以下级别的信息，每次大小超过size，则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，作为存档 -->
        <RollingFile name="info" fileName="${log_path}/info.log"
                     filePattern="${log_path}/${app_name}-info-%d{yyyy-MM-dd}_%i.log.gz">

            <!--控制台只输出level及以上级别的信息（onMatch），其他的直接拒绝（onMismatch） -->
            <ThresholdFilter level="info" onMatch="accept" onMismatch="deny" />
            <PatternLayout pattern="%d [%t] %-5p [%c] - %m%n" charset="UTF-8"/>
            <Policies>
                <!--interval属性用来指定多久滚动一次，默认是1 hour -->
                <TimeBasedTriggeringPolicy interval="1" modulate="true" />
                <!-- 限制单个文件大小 -->
                <SizeBasedTriggeringPolicy size="10MB" />
            </Policies>
            <!-- DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件开始覆盖 -->
            <DefaultRolloverStrategy compressionLevel="0" max="15" />
        </RollingFile>


        <!-- 这个会打印出所有的warn及以下级别的信息，每次大小超过size，则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，作为存档 -->
        <RollingFile name="warn" fileName="${log_path}/warn.log"
                     filePattern="${log_path}/${app_name}-warn-%d{yyyy-MM-dd}_%i.log.gz">
            <!--控制台只输出level及以上级别的信息（onMatch），其他的直接拒绝（onMismatch） -->
            <ThresholdFilter level="warn" onMatch="accept" onMismatch="deny" />
            <PatternLayout pattern="%d [%t] %-5p [%c] - %m%n" charset="UTF-8"/>
            <Policies>
                <!--interval属性用来指定多久滚动一次，默认是1 hour -->
                <TimeBasedTriggeringPolicy interval="1" modulate="true" />
                <!-- 限制单个文件大小 -->
                <SizeBasedTriggeringPolicy size="10MB" />
            </Policies>
            <!-- DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件开始覆盖 -->
            <DefaultRolloverStrategy compressionLevel="0" max="15" />
        </RollingFile>


        <!-- 这个会打印出所有的error及以下级别的信息，每次大小超过size，则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，作为存档 -->
        <RollingFile name="error" fileName="${log_path}/error.log"
                     filePattern="${log_path}/${app_name}-error-%d{yyyy-MM-dd}_%i.log.gz">
            <!--控制台只输出level及以上级别的信息（onMatch），其他的直接拒绝（onMismatch） -->
            <ThresholdFilter level="error" onMatch="accept" onMismatch="deny" />
            <PatternLayout pattern="%d [%t] %-5p [%c] - %m%n" charset="UTF-8"/>
            <Policies>
                <!--interval属性用来指定多久滚动一次，默认是1 hour -->
                <TimeBasedTriggeringPolicy interval="1" modulate="true" />
                <!-- 限制单个文件大小 -->
                <SizeBasedTriggeringPolicy size="10MB" />
            </Policies>
            <!-- DefaultRolloverStrategy属性如不设置，则默认为最多同一文件夹下7个文件开始覆盖 -->
            <DefaultRolloverStrategy compressionLevel="0" max="15" />
        </RollingFile>
    </appenders>


    <!--Logger节点用来单独指定日志的形式，比如要为指定包下的class指定不同的日志级别等。 -->
    <!--然后定义loggers，只有定义了logger并引入的appender，appender才会生效 -->
    <loggers>
        <!--过滤掉spring和mybatis的一些无用的DEBUG信息 -->
        <logger name="org.mybatis" level="info" additivity="false">
            <AppenderRef ref="Console" />
        </logger>
        <!--监控系统信息 -->
        <!--若是additivity设为false，则 子Logger 只会在自己的appender里输出，而不会在 父Logger 的appender里输出。 -->
        <Logger name="org.springframework" level="info"
                additivity="false">
            <AppenderRef ref="Console" />
        </Logger>
        <root level="info">
            <appender-ref ref="Console" />
            <appender-ref ref="info" />
            <appender-ref ref="warn" />
            <appender-ref ref="error" />
        </root>
    </loggers>
</configuration>
```