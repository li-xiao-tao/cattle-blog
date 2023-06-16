# 通配SSL证书
- 不用每个域名都去创建一次证书


## 免费申请地址
[OHTTPS](https://ohttps.com/)

### 1、需要注册账号
![img_1.png](img/img_1.png)

### 2、选择泛域名
- 输入`*.你自己的主域名`,例子：`*.abc.com`
![img_2.png](img/img_2.png)

### 3、选择`免DNS授权模式`
![img_3.png](img/img_3.png)

### 4、添加到你的域名解析位置

- 这里的主机记录只需要输入前面一节

![img_4.png](img/img_4.png)

### 5、验证解析记录
![img_5.png](img/img_5.png)

### 6、创建证书
![img_6.png](img/img_6.png)
![img_7.png](img/img_7.png)

### 7、通配解析二级域名

- 不需要每个二级域名就创建个解析
- 只需要`nginx`配置好就行

![img_8.png](img/img_8.png)