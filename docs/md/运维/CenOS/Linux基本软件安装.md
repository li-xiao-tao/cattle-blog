---
title: 基本软件安装
# 取二三级标题生成目录
outline: [1,2]
---
# 常用软件如JDK、Maven、nvm等安装

- JDK
- Nginx
- Maven
- Git
- Node
- nvm - node 版本管理器

> 建议，这些软件都安装到一个总目录下，我全部弄到`/home/soft/`，
>
> `/home/soft/java`、`/home/soft/nvm`、`/home/soft/maven`、、、
>
> 原因：`jenkins`需要挂载进去，网页`vscode`需要挂载进去,统一管理比较好

## 1  安装` JDK`

### 1、卸载

- 环境因为操作系统默认已经安装了 opendjdk,

```sh
# 查看
rpm-qa|grep java
```

**删除(把上一个命令看到的所有的jdk文件 用 如下命令删除)**

```sh
rpm-e--nodeps java-1.8.0-openjdk-1.8.0.232.b09-0.el7_7.x86_64
rpm-e--nodeps java-1.8.0-openjdk-headless-1.8.0.232.b09-0.el7_7.x86_64
rpm-e--nodeps java-1.7.0-openjdk-headless-1.7.0.241-2.6.20.0.el7_7.x86_64
rmp-e--nodeps java-1.7.0-openjdk-1.7.0.241-2.6.20.0.el7_7.x86_64
```

### 2、去官网下载

