# 第一个阶段：构建应用程序
FROM node:22.1-alpine3.18 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
# 复制 package 配置文件
COPY package.json package-lock.json pnpm-lock.yaml /app/
# 使用 pnpm 安装依赖
RUN pnpm install --registry https://registry.npmmirror.com/
# 安装 git
RUN apk add --no-cache git
# 复制项目剩余文件
COPY . /app
# 使用 pnpm 构建项目
RUN pnpm build --registry https://registry.npmmirror.com/
# 清理不必要的文件
RUN rm -rf node_modules

# 第二个阶段：部署到Nginx
FROM nginx:alpine
# 复制 Nginx 配置文件
COPY --from=base /app/nginx/nginx.conf /etc/nginx/conf.d/cattle-blog.conf
# 复制构建的静态文件
COPY --from=base /app/docs/.vitepress/dist/ /usr/share/nginx/html/
# 声明容器将监听 80 端口
EXPOSE 80