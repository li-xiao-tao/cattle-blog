# 自用Docker-Compose

```yaml
version: '3.9'
services:
  #mysql数据库脚本
  mysql:
#    build:
#      context: ./db
    #版本
    image: mysql:latest
    #在my.cnf 添加了lower-case-table-names=1，启动mysql需要此命令
    #command: --lower-case-table-names=1
    #容器名称
    container_name: mysql
    # 重启方式
    restart: always
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.2
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "3306:3306"
    #数据卷挂载
    volumes:
      - /home/docker/mysql/data:/var/lib/mysql:rw
      - /home/docker/mysql/my.cnf:/etc/mysql/my.cnf
      - /home/docker/mysql/logs:/var/log/mysql
    # 环境配置
    environment:
      MYSQL_USER: admin
      MYSQL_PASSWORD: root
      MYSQL_ROOT_PASSWORD: root
      # 时区上海
      TZ: Asia/Shanghai
    #命令 # 最大连接数 # 字符集服务器 # 整理服务器# 默认身份验证插件
    command:
      --max_connections=1000
      --character-set-server=utf8mb4
      --collation-server=utf8mb4_general_ci
      --explicit_defaults_for_timestamp=true
      --default-authentication-plugin=mysql_native_password
  #postgres脚本
  postgres:
    #版本
    image: postgres:14.2-bullseye
    #容器名
    container_name: postgres
    # 重启方式
    restart: always
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "5432:5432"
    #数据卷挂载
    volumes:
      - /home/docker/postgres/data:/var/lib/postgresql/data
    # 环境配置
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.3
  #redis集群数据库脚本
  redis-m1:
    # 基础镜像
    image: redis:7.0.0
    container_name: redis-m1 # 容器名称
    # 重启方式
    restart: always
    # 环境变量
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
      - REDISCLI_AUTH=123456
    # 标准输入打开
    stdin_open: true
    # 后台运行不退出
    tty: true
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.4
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "6379:6379"
      - "16379:16379"
    # 映射数据卷，配置目录
    volumes: [
      "/home/docker/redis-cluster/redis-m1/data:/data",
      "/home/docker/redis-cluster/redis-m1/conf/redis.conf:/etc/redis/redis.conf",
      "/etc/localtime:/etc/localtime"
    ]
    command: [
      "redis-server",
      "/etc/redis/redis.conf"
    ]
    logging:
      options:
        max-size: '100m'
        max-file: '10'
  redis-m2:
    # 基础镜像
    image: redis:7.0.0
    container_name: redis-m2 # 容器名称
    # 重启方式
    restart: always
    # 环境变量
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
      - REDISCLI_AUTH=123456
    # 标准输入打开
    stdin_open: true
    # 后台运行不退出
    tty: true
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.5
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "6380:6380"
      - "16380:16380"
    # 映射数据卷，配置目录
    volumes: [
      "/home/docker/redis-cluster/redis-m2/data:/data",
      "/home/docker/redis-cluster/redis-m2/conf/redis.conf:/etc/redis/redis.conf",
      "/etc/localtime:/etc/localtime"
    ]
    command: [
      "redis-server",
      "/etc/redis/redis.conf"
    ]
    logging:
      options:
        max-size: '100m'
        max-file: '10'
  redis-m3:
    # 基础镜像
    image: redis:7.0.0
    container_name: redis-m3 # 容器名称
    # 重启方式
    restart: always
    # 环境变量
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
      - REDISCLI_AUTH=123456
    # 标准输入打开
    stdin_open: true
    # 后台运行不退出
    tty: true
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.6
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "6381:6381"
      - "16381:16381"
    # 映射数据卷，配置目录
    volumes: [
      "/home/docker/redis-cluster/redis-m3/data:/data",
      "/home/docker/redis-cluster/redis-m3/conf/redis.conf:/etc/redis/redis.conf",
      "/etc/localtime:/etc/localtime"
    ]
    command: [
      "redis-server",
      "/etc/redis/redis.conf"
    ]
    logging:
      options:
        max-size: '100m'
        max-file: '10'
  redis-s1:
    # 基础镜像
    image: redis:7.0.0
    container_name: redis-s1 # 容器名称
    # 重启方式
    restart: always
    # 环境变量
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
      - REDISCLI_AUTH=123456
    # 标准输入打开
    stdin_open: true
    # 后台运行不退出
    tty: true
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.7
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "6382:6382"
      - "16382:16382"
    # 映射数据卷，配置目录
    volumes: [
      "/home/docker/redis-cluster/redis-s1/data:/data",
      "/home/docker/redis-cluster/redis-s1/conf/redis.conf:/etc/redis/redis.conf",
      "/etc/localtime:/etc/localtime"
    ]
    command: [
      "redis-server",
      "/etc/redis/redis.conf"
    ]
    logging:
      options:
        max-size: '100m'
        max-file: '10'
  redis-s2:
    # 基础镜像
    image: redis:7.0.0
    container_name: redis-s2 # 容器名称
    # 重启方式
    restart: always
    # 环境变量
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
      - REDISCLI_AUTH=123456
    # 标准输入打开
    stdin_open: true
    # 后台运行不退出
    tty: true
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.8
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "6383:6383"
      - "16383:16383"
    # 映射数据卷，配置目录
    volumes: [
      "/home/docker/redis-cluster/redis-s2/data:/data",
      "/home/docker/redis-cluster/redis-s2/conf/redis.conf:/etc/redis/redis.conf",
      "/etc/localtime:/etc/localtime"
    ]
    command: [
      "redis-server",
      "/etc/redis/redis.conf"
    ]
    logging:
      options:
        max-size: '100m'
        max-file: '10'
  redis-s3:
    # 基础镜像
    image: redis:7.0.0
    # 容器名称
    container_name: redis-s3
    # 重启方式
    restart: always
    # 环境变量
    environment:
      - TZ=Asia/Shanghai
      - LANG=en_US.UTF-8
      - REDISCLI_AUTH=123456
    # 标准输入打开
    stdin_open: true
    # 后台运行不退出
    tty: true
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.9
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "6384:6384"
      - "16384:16384"
    # 映射数据卷，配置目录
    volumes: [
      "/home/docker/redis-cluster/redis-s3/data:/data",
      "/home/docker/redis-cluster/redis-s3/conf/redis.conf:/etc/redis/redis.conf",
      "/etc/localtime:/etc/localtime"
    ]
    command: [
      "redis-server",
      "/etc/redis/redis.conf"
    ]
    logging:
      options:
        max-size: '100m'
        max-file: '10'

  #nacos服务脚本
  nacos:
    #版本
    image: nacos/nacos-server:v2.1.2
    #容器名称
    container_name: nacos
    # 重启方式
    restart: always
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.10
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "8848:8848"
    #数据卷挂载
    volumes:
      - /home/docker/nacos/config:/home/nacos/conf
      - /home/docker/nacos/logs:/home/nacos/logs
      - /home/docker/nacos/data:/home/nacos/data
    # 环境配置
    environment:
      #数据源平台 仅支持mysql或不保存empty
      SPRING_DATASOURCE_PLATFORM: mysql
      # 单节点
      MODE: standalone
      JVM_XMS: 128m
      JVM_MMS: 64m
      JVM_XMN: 64m
    depends_on:
      - mysql
  #xxl-job脚本
  xxl-job:
    #版本
    image: xuxueli/xxl-job-admin:2.3.1
    # 容器名
    container_name: xxl-job-admin
    # 重启方式
    restart: always
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.11
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "8001:8080"
    #数据卷挂载
    volumes:
      - /home/docker/xxl-job/logs:/data/applogs/xxl-job
      - /home/docker/xxl-job/application.properties:/data/application.properties
    # 环境配置 这个地方重要，挂载的是自定义配置文件
    environment:
      PARAMS: '--spring.config.location=/data/application.properties'
    deploy:
      resources:
        limits:
          memory: 500M
        reservations:
          memory: 30M
    depends_on:
      - mysql
  #seata服务脚本
  seata-server:
    #版本
    image: seataio/seata-server:1.5.0
    # 容器名
    container_name: seata-server
    # 重启方式
    restart: always
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.12
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - "8091:8091"
      - "7091:7091"
    # 环境配置
    environment:
      STORE_MODE: file
      SEATA_PORT: 8091
  #rabbitmq脚本
  rabbitmq:
    #版本
    image: rabbitmq:3.8.3-management
    # 容器名
    container_name: rabbitmq
    # 重启方式
    restart: always
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.13
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - 15672:15672
      - 5672:5672
    #数据卷挂载
    volumes:
      - /home/docker/rabbitmq/data:/var/lib/rabbitmq
    # 环境配置
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin
  #sentinel脚本
  sentinel:
    #版本
    image: bladex/sentinel-dashboard
    # 容器名
    container_name: sentinel
    # 重启方式
    restart: always
    # 使用network模式
    networks:
      network:
        ipv4_address: 172.18.0.14
    # 拥有容器内命令执行的权限
    privileged: true
    # 端口映射
    ports:
      - 8858:8858
#网络
networks:
  network:
    ipam:
      config:
      - subnet: 172.18.0.0/24

```