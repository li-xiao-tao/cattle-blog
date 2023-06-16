# SpringBoot 整合 Elasticsearch + Easy-Es
 - Elasticsearch官网
   - https://www.elastic.co/cn/elasticsearch/
 - Easy-Es官网
   - https://www.easy-es.cn/
 - [Elasticsearch + kibana 安装](https://cattle.study-tao.top/#/md/Docker/Docker%E5%AE%89%E8%A3%85%E5%8F%8A%E5%B8%B8%E7%94%A8%E5%AE%B9%E5%99%A8%E9%83%A8%E7%BD%B2?id=%e4%b8%83-elasticsearch)

## Elasticsearch
 - 概念
### 倒排索引 
   - 什么是倒排索引？倒排索引也叫反向索引，我们通常理解的索引是通过key寻找value，与之相反，倒排索引是通过value寻找key，故而被称作反向索引。
   - 正排索引：是以文档对象的唯一 ID 作为索引，以文档内容作为记录的结构。
   - 倒排索引：Inverted index，指的是将文档内容中的单词作为索引，将包含该词的文档 ID 作为记录的结构。
### 分词
   - 在创建索引之前，会对文档中的字符串进行分词。ES中字符串有两种类型，keyword和text。

   - keyword类型的字符串不会被分词，搜索时全匹配查询，可以设置是否需要存储: "index": "true|false"

```sh
PUT /user/_doc/1
{
  "mappings": {
    "properties": {
      "id":{
        "type": "long"
      },
      "name":{
        # keyword的内容不会被分词, 可以设置是否需要存储: "index": "true|false"
        "index":"true",
        "type": "keyword"
      },
      "age":{
        "type": "int"
      },
      "content":{
        "type": "text",
        "analyzer": "ik_max_word"
      }
    }
  }
}
```

   - text类型的字符串会被分词，搜索时是包含查询
     不同的分词器对相同字符串分词的结果大有不同，选择不同的分词器对索引的创建有很大的影响
     
       > 如拆分“中华人民共和国国歌”
```sh
     
- ik_max_word分词器: 最细粒度拆分，分词结果如下：

中华人民共和国
中华人民
中华
华人
人民共和国
人民
人
民
共和国
共和
和
国国
国歌
 
- ik_smart分词器: 最粗粒度的拆分，分词结果如下：

中华人民共和国
国歌

```

### 分片 **shard**

> - 1.分片，ES是分布式搜索引擎，每个索引有一个或多个分片，索引的数据被分配到各个分片上，相当于一桶水   用了N个杯子装 
>
> - 2.分片有助于横向扩展，N个分片会被尽可能平均地（rebalance）分配在不同的节点上（例如你有2个节点，4个主分片(不考虑备份)，那么每个节点会分到2个分片，后来你增加了2个节点，那么你这4个节点上都会有1个分片，这个过程叫relocation，ES感知后自动完成) 
>
> - 3.分片是独立的，对于一个Search Request的行为，每个分片都会执行这个Request.另外 
>
> - 4.每个分片都是一个Lucene Index，所以一个分片只能存放 Integer.MAX_VALUE - 128 = 2,147,483,519个docs。

### 副本 **replica**

> - 1.复制，可以理解为备份分片，相应地有primary shard（主分片） 
>
> - 2.主分片和备分片不会出现在同一个节点上（防止单点故障），默认情况下一个索引创建5个分片一个备份（即5primary+5replica=10个分片） 
>
> - 3.如果你只有一个节点，那么5个replica都无法分配（unassigned），此时cluster status会变成Yellow。

### ES 语法

### 创建索引 && mappings

- test 索引名称

- 高版本需要加_doc  
- /1 为此索引 id

