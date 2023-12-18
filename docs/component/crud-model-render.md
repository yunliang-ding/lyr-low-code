---
order: 10
title: CrudModelRender 渲染器
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f8f8f8'
 */
import React from 'react';
import { CrudModelRender } from 'react-core-form-designer';

export default () => {
  return <CrudModelRender schemaId={5} />;
};
```

## 注入依赖

```tsx
/**
 * background: '#f8f8f8'
 */
import React from 'react';
import { CrudModelRender } from 'react-core-form-designer';

export default () => {
  return (
    <CrudModelRender
      schemaId={20}
      require={{
        hello: () => {
          console.log('hello');
        },
      }}
    />
  );
};
```

## API

<!-- <API src="../../src/crud-model-render/index.tsx" hideTitle></API> -->
