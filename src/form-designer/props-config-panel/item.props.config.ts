/**
 * Item的属性配置
 */
import { SchemaProps } from 'react-core-form';

export const formItemSchema = (
  insertSchema = [
    {
      type: 'Switch',
      name: 'required',
      label: '是否必填',
    },
    {
      type: 'CodeEditor',
      name: 'rules_is_code',
      label: '规则校验',
      props: {
        prefix: '',
        style: {
          height: 160,
          width: 360,
        },
        defaultCode: '[{}]',
        mode: 'function',
        useEncrypt: true,
      },
    },
  ] as SchemaProps<{}>[],
  schema = [] as any,
  selectedSchema = {} as any,
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
      return ['RangeInput', 'RangePicker'].includes(selectedSchema.type);
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
  ...(insertSchema as any),
  // TODO 没有考虑 FieldSet
  {
    type: 'AsyncSelect',
    name: 'effect',
    label: '设置effect',
    props: {
      mode: 'multiple',
      options() {
        const options = schema
          ?.filter(
            (item) =>
              item.key !== selectedSchema.key && item.type !== 'BlockQuote',
          ) // 过滤自己
          .map((item) => {
            return {
              label: item.label,
              value: item.name,
            };
          });
        return options;
      },
    },
  },
  {
    type: 'CodeEditor',
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
      mode: 'function',
      useEncrypt: true,
      noChangeClearCode: true,
      defaultCode: `async (name, form) => {
 
}`,
    },
  },
  {
    type: 'Switch',
    name: 'effectClearField',
    label: '依赖变化清空值',
    visible({ effect }) {
      return effect?.length > 0;
    },
  },
  {
    type: 'CodeEditor',
    name: 'visible',
    label: '设置visible',
    props: {
      style: {
        height: 160,
        width: 360,
      },
      mode: 'function',
      useEncrypt: true,
      noChangeClearCode: true,
      defaultCode: `(values) => {
  return true;
}`,
    },
  },
  {
    type: 'CodeEditor',
    name: 'beforeReceive',
    label: '设置beforeReceive',
    props: {
      style: {
        height: 160,
        width: 360,
      },
      mode: 'function',
      useEncrypt: true,
      noChangeClearCode: true,
      defaultCode: `(values) => {
 
}`,
    },
  },
  {
    type: 'CodeEditor',
    name: 'transfrom',
    label: '设置transfrom',
    props: {
      style: {
        height: 160,
        width: 360,
      },
      mode: 'function',
      useEncrypt: true,
      noChangeClearCode: true,
      defaultCode: `(values) => {
 
}`,
    },
  },
  {
    type: 'CodeEditor',
    name: 'innerItemRender',
    label: '设置itemRender',
    props: {
      style: {
        height: 200,
        width: 360,
      },
      noChangeClearCode: true,
      useEncrypt: true,
      mode: 'function',
      defaultCode: `(dom, { form }) => {
 
}`,
    },
  },
];

export default formItemSchema;
