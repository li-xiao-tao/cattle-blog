# Html5

## 简介

- HTML 指的是超文本标记语言: **H**yper**T**ext **M**arkup **L**anguage

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <title>Title</title>
  </head>
  <body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
  </body>
</html>
```

- `<!DOCTYPE html>`声明为 HTML5 文档
- `<html>` 元素是 HTML 页面的根元素，`lang="zh-CN"` 设置了语言为中文，`lang="en"`英文 。
- `<head>` 元素包含了文档的元（meta）数据，如 `<meta charset="utf-8">` 定义网页编码格式为 `utf-8`，`GBK`或`utf-8`能解决网页中文乱码
- `<title>` 元素描述了文档的标题
- `<body>` 元素包含了可见的页面内容
- `<h1>` 元素定义一个大标题，从大到小 `h1 - h6`
- `<p>` 元素定义一个段落

## 标签

### 常用HTML标签

|   标签    |   描述   |                                                                                  代码示例                                                                                  |
| :-------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    `p`    |   段落   |                                                                               `<p>段落</p>`                                                                                |
| `h1`~`h6` |   标题   | `<h1>我的第一个标题</h1>`<br>`<h2>我的第二个标题</h2>`<br>`<h3>我的第三个标题</h3>`<br>`<h4>我的第四个标题</h4>`<br>`<h5>我的第五个标题</h5>`<br>`<h6>我的第六个标题</h6>` |
|    `a`    |   链接   |                                            `<a href="https://study-tao.top/" target="_blank" rel="stylesheet">这是一个链接</a>`                                            |
|   `img`   |   图片   |                                          `<img decoding="async" src="https://study-tao.top/logo.png" width="258" height="258" />`                                          |
|   `br`    |   换行   |                                                                                   `<br>`                                                                                   |
|   `hr`    |  水平线  |                                                                                   `<hr>`                                                                                   |
|    `b`    |   加粗   |                                                                        `<b>这是一段加粗的内容</b>`                                                                         |
| `strong`  |   加粗   |                                                                   `<strong>这是一段加粗的内容</strong>`                                                                    |
|    `i`    |   斜体   |                                                                        `<i>这是一段斜体的内容</i>`                                                                         |
|   `em`    |   斜体   |                                                                       `<em>这是一段斜体的内容</em>`                                                                        |
|  `small`  | 小号字体 |                                                                         `<small>小号字体</small>`                                                                          |
|   `sub`   |   下标   |                                                                             `<sub>下标</sub>`                                                                              |
|   `sup`   |   上标   |                                                                             `<sup>上标</sup>`                                                                              |
|   `ins`   |  插入字  |                                                                            `<ins>插入字</ins>`                                                                             |
|   `del`   |  删除字  |                                                                            `<del>删除字</del>`                                                                             |


## HTML属性

- HTML属性是用于在HTML标签中定义特定属性的关键字或键值对。属性为标记提供了额外的信息，以便浏览器或用户代理可以执行某些特定操作或呈现元素的某些方面。以下是一些常用的HTML属性：

| 属性     | 描述                       |
| -------- | -------------------------- |
| `class`  | 指定标签的CSS样式类        |
| `id`     | 指定唯一的标识符           |
| `style`  | 指定标签的样式信息         |
| `title`  | 指定标签的标题             |
| `href`   | 指定链接的URL              |
| `src`    | 指定图像的URL              |
| `alt`    | 指定图像的替代文本         |
| `width`  | 指定图像的宽度             |
| `height` | 指定图像的高度             |
| `target` | 指定链接的目标窗口         |
| `rel`    | 指定与链接的关系           |
| `aria-*` | 提供可访问性支持的额外属性 |

## HTML头部

| 标签       | 属性                                       | 描述                                                         |
| ---------- | ------------------------------------------ | ------------------------------------------------------------ |
| `<head>`   | N/A                                        | 定义了文档的信息                                             |
| `<title>`  | N/A                                        | 定义了文档的标题                                             |
| `<base>`   | `href`, `target`                           | 定义了页面链接标签的默认链接地址和打开方式                   |
| `<link>`   | `href`, `rel`, `type`, `media`, `sizes`    | 定义了一个文档和外部资源之间的关系，如链接到CSS文件          |
| `<meta>`   | `name`, `content`, `http-equiv`, `charset` | 定义了HTML文档中的元数据，如描述文档内容、关键字、字符编码等 |
| `<script>` | `src`, `async`, `defer`, `type`            | 定义了客户端的脚本文件，如JavaScript文件                     |
| `<style>`  | `type`, `media`                            | 定义了HTML文档的样式文件，如CSS文件                          |

## CSS

### 常用样式

- 当应用于HTML元素时，这些样式的作用如下：

| 样式             | 描述             | 示例                              |
| ---------------- | ---------------- | --------------------------------- |
| font-family      | 设置字体系列     | `font-family: Arial, sans-serif;` |
| color            | 设置文本颜色     | `color: #FF0000;`                 |
| font-size        | 设置字体大小     | `font-size: 16px;`                |
| font-weight      | 设置字体粗细     | `font-weight: bold;`              |
| font-style       | 设置字体样式     | `font-style: italic;`             |
| text-decoration  | 设置文本装饰效果 | `text-decoration: underline;`     |
| text-align       | 设置文本对齐方式 | `text-align: center;`             |
| line-height      | 设置行高         | `line-height: 1.5;`               |
| letter-spacing   | 设置字间距       | `letter-spacing: 2px;`            |
| word-spacing     | 设置单词间距     | `word-spacing: 5px;`              |
| background-color | 背景色           | `background-color:#ffffff;`       |
| text-align       | 居中对齐         | `text-align:center;`              |

