FROM nginx:alpine

COPY /nginx/nginx.conf /etc/nginx/conf.d/cattle-blog.conf

COPY ./docs/.vitepress/dist/ /usr/share/nginx/html/

EXPOSE 80