```json
PUT /test/_doc/1
{
  "settings": {
   // es 默认分片 5 会默认平均分类到所有节点上
   "number_of_shards":"2",
   // 分片的备份，集群下，分片和同备份不会在同个节点上
   "number_of_replicas": "2",
   // 自定义分词器
    "analysis": {
      "analyzer": { 
        // 自定义 my_analyzer分词器
        "my_analyzer": { 
          // 先经过ik处理
          "tokenizer": "ik_max_word", 
          // 在经过拼音处理
          "filter": "py"  
        }
      },
      "filter": {
        "py": { 
          "type": "pinyin",
          // 如果打开,它将保存词的全拼,并按字分开保存.例如:刘德华> [liu,de,hua],默认为:true
          "keep_full_pinyin": false,
          // 如果打开将保存词的全拼.例如:刘德华> [liudehua],默认为:false
          "keep_joined_full_pinyin": true,
          // 是否保持原词.默认为:false
          "keep_original": true,
          // 设置最大keep_first_letter结果的长度,默认为:16
          "limit_first_letter_length": 16,
          // 保存索引时删除重复的词语.例如: de的>de, 默认为: false, 注意:开启可能会影响位置相关的查询.
          "remove_duplicated_term": true,
          // 如果他们是拼音,切分非中文成单独的拼音项. 默认为:true,例如: liudehuaalibaba13zhuanghan -> liu,de,hua,a,li,ba,ba,13,zhuang,han, 注意: keep_none_chinese和keep_none_chinese_together需要先开启.
          "none_chinese_pinyin_tokenize": false
        }
      }
    }
  },
  // 映射对象  
  "mappings": {
    "properties": {
      // 字段  
      "name":{
        // 字段类型  
        "type": "text",
        // 分词使用自定义分词器
        "analyzer": "my_analyzer",
        // 查询时还用ik分词器
        "search_analyzer": "ik_smart"
      }
    }
  }
}
```

### 插入数据

- {"index":{"_id":1}} {"name": "学习es的很多天"}  为id为一的插入数据

```json
# 批量插入
POST /test/_bulk
{"index":{"_id":1}}
{"name": "学习es的很多天"}
{"index":{"_id":2}}
{"name": "狮子"}
{"index":{"_id":3}}
{"name": "虱子"}


# 查询此索引的索引数据
POST /test/_search
```

### 查询 && 高亮查询&& 分页

```json
GET /test/_search
{
  "query": {
    "match": {
      "name": "shizi"
    }
  },
  // 高亮
  "highlight": {
    // 指定那个字段为高亮字段
    "fields": {
      "name": {}
    },
    // 指定前缀标签，如 <font color="颜色">,
    "pre_tags": "<font color='red'>",
    // 指定后缀标签，如 </font>
    "post_tags": "</font>",
    // 指定高亮数据展示多少个字符回来；
    "fragment_size": 10
  },
  "from": 0,
  "size": 1
}
```

- SpringBoot-data- elasticsearch 高亮实现方式

  - ```xml
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
            </dependency>
    ```

  - ```java
    import org.springframework.data.elasticsearch.annotations.Highlight;
    import org.springframework.data.elasticsearch.annotations.HighlightField;
    import org.springframework.data.elasticsearch.annotations.HighlightParameters;
    
    public interface UserRepository extends ElasticsearchRepository<User, Long> {
    	    /**
    	     * 关键字检索(title)
    	     *
    	     * @param title 标题
    	     * @return
    	     */
    	    @Highlight(
    				//高亮字段
    	            fields = {
    	                    @HighlightField(name = "title")
    	            },
    	            parameters = @HighlightParameters(
    	                    preTags = "<strong><font style='color:red'>",
    	                    postTags = "</font></strong>",
    	                    fragmentSize = 500,
    	                    numberOfFragments = 3
    	            )
    	    )
    	    List<SearchHit<User>> findByTitle(String title);
    }
    ```
    

### 三种方式分页