`;`号用于将多个CSS属性组合在一起，例如：

```html
<p style="font-family: Arial, sans-serif; color: #FF0000; font-size: 16px;">一段文本</p>
```

## Html 图片

**慎用图片**页面加载需要时间，可以用`decoding="async"`

- `decoding="async"`异步加载图片
- `src=""`图片地址，可以是项目中的地址，也可以是url
- `width="258" height="258"`展示图片大小
- `alt`当图片没找到展示的内容

```html
<img decoding="async" src="https://study-tao.top/logo.png" width="258" height="258" alt="呀，图片丢失了！" />
```



## Html表格

- `<table>`生成一个表格，`<tr>`生成一行，`<td>`再把行元素切割成块元素（一块一块）

| 标签         | 描述                            |
| ------------ | ------------------------------- |
| `<table>`    | 定义表格                        |
| `<th>`       | 定义表格的表头                  |
| `<tr>`       | 定义表格的行                    |
| `<td>`       | 定义表格单元                    |
| `<caption>`  | 定义表格标题                    |
| `<colgroup>` | 定义表格列的组，配合`<col>`使用 |
| `<col>`      | 定义用于表格列的属性            |
| `<thead>`    | 定义表格的页眉                  |
| `<tbody>`    | 定义表格的主体                  |
| `<tfoot>`    | 定义表格的页脚                  |

- 示例

```html
    <table border="1"> // 边框 1
      <caption>标题</caption>
      <colgroup>
        <col span="2" style="background-color:red">
        <col style="background-color:yellow">
      </colgroup>
      <tr>
        <th>列1</th>
        <th>列2</th>
        <th>列3</th>
      </tr>
      <tr>
        <td>列4</td>
        <td>列5</td>
        <td>列6</td>
      </tr>
      <tr>
        <td>列7</td>
        <td>列8</td>
        <td>列9</td>
      </tr>
    </table>
    <p>段落2</p>
    <table border="1">
      <caption>标题</caption>
      <colgroup>
        <col span="2" style="background-color:red">
        <col style="background-color:yellow">
      </colgroup>
      <thead>
      <tr>
        <th>aaaaaa</th>
        <th>bbbbbb</th>
        <th>cccccc</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th>aaaaaa</th>
        <th>bbbbbb</th>
        <th>cccccc</th>
      </tr>
      </tfoot>
      <tbody>
      <tr>
        <th>列1</th>
        <th>列2</th>
        <th>列3</th>
      </tr>
      <tr>
        <td>列4</td>
        <td>列5</td>
        <td>列6</td>
      </tr>
      <tr>
        <td>列7</td>
        <td>列8</td>
        <td>列9</td>
      </tr>
      </tbody>
    </table>
```

