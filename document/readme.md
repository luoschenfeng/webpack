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





-  





- createModule

 - loaderResolver