# PostgreSQL-空值排序


## 代码方式
```sql
order by age desc nulls last
```

- nulls last 空值排在后面
- nulls first 空值排在前面

## 修改`postgresql.conf`配置文件方式

- 文件位置
  - `/var/lib/postgresql/data/postgresql.conf`

- 在文件中搜索 `default_sorting` 参数。如果找不到该参数，可以在文件末尾添加以下内容：

```conf
default_sorting = 'mixed-asc-nulls-last'
```

- 如果该参数已经存在，将其值修改为 'mixed-asc-nulls-last'。