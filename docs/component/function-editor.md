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
        debounceTime={0}
        prefix=""
        style={{ width: '100%', height: 300 }}
        value={`export default async (data) => {
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
        style={{ width: '100%', height: 300 }}
        debounceTime={0}
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
        debounceTime={0}
        style={{ width: '100%', height: 300 }}
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

## 使用第三方依赖包

```tsx
/**
 * background: '#fff'
 */
import React from 'react';
import { Button } from 'antd';
import axios from 'axios';
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
        debounceTime={0}
        require={{
          request: axios,
        }}
        style={{ width: '100%', height: 300 }}
        value={`import axios from 'axios';

export const getList = () => {
  console.log('is getList', axios)
};
export const add = () => {
  console.log('is add')
};`}
      />
    </>
  );
};
```
