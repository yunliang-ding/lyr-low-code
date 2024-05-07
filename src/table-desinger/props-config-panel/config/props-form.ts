/**
 * Form的属性配置
 */
import { SchemaProps } from 'lyr-component';

const schema: SchemaProps<{
  path: string;
}>[] = [
  {
    widget: 'RadioGroup',
    name: 'column',
    label: '占据列数',
    props: {
      type: 'button',
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
        {
          label: '4列',
          value: 4,
        },
      ],
    },
  },
  {
    widget: 'RadioGroup',
    name: 'layout',
    label: '布局方式',
    props: {
      type: 'button',
      options: [
        {
          label: 'inline',
          value: 'inline',
        },
        {
          label: 'vertical',
          value: 'vertical',
        },
      ],
    },
  },
  {
    widget: 'Switch',
    name: 'toolReverse',
    label: '查询按钮位置互换',
  },
  {
    widget: 'Switch',
    name: 'defaultExpand',
    label: '默认展开更多',
  },
  {
    widget: 'Switch',
    name: 'clearInitialValuesOnReset',
    label: '清空是否保留默认值',
  },
  {
    widget: 'Switch',
    name: 'hidden',
    label: '是否隐藏查询条件',
  },
];

export default schema;
