# Jenkins 流水线 pipeline

## 了解 pipeline

```shell
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
    }
}
```

> `pipeline` 定义一个流水线脚本
> 
> `agent` 指示 Jenkins 为整个流水线分配一个执行器（在 Jenkins 环境中的任何可用代理/节点上）和工作区。
> 
> `stages` 全部的工作都在这里执行
> 
> `stage` 每个工作开始
> 
> `steps` jenkinsfile 声明式脚本往这里面写
> 
> `echo` 写一个简单的字符串到控制台输出。