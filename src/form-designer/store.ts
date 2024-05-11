import { create } from 'lyr-hooks';
import { CardFormProps, SchemaProps } from 'lyr-component';
import {
  getStandardSchema as getFormStandardSchema,
  recursionFind,
} from '../util';
import materialConfig from '@/material-config';
import { ReactElement } from 'react';

interface DesignerSchemaProps extends SchemaProps {
  key: string;
  propsConfig?: any;
}

export interface CustomWidgetsProps {
  [key: string]: {
    label: string;
    props: any;
    propsConfig: any[];
    render: (props: any) => ReactElement;
  };
}

export default create<{
  /** 表单属性 */
  formProps: CardFormProps;
  /** 内置组件 */
  builtInWidget: any[];
  /** 自定义组件 */
  customWidgets: any;
  /** 数据模型 */
  schema: DesignerSchemaProps[];
  /** 选中的模型Key */
  selectedKey: string;
  /** 获取标准的模型 */
  getStandardSchema: () => any;
  /** 获取选中的属性配置 */
  getPropsConfig: () => any;
  preview: boolean;
  activeBar?: 1 | 2 | 3;
}>({
  preview: false,
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
      label: '布局组件',
      value: materialConfig.layout,
    },
    {
      label: '高级组件',
      value: materialConfig.advance,
    },
  ],
  schema: undefined,
  selectedKey: undefined,
  getPropsConfig() {
    if (this.selectedKey) {
      let propsConfig = undefined;
      const selectedSchema = recursionFind(this.schema, this.selectedKey);
      this.builtInWidget.forEach((item) => {
        const widget = item.value.find(
          (i: any) => i.widget === selectedSchema.widget,
        );
        if (widget) {
          propsConfig = widget.propsConfig;
        }
      });
      return {
        propsConfig,
        selectedSchema,
      };
    }
    return {};
  },
  getStandardSchema() {
    return getFormStandardSchema({
      ...this.formProps,
      schema: this.schema,
    });
  },
});
