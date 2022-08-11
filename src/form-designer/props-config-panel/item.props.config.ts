/**
 * Item的属性配置
 */
import { SchemaProps } from 'react-core-form';

const fields: SchemaProps<{
  path: string;
}>[] = [
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
    type: 'Switch',
    valuePropName: 'checked',
    name: 'required',
    label: '是否必填',
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
    type: 'BindFunction',
    name: 'onEffect',
    label: '设置onEffect',
    effect: ['effect'],
    visible({ effect }) {
      return effect?.length > 0;
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
    type: 'BindFunction',
    name: 'visible',
    label: '设置visible',
  },
  {
    type: 'BindFunction',
    name: 'beforeReceive',
    label: '设置beforeReceive',
  },
  {
    type: 'BindFunction',
    name: 'transfrom',
    label: '设置transfrom',
  },
  {
    type: 'BindFunction',
    name: 'innerItemRender',
    label: '设置itemRender',
  },
];

export default fields;
