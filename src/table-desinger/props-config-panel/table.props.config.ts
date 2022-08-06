/**
 * Table的属性配置
 */
import { SchemaProps } from 'react-core-form';

const fields: SchemaProps<{
  path: string;
}>[] = [
  {
    type: 'Input',
    name: 'title',
    label: '列表标题',
  },
  {
    type: 'Input',
    name: 'emptyNode',
    label: '空数据提示文案',
  },
  {
    type: 'BlockQuote',
    props: {
      title: '顶部工具栏设置',
    },
  },
  {
    type: 'Switch',
    name: 'closeDefaultTools',
    valuePropName: 'checked',
    label: '关闭默认操作栏',
  },
  {
    type: 'FormList',
    name: 'tools',
    label: '工具栏集合',
    props: {
      grid: {
        gridStyle: {
          rowGap: 0,
          columnGap: 20,
        },
        column: 3,
      },
      label: '选项',
      schema: [
        {
          type: 'Input',
          name: 'label',
          label: '标签名',
        },
        {
          type: 'Input',
          name: 'key',
          label: '唯一标识',
        },
        {
          type: 'Select',
          name: 'btnType',
          label: '按钮主题',
          props: {
            options: [
              {
                label: '默认',
                value: 'default',
              },
              {
                label: '主题色',
                value: 'primary',
              },
            ],
          },
        },
      ],
    },
  },
  {
    type: 'BlockQuote',
    props: {
      title: '列操作栏设置',
    },
  },
  {
    type: 'InputNumber',
    name: 'showMore',
    label: '操作栏超过几条展示更多',
  },
  {
    type: 'InputNumber',
    name: 'width',
    label: '操作栏宽度',
  },
  {
    type: 'FormList',
    name: 'menus',
    label: '操作栏列集合',
    props: {
      label: '选项',
      grid: {
        gridStyle: {
          rowGap: 0,
          columnGap: 20,
        },
        column: 3,
      },
      schema: [
        {
          type: 'Input',
          name: 'label',
          label: '标签名',
        },
        {
          type: 'Input',
          name: 'key',
          label: '唯一标识',
        },
        {
          type: 'Switch',
          name: 'spin',
          valuePropName: 'checked',
          label: '开启加载',
        },
        {
          type: 'Switch',
          name: 'confirm',
          valuePropName: 'checked',
          label: '开启二次确认',
        },
        {
          type: 'Input',
          name: 'content',
          label: '提示内容',
          span: 2,
          effect: [['menus', 'index', 'confirm']],
          visible({ menus }) {
            return menus[this.name[0]]?.confirm;
          },
        },
      ],
    },
  },
  {
    type: 'BlockQuote',
    props: {
      title: '分页设置',
    },
  },
  {
    type: 'InputNumber',
    name: 'pageSize',
    label: '默认每页大小',
  },
  {
    type: 'BlockQuote',
    props: {
      title: '事件绑定',
    },
  },
  {
    type: 'BindFunction',
    name: 'request',
    label: '设置request',
  },
  {
    type: 'BindFunction',
    name: 'toolsClick',
    label: '设置toolsClick',
  },
  {
    type: 'BindFunction',
    name: 'rowOperationsClick',
    label: '设置rowOperationsClick',
  },
];

export default fields;
