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
    <img alt="npm" src="http://center.yunliang.cloud/npm/version?package=react-core-form-designer">
  </a>
  <a href="https://npmmirror.com/package/react-core-form-designer">
    <img alt="npm" src="http://center.yunliang.cloud/npm/downloads?package=react-core-form-designer">
  </a>
</p>

## 依赖 cdn 资源

```js
'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/arco.min.css';
'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/react-core-form.min.css';
'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/aliyun-oss-sdk.min.js';
'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/babel-standalone.min.js';
'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js';
'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js';
'https://react-core-form.oss-cn-beijing.aliyuncs.com/cdn/prism.min.js';
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
