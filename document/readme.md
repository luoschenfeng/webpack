>>> # 现代前端工程化打包方案
# 1. 概述

  ### 前端代码为什么要进行打包

  - ES5以前,开发人员主要是通过调整引入脚本的顺序来控制代码的依赖关系,并且如果一段代码需要被多次使用,通常需要用一个script标签把这段代码单独引
    
    入，这样做很容易造成依赖关系不明确、变量全局污染等问题（其他缺点就不一一赘述）。
    
  - 上述问题，也可以用AMD等方法可以解决, ES2015以后, javascript 也原生支持模块化的编写代码，[example](./snippets/module.md)使得前端的模块化机制规范化。
  
  ### 原生方案的好处：

  - 编辑器的支持。 哪里不知道点哪里，很容易找到依赖代码的位置；以路径作为标识符，也很容易被引用

  - 静态引用分析

  > 用module的方式开发很好，但兼容性是一个问题, ![module](./image/module.png "module 兼容性")
    
  - 这就要对我们写的代码进行打包 ,释出兼容性比较高的运行时。前端代码打包的目的也是让开发者更好的进行模块化的开发

# 2. 打包工具

  > 虽然最初的打包只是为了解决模块化开发的问题，但随着技术的发展，需要的功能也就越来越多，比如中间代码的处理、sourceMap、tree-shaking、dev-serve、HMR等。这些功能在我们现在的开发中已经不可或缺，也极大的提高了我们的生产力。
  
  目前为止，完成度比较高的打包工具有以下几个:
  
  ## [snowpack](https://www.snowpack.dev/)

  - 使用 [esbuild](https://esbuild.github.io/) 打包速度极快、但不是很流行，作者最近声明以后基本不会参与维护工作，而是交由不太活跃的社区

  ## [vite](https://github.com/vitejs/vite)

  - vue作者开发的打包工具，同样使用[esbuild](https://esbuild.github.io/)进行二次开发，最初是因为snowpack的模块热更新实现不太理想而开发的，社区比较活跃，但发行的时间还不是很长，问题比较多。

    > 值得一提的是上面两个打包方案都用到了[esbuild](https://esbuild.github.io/)，其用go开发，打包的速率非常快，但官方声明此工具只是js打包的处理集，对其他功能永远不会支持，这就是为什么vite需要基于[esbuild](https://esbuild.github.io/)进行二次开发，并且[esbuild](https://esbuild.github.io/)最近才支持插件机制，这也是vite选用[rollupjs](https://rollupjs.org/guide/en/)插件机制的原因。但可以预见，这种使用其他高效的语言实现的打包工具的案例以后会越来越多，并且随着vue3开始流行起来，vite也会成为打包方案的主流。其实webpack已经将其最核心部分（处理js的模块机制)的逻辑已经解耦出来，社区中也已经出现esbuild-loader、esbuild-webpack-plugin等工具。

  ## [webpack](https://webpack.docschina.org)

  - 本次分享的主角，使用广泛，社区活跃，功能完善。webpack主要通过watchpack、webpack、webpack-cli、webpack-merge、webpack-sources、webpack-dev-*等模块完成，至5.0版本实现的功能越来越多，代码量也越来越大，约20k多行代码，由于我的精力有限，实难面面俱到。本次分享准备也不是很充分，有什么纰漏的地方，还请指正，不熟悉的相互讨论。
      

# 3. webpack打包过程

> 可以将webpack 打包的整个过程分为3个阶段

  ### 准备阶段

  - webpack首先会运行webpack-cli, webpack-cli使用[Commander.js](https://github.com/tj/commander.js)来接受用户的命令行输入，然后将***命令行输入***、***配置文件***及***默认配置***进行合并，得到最终的配置信息(option)。用option初始化compile,compilation,初始化用户传入的plugin,并且实例化EntryDependency(入口class)。[compile](../example/node_modules/webpack/lib/webpack.js?69)

  > complie是对整个打包过程的控制,比较关键的流程钩子有make(构建阶段),seal,emit(生成阶段)
  
  > compilation 是文件状态的控制

  ### 构建阶段

  - 执行[make](../example/node_modules/webpack/lib/Compiler.js?1101)钩子,执行```addEntry```,为compilation添加入口文件，进入构建队列（addEntry -> addModule -> buildModule -）

  - ```addModule```调用```handleModuleCreation```函数，初始化```entry```相对应的```module```(实例化[normalModule](../example/node_modules/webpack/lib/NormalModuleFactory.js?325))，调用resolve函数，解析出入口文件相关的转化器(```generator:JavascriptGenerator```),生成器(```parser:JavascriptParser ```)，以及```build```阶段所要实行的loader，在此期间也实例化了moduleGraph。

  > webpack中一个文件一般会生成一个module,moduleGraph 为module的依赖关系，比如一个js引入其他的文件，那这个js模块就是这些文件的祖先(origin)

  - ```buildModule```执行```module.doBuild```,初始化loader的context,也就是[文档](https://www.webpackjs.com/api/loaders/)中的this对象,loader运行完之后module有了相应的source及sourceMap属性。

  - 执行```module.doBuild```的回调，执行模块的this.parser.parse([acorn](https://www.npmjs.com/package/acorn))解析js文件，生成```AST```，遍历```AST```的节点，在HarmonyExportDependencyParserPlugin等插件中解析出模块依赖，加入到```module```中的```dependency```属性中(比如```HarmonyImportSideEffectDependency```类)

  ## [vite](https://github.com/vitejs/vite)

  > 如果用[babel](https://babel.docschina.org/)进行js降级转化,babel会先生成源码的[AST](https://github.com/fkling/astexplorer),再用其生成低版本js的[AST](https://github.com/fkling/astexplorer),然后用低版本的[AST](https://github.com/fkling/astexplorer)[babel](https://babel.docschina.org/)，webpack要进行```code -> AST -> AST -> code -> AST -> code ```的过程。

  - 执行```processDependencies```将入口```module```的```dependency```送入```handleModuleCreation```,执行相同的操作，知道没有依赖

  - 此时make阶段已经完成，将执行权交给compiler，执行compilation.seal，进入生成阶段

  ### 生成阶段 

  > 这一阶段主要是由```module```生成```chunk```，及```chunkGraph```,一个```chunk```一般代表着一个最终生成的文件，seal函数中如果配置文件中有```optimize```相关的配置，还会调用这些插件进行代码分割![如图](./image/optimize.jpg)

  - 调用```_runCodeGenerationJobs```生成```module```相关的```runtime```,如果有sourceMap的相关的配置```processAssets```钩子会执行```SourceMapDevToolPlugin```插件生成```sourceMap```信息;如果有```tree shaking```相关的配置```processAssets```钩子会执行```terser-webpack-plugin```插件进行代码压缩，这两点稍后再讲。

  - 调用```createChunkAssets```生成最终的内容数组，(调用```JavascriptModulesPlugin```插件在module
    ```runtime```的基础上添加```runtimeRequirements```)

    > ```runtimeRequirements```: 为代码运行正常添加的运行时

  - 控制权交由compile,执行```emitAssets```生成最终的文件


# 4. [sourceMap](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&pli=1&pli=1)

> sourceMap 是生成的文件到源文件的映射，可以更好的debugger， 其算法也不断改进，目前为v3版本。可以看一下这个[仓库](https://github.com/Rich-Harris/vlq)的代码，给我解了好多疑惑

> sourceMap 一般是由AST生成，webpack为了实现模块的链接，由[webpack-sources](https://github.com/webpack/webpack-sources#readme)来生成sourceMap

### 引入方法

  ```js
  //# sourceMappingURL=main.js.map
  ```

### 文件组成(*.js.map)

  - version: 映射算法的版本，目前应固定为v3，

  - file： 生成后的文件名称

  - sources： 源文件路径名称数组，
  
  - sourcesContent： 源文件内容数组， 与sources一一对应，现在直接通过sourcesContent生成源文件，而不是通过map计算得到

  - names：源文件变量数组

  - sourceRoot： 基础路径，sources路径的根目录

  - mappings: 生成的代码与源文件的映射数据编码字符串

### mapping的构成

  > mapping 形如```;ACADS,VDFegHG;```

  - 生成文件每一行的映射之间用```';'```隔开，可以根据```';'```出现的次数，来得出是哪一行的映射。如上，第一个```';'```之前的为生成文件第一行的映射，为空，则表示生成文件第一行与源文件之间没有位置映射

  - ```','```为映射片段分隔符，

  - 映射片段表示一个映射关系。用VLQ base64进行编码。
  
    >```;ACADS,VDFegHG;``` 表示生成的文件有2行，第0行没有产生位置映射，第1行有两个位置映射
  

### VLQ

  - VLQ(可变长度编码)用6位二进制表示一个位置,所表示的长度刚好与base64相同，则刚好可以用base64的一个字符表示一个位置。由于VLQ是可变长的，所以一个位置也可以由多个字符表示。

    ![无连续位](./image/VLQ1.png)

    > 当无连续位时，第一位表示是否有连续位，最后一位为符号位

    ![有连续位](./image/VLQ2.png)

    > 当有连续位时，高位第一位表示是否有连续位，高位最后一位不再是符号位，而是充当占位符；低位的第一位没有作用，最后一位为整个数据的符号位。上图表示的数值表示的大小为0b101001010 (330), 用base64表示为0U。
  
  ### mapping解析
   
  > 一个映射片段一般由5个这样的VLQ编码组成，我们以DACjBA为例子说明映射片段每一个位置表示的信息（bas64编码表"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"）,
    
  - 第一位为D，出现在编码的第3的位置， 表示源码的第3列（0为初列）。

  - 第二位为A，出现在编码的第0的位置， 表示源文件名称为sources的第0个元素。

  - 第三位为C，出现在编码的第2的位置， 表示源文件的第2行。

  - 第四位为j， 有延续位，jB共同表示一个位置， ``` ( (35 & 31)  + (1 << 5) ) >> 1 ) = 17```,由于最后一位是1，所以为```-17```

  - 第五位为A，出现在编码的第2的位置， 表示源文件这个位置为一个变量， 变量名称取name数组中的第0个。

  > 为什么会出现负数? 因为除了源文件的列数，其他位置的编码都是相对于上一个位置形成的。

# 5.[tree shaking](https://www.webpackjs.com/guides/tree-shaking/)
    
### 在 Webpack 中启用 Tree Shaking

- 前置条件

  - 使用 ESM 规范编写模块代码

  - 配置 optimization.usedExports 为 true，启动标记功能

  - 配置 mode = production;配置 optimization.minimize = true;提供 optimization.minimizer 数组进行代码删除

- 标记前后比较及压缩
  
  - webpack用的是```terser```,我用的是```Uglify```

# 6. 编写webpack loader

- [文档](https://www.webpackjs.com/loaders/)

> webpack中loader的执行由runLoaders控制

- loader有四种类型:inline,pre、normal、post, 可以通过Rule.enforce设置,所有 loader 通过 前置, 行内, 普通, 后置 排序，并按此顺序使用

- 一个loader文件应该这个样子,执行分为pitch阶段和normal阶段
```js
/**
 * - 有pitch方法(就是不会处理源代码)
 * 
 *   - 有返回值(args)
 *   
 *     - 进入normal阶段(依次执行normal代码， args作为流程处理的源)
 *   
 *     - 没有normal，则将args作为整个loader处理(build)流程的结果(result)
 *   
 *     - normal的参数为args(经过this.raw转化)
 * 
 *   - 没有返回值
 * 
 *     - 继续往前执行，直到normal阶段，buffer作为流程处理的源
 * 
 *     - 按照代码处理逻辑，最后一个loader的结果的mate（sourceMap）字段会被保留
 * 
 */
module.exports.pitch = function (remainingRequest, previousRequest, data) {
    this.data === data
    this.callback(null, )
    this.async(null,)
    return []
}

module.exports = function() {
    this.callback(null, )
    this.async(null,)
    return []
}
```
- 一个loader流最终的返回值:
```js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```

- webpack

# 7.编写webpack plugin

- [文档](https://www.webpackjs.com/contribute/writing-a-plugin/)

- 定义一个含有apply方法的类，并在配置文件的plugins中实例化

- [执行库](https://www.npmjs.com/package/tapable)


