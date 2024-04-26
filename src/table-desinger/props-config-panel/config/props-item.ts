/**
 * Item的属性配置
 */

import formItemSchema from '@/form-designer/props-config-panel/config/props-item';

export default (schema, selectedSchema) =>
  formItemSchema(
    [
      {
        type: 'InputNumber',
        name: 'labelWidth',
        label: '字段宽度',
      },
      {
        type: 'Switch',
        name: 'isExpand',
        label: '更多才展示',
      },
      {
        type: 'Switch',
        name: 'autosearch',
        label: '改变立即查询',
      },
    ],
    schema,
    selectedSchema,
  );
