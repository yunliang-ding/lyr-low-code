> 目前仅打包了 umd 版本

```html
<!-- window.lyrLowCode -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-low-code.min.js"></script>
```

## 依赖 cdn 资源

```html
<!-- window.React -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react.production.min.js"></script>
<!-- window.ReactDOM -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/react-dom.production.min.js"></script>
<!-- window.html2canvas -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/html2canvas.min.js"></script>
<!-- window.arco -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco.min.js"></script>
<!-- window.arcoicon -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/arco-icon.min.js"></script>
<!-- window.jsxRuntime -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/jsx-runtime.polyfill.js"></script>
<!-- window.lyr -->
<link
  rel="stylesheet"
  href="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.css"
/>
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-component.min.js"></script>
<!-- window.lyrCodeEditor -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/lyr-code-editor.min.js"></script>
<!-- dark+ 主题 -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prism.min.js"></script>
<!-- code 格式化 -->
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-standalone.min.js"></script>
<script src="https://lyr-cli-oss.oss-cn-beijing.aliyuncs.com/cdn/prettier-parser-typescript.min.js"></script>
```

## 注册自定义组件

```jsx
const [form] = FormDesigner.useForm();

form.registerWidgets({
  CustomInput: {
    label: '自定义组件',
    props: {
      placeholder: '请选择',
      allowClear: true,
      disabled: false,
      mode: '',
    },
    propsConfig: [
      {
        widget: 'Switch',
        name: 'disabled',
        label: '是否禁用',
      },
      {
        widget: 'Input',
        name: 'placeholder',
        label: '提示文案',
      },
    ],
    render: (props) => {
      return (
        <div>
          自定义组件
          <input {...props} />
        </div>
      );
    },
  },
});
```
