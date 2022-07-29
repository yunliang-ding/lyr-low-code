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
import { CardForm } from 'react-core-form';

export default () => {
  const { babelParse } = getTools();
  const [spin, steSpin] = useState(true);
  const [modules, setModules] = useState({});
  // 获取模块模型
  const escode = localStorage.getItem('module-schema');
  // 解析
  const parseStringToModule = async () => {
    const result = await babelParse(escode, '');
    setModules(result);
    steSpin(false);
  };
  useEffect(() => {
    parseStringToModule();
  }, []);
  return spin ? (
    <div style={{ padding: 4 }}>loading</div>
  ) : (
    <CardForm
      cardProps={{
        bodyStyle: {
          height: 'calc(100vh - 115px)',
          overflow: 'auto',
        },
      }}
      {...modules}
    />
  );
};
```
