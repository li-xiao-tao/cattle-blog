# EXPLAIN
> 执行计划，快速定位到sql效率慢在哪里
**这里分`MySQL` 和 `PostgreSQL`**

## PostgreSQL EXPLAIN

[参考博客](https://zhuanlan.zhihu.com/p/414089692)
### 语法
```sql
explain analyze select * from user where id = 435;
```
* 控制台打印
```
#Index Scan，基于索引扫描，但不只是返回索引列的值
Index Scan using pk_user_id on user  (cost=0.14..8.16 rows=1 width=7292) (actual time=0.052..0.052 rows=1 loops=1)
表明索引扫描的条件是id = 435
Index Cond: (id = 435)  
#计划时间
Planning Time: 0.062 ms
#执行时间
Execution Time: 0.067 ms
```
- Seq Scan，顺序扫描，及全表扫描，没有走索引
- Index Scan，基于索引扫描，WHERE 条件中存在索引列时的扫描，但不只是返回索引列的值
- IndexOnly Scan，基于索引扫描，并且只返回索引列的值，简称为覆盖索引
- BitmapIndex Scan，利用Bitmap 结构扫描
- BitmapHeap Scan，把BitmapIndex Scan 返回的Bitmap 结构转换为元组结构
- Tid Scan，用于扫描一个元组TID 数组
- Subquery Scan，扫描一个子查询
- Function Scan，处理含有函数的扫描
- TableFunc Scan，处理tablefunc 相关的扫描
- Values Scan，用于扫描Values 链表的扫描
- Cte Scan，用于扫描WITH 字句的结果集
- NamedTuplestore Scan，用于某些命名的结果集的扫描
- WorkTable Scan，用于扫描Recursive Union 的中间数据
- Foreign Scan，用于外键扫描
- Custom Scan，用于用户自定义的扫描


## MySQL EXPLAIN
[参考博客](https://blog.csdn.net/kevinxxw/article/details/109567275)
### 语法
```sql
EXPLAIN select  * from sys_menu;
```
* 控制台打印


| id       | select_type | table    | partitions | type | possible_keys | key | key_len | ref | rows | filtered | Extra |
| -------- | ----------- | -------- | ---------- | ---- | ------------- | --- | ------- | --- | ---- | -------- | ----- |
| 选择标识符 |查询的类型| 输出结果集表 |匹配的分区|表的连接类型|查询时，可能使用的索引|实际使用索引 | 索引长度 |列和索引比较| 扫描行数（估算） | 按表条件过滤的行百分比 | 执行结构描述 |
| 1 | SIMPLE | sys_menu |   | ALL |   |   |  |   | 58 | 100 |  |


* 主要type列，表明你有没有使用索引
* 下面说明，从上到下，性能越好
>ALL：全表扫描，应当避免该类型
>index：索引全局扫描，index与ALL区别为index类型只遍历索引树
>range：检索索引一定范围的行
>ref：非唯一性索引扫描，返回匹配某个单独值的所有行
>eq_ref：唯一索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见主键或唯一索引扫描
>const：表示通过一次索引就找到了结果，常出现于primary key或unique索引
>system：system是const类型的特例，当查询的表只有一行的情况下，使用system
>NULL：MySQL在优化过程中分解语句，执行时甚至不用访问表或索引，是最高的登记

* 主要extra列,常见的不太友好的值有：Using filesort, Using temporary

>Using where // 表示不用读取表中所有信息，仅通过索引就可以获取所需数据，即使用列覆盖索引
>Using temporary // 表示需要使用临时表来存储结果集，常见于排序和分组查询，如：group by ; order by
>Using filesort // 表示无法利用索引完成的排序
>Using join buffer // 表示使用了连接缓存，如果出现了这个值，建议根据查询的具体情况可能需要添加索引来改进能。
>Impossible where // 表示where语句会一直false，导致没有符合条件的行（通过收集统计信息不可能存在结果）
>Select tables optimized away // 这个值意味着sql优化到不能在优化了
>No tables used // Query语句中使用from dual 或不含任何from子句

#### in走不走索引
```
in通常是走索引的，当in后面的数据在数据表中超过30%（上面的例子的匹配数据大约6000/16000 = 37.5%）的匹配时，会走全表扫描，即不走索引，因此in走不走索引和后面的数据有关系。
```