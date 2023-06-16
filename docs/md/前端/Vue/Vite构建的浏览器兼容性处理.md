::: tip 提示

默认情况下，Vite 的目标浏览器是指能够支持原生 ESM script 标签和 支持原生 ESM 动态导入的。作为参考，Vite 使用这个browserslist 作为查询标准：

- Chrome >=87
- Firefox >=78
- Safari >=13
- Edge >=88 
- 也可以通过`build.target` 配置项指定构建目标，最低支持 `es2015`。 默认情况下 Vite 只处理语法转译，且 **默认不包含任何 polyfill**。

:::



## 官方解决方案：使用@vitejs/plugin-legacy插件

### 1.问题分析

版本较低的浏览器不支持ES6的语法和新API，而Babel默认只转换新的JavaScript句法，不转换新的API，比如Proxy、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法都不会转码。



### 2.解决方案

- 传统浏览器可以通过插件 `@vitejs/plugin-legacy` 来支持

它将自动生成传统版本的 chunk 及与其相对应 ES 语言特性方面的 polyfill。兼容版的 chunk 只会在不支持原生 ESM 的浏览器中进行按需加载。

- 安装插件：npm i @vitejs/plugin-legacy -D
- 在vite.config.js中配置

```js
// vite.config.ts
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
     legacy({
         // 需要兼容的目标列表，可以设置多个
         targets: ['defaults', 'ie >= 11', 'chrome >= 52'], 
         additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
         renderLegacyChunks:true,
         // 下面的数组可以自定义添加低版本转换的方法
         polyfills:[
            'es.symbol',
            'es.array.filter',
            'es.promise',
            'es.promise.finally',
            'es/map',
            'es/set',
            'es.array.for-each',
            'es.object.define-properties',
            'es.object.define-property',
            'es.object.get-own-property-descriptor',
            'es.object.get-own-property-descriptors',
            'es.object.keys',
            'es.object.to-string',
            'web.dom-collections.for-each',
            'esnext.global-this',
            'esnext.string.match-all'
        ]
     })
  ]
}
```



### 3.插件在打包过程中做了什么？

1. 打包过程中使用@babel/preset-env转换浏览器不支持的语法和新API，为包中的每个块生成相应的转化块；
2. 生成一个包含 SystemJS 运行时的 polyfill 块；
3. 在打包文件中生成带有legacy名的文件，每个js脚本文件都有一个与其对应的转化版本；
4. html文件中新增了一些script-nomodule脚本，这些脚本根据浏览器的支持程度来动态的引入正常版本文件还是带有legacy字样的转化版本文件



### 4.打包后的变化：

- 启用插件后打包完成的目录多出了一些带有legacy字样的文件，每个js脚本文件都有一个与其对应的遗留版本。
- html文件中新增了一些脚本，这些脚本根据浏览器的支持程度来动态的引入正常版本文件还是带有legacy字样的遗留版本文件。
- 此时当项目运行在一些版本较低的浏览器时，插件添加的脚本会自动加载legacy版本的文件。

