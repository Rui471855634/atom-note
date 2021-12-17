# AtomNote
轻量级待办事项管理器

## Features
- [x] add typescript support
- [x] add electron support
- [x] add tailwindcss support
- [x] add pug support
- [x] add element-plus support(version 1.2.0-beta.5)
- [x] add vue router support
- [x] add vuex support
- [ ] add axios support
- [ ] page design

## Bug fixes(only for important bug)
1. [x] fix bug: vue3和sass-loader^12版本不兼容，报错：`TypeError: this.getOptions is not a function`，需降低sass-loader版本
2. [x] fix bug: js可选链（optional chaining）报错，需修改`tsconfig.json`的`target`option，将`esnext`改为`es2019`。另增加`@babel/plugin-proposal-nullish-coalescing-operator`和`@babel/plugin-proposal-optional-chaining`插件，并在.babelrc中开启。[相关Issue](https://github.com/webpack/webpack/issues/10227)
