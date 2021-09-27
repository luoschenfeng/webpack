- package.json 字段解析模块位置

  - 'browser', 'module', 'main'

- export 字段

  - 当模块被import时解析规则

    - 字符串时和main等一样

    - 对象

      - '.' property 和字符串的结果一样,**对应到文件**

      - './sub/path' 代表 'package/sub/path', 其相应的value作为解析结果（这样vscode不会跳转）**对应到文件**

      - 对象的key没有'.'会被{'.': {}}包裹

      - key为'.'可以为对象，这个对象的key为condiction

      - 配合package.json的type可以对引用方式做限制

      - package.json 中的 browser 对应的是webpack target的web


