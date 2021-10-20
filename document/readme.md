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

  - webpack首先会运行webpack-cli, webpack-cli使用[Commander.js](https://github.com/tj/commander.js)来接受用户的命令行输入，然后将***命令行输入***、***配置文件***及***默认配置***进行合并，得到最终的配置信息(option)。用option初始化complie
    


  - 构建阶段

  - 生成阶段 


# 4. [sourceMap](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?hl=en_US&pli=1&pli=1)

> sourceMap 是生成的文件到源文件的映射，可以更好的debugger， 其算法也不断改进，目前为v3版本。

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

  > 为什么会出现复数? 因为除了源文件的列数，其他位置的编码都是相对于上一个位置形成的。


    

