/**
 * cell的属性配置
 */
import FunctionEditor from '@/function-editor';
import { SchemaProps, CreateForm } from 'react-core-form';

const cellDetailFields: SchemaProps<{}>[] = [
  {
    type: 'Input',
    label: '列标签',
    name: 'title',
  },
  {
    type: 'Input',
    label: '列标识',
    name: 'dataIndex',
  },
  {
    type: 'InputNumber',
    label: '列宽度',
    name: 'width',
  },
  {
    type: 'Input',
    label: '列后缀',
    name: 'suffix',
  },
  {
    type: 'Switch',
    name: 'ellipsis',
    valuePropName: 'checked',
    label: '超出是否展示...',
  },
  {
    type: 'Switch',
    name: 'copyable',
    valuePropName: 'checked',
    label: '是否支持拷贝文案',
  },
  {
    type: 'Switch',
    name: 'resize',
    valuePropName: 'checked',
    label: '是否可拖拽调整宽度',
  },
  {
    type: 'Switch',
    name: 'useThousandth',
    valuePropName: 'checked',
    label: '是否展示千分位',
  },
  ...[
    {
      type: 'InputNumber',
      name: 'minimumFractionDigits',
      label: '小数点最小位数',
    },
    {
      type: 'InputNumber',
      name: 'maximumFractionDigits',
      label: '小数点最大位数',
    },
  ].map((item) => {
    return {
      ...item,
      effect: ['useThousandth'],
      visible({ useThousandth }) {
        return useThousandth;
      },
    };
  }),
  {
    type: 'Switch',
    name: 'link',
    valuePropName: 'checked',
    label: '是否展示成链接',
  },
  {
    type: 'FunctionEditor',
    name: 'render',
    label: '自定义渲染',
    props: {
      noChangeClearCode: true,
      defaultCode: `(item, record, index) => {
  return item
}`,
    },
  },
];
/**
 * 列明细信息编辑
 */
const drawerCellForm = CreateForm.Drawer({
  width: 400,
  schema: cellDetailFields,
  containId: 'table-cell-drawer',
  footer: false,
  widgets: {
    FunctionEditor,
  },
  drawerProps: {
    headerStyle: {
      height: 43.5,
    },
    style: {
      top: 65,
      height: 'calc(100% - 65px)',
    },
  },
});

const cellFields: SchemaProps<{}>[] = [
  {
    type: 'BlockQuote',
    props: {
      title: '数据列设置',
    },
  },
  {
    type: 'TableList',
    name: 'columns',
    props: {
      actions: [
        {
          key: 'edit',
          label: '修改',
          onClick: (record, onCellChange) => {
            drawerCellForm.open({
              title: record.title,
              initialValues: record,
              onValuesChange: (v: any) => {
                const k = Object.keys(v)[0];
                onCellChange(v[k], k);
              },
            });
          },
        },
      ],
      columns: [
        {
          title: '列标签',
          dataIndex: 'title',
        },
        {
          title: '列标识',
          dataIndex: 'dataIndex',
        },
      ],
    },
  },
];

export default cellFields;
