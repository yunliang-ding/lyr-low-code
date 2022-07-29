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
import React, { useState, useEffect } from 'react';
import { getTools } from 'react-core-form-designer';

export default () => {
  const [ParseModules, setParseModules] = useState(<span>解析中...</span>);
  const { babelParse } = getTools();
  // 获取模块模型
  const escode = localStorage.getItem('react-hoos-code');
  // 解析
  const parseStringToModule = async () => {
    const ParseModules = await babelParse(escode, '');
    setParseModules(ParseModules);
  };
  useEffect(() => {
    parseStringToModule();
  }, []);
  return ParseModules;
};
```
