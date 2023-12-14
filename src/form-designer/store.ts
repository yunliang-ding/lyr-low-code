import { create } from 'react-core-form-store';
import { DrawerFormProps, SchemaProps } from 'react-core-form';
import { getStandardSchema as getFormStandardSchema } from '../util';

interface _SchemaProps extends SchemaProps {
  key: string;
}

export default create<{
  // 表单属性
  formProps: DrawerFormProps;
  // 组件
  widgets: {
    __originalConfig__?: any[]; // 部件的配置项模型
  };
  // 数据模型
  schema: _SchemaProps[];
  // 选中的模型
  selectedSchema: _SchemaProps;
  /** 获取标准的模型 */
  getStandardSchema: () => any;
}>({
  formProps: {
    column: 2,
    title: '默认标题',
    actionAlign: 'end',
    layout: 'vertical',
  },
  widgets: {},
  schema: [],
  selectedSchema: {},
  getStandardSchema() {
    return getFormStandardSchema({
      ...this.formProps,
      schema: this.schema,
    });
  },
});