[ES(elasticsearch) - 三种姿势进行分页查询_ChengHuanHuaning的博客-CSDN博客_es分页查询三种分页方式能不能联合使用](https://blog.csdn.net/ChengHuanHuaning/article/details/117696054)

- from + size 浅分页

- > from表示从第几行开始，size表示查询多少条文档。from默认为0，size默认为10，最灵活的分页方式
  >
  > 注意：from+size的大小不能超过index.max_result_window这个参数的设置，默认为10,000。
  >
  > 如果搜索from+size大于10000，需要设置index.max_result_window参数（最大为10亿）
  >
  > 数据量越大，越往后翻页，性能越低。搜索引擎深度分页问题，任何查询都不要返回特别大的结果，如google，百度的搜索分页不会超过100页。

- scroll 深分页
  
- > 不适合用来做实时搜索，而更适用于后台批处理任务，如日志导出。
  >
  > 暂存搜索结果，每次传入scroll_id。scroll_id会占用大量资源，用于非实时处理大量数据的情况。
  >
  > 可以通过scroll 初始化查询后，指定scroll_id 结合from+size的方式来实现分页。
  
   
  
- search_after 深分页
  
- >根据上一页的最后一条数据来确定下一页的位置。需要使用一个唯一值的字段作为排序字段。不能自由跳到一个随机页面。要想实现翻页，需要每次记录最后查询的sort。
  >
  >可以通过from+size 加上sort字段获取sort值，再结合search_after实现达到max_result_window后的继续分页。

|   分页方式   | 性能 |                       优点                       |                             缺点                             |                  场景                  |
| :----------: | ---- | :----------------------------------------------: | :----------------------------------------------------------: | :------------------------------------: |
| from + size  | 低   |                灵活性好，实现简单                |                         深度分页问题                         |    数据量比较小，能容忍深度分页问题    |
|    scroll    | 中   |                解决了深度分页问题                | 无法反应数据的实时性（快照版本）维护成本高，需要维护一个 scroll_id | 海量数据的导出需要查询海量结果集的数据 |
| search_after | 高   | 性能最好不存在深度分页问题能够反映数据的实时变更 | 实现复杂，需要有一个全局唯一的字段连续分页的实现会比较复杂，因为每一次查询都需要上次查询的结果 |             海量数据的分页             |

### 分词器

- 当安装`elasticsearch`、`kibana`、`ik分词器`、`py拼音分词器`、`繁体简体转化分词器`时，版本需要全部一致

### IK 分词器

- ik分词器[Release v8.6.0 · medcl/elasticsearch-analysis-ik · GitHub](https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v8.6.0)

- 自定义分词

  - elasticsearch/plugins/ik/config/目录下新建文件  `自定义名称.dic`

  - 修改elasticsearch/plugins/ik/config/IKAnalyzer.cfg.xml

    - ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
      <properties>
              <comment>IK Analyzer 扩展配置</comment>
              <!--用户可以在这里配置自己的扩展字典 -->
              <entry key="ext_dict">自定义名称.dic</entry>
               <!--用户可以在这里配置自己的扩展停止词字典-->
              <entry key="ext_stopwords"></entry>
              <!--用户可以在这里配置远程扩展字典 -->
              <!-- <entry key="remote_ext_dict">words_location</entry> -->
              <!--用户可以在这里配置远程扩展停止词字典-->
              <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
      </properties>
      ```


### 拼音分词器

- 拼音分词器[Release v8.6.0 · medcl/elasticsearch-analysis-pinyin · GitHub](https://github.com/medcl/elasticsearch-analysis-pinyin/releases/tag/v8.6.0)

- 自定义参数

  - > 			// 过滤器类型，这个自定义的过滤器使用的是pinyin分词器
    >    	     "type":"pinyin",
    >    	     //如果打开,它将保存词的全拼,并按字分开保存.例如:刘德华> [liu,de,hua],默认为:true
    >    	     "keep_full_pinyin":true,
    >    	     // 是否保持原词.默认为:false
    >    	     "keep_original":true,
    >    	     //如果打开将保存词的全拼.例如:刘德华> [liudehua],默认为:false
    >    	     "keep_joined_full_pinyin":true,
    >    	     // 这个参数会将词的第一个字母全部拼起来.例如:刘德华->ldh.默认为:true
    >    	     "keep_first_letter":true,
    >    	     // 启用此选项后，将单独保留首字母，例如：>,,,默认值：false
    >    	     "keep_separate_first_letter" : true,
    >    	     // 转成的拼音首字母不能超过16个
    >    	     "limit_first_letter_length":16,
    >    	     // 小写非中文字母.默认为:true
    >    	     "lowercase":true,
    >    	     // 转成的拼音不能有重复的，重复的删掉
    >    	     "remove_duplicated_term":true,


- 自定义`IK+拼音`案例

  - ```json
      "settings": {
       // es 默认分片 5 会默认平均分类到所有节点上
       "number_of_shards":"2",
       // 分片的备份，集群下，分片和同备份不会在同个节点上
       "number_of_replicas": "2",
       // 自定义分词器
        "analysis": {
          "analyzer": { 
            // 自定义 my_analyzer分词器
            "my_analyzer": { 
              // 先经过ik处理
              "tokenizer": "ik_max_word", 
              // 在经过拼音处理
              "filter": "py"  
            }
          },
          "filter": {
            "py": { 
              "type": "pinyin",
              // 如果打开,它将保存词的全拼,并按字分开保存.例如:刘德华> [liu,de,hua],默认为:true
              "keep_full_pinyin": false,
              // 如果打开将保存词的全拼.例如:刘德华> [liudehua],默认为:false
              "keep_joined_full_pinyin": true,
              // 是否保持原词.默认为:false
              "keep_original": true,
              // 设置最大keep_first_letter结果的长度,默认为:16
              "limit_first_letter_length": 16,
              // 保存索引时删除重复的词语.例如: de的>de, 默认为: false, 注意:开启可能会影响位置相关的查询.
              "remove_duplicated_term": true,
              // 如果他们是拼音,切分非中文成单独的拼音项. 默认为:true,例如: liudehuaalibaba13zhuanghan -> liu,de,hua,a,li,ba,ba,13,zhuang,han, 注意: keep_none_chinese和keep_none_chinese_together需要先开启.
              "none_chinese_pinyin_tokenize": false
            }
          }
        }
    ```

- 拼音分词器版本7.*- 8.60 不确定从哪个版本有问题 搜索【银行】失败


  - > #错误                 需要修改成
    >
    > yin xing			yin hang
    >
    > ```sh
    > #复制nlp-lang-1.7.jar包到自定义目录 解压 
    > jar -xvf nlp-lang-1.7.jar 
    > ```
    >
    > ```
    > #修改 polyphone.txt 全局替换  yin xing			yin hang
    > sed -i "s/yin xing/yin hang/g" polyphone.txt
    > ```
    >
    > ```
    > #在解压的目录中打包
    > jar cvf0M nlp-lang-1.7.jar ./
    > ```
    > #替换 nlp-lang-1.7.jar

    

  

### 繁体简体分词器

- 繁体分词器[elasticsearch-analysis-stconvert](https://github.com/medcl/elasticsearch-analysis-stconvert/releases/download/v8.6.0/elasticsearch-analysis-stconvert-8.6.0.zip)



### SpringBoot + elasticsearch-java-api

#### 1、application.yml

```yml
spring:
  elasticsearch:
    uris: 127.0.0.1:9200
    username: elastic
    password: 123456
```

#### 2、pom.xml

```xml
<dependency>
    <groupId>co.elastic.clients</groupId>
    <artifactId>elasticsearch-java</artifactId>
    <version>8.6.0</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
<dependency>
    <groupId>jakarta.json</groupId>
    <artifactId>jakarta.json-api</artifactId>
    <version>2.0.1</version>
</dependency>
```

#### 3、ES配置类


```java
package com.itcast.cattle.es.config;

import co.elastic.clients.elasticsearch.ElasticsearchAsyncClient;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * @author QWQ
 */
@Component
@Configuration
public class EsClientConfig {

    @Value("${spring.elasticsearch.uris}")
    public String hosts;

    @Value("${spring.elasticsearch.username}")
    public String username;

    @Value("${spring.elasticsearch.password}")
    public String password;

    /**
     * 解析配置的字符串，转为HttpHost对象数组, hosts example:   127.0.0.1:9200,127.0.0.1:9300
     *
     * @return
     */
    private HttpHost[] toHttpHost() {
        if (StringUtils.isEmpty(hosts)) {
            throw new RuntimeException("invalid elasticsearch configuration");
        }

        String[] hostArray = hosts.split(",");
        HttpHost[] httpHosts = new HttpHost[hostArray.length];
        HttpHost httpHost;
        for (int i = 0; i < hostArray.length; i++) {
            String[] strings = hostArray[i].split(":");
            httpHost = new HttpHost(strings[0], Integer.parseInt(strings[1]), "http");
            httpHosts[i] = httpHost;
        }
        return httpHosts;
    }

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        HttpHost[] httpHosts = toHttpHost();
        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
        RestClient restClient = RestClient.builder(httpHosts).setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider)).build();
        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
        return new ElasticsearchClient(transport);
    }

    @Bean
    public ElasticsearchAsyncClient elasticsearchAsyncClient() {
        HttpHost[] httpHosts = toHttpHost();
        final CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(username, password));
        RestClient restClient = RestClient.builder(httpHosts).setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider)).build();
        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());
        return new ElasticsearchAsyncClient(transport);
    }

}

