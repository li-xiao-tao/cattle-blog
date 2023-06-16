
## 多个字段去重删除
```java
delete from user where id in 
       (select max(id) from user where (code , name) in ( select code , name from user group by code , name having count(*) > 1));
```

## PGSQL 递归
```sql
with recursive r as
                   ( select t1.id,t1.name,t1.pid from dps_team t1 where t1.id = 20
                     union all
                     select t2.id,t2.name,t2.pid from dps_team t2 inner join r  on r.id = t2.pid)
select * from r order by id;
```

## JSON
http://www.postgres.cn/docs/9.5/functions-json.html

```sql
select * from record where memo like '{"perStatus":%' and (memo::json ->>'perStatus')::int = (memo::json ->>'status')::int;

select ('{"perStatus":0,"status":1}'::json ->>'perStatus')::int;

select ('{"perStatus":0,"status":1}'::json->>'status')::int;
```