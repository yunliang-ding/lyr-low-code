/**
 * Item的属性配置
 */
import { SchemaProps } from 'react-core-form';

const fields: SchemaProps<{}>[] = [
  {
    type: 'Input',
    name: 'key',
    label: '唯一标识',
    props: {
      disabled: true,
    },
  },
  {
    type: 'Input',
    name: 'label',
    label: '字段标签',
  },
  {
    type: 'Input',
    name: 'name',
    label: '字段名称',
  },
  {
    type: 'RadioGroup',
    name: 'span',
    label: '占据列数',
    props: {
      optionType: 'button',
      options: [
        {
          label: '1列',
          value: 1,
        },
        {
          label: '2列',
          value: 2,
        },
        {
          label: '3列',
          value: 3,
        },
      ],
    },
  },
  {
    type: 'InputNumber',
    name: 'labelWidth',
    label: '字段宽度',
  },
  {
    type: 'Switch',
    name: 'ismore',
    valuePropName: 'checked',
    label: '更多才展示',
  },
  {
    type: 'Switch',
    name: 'autosearch',
    valuePropName: 'checked',
    label: '改变立即查询',
  },
  {
    type: 'Select',
    name: 'effect',
    label: '设置effect',
    props: {
      mode: 'multiple',
    },
  },
  {
    type: 'Switch',
    name: 'effectClearField',
    valuePropName: 'checked',
    label: '依赖变化清空值',
    visible({ effect }) {
      return effect?.length > 0;
    },
  },
  {
    type: 'FunctionEditor',
    name: 'isShow',
    label: '设置isShow',
    props: {
      noChangeClearCode: true,
    },
  },
  {
    type: 'FunctionEditor',
    name: 'beforeReceive',
    label: '设置beforeReceive',
    props: {
      noChangeClearCode: true,
    },
  },
  {
    type: 'FunctionEditor',
    name: 'transfrom',
    label: '设置transfrom',
    props: {
      noChangeClearCode: true,
    },
  },
];

export default fields;
