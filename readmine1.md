# compiler

- new compiler
  
  - 添加钩子

    - compilation: tap

      - 调用方法

        - compilation.dependencyFactories()

    - make: tapAsync

      - 调用方法

        - compilation.addEntry 添加入口

        - handleModuleCreation   resolveData.createData 添加loader

          - 执行钩子

            - compilation.hooks.addEntry

        - build

        - buildModule

          - runLoaders

          - _source

          - _ast
            
- beforeRun

- run

  - compiler.hooks.finishMake

- beforeCompile

- compile

- thisCompilation

- compilation

- make

# compilation

- processAssetsHook

- processAdditionalAssets

- 处理顺序

  - entry
    
    - module

    - dependency
  
  - chunk

  - seal

  - emitAssets

- complication

  - normalModuleFactory

     - WebpackOptionsApply  compile(hook)  factorize  

  - contextModuleFactory

- complier

  - outputFileSystem

  - inputFileSystem

  - resolveOptions

    - resolveOptions、resolver 




- NormalModuleFactory

  - beforeResolve

  - resolve

  - factorize

  - resolve

  - property

    - resolve -> complier.resolve -> new ResolveFactory()




 
- entry.item : {
  dependencies: [
    {
      _parentModule: undefined,
      _parentDependenciesBlock: undefined,
      weak: false,
      optional: false,
      _locSL: 0,
      _locSC: 0,
      _locEL: 0,
      _locEC: 0,
      _locI: undefined,
      _locN: "main",
      _loc: {
        name: "main",
      },
      request: "/mnt/d/code/webpack/entry/src/index.js",
      userRequest: "/mnt/d/code/webpack/entry/src/index.js",
      range: undefined,
      assertions: undefined,
    },
  ],
  includeDependencies: [
  ],
  options: {
    name: "main",
    filename: undefined,
    runtime: undefined,
    layer: undefined,
    dependOn: undefined,
    publicPath: undefined,
    chunkLoading: undefined,
    wasmLoading: undefined,
    library: undefined,
  },
}

- 使用一个或多个！将loader分开

- loader 
  
{
  loader: "/mnt/d/code/webpack/node_modules/babel-loader/lib/index.js",
  options: {
    presets: [
      "@babel/preset-env",
    ],
  },
  ident: "ruleSet[1].rules[0].use[0]",
}

- module


- loader 

  - pitch 

  - normal