```



## Easy-Es

 - 概念
   - 类似MyBatis
### 1.导入依赖
- 这里导入官方推荐版本`7.14.0`版本
```xml
<dependencies>
    <dependency>
        <groupId>cn.easy-es</groupId>
        <artifactId>easy-es-boot-starter</artifactId>
        <version>1.1.0</version>
        <exclusions>
            <exclusion>
                <groupId>org.elasticsearch.client</groupId>
                <artifactId>elasticsearch-rest-high-level-client</artifactId>
            </exclusion>
            <exclusion>
                <groupId>org.elasticsearch</groupId>
                <artifactId>elasticsearch</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>org.elasticsearch.client</groupId>
        <artifactId>elasticsearch-rest-high-level-client</artifactId>
        <version>7.14.0</version>
    </dependency>
    <dependency>
        <groupId>org.elasticsearch</groupId>
        <artifactId>elasticsearch</artifactId>
        <version>7.14.0</version>
    </dependency>
</dependencies>
```
### 2.application.yml
```yaml
easy-es:
  enable: true #默认为true,若为false则认为不启用本框架
  address : 127.0.0.1:9200 # es的连接地址,必须含端口 若为集群,则可以用逗号隔开 例如:127.0.0.1:9200,127.0.0.2:9200
  username: elastic #若无 则可省略此行配置
  password: 123456 #若无 则可省略此行配置
  banner: false # 默认为true 打印banner 若您不期望打印banner,可配置为false
  keep-alive-millis: 18000 # 心跳策略时间 单位:ms
  connect-timeout: 5000 # 连接超时时间 单位:ms
  socket-timeout: 5000 # 通信超时时间 单位:ms
  connection-request-timeout: 5000 # 连接请求超时时间 单位:ms
  max-conn-total: 100 # 最大连接数 单位:个
  max-conn-per-route: 100 # 最大连接路由数 单位:个
  global-config:
    process-index-mode: not_smoothly #索引处理模式,smoothly:平滑模式,默认开启此模式, not_smoothly:非平滑模式, manual:手动模式
    print-dsl: true # 开启控制台打印通过本框架生成的DSL语句,默认为开启,测试稳定后的生产环境建议关闭,以提升少量性能
    distributed: false # 当前项目是否分布式项目,默认为true,在非手动托管索引模式下,若为分布式项目则会获取分布式锁,非分布式项目只需synchronized锁.
    async-process-index-blocking: true # 异步处理索引是否阻塞主线程 默认阻塞 数据量过大时调整为非阻塞异步进行 项目启动更快
    active-release-index-max-retry: 60 # 分布式环境下,平滑模式,当前客户端激活最新索引最大重试次数若数据量过大,重建索引数据迁移时间超过60*(180/60)=180分钟时,可调大此参数值,此参数值决定最大重试次数,超出此次数后仍未成功,则终止重试并记录异常日志
    active-release-index-fixed-delay: 180 # 分布式环境下,平滑模式,当前客户端激活最新索引最大重试次数 若数据量过大,重建索引数据迁移时间超过60*(180/60)=180分钟时,可调大此参数值 此参数值决定多久重试一次 单位:秒
    db-config:
      map-underscore-to-camel-case: false # 是否开启下划线转驼峰 默认为false
      table-prefix: daily_ # 索引前缀,可用于区分环境  默认为空 用法和MP一样
      id-type: customize # id生成策略 customize为自定义,id值由用户生成,比如取MySQL中的数据id,如缺省此项配置,则id默认策略为es自动生成
      field-strategy: not_empty # 字段更新策略 默认为not_null
      enable-track-total-hits: true # 默认开启,查询若指定了size超过1w条时也会自动开启,开启后查询所有匹配数据,若不开启,会导致无法获取数据总条数,其它功能不受影响.
      refresh-policy: immediate # 数据刷新策略,默认为不刷新
      enable-must2-filter: false # 是否全局开启must查询类型转换为filter查询类型 默认为false不转换
      batch-update-threshold: 10000 # 批量更新阈值 默认值为1万
