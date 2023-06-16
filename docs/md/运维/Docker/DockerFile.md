
# DockerFile

## 创建`DockerFile`文件
<!---------------------------- tabs:start ------------------------------>
<!-------- tab:Node 案例一 -------->

```dockerfile
#定制的镜像都是基于 FROM 的镜像，这里的 node 就是定制需要的基础镜像。后续的操作都是基于 node。
FROM node:latest
# 设置维护者信息
MAINTAINER 作者 123456@qq.com

ARG registry=https://registry.npm.taobao.org
ARG disturl=https://npm.taobao.org/dist
RUN yarn config set disturl $disturl && yarn config set registry $registry
COPY ../../Docker /blog
# 指定工作目录。
WORKDIR /blog
RUN npm install -g docsify-cli@latest --registry=https://registry.npm.taobao.org
# 仅仅只是声明端口，告诉开发中容器内的实际端口。构建容器还需自定义端口
EXPOSE 3000
CMD ["docsify", "serve", "."]
```
<!-------- tab:Node 案例二 -------->
```dockerfile
#定制的镜像都是基于 FROM 的镜像，这里的 node 就是定制需要的基础镜像。后续的操作都是基于 node。
FROM node:latest
# 类似于 CMD 指令，但其不会被 docker run 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序
# 如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。
# 设置维护者信息
MAINTAINER 作者 123456@qq.com
# 用于指定执行后续命令的用户和用户组，这边只是切换后续命令执行的用户（用户和用户组必须提前已经存在）。
# 使用 root用户操作
USER root
#ENV 设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。
# 修改容器时间（以上为构建镜像时执行）
ENV TZ="Asia/Shanghai"
# 将主机文件拷贝到容器中
COPY ./locale/* /usr/lib/locale/
ENV LANG=zh.CN.utf8
ENV source /etc/profile
# VOLUME ["<路径1>", "<路径2>"...] 容器挂在

# ARG构建参数，与 ENV 作用一致。不过作用域不一样。ARG 设置的环境变量仅对 Dockerfile 内有效，也就是说只有 docker build 的过程中有效，构建好的镜像内不存在此环境变量。
ARG registry=https://registry.npm.taobao.org
ARG disturl=https://npm.taobao.org/dist
#RUM 用于执行后面跟着的命令行命令 -- # <命令行命令> 等同于，在终端操作的 shell 命令。
# Dockerfile 的指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大，不要过多，推荐用&& 符号
RUN yarn config set disturl $disturl && yarn config set registry $registry
COPY ./ /blog
# 指定工作目录。
WORKDIR /blog
RUN npm install -g docsify-cli@latest --registry=https://registry.npm.taobao.org
# 仅仅只是声明端口，告诉开发中容器内的实际端口。构建容器还需自定义端口
EXPOSE 3000
CMD ["docsify", "serve", "."]
```
<!---------------------------- tabs:end ------------------------------>

## 构建`Docker`镜像

<!---------------------------- tabs:start ------------------------------>
<!-------- tab:模板 -------->
```shell
docker build -t 镜像名:版本 .
```
<!-------- tab:Node 案例 -------->
```shell
docker build -t cattle-doc:v1.0 .
```
<!---------------------------- tabs:end ------------------------------>





