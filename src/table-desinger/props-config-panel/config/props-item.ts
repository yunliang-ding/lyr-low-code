/**
 * Item的属性配置
 */

import formItemSchema from '@/form-designer/props-config-panel/config/props-item';

export default (schema, selectedSchema) =>
  formItemSchema(
    [
      {
        widget: 'InputNumber',
        name: 'labelWidth',
        label: '字段宽度',
      },
      {
        widget: 'Switch',
        name: 'isExpand',
        label: '更多才展示',
      },
      {
        widget: 'Switch',
        name: 'autosearch',
        label: '改变立即查询',
      },
    ],
    schema,
    selectedSchema,
  );