```
### 3.启动类 @EsMapperScan
- 这里类似MyBatis的
```java
@EsMapperScan("com.cattle.cas.mapper")
```
### 4.Mapper接口类

```java
import cn.easyes.core.conditions.interfaces.BaseEsMapper;
import com.cattle.cas.model.Document;

public interface DocumentMapper extends BaseEsMapper<Document> {
}
```

### 5.实体类
```java
import cn.easyes.annotation.HighLight;
import cn.easyes.annotation.IndexField;
import cn.easyes.annotation.IndexId;
import cn.easyes.annotation.IndexName;
import cn.easyes.annotation.rely.Analyzer;
import cn.easyes.annotation.rely.FieldStrategy;
import cn.easyes.annotation.rely.FieldType;
import cn.easyes.annotation.rely.IdType;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 *  value 索引名  <!-->easy-es 配置 process-index-mode：smoothly 会出现索引_s0 _s1<!-->
 *  shardsNum 分片
 *  replicasNum 副本
 *  keepGlobalPrefix 保留全局前缀
 */
@Data
@IndexName(value = "document",shardsNum = 3,replicasNum = 2,keepGlobalPrefix = true) // 可指定分片数,副本数,若缺省则默认均为1
public class Document {
    /**
     * es中的唯一id,如果你想自定义es中的id为你提供的id,比如MySQL中的id,请将注解中的type指定为customize,如此id便支持任意数据类型)
     */
    @IndexId(type = IdType.CUSTOMIZE)
    private Long id;
    /**
     * 文档标题,不指定类型默认被创建为keyword类型,可进行精确查询
     */
    private String title;

