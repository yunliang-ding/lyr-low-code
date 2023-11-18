/**
 * Form的属性配置
 */
import { SchemaProps } from 'react-core-form';

const schema: SchemaProps<{}>[] = [
  {
    type: 'Input',
    name: 'title',
    label: '表单标题',
  },
  {
    type: 'RadioGroup',
    name: 'column',
    label: '容器排版',
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
    type: 'RadioGroup',
    name: 'layout',
    label: '布局方式',
    props: {
      optionType: 'button',
      options: [
        {
          label: 'inline',
          value: 'inline',
        },
        {
          label: 'vertical',
          value: 'vertical',
        },
        {
          label: 'horizontal',
          value: 'horizontal',
        },
      ],
    },
  },
  {
    type: 'RadioGroup',
    name: 'size',
    label: '尺寸大小',
    props: {
      optionType: 'button',
      options: [
        {
          label: 'small',
          value: 'small',
        },
        {
          label: 'middle',
          value: 'middle',
        },
        {
          label: 'large',
          value: 'large',
        },
      ],
    },
  },
  {
    type: 'RadioGroup',
    name: 'actionAlign',
    label: '操作按钮位置',
    props: {
      optionType: 'button',
      options: [
        {
          label: '左对齐',
          value: 'start',
        },
        {
          label: '剧中',
          value: 'center',
        },
        {
          label: '右对齐',
          value: 'end',
        },
      ],
    },
  },
  {
    type: 'CodeEditor',
    name: 'onSubmit',
    label: '表单提交',
    props: {
      noChangeClearCode: true,
      mode: 'function',
      useEncrypt: true,
      defaultCode: `async (values) => {

}`,
    },
  } as any,
];

export default schema;
