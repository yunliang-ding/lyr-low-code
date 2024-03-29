/**
 * cell的属性配置
 */
import { SchemaProps, CreateDrawer } from 'lyr-design';
import { CodeEditor } from 'lyr-code-editor';

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
    type: 'Select',
    label: '日期格式转换',
    name: 'dateFormat',
    props: {
      options: [
        {
          label: '年-月-日',
          value: 'YYYY-MM-DD',
        },
        {
          label: '年-月-日 时:分',
          value: 'YYYY-MM-DD HH:mm',
        },
        {
          label: '年-月-日 时:分:秒',
          value: 'YYYY-MM-DD HH:mm:ss',
        },
      ],
    },
  },
  {
    type: 'Switch',
    name: 'ellipsis',
    label: '超出是否展示...',
  },
  {
    type: 'Switch',
    name: 'copyable',
    label: '是否支持拷贝文案',
  },
  {
    type: 'Switch',
    name: 'resize',
    label: '是否可拖拽调整宽度',
  },
  {
    type: 'Switch',
    name: 'useThousandth',
    label: '是否展示千分位',
  },
  ...([
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
  }) as any),
  {
    type: 'Switch',
    name: 'link',
    label: '是否展示成链接',
  },
  {
    type: 'CodeEditor',
    name: 'render',
    label: '自定义渲染',
    props: {
      noChangeClearCode: true,
      mode: 'function',
      useEncrypt: true,
      defaultCode: `(item, record, index) => {
  return item
}`,
    },
  },
];
/**
 * 列明细信息编辑
 */
const drawerCellForm = CreateDrawer({
  width: 400,
  schema: cellDetailFields,
  footerRender: () => null,
  widgets: {
    CodeEditor,
  },
});

const cellFields: SchemaProps<{}>[] = [
  {
    type: 'BlockQuote',
    name: '-',
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
