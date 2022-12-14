import { SchemaProps } from 'react-core-form';

export default [
  {
    type: 'FieldSet',
    name: 'header',
    label: '头部信息设置',
    props: {
      children: [
        {
          type: 'Input',
          name: 'title',
          label: '标题',
        },
        {
          type: 'JsonEditor',
          name: 'breadcrumb',
          label: '设置面包屑',
        },
        {
          type: 'JsonEditor',
          name: 'extra',
          label: '设置操作按钮',
        },
      ],
    },
  },
  {
    type: 'JsonEditor',
    name: 'tabList',
    label: '选项卡设置',
  },
  {
    type: 'FunctionEditor',
    label: '切换选项卡回调',
    name: 'onTabChange',
  },
  {
    type: 'RadioGroup',
    name: 'column',
    label: '设置内容布局',
    props: {
      optionType: 'button',
      options: [
        {
          label: '一等份',
          value: 1,
        },
        {
          label: '二等份',
          value: 2,
        },
        {
          label: '三等份',
          value: 3,
        },
        {
          label: '四等份',
          value: 4,
        },
      ],
    },
  },
] as SchemaProps[];
