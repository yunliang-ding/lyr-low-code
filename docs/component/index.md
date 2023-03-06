---
title: 组件介绍
order: 1
toc: menu
nav:
  title: 组件
  order: 1
---

## 依赖 cdn 资源

```js
<link herf="https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.36.0/min/vs/editor/editor.main.min.css"/>
<script src="https://cdn.bootcdn.net/ajax/libs/prettier/2.8.4/standalone.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/prettier/2.8.4/parser-typescript.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.21.2/babel.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.36.0/min/vs/loader.min.js"></script>
```

<Alert>

- 核心拖拽层 `FormCanvas` Form 表单 主设计拖拽区域

- 核心拖拽层 `TableCanvas` Table 表格 主设计拖拽区域

- 组件注册层 `RegisterWidgets` 用于注册生成可拖拽的小部件

- 属性设置层 `PropsConfigPanel` 每个 widgets 属性配置区域

- 组件模型渲染 `CrudModelRender` 渲染相关的模型

</Alert>
