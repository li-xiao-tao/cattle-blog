# 配置JAVA环境变量

## 在Windown 配置

- `win + R` 打开`运行`,输入`sysdm.cpl`回车
- 菜单高级-->点击`环境变量`
- `系统变量`新建JAVA环境变量
- 变量名`JAVA_HOME`,变量值`D:\jdk1.8`(自己安装地址)
- 变量名`CLASSPATH`,变量值`.;%Java_Home%\bin;%Java_Home%\lib\dt.jar;%Java_Home%\lib\tools.jar`(确保Java程序在运行时能够找到所需的类文件和库文件，从而正常执行。)
- 编辑`Path`,添加`%JAVA_HOME%\bin`和`%JAVA_HOME%\jre\bin`
- 保存
- 在`cmd`输入`java -version`和`javac -version`校验安装。