# 低码相关组件1

## FormDesigner 表单设计器

```tsx
import React from 'react';
import { FormDesigner } from 'react-core-form-designer';

export default () => {
  const formDesignerRef = React.useRef({});
  return (
    <FormDesigner ref={formDesignerRef}>
      <FormDesigner.RegisterWidgets />
      <FormDesigner.FormCanvas />
      <FormDesigner.PropsConfigPanel />
    </FormDesigner>
  );
};
```

## TableDesigner 表格设计器

```tsx
import React from 'react';
import { TableDesigner } from 'react-core-form-designer';

export default () => {
  const tableDesignerRef = React.useRef({});
  return (
    <TableDesigner ref={tableDesignerRef}>
      <TableDesigner.RegisterWidgets />
      <TableDesigner.TableCanvas />
      <TableDesigner.PropsConfigPanel />
    </TableDesigner>
  );
};
```
