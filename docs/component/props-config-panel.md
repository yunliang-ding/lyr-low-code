---
order: 4
title: PropsConfigPanel 属性设置层
toc: menu
---

## 基本使用

```tsx
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';

export default () => {
  return (
    <FormDesigner>
      <FormDesigner.PropsConfigPanel
        props={{
          disabled: false,
          allowClear: true,
          placeholder: '请输入',
          maxLength: 64,
        }}
        propsConfig={[
          {
            type: 'Switch',
            valuePropName: 'checked',
            name: 'disabled',
            label: '是否禁用',
          },
          {
            type: 'Switch',
            name: 'allowClear',
            valuePropName: 'checked',
            label: '是否允许清除',
          },
          {
            type: 'Input',
            name: 'placeholder',
            label: '提示文案',
          },
          {
            type: 'InputNumber',
            name: 'maxLength',
            label: '最大长度',
          },
          {
            type: 'FunctionEditor',
            name: 'onChange',
            label: '设置onChange',
          },
        ]}
        style={{
          height: 600,
          width: 400,
          border: '1px solid #f2f2f2',
        }}
        onPropsConfigUpdate={(newProps, type) => {
          console.log('onPropsConfigUpdate->', type, newProps);
        }}
      />
    </FormDesigner>
  );
};
```
