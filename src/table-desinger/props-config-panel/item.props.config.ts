/**
 * Item的属性配置
 */
import formItemSchema from '@/form-designer/props-config-panel/item.props.config';

export default formItemSchema([
  {
    type: 'InputNumber',
    name: 'labelWidth',
    label: '字段宽度',
  },
  {
    type: 'Switch',
    name: 'isExpand',
    valuePropName: 'checked',
    label: '更多才展示',
  },
  {
    type: 'Switch',
    name: 'autosearch',
    valuePropName: 'checked',
    label: '改变立即查询',
  },
]);
