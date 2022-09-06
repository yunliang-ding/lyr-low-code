---
order: 2
title: FormCanvas 核心拖拽层
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';
import defaultSchema from './schema';
import { message } from 'antd';

export default () => {
  return (
    <FormDesigner>
      <FormDesigner.FormCanvas
        column={2}
        onCtrlS={() => {
          message.loading('保存中', 2);
        }}
        defaultSchema={defaultSchema}
        defaultSelectKey={defaultSchema[0].key}
        onSchemaSelect={(field) => {
          console.log('onSchemaSelect', field);
        }}
        onSchemaUpdate={(field) => {
          console.log('onSchemaUpdate', field);
        }}
      />
    </FormDesigner>
  );
};
```

<API src="../../src/form-designer/form-canvas/index.tsx" hideTitle></API>
