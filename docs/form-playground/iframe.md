---
order: 1
nav:
  order: 3
  title: ''
sidemenu: false
gapless: true
---

```tsx
/**
 * iframe: true
 */
import ReactDom from 'react-dom';
import React, { useState, useEffect } from 'react';
import { getTools } from 'react-core-form-designer';

export default () => {
  const { babelParse } = getTools();
  // 获取模块模型
  const escode = localStorage.getItem('react-hooks-code');
  // 解析
  const parseStringToModule = async () => {
    const ComponentApp = await babelParse({
      code: escode,
      prefix: '',
    });
    ReactDom.render(<ComponentApp />, document.querySelector('#app'));
  };
  useEffect(() => {
    parseStringToModule();
  }, []);
  return <div id="app" />;
};
```
