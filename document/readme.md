- compiler 


- createCompiler  ->  new compiler()  

    - 预埋钩子

    - new entryPlugin()

- beforeRun

- run

- beforeCompile

  - 创建normalModuleFactory

- compile ->  创建compilation

  - hooks.compilatoin

    - 以入口路径创建Dependency(request 属性为entry的import属性)

- make hook 触发 进入构建阶段

    - entries

      - 以前面创建的entryPlugin和Dependency属性将入口添加到compilation

    - 

- beforeDone

- done

- afterDone

- createModule

 - loaderResolver


# 打包工具

  > 虽然最初的打包只是为了解决模块化开发的问题，但随着技术的发展，需要的功能也就越来越多，比如中间代码的处理、sourceMap、tree-shaking、dev-serve、HMR等。这些功能在我们现在的开发中已经不可或缺，也极大的提高了我们的生产力。
  
  目前为止，完成度比较高的打包工具有以下几个:
  
  ## [snowpack](https://www.snowpack.dev/)

    - 使用[esbuild](https://esbuild.github.io/)打包速度极快、但不是很流行，作者最近声明以后基本不会参与维护工作，而是交由不太活跃的社区

  ## [vite](https://github.com/vitejs/vite)

    - vue作者开发的打包工具，同样使用[esbuild](https://esbuild.github.io/)进行二次开发，最初是因为snowpack的模块热更新实现不太理想而开发的，社区比较活跃，但发行的时间还不是很长，问题比较多。

    - 值得一提的是里面处理js所用到的[esbuild](https://esbuild.github.io/)，其用go开发，打包的速率非常快，但官方声明此工具只是js打包的处理集，对其他功能永远不会支持，这就是为什么vite需要基于[esbuild](https://esbuild.github.io/)进行二次开发，并且最近才支持插件机制，这也是vite选用[rollupjs](https://rollupjs.org/guide/en/)插件机制的原因。但可以预见，这种使用其他高效的语言实现的打包工具以后会越来越多，并且随着vue3开始流行起来，vite也会成为打包方案的主流。其实webpack已经将其处理js的逻辑已经解耦出来，社区中已经出现esbuild-loader、esbuild-webpack-plugin等工具。

  ## [webpack](https://webpack.docschina.org)

    - 本次分享的主角，使用广泛，社区活跃，功能完善。webpack主要通过watchpack、webpack、webpack-cli、webpack-merge、webpack-sources、webpack-dev-*等模块完成，至5.0版本实现的功能越来越多，代码量也越来越大，大约20k多行代码，由于我的精力有限，实难面面俱到。本次分享准备也不是很充分，有什么纰漏的地方，还请指正，不熟悉的相互讨论。
      



# webpack打包过程

- 可以将webpack 打包的整个过程分为3个阶段

  - 准备阶段

    - webpack首先会运行webpack-cli, webpack-cli使用
    
    ![Commander.js](https://github.com/tj/commander.js "Commander.js")来接受用户的命令行输入，
    
    然后将**命令行输入**、**配置文件**及**默认配置**进行合并，得到最终的配置信息(option)。
    用option初始化complie
    


  - 构建阶段

  - 生成阶段 


# sourceMap

> sourceMap 是生成文件到源文件的映射，可以更好的debugger， 其算法不断改进，目前为v3版本，其压缩程度较v1提升75%左右。

- 引入方法： 
  ```js
  //# sourceMappingURL=main.js.map
  ```

- 对象结构(*.js.map):

  - version: 映射算法的版本，目前为止应固定为3，

  - file： 生成后的文件

  - sources： 源文件路径数组，
  
  - sourcesContent： 源文件内容数组， 与sources一一对应，现在一般都是通过sourcesContent直接生成源文件

  - names： 关键源文件变量数组

  - sourceRootL： 基础路径，sources路径的根目录

  - mappings 生成代码与源文件的映射关系

- mappings组成

  - 每行用;隔开

  - 每个语句用,隔开

  - 每个位置代表的是源码和生成的代码的位置关系。位置信息用VLQ base64。

  - 位置信息用VLQ base64编码（转化后的行由分号个数的累加已经知道）
    
    - 第一位，表示这个位置在（转换后的代码的）的第几列。
    
    - 第二位，表示这个位置属于sources属性中的哪一个文件。
    
    - 第三位，表示这个位置属于转换前代码的第几行。
    
    - 第四位，表示这个位置属于转换前代码的第几列。
    
    - 第五位，表示这个位置属于names属性中的哪一个变量（如果没有相应的映射可以省略）

    > VLQ(可变长度编码)用6位二进制表示一个位置，所表示长度位64，刚好与base64 长度相对应，则可以将一个位置用base64的一个值来表示。由于VLQ是可变长的，所以一个位置可以由多个字符表示。

    -  我们以DACjBA;为例子说明其表示的位置信息（bas64编码表""ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/""）,
    
      - 第一位为D，出现在编码的第3的位置， 表示源码的第3列（0列为初）。

      - 第二位为A，出现在编码的第0的位置， 表示源文件名称为sources的第0个元素。

      - 第三位为C，出现在编码的第2的位置， 表示源文件的第2行。

      - 第四位为j， 为延续位，要对延续为后的编码进行位运算右移(有符号)5，由于js在执行位运算会把字符转化成int32； 所以 <<5 表示增大2 ** 5(32)

      - 


    