    private Integer age;

    @ApiModelProperty("车")
    private String carModel;

    @ApiModelProperty("性别")
    private String gender;


    /**
     * 作者 加@TableField注解,并指明strategy = FieldStrategy.NOT_EMPTY 表示更新的时候的策略为 创建者不为空字符串时才更新
     */
    @IndexField(strategy = FieldStrategy.NOT_EMPTY)
    private String creator;
    /**
     * 创建时间
     */
    @IndexField(fieldType = FieldType.DATE, dateFormat = "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis")
    private String gmtCreate;
    /**
     * es中实际不存在的字段,但模型中加了,为了不和es映射,可以在此类型字段上加上 注解@TableField,并指明exist=false
     */
    @IndexField(exist = false)
    private String notExistsField;

    /**
     * 地理位置经纬度坐标 例如: "40.13933715136454,116.63441990026217"
     */
    @IndexField(fieldType = FieldType.GEO_POINT)
    private String location;
    /**
     * 图形(例如圆心,矩形)
     */
    @IndexField(fieldType = FieldType.GEO_SHAPE)
    private String geoLocation;

    /**
     * 自定义字段名称
     */
    @IndexField(value = "wu-la")
    private String customField;


    /**
     * 文档内容,指定了类型及存储/查询分词器
     * IndexField
     *      fieldType       类型 text
     *      analyzer        分词时 用的分词器
     *      searchAnalyzer  搜索时 用的分词器
     * HighLight
     *      preTag 自定义前置标签
     *      postTag 自定义后置标签
     *      mappingField 指定高亮返回字段
     */
    @HighLight(preTag = "<font color='red'>", postTag = "</font>", mappingField = "highlightContent")
    @IndexField(fieldType = FieldType.TEXT, analyzer = Analyzer.IK_SMART, searchAnalyzer = Analyzer.IK_MAX_WORD)
    private String content;
    /**
     * 高亮返回值被映射的字段
     */
    private String highlightContent;
}
```

### 6.Controller

```java
import cn.easyes.annotation.rely.Analyzer;
import cn.easyes.annotation.rely.FieldType;
import cn.easyes.common.enums.Link;
import cn.easyes.common.enums.Query;
import cn.easyes.core.biz.EsPageInfo;
import cn.easyes.core.biz.SAPageInfo;
import cn.easyes.core.conditions.LambdaEsIndexWrapper;
import cn.easyes.core.conditions.LambdaEsQueryWrapper;
import cn.easyes.core.toolkit.EsWrappers;
import cn.easyes.core.toolkit.QueryUtils;
import com.cattle.cas.mapper.DocumentMapper;
import com.cattle.cas.model.Document;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.common.geo.GeoDistance;
import org.elasticsearch.common.geo.GeoPoint;
import org.elasticsearch.common.unit.DistanceUnit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.GeoDistanceSortBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;


