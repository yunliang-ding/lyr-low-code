---
order: 7
title: JsonEditor json编辑器
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { JsonEditor } from 'react-core-form-designer';

export default () => {
  let value = [
    {
      label: '选项1',
      value: 1,
    },
    {
      label: '选项2',
      value: 2,
    },
    {
      label: '选项3',
      value: 3,
    },
  ];
  return (
    <>
      <h3>请查看控制台打印、当内容发生改变</h3>
      <JsonEditor
        value={value}
        onChange={(code) => {
          console.log(code);
        }}
      />
    </>
  );
};
```
