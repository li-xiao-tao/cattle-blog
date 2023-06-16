```
User user = new  User();
String jsonuser = JSONObject.toJSONString(user);
```

将一个字符串JSON，装换为对象

```
User user = JSONObject.parseObject(vo.getUsre(), User.class);
```

返回list
```
namespaceVos = jsonObject.getJSONArray("data").toJavaList(User.class);
```


返回User对象
```
jsonObject.getJSONObject("data").toJavaObject(User.class);
```