@RestController
@Api(tags = "SpringBoot-Elasticsearch-Easy-Es")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class DocumentController {
    private final DocumentMapper documentMapper;

    @GetMapping("existsIndex")
    @ApiOperation("判断索引存不存在")
    public Boolean existsIndex() {
        // 然后通过该实体类的mapper直接一键创建,非常傻瓜级
        return documentMapper.existsIndex(Document.class.getSimpleName().toLowerCase());
    }

    @GetMapping("creatIndex1")
    @ApiOperation("自动创建索引")
    public Boolean creatIndex1() {
        // 然后通过该实体类的mapper直接一键创建,非常傻瓜级
       return documentMapper.createIndex();
    }
    @GetMapping("updateIndex")
    @ApiOperation("更新索引")
    public Boolean updateIndex() {
        // 然后通过该实体类的mapper直接一键创建,非常傻瓜级
        LambdaEsIndexWrapper<Document> wrapper = new LambdaEsIndexWrapper<>();
        wrapper.indexName(Document.class.getSimpleName().toLowerCase())
                .mapping(Document::getTitle, FieldType.KEYWORD);
        return documentMapper.updateIndex(wrapper);
    }
    @GetMapping("deleteIndex")
    @ApiOperation("删除索引")
    public Boolean deleteIndex(@RequestParam("indexName") String indexName) {
        // 然后通过该实体类的mapper直接一键创建,非常傻瓜级
        return documentMapper.deleteIndex(indexName);
    }
    @GetMapping("creatIndex2")
    @ApiOperation("自定义创建索引")
    public Boolean creatIndex2() {
        LambdaEsIndexWrapper<Document> wrapper = new LambdaEsIndexWrapper<>();
        // 此处简单起见 索引名称须保持和实体类名称一致,字母小写 后面章节会教大家更如何灵活配置和使用索引
        wrapper.indexName(Document.class.getSimpleName().toLowerCase());

        // 此处将文章标题映射为keyword类型(不支持分词),文档内容映射为text类型,可缺省
        // 支持分词查询,内容分词器可指定,查询分词器也可指定,,均可缺省或只指定其中之一,不指定则为ES默认分词器(standard)
        wrapper.mapping(Document::getTitle, FieldType.KEYWORD)
                .mapping(Document::getContent, FieldType.TEXT, Analyzer.IK_MAX_WORD, Analyzer.IK_MAX_WORD);

        // 如果上述简单的mapping不能满足你业务需求,可自定义mapping
        // wrapper.mapping(Map);

        // 设置分片及副本信息,3个shards,2个replicas,可缺省
        wrapper.settings(3,2);

        // 如果上述简单的settings不能满足你业务需求,可自定义settings
        // wrapper.settings(Settings);

        // 设置别名信息,可缺省
        String aliasName = "daily";
        wrapper.createAlias(aliasName);

        // 创建索引
        return documentMapper.createIndex(wrapper);
    }

    @PostMapping("/insert")
    public Integer insert(@RequestBody Document document) {
        return documentMapper.insert(document);
    }

    @GetMapping("/updateById")
    public Integer updateById() {
        Document document = new Document();
        document.setId(1L);
        document.setTitle("老汉");
        document.setContent("推*技术过硬");
        return documentMapper.updateById(document);
    }

    @GetMapping("/getByTitle")
    public List<Document> getByTitle(@RequestParam String title) {
        // 测试查询
        LambdaEsQueryWrapper<Document> wrapper = new LambdaEsQueryWrapper<>();
        wrapper.index(Document.class.getSimpleName().toLowerCase())
               .eq(Document::getTitle,title);
        return documentMapper.selectList(wrapper);
    }

    @GetMapping("/getByContent")
    public List<Document> getByContent(@RequestParam String content) {
        // 测试查询
        LambdaEsQueryWrapper<Document> wrapper = new LambdaEsQueryWrapper<>();
        wrapper.eq(Document::getContent,content);
        return documentMapper.selectList(wrapper);
    }

    @GetMapping("/getPageAll")
    public EsPageInfo<Document> getAll() {
        // 测试查询
        LambdaEsQueryWrapper<Document> wrapper = new LambdaEsQueryWrapper<>();
        return documentMapper.pageQuery(wrapper,1,10);
    }

    @GetMapping("/getSearchAfterPageAll")
    public SAPageInfo<Document> testSearchAfter() {
        LambdaEsQueryWrapper<Document> lambdaEsQueryWrapper = EsWrappers.lambdaQuery(Document.class);
        // 必须指定一种排序规则,且排序字段值必须唯一 此处我选择用id进行排序 实际可根据业务场景自由指定,不推荐用创建时间,因为可能会相同
        lambdaEsQueryWrapper.orderByDesc(Document::getId)
                .and(w->w.eq(Document::getTitle,"老王").or().eq(Document::getTitle,"老汉"))
                .or()
                .and(s->s.eq(Document::getContent,"王").or().eq(Document::getContent,"技术"));
        SAPageInfo<Document> saPageInfo = documentMapper.searchAfterPage(lambdaEsQueryWrapper, null, 10);

        return saPageInfo;
        // 获取下一页
//        List<Object> nextSearchAfter = saPageInfo.getNextSearchAfter();
//        SAPageInfo<Document> next = documentMapper.searchAfterPage(lambdaEsQueryWrapper, nextSearchAfter, 10);
    }

    @GetMapping("/getCount")
    public Long getCount() {
        // 测试查询
        LambdaEsQueryWrapper<Document> wrapper = new LambdaEsQueryWrapper<>();
        return documentMapper.selectCount(wrapper);
    }
    @GetMapping("/testQueryString")
    public List<Document> testQueryString() {
        LambdaEsQueryWrapper<Document> wrapper = new LambdaEsQueryWrapper<>();
        String queryStr = QueryUtils.combine(Link.OR,
                QueryUtils.buildQueryString(Document::getTitle, "老汉", Query.EQ))
                + QueryUtils.buildQueryString(Document::getTitle, "*大猪蹄子*", Query.EQ);
        // sb最终拼接为:((creator.keyword:老王)AND(creator:隔壁))OR(creator.keyword:*大猪蹄子*) ,可以说和MySQL语法非常相似了
        String string = QueryUtils.buildQueryString(Document::getTitle, "老汉", Query.EQ);
        wrapper.queryStringQuery(string);
        return documentMapper.selectList(wrapper);
    }


    @GetMapping("/searchRequest ")
    public List<Document> searchRequest() throws IOException {
        // 假设该乘客所在位置经纬度为 31.256224D, 121.462311D
        LambdaEsQueryWrapper<Document> wrapper = new LambdaEsQueryWrapper<>();
        wrapper.geoDistance(Document::getLocation, 3.0, DistanceUnit.KILOMETERS, new GeoPoint(31.256224D, 121.462311D))
                .eq(Document::getGender,"女")
                .ge(Document::getAge,3)
                .eq(Document::getCarModel,"商务车");
        SearchSourceBuilder searchSourceBuilder = documentMapper.getSearchSourceBuilder(wrapper);

        SearchRequest searchRequest = new SearchRequest(Document.class.getSimpleName().toLowerCase());

        // 此处的searchSourceBuilder由上面EE构建而来,我们继续对其追加排序参数
        searchSourceBuilder.sort(
                new GeoDistanceSortBuilder("location", 31.256224D, 121.462311D)
                        .order(SortOrder.DESC)
                        .unit(DistanceUnit.KILOMETERS)
                        .geoDistance(GeoDistance.ARC)
        );
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = documentMapper.search(searchRequest, RequestOptions.DEFAULT);

        return documentMapper.selectList(wrapper);
    }

}

