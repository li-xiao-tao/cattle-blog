FROM node:lts AS BUILD_IMAGE

WORKDIR /app

COPY . /app

RUN yarn install --registry https://registry.npmmirror.com/ && yarn run build

FROM nginx:alpine

COPY /nginx/nginx.conf /etc/nginx/conf.d/cattle-blog.conf

COPY ./docs/.vitepress/dist/ /usr/share/nginx/html/

EXPOSE 80