- [Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/#java8)
- 下载的是`jdk-8u371-linux-x64.tar.gz`,其中版本`8u371`自选

### 3、上传至服务器

- 选择自定义目录，我`/home/soft/`

- 华为镜像地址：http://mirrors.huaweicloud.com/java/jdk/8u202-b08/jdk-8u202-linux-x64.tar.gz

  ```sh
  curl -o /home/soft/jdk-8u202-linux-x64.tar.gz -sSL http://mirrors.huaweicloud.com/java/jdk/8u202-b08/jdk-8u202-linux-x64.tar.gz -O
  ```

### 4、解压

- 创建安装文件夹

```sh
mkdir /home/soft/java
```

- 解压

```
tar -xzf /home/soft/jdk-8u202-linux-x64.tar.gz -C /home/soft/java --strip-components=1 
```

### 5、配置环境变量

- 编辑环境

```sh
vi /etc/profile
```

- 结尾添加

```sh
export JAVA_HOME=/home/soft/java/
export JRE_HOME=/home/soft/java/jre
export CLASSPATH=$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
```

- 保存退出
- 重新加载环境变量：

```
source /etc/profile
```

### 6、查看版本

```sh
java -version

javac -version
```



## 2 安装`nginx`

### 1、安装 Nginx

```
sudo yum install nginx
```

### 2、启动 Nginx 服务

- 同时使其在开机时自动启动：

```
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 3、确认 Nginx 是否已经正确安装并正在运行

- 可以访问服务器的公共 IP 地址（或者域名），在浏览器中输入：

```
http://服务器公共 IP 地址
```

- 如果一切正常，你应该能够看到 Nginx 的欢迎页面。

### 4、配置文件地址

```sh
/etc/nginx/nginx.conf
```



## 3 安装`maven`

### 1、创建目录，并下载

```sh
mkdir /home/soft/
```

- 下载

```sh
wget https://dlcdn.apache.org/maven/maven-3/3.9.0/binaries/apache-maven-3.9.0-bin.tar.gz /home/soft/maven

# or

curl -o /home/soft/apache-maven-3.9.0-bin.tar.gz -sSL https://dlcdn.apache.org/maven/maven-3/3.9.0/binaries/apache-maven-3.9.0-bin.tar.gz -O
```

### 2、解压

```sh
tar -xzf /home/soft/apache-maven-3.9.0-bin.tar.gz -C /home/soft/maven --strip-components=1 
```

### 3、配置环境变量

```sh
vim /etc/profile
```

- 在文件结尾添加

```sh
MAVEN_HOME=/home/soft/maven
export MAVEN_HOME
export PATH=${PATH}:${MAVEN_HOME}/bin
```

- 配置文件生效

```sh
source /etc/profile
```

### 4、增加权限

```sh
chmod a+x /home/soft/maven/bin/mvn
```

### 5、查看版本

```sh
mvn -v
```

### 6、报错看这

- 报错信息

```sh
The JAVA_HOME environment variable is not defined correctly
This environment variable is needed to run this program
NB: JAVA_HOME should point to a JDK not a JRE
```

- 会提示你`java`没有配置好环境变量，如果`java -version`和`javac -version`展示正常，那不是你的原因
- 重新去[Java Downloads | Oracle](https://www.oracle.com/java/technologies/downloads/#java8)下载新的jdk，即可

## 4 升级`GIT`

### 1、卸载

```sh
yum -y remove git
```

### 2、安装

```sh
yum -y install git
```

### 3、查看版本

```sh
git --vresion
```

## 5 安装`node`

### 1、安装 Node.js 和 npm：

```sh
sudo yum install npm
```

### 2、确认 Node.js 和 npm 已经正确安装：

```sh
node -v
npm -v
```

### 3、配置淘宝镜像

```sh
#设置淘宝镜像
npm config set registry https://registry.npm.taobao.org
```

## 6 安装`NVM`

是的，您可以通过手动下载v0.39.3.tar.gz文件并进行安装来避免使用curl命令下载install.sh脚本时可能出现的网络问题。

请按照以下步骤进行操作：

### 1、创建文件夹存放软件

```sh
mkdir /home/soft/nvm
```

### 2、下载`NVM`

- https://github.com/nvm-sh/nvm/releases 可选择指定版本

```sh
curl -o /home/soft/nvm.tar.gz -sSL https://github.com/nvm-sh/nvm/archive/v0.39.3.tar.gz -O
```

- 无法下载或下载慢就看下面
- https://hosts.gitcdn.top/hosts.txt 国内获取github连接地址，并修改`host`文件

```sh
vi /etc/hosts
```

- 添加在`https://hosts.gitcdn.top/hosts.txt`获取的加速地址,

``````````sh
185.199.111.153             github.io
20.207.73.82                github.com

`````````
``````````

### 3、将nvm.tar.gz文件解压缩到想要安装NVM的目录中：

```sh
tar -xzf nvm.tar.gz -C /home/soft/nvm --strip-components=1
```

### 4、在终端中运行以下命令以激活NVM：

```
source ~/.bashrc
```

### 5、配置环境变量

- 编辑环境变量：

```
vi /etc/profile
```

- 在文件末尾添加以下内容：

```
# NVM setup
export NVM_DIR="/home/soft/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm use default
```

- 保存并关闭`/etc/profile`文件，然后运行以下命令重新加载环境变量：

```
source /etc/profile
```

- 现在你已经成功地安装了NVM。可以通过运行以下命令来检查NVM版本：

```sh
nvm -v
```

### 6、配置下载镜像源

- 编辑`~/.bashrc`.

  ```sh
  ~/.bashrc
  ```

- 在结尾添加配置

  ```sh
  export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
  export NVM_IOJS_ORG_MIRROR=https://npm.taobao.org/mirrors/iojs/
  export NVM_REGISTRY_MIRROR=https://registry.npm.taobao.org/
  ```

- 重新加载配置

  ```sh
  source ~/.bashrc
  ```

- 检查

  ```sh
  npm get registry
  ```

  - 控制台打印结果

  ```sh
  https://registry.npm.taobao.org/
  ```

  
```shell
export PATH=$PATH:/home/docker/docker-compose

export JAVA_HOME=/home/soft/java
export JRE_HOME=/home/soft/java/jre
export CLASSPATH=$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH


export MAVEN_HOME=/home/soft/maven
export PATH=${PATH}:${MAVEN_HOME}/bin

export NODE_HOME=/home/soft/node
export PATH=$PATH:${NODE_HOME}/bin

```