# 概述

  - 前端代码为什么要进行打包

    - ES5以前,开发人员主要是通过调整引入脚本的顺序来控制代码的依赖关系,并且如果一段代码需要被多次使用,通常需要用一个script标签把这段代码单独引
    
    入，这样做很容易造成依赖关系不明确、变量全局污染等问题（其他缺点就不一一赘述）。
    
    - 上述问题，也可以用AMD等方法可以解决, ES2015以后, javascript 也原生支持模块化的编写代码，[example](./snippets/module.md)
      
      使得前端的模块化机制规范化，我认为原生的方案主要有以下好处：

      - 编辑器的支持。 哪里不知道点哪里，很容易找到依赖代码的位置；以路径作为标识符，也很容易被引用

      - 静态引用分析

    - 用module的方式开发很好，但兼容性是一个问题, ![module](/assets/module.png "module 兼容性")
    
    前端的代码打包的宗旨主要是让开发者模块化的

- compilation

  - this.entries

  - module

    - resolveData -> createData, resourceResolveData
    
    - newModule = new NormalModule()

    - ModuleGraph.setModuleGraphForModule  (modules, moduleGraphForModule, moduleGraphConnect, moduleGraphModule)
    
    - build(loader转化)