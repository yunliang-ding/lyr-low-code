/**
 * Item的属性配置
 */
import { SchemaProps } from 'lyr-component';

export const formItemSchema = (
  insertSchema = [
    {
      widget: 'Switch',
      name: 'required',
      label: '是否必填',
    },
    {
      widget: 'CodeEditor',
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
    widget: 'Input',
    name: 'key',
    label: '唯一标识',
    props: {
      disabled: true,
    },
  },
  {
    widget: 'Input',
    name: 'label',
    label: '字段标签',
  },
  {
    widget: 'Input',
    name: 'name',
    label: '字段名称',
  },
  {
    widget: 'RadioGroup',
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
    widget: 'AsyncSelect',
    name: 'effect',
    label: '设置effect',
    props: {
      mode: 'multiple',
      options() {
        const options = schema
          ?.filter(
            (item) =>
              item.key !== selectedSchema.key && item.widget !== 'BlockQuote',
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
    widget: 'CodeEditor',
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
    widget: 'Switch',
    name: 'effectClearField',
    label: '依赖变化清空值',
    visible({ effect }) {
      return effect?.length > 0;
    },
  },
  {
    widget: 'CodeEditor',
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
    widget: 'CodeEditor',
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
