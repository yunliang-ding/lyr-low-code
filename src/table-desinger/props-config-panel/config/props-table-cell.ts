/**
 * cell的属性配置
 */
import { SchemaProps, CreateDrawer } from 'lyr-component';
import { CodeEditor } from 'lyr-code-editor';

const cellDetailFields: SchemaProps<{}>[] = [
  {
    widget: 'Input',
    label: '列标签',
    name: 'title',
  },
  {
    widget: 'Input',
    label: '列标识',
    name: 'dataIndex',
  },
  {
    widget: 'InputNumber',
    label: '列宽度',
    name: 'width',
  },
  {
    widget: 'Input',
    label: '列后缀',
    name: 'suffix',
  },
  {
    widget: 'Select',
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
    widget: 'Switch',
    name: 'ellipsis',
    label: '超出是否展示...',
  },
  {
    widget: 'Switch',
    name: 'copyable',
    label: '是否支持拷贝文案',
  },
  {
    widget: 'Switch',
    name: 'resize',
    label: '是否可拖拽调整宽度',
  },
  {
    widget: 'Switch',
    name: 'useThousandth',
    label: '是否展示千分位',
  },
  ...([
    {
      widget: 'InputNumber',
      name: 'minimumFractionDigits',
      label: '小数点最小位数',
    },
    {
      widget: 'InputNumber',
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
    widget: 'Switch',
    name: 'link',
    label: '是否展示成链接',
  },
  {
    widget: 'CodeEditor',
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
    widget: 'BlockQuote',
    name: '-',
    props: {
      title: '数据列设置',
    },
  },
  {
    widget: 'TableList',
    name: 'columns',
    props: {
      showNo: false,
      sortable: true,
      removeConfirm: true,
      copy: false,
      defaultAddValue: {
        label: '新增',
      },
      children: [
        {
          widget: 'Input',
          name: 'title',
          label: '名称',
          props: {
            readOnly: true,
          },
        },
        {
          widget: 'Input',
          name: 'dataIndex',
          label: '唯一标识',
          props: {
            readOnly: true,
          },
        },
      ],
      actions: [
        {
          key: 'edit',
          label: '配置',
          type: 'text',
          onClick: (record, onCellChange) => {
            drawerCellForm.open({
              title: record.title,
              initialValues: record,
              onValuesChange: (v: any, values) => {
                onCellChange(values);
              },
            });
          },
        },
      ],
    },
  },
];

export default cellFields;
