---
title: 组件介绍
order: 1
toc: menu
nav:
  title: 组件
  order: 1
---

<div style="display:flex;align-items:center;margin-bottom:24px">
  <span style="font-size:30px;font-weight:600;display:inline-block;">lyr-low-code</span>
</div>
<p style="display:flex;justify-content:space-between;width:220px">
  <a href="https://npmmirror.com/package/lyr-low-code">
    <img alt="npm" src="https://center.yunliang.cloud/npm/version?package=lyr-low-code">
  </a>
  <a href="https://npmmirror.com/package/lyr-low-code">
    <img alt="npm" src="https://center.yunliang.cloud/npm/downloads?package=lyr-low-code">
  </a>
</p>

## 依赖 cdn 资源

```html
<!-- window.React -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js"></script>
<!-- window.ReactDOM -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js"></script>
<!-- window.arco -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js"></script>
<!-- window.arcoicon -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco-icon.min.js"></script>
<!-- window.jsxRuntime -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js"></script>
<!-- window.lyr -->
<link
  rel="stylesheet"
  href="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-design.min.css"
/>
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-design.min.js"></script>
<!-- dark+ 主题 -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prism.min.js"></script>
<!-- code 格式化 -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js"></script>
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js"></script>
```

## 注册业务组件

```jsx | pure
<FormDesigner.RegisterWidgets
  customWidgets={{
    CustomInput: () => {
      return (
        <div>
          自定义组件
          <input {...props} />
        </div>
      );
    },
  }}
  customWidgetsPropsConfig={[
    {
      type: 'CustomInput',
      label: '自定义组件',
      props: {
        placeholder: '请选择',
        allowClear: true,
        disabled: false,
        mode: '',
      },
      propsConfig: [
        {
          type: 'Switch',
          name: 'disabled',
          label: '是否禁用',
        },
        {
          type: 'Input',
          name: 'placeholder',
          label: '提示文案',
        },
      ],
    },
  ]}
/>
```
