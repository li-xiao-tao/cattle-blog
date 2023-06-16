## 创建一个Vue应用

::: tip 提示
下面的这种创建Vue应用的方式基于Vite实现
:::

```shell
npm init vue@latest
```



## 指令

### 指令的动态参数

::: warning 注意
动态参数中表达式的值应当是一个字符串，或者是 `null`。特殊值 `null` 意为显式移除该绑定。其他非字符串的值会触发警告。如果你需要传入一个复杂的动态参数，我们推荐使用计算属性替换复杂的表达式。
:::

```vue
<a v-bind:[attributeName]="url"></a>
<!-- 简写 -->
<a :[attributeName]="url"></a>


<a v-on:[eventName]="doSomething"></a>
<!-- 简写 -->
<a @[eventName]="doSomething"></a>

<!-- 当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写。上面的例子将会在 DOM 内嵌模板中被转换为 :[someattr]。如果你的组件拥有“someAttr” 属性而非 “someattr”，这段代码将不会工作。-->
<a :[someAttr]="value"></a>
```



::: danger 注意
**ref和shallowRef不能一起使用**，否则会影响ref， 造成视图的更新，这与triggerRef有关。**triggerRef** 会强制更新所收集到的依赖，ref底层调用了**triggerRef** 所以会影响到**shallowRef**。
:::