```



## es语法学习记录

```json
# 查看ik 和 拼音分词器版本信息
GET /_cat/plugins?v&s=component&h=name,component,version,description



DELETE document

##############################################################################################
PUT /test/_doc/1
{
  "settings": {
    // 分片
    "number_of_shards": "1",
    // 备份
    "number_of_replicas": "1",
    "analysis": {
      "analyzer": { 
        // 自定义 my_analyzer分词器
        "my_analyzer": { 
          // 先经过ik处理
          "tokenizer": "ik_max_word", 
          // 在经过拼音处理
          "filter": "py"  
        }
      },
      "filter": {
        "py": { 
          "type": "pinyin",
          // 如果打开,它将保存词的全拼,并按字分开保存.例如:刘德华> [liu,de,hua],默认为:true
          "keep_full_pinyin": false,
          // 如果打开将保存词的全拼.例如:刘德华> [liudehua],默认为:false
          "keep_joined_full_pinyin": true,
          // 是否保持原词.默认为:false
          "keep_original": true,
          // 设置最大keep_first_letter结果的长度,默认为:16
          "limit_first_letter_length": 16,
          // 保存索引时删除重复的词语.例如: de的>de, 默认为: false, 注意:开启可能会影响位置相关的查询.
          "remove_duplicated_term": true,
          // 如果他们是拼音,切分非中文成单独的拼音项. 默认为:true,例如: liudehuaalibaba13zhuanghan -> liu,de,hua,a,li,ba,ba,13,zhuang,han, 注意: keep_none_chinese和keep_none_chinese_together需要先开启.
          "none_chinese_pinyin_tokenize": false
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "name":{
        "type": "text",
        // 使用自定义分词器
        "analyzer": "my_analyzer",
        // 查询时还用ik分词器
        "search_analyzer": "ik_smart"
      }
    }
  }
}



POST /test/_bulk
{"index":{"_id":1}}
{"name": "学习es的很多天"}
{"index":{"_id":2}}
{"name": "狮子"}
{"index":{"_id":3}}
{"name": "虱子"}


POST /test/_search



############################
POST /_analyze
{
    "analyzer": "pinyin",
    "text": "学习es的很多天"
}






GET /test/_search
{
  "query": {
    "match": {
      "name": "shizi"
    }
  },
  // 高亮
  "highlight": {
    // 指定那个字段为高亮字段
    "fields": {
      "name": {}
    },
    // 指定前缀标签，如 <font color="颜色">,
    "pre_tags": "<font color='red'>",
    // 指定后缀标签，如 </font>
    "post_tags": "</font>",
    // 指定高亮数据展示多少个字符回来；
    "fragment_size": 10
  },
  "from": 0,
  "size": 1
}
```











