---
title: 组件介绍
order: 1
toc: menu
nav:
  title: 组件
  order: 1
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <span style="font-size:30px;font-weight:600;display:inline-block;">react-core-form-designer</span>
</div>
<p style="display:flex;justify-content:space-between;width:220px">
  <a href="https://npmmirror.com/package/react-core-form-designer">
    <img alt="npm" src="http://121.4.49.147:8360/npm/version?package=react-core-form-designer">
  </a>
  <a href="https://npmmirror.com/package/react-core-form-designer">
    <img alt="npm" src="http://121.4.49.147:8360/npm/downloads?package=react-core-form-designer">
  </a>
</p>

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
