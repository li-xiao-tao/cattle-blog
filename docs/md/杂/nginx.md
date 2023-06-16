```txt
# 有关配置的详细信息，请参阅：
#   * 官方英文文档： http://nginx.org/en/docs/
#   * 俄罗斯官方文件： http://nginx.org/ru/docs/
#   * 官方中文文档： https://blog.redis.com.cn/doc/

# -------------------nginx全局配置-------------------
user nginx; # 这个指令指定了 Nginx 进程运行的用户,比如root
worker_processes auto; # 这个指令定义了 Nginx 的 worker 进程数。"auto" 告诉 Nginx 自动检测可用的 CPU 核心数，并为每个核心分配一个 worker 进程。这样可以最大程度地利用服务器资源。
error_log /home/nginx/logs/error.log; # 错误日志位置
pid /run/nginx/nginx.pid; # 这个指令定义了 Nginx 主进程的 PID 文件的路径和文件名。在这里，PID 文件将被写入到 /run/nginx.pid 文件中。PID 文件用于管理 Nginx 进程，例如启动、停止和重新加载配置等操作。

# 加载动态模块。看 /usr/share/doc/nginx/README.dynamic.
#include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024; # 设置每个工作进程（worker process）可同时处理的最大连接数。
    accept_mutex on;
}

http {
    # 定义了日志的格式，这里的格式命名为 "main"。它包含了一些占位符，如 $remote_addr（客户端IP地址）、$remote_user（远程用户）、$time_local（访问时间）等，用于记录访问日志的详细信息。
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    # 指定了访问日志的存储路径和使用的日志格式。在这个例子中，访问日志将被写入 /var/log/nginx/access.log 文件，并使用上述定义的 "main" 日志格式。
    access_log  /home/nginx/logs/access.log  main;

    sendfile            on; # 启用了sendfile功能，用于提高文件传输的效率。
    tcp_nopush          on; # 这两个参数用于优化TCP传输的性能。
    tcp_nodelay         on; # 这两个参数用于优化TCP传输的性能。
    keepalive_timeout   60; # 设置了客户端与服务器之间的长连接超时时间，这里设定为 60 秒。
    types_hash_max_size 2048; #设置了MIME类型哈希表的最大尺寸
    client_max_body_size 100m; #设置了允许客户端发送的最大请求体大小，这里限制为 100MB。

    include             ./mime.types; #其他的配置文件
    default_type        application/octet-stream; #是一个通用的 MIME 类型，表示二进制流文件。它通常用于指示未知文件类型或不适合其他具体 MIME 类型的文件。

    gzip  on; #启用了Gzip压缩，用于减小传输的数据量，提高响应速度。
    gzip_min_length 1k; #设置了Gzip压缩的最小文件大小，小于1KB的文件不会被压缩。
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript; #指定需要压缩的 MIME 类型。
    gzip_vary on; #在响应头中添加 Vary: Accept-Encoding，告知客户端支持压缩。
    gzip_comp_level 5;#设置压缩级别，范围为 1（最低）到 9（最高）。较高的压缩级别会消耗更多的 CPU 资源。建议设置在5左右。
    gzip_http_version 1.1;#设置支持压缩的 HTTP 版本。
    gzip_proxied any;#设置是否对代理服务器的响应进行压缩。

    # 从 /nginx/conf.d 目录加载多个conf配置文件。
    include ./conf.d/*.conf;
}


```

```txt
    upstream halo {
        server localhost:3003;
    }
    server {
        listen 80;
        server_name www.study-tao.top study-tao.top;
        # 强制重定向到https的协议
        return 301 www.study-tao.top$request_uri;
    }
    server {
        #SSL 默认访间端口号为 443
        listen 443 ssl;
        #请填写绑定证书的域名
        server_name www.study-tao.top study-tao.top;
    
        #请填写证书文件的相对路径或绝对路径
        #ssl_certificate ;
        #请填写私钥文件的相对路径或绝对路径
        #ssl_certificate_key ;
        ssl_session_timeout 5m;
        #请按照以下协议配置
        ssl_protocols TLSv1.2 TLSv1.3;
        #请按照以下套件配置，配置加密套件，写法遵循 openss 标准。
        ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE';

        ssl_prefer_server_ciphers on;
    
        if ( $host != 'www.study-tao.top' ) {
            rewrite ^(.*)$ https://www.study-tao.top$1 permanent;
        }
        location / {
            # proxy pass http://halo;
            #proxy set header HoST $host;
            # proxy set header
            #X-Forwarded-Proto Sscheme;
            # proxy_set header X-Real-Ip Sremote addr;
            # proxy_set header X-Forwarded-For $proxyadd x forwarded for;
            #日志单独输出
            # access log logs/access.8080.1og mylog;
            # 声明10g 10g位警 log格式，
            # access 1og/home/Togs/main-web.access.1og;
            root /home/main-docs;
            index index.html index.htm;
        }
    }
```