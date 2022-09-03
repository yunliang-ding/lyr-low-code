---
order: 7
title: FunctionEditor 函数编辑器
toc: menu
---

## 导出默认函数

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Button } from 'antd';
import { FunctionEditor } from 'react-core-form-designer';

export default () => {
  const functionRef = React.useRef({});
  const runApi = async () => {
    const fn = functionRef.current.getModuleDefault();
    console.log(await fn(100));
  };
  return (
    <>
      <Button type="primary" onClick={runApi}>
        点击打开控制台查看
      </Button>
      <br />
      <br />
      <FunctionEditor
        functionRef={functionRef}
        value={`async (data) => {
  return data
}`}
      />
    </>
  );
};
```

## 导出默认对象

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Button } from 'antd';
import { FunctionEditor } from 'react-core-form-designer';

export default () => {
  const functionRef = React.useRef({});
  const runApi = async () => {
    const obj = functionRef.current.getModuleDefault();
    console.log(obj);
  };
  return (
    <>
      <Button type="primary" onClick={runApi}>
        点击打开控制台查看
      </Button>
      <br />
      <br />
      <FunctionEditor
        functionRef={functionRef}
        prefix=""
        value={`export default {
  options: {
    style: {}
  }
}`}
      />
    </>
  );
};
```

## 导出多个对象

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Button } from 'antd';
import { FunctionEditor } from 'react-core-form-designer';

export default () => {
  const functionRef = React.useRef({});
  const runApi = async () => {
    const obj = functionRef.current.getModule();
    console.log(obj);
  };
  return (
    <>
      <Button type="primary" onClick={runApi}>
        点击打开控制台查看
      </Button>
      <br />
      <br />
      <FunctionEditor
        prefix=""
        functionRef={functionRef}
        value={`export const user1 = {
  name: 'Test1',
  age: 90
};
export const user2 = {
  name: 'Test2',
  age: 90
}`}
      />
    </>
  );
};
```

## 导出多个函数

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Button } from 'antd';
import { FunctionEditor } from 'react-core-form-designer';

export default () => {
  const functionRef = React.useRef({});
  const runApi = async () => {
    const fns = functionRef.current.getModule();
    console.log(fns);
  };
  return (
    <>
      <Button type="primary" onClick={runApi}>
        点击打开控制台查看
      </Button>
      <br />
      <br />
      <FunctionEditor
        prefix=""
        functionRef={functionRef}
        value={`export const getList = () => {
  console.log('is getList')
};
export const add = () => {
  console.log('is add')
}`}
      />
    </>
  );
};
```