## Html列表

|  标签  | 描述                 |
| :----: | :------------------- |
| `<ol>` | 定义有序列表         |
| `<ul>` | 定义无序列表         |
| `<li>` | 定义列表项           |
| `<dl>` | 定义列表             |
| `<dt>` | 自定义列表标题       |
| `<dd>` | 定义自定列表项的描述 |

### 有序列表`ol`

```html
<ol>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ol>
```

 - 展示数字

```sh
1. 1
2. 2
3. 3
4. 4
5. 5
```

### 无序列表`ul`

```sh
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

- 展示黑点

### 自定义列表`<dl>`


```sh
<dl>
  <dt>标题1</dt>
  <dd>内容1</dd>
  <dt>标题2</dt>
  <dd>内容2</dd>
</dl>
```

## Html块

`<div>` 和 `<span>` 标签都是用于页面布局和样式控制，具体使用需要根据实际情况和需求来选择。



### 块级标签`<div>`

- 是一个块级标签，用于将一段 HTML 内容分隔成不同的区块，通常用于布局和组织内容，可用 CSS 控制其样式。例如，可以用 `<div>` 标签将页面分成多列，每列显示不同的内容

### 行级标签`<span>`

- 是一个行级标签，通常用于控制文本中的样式或添加 CSS 样式类。例如，可以将一段文本放在 `<span>` 标签中，并通过 CSS 控制其字体、颜色等样式属性。另外，`<span>` 标签还可以与 JavaScript 一起使用，用于控制文本的显示和隐藏。


### Html 表单

- **案例**

```html
<div>
  <form action="">
    <p><b>文本</b></p>
    文本域: <input name="firstname" type="text"><br>
    
    <p><b>密码</b></p>
    密码: <input name="pwd" type="password"><br>
    
    <p><b>下拉列表</b></p>
    <select name="cars">
      <option value="volvo">沃尔沃</option>
      <option value="saab">萨博</option>
      <option value="fiat">菲亚特</option>
      <option value="audi">奥迪</option>
    </select>
    
    <p><b>单选</b></p>
    <input name="sex" type="radio" value="male">男<br>
    <input name="sex" type="radio" value="female">女<br>
    
    <p><b>多选框</b></p>
    <input name="vehicle" type="checkbox" value="Bike">我喜欢自行车<br>
    <input name="vehicle" type="checkbox" value="Car">我喜欢小汽车<br>
    
    <input type="submit" value="提交按钮">
    <button>按钮</button>
  </form>
</div>
```

- `text` 文本框
- `password` 密码
- `select` 选择框，配合`option`使用
- `radio` 单选
- `checkbox` 多选
- `submit`提交按钮
- `button` 按钮



## Html 内联框架

- 用于在页面中嵌入另一个 HTML 页面。它可以将一个页面嵌入到另一个页面中的一个矩形框中，这个矩形框被称为“内联框架”（inline frame），简称 iframe。
- 如下：嵌入了另一个网页

<div>
  <iframe loading="lazy" src="https://chatgptmirror.com/chat/645899c13ef5084a25ef7139" width="780" height="500" frameborder="0"></iframe>
</div>

```html
<div>
  <iframe loading="lazy" src="https://chatgptmirror.com/chat/645899c13ef5084a25ef7139" width="780" height="500" frameborder="0"></iframe>
</div>
```

- `src` 嵌入的网页
- `frameborder` 边框，当0时就是无边框
- `width="500" height="500"` 嵌入的网页大小



## Html脚本
- `script`默认引入JavaScript 代码，但是它也可以用于引入其他类型的代码或资源
  
```html
<p id="demo">JavaScript 可以触发事件，就像按钮点击。</p>
<script>
  function myFunction() {
    document.getElementById("demo").innerHTML = "Hello JavaScript!";
  }
</script>
<button onclick="myFunction()" type="button">点我</button>
```

- `TypeScript`、`json`
```html
<script type="text/typescript">
// TypeScript 代码
</script>
```
```html
<script type="application/json">
  {
    "name": "John",
    "age": 30
  }
</script>
```

