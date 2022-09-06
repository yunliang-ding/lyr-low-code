---
order: 3
title: RegisterWidgets 组件注册层
toc: menu
---

## 默认使用 Form 内置的 widgets

```tsx
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';

export default () => {
  return (
    <FormDesigner>
      <FormDesigner.RegisterWidgets
        style={{
          height: 800,
          width: 300,
          border: '1px solid #f2f2f2',
        }}
        onClick={(item) => {
          console.log('click->', item);
        }}
      />
    </FormDesigner>
  );
};
```

## 安装自定义组件

```tsx
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';
import { Space } from 'antd';

export default () => {
  return (
    <FormDesigner>
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
                valuePropName: 'checked',
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
        style={{
          height: 900,
          width: 300,
          border: '1px solid #f2f2f2',
        }}
      />
    </FormDesigner>
  );
};
```

<API src="../../src/form-designer/register-widgets/index.tsx" hideTitle></API>
