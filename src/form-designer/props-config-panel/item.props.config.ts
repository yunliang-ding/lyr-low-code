/**
 * Item的属性配置
 */
import { SchemaProps } from 'react-core-form';

export const formItemSchema = (
  insertSchema = [
    {
      type: 'Switch',
      valuePropName: 'checked',
      name: 'required',
      label: '是否必填',
    },
    {
      type: 'FunctionEditor',
      name: 'rules_is_code',
      label: '规则校验',
      props: {
        prefix: '',
        style: {
          height: 160,
          width: 360,
        },
        defaultCode: '[{}]',
      },
    },
  ] as SchemaProps<{}>[],
  type?: string,
): SchemaProps<{}>[] => [
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
    type: 'RangeInput',
    name: 'nameAlise',
    label: '字段别名',
    extra: '用于区间组件设置别名',
    props: {
      mode: 'Input',
    },
    visible() {
      return ['RangeInput', 'RangePicker'].includes(type);
    },
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
  ...insertSchema,
  {
    type: 'Select',
    name: 'effect',
    label: '设置effect',
    props: {
      mode: 'multiple',
    },
  },
  {
    type: 'FunctionEditor',
    name: 'onEffect',
    label: '设置onEffect',
    effect: ['effect'],
    visible({ effect }) {
      return effect?.length > 0;
    },
    props: {
      style: {
        height: 160,
        width: 360,
      },
      noChangeClearCode: true,
      defaultCode: `async (name, form) => {
 
}`,
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
    name: 'visible',
    label: '设置visible',
    props: {
      style: {
        height: 160,
        width: 360,
      },
      noChangeClearCode: true,
      defaultCode: `(values) => {
  return true;
}`,
    },
  },
  {
    type: 'FunctionEditor',
    name: 'beforeReceive',
    label: '设置beforeReceive',
    props: {
      style: {
        height: 160,
        width: 360,
      },
      noChangeClearCode: true,
      defaultCode: `(values) => {
 
}`,
    },
  },
  {
    type: 'FunctionEditor',
    name: 'transfrom',
    label: '设置transfrom',
    props: {
      style: {
        height: 160,
        width: 360,
      },
      noChangeClearCode: true,
      defaultCode: `(values) => {
 
}`,
    },
  },
  {
    type: 'FunctionEditor',
    name: 'innerItemRender',
    label: '设置itemRender',
    props: {
      style: {
        height: 200,
        width: 360,
      },
      noChangeClearCode: true,
      defaultCode: `(dom, { form }) => {
 
}`,
    },
  },
];

export default formItemSchema;
