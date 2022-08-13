---
order: 7
title: FunctionEditor 函数编辑器
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Button } from 'antd';
import { getTools, FunctionEditor } from 'react-core-form-designer';

export default () => {
  const { babelParse, decrypt } = getTools();
  let defaultCode = `async () => {
  return 'hello world'
}`;
  const parseCode = async () => {
    try {
      const fn = babelParse(defaultCode);
      console.log(await fn());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button type="primary" onClick={parseCode}>
        点击打开控制台查看
      </Button>
      <br />
      <br />
      <FunctionEditor
        onChange={(code) => {
          // 需要解码处理
          defaultCode = decrypt(code, false);
        }}
        defaultCode={defaultCode}
      />
    </>
  );
};
```
