import { SchemaProps } from 'react-core-form';

export default [
  {
    type: 'FunctionEditor',
    name: 'onMount',
    label: '页面加载完钩子',
  },
  {
    type: 'BlockQuote',
    props: {
      title: '头部信息设置',
    },
  },
  {
    type: 'FunctionEditor',
    name: 'title',
    label: '标题渲染',
    extra: '仅在渲染阶段生效',
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
  {
    type: 'JsonEditor',
    name: 'descriptions',
    label: '设置描述信息',
  },
  {
    type: 'JsonEditor',
    name: 'tabList',
    label: '选项卡设置',
  },
  {
    type: 'Input',
    name: 'activeKey',
    label: '选项卡选中值',
  },
  {
    type: 'FunctionEditor',
    label: '切换选项卡回调',
    name: 'onTabChange',
  },
  {
    type: 'JsonEditor',
    name: 'footer',
    label: '底部操作按钮',
  },
] as SchemaProps[];
