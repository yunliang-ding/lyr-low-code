import { create } from 'lyr-hooks';
import { CardFormProps, SchemaProps } from 'lyr-design';
import { getStandardSchema as getFormStandardSchema } from '../util';
import materialConfig from './register-widgets/material-config';
import { ReactNode } from 'react';

interface DesignerSchemaProps extends SchemaProps {
  key: string;
  propsConfig?: any;
}

export interface CustomWidgetsProps {
  [key: string]: {
    label: string;
    props: any;
    propsConfig: any[];
    render: () => ReactNode;
  };
}

export default create<{
  /** 表单属性 */
  formProps: CardFormProps;
  /** 内置组件 */
  builtInWidget: any[];
  /** 自定义组件 */
  customWidgets: any;
  // 数据模型
  schema: DesignerSchemaProps[];
  // 选中的模型
  selectedSchema: DesignerSchemaProps;
  /** 获取标准的模型 */
  getStandardSchema: () => any;
}>({
  formProps: {
    column: 2,
    title: '新建表单',
    actionAlign: 'end',
    layout: 'vertical',
  },
  customWidgets: {},
  builtInWidget: [
    {
      label: '基础组件',
      value: materialConfig.base,
    },
    {
      label: '高级组件',
      value: materialConfig.advance,
    },
    {
      label: '布局组件',
      value: materialConfig.layout,
    },
  ],
  schema: undefined,
  selectedSchema: undefined,
  getStandardSchema() {
    return getFormStandardSchema({
      ...this.formProps,
      schema: this.schema,
    });
  },
});
