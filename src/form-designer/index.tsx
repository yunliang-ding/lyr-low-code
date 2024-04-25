import { forwardRef, useImperativeHandle } from 'react';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import FormCanvas from './form-canvas';
import { getStandardSchema as getFormStandardSchema } from '../util';
import store, { CustomWidgetsProps } from './store';
import './index.less';

const FormDesigner: any = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getStandardSchema: () => {
      return store.getStandardSchema();
    },
    startRegisterWidgets: (custom: CustomWidgetsProps) => {
      const value = [];
      const customWidgets = {};
      Object.keys(custom).forEach((key: string) => {
        customWidgets[key] = custom[key].render;
        delete custom[key].render;
        value.push({
          ...custom[key],
          type: key,
        });
      });
      store.customWidgets = customWidgets;
      store.builtInWidget = [
        ...store.builtInWidget,
        {
          label: '自定义组件',
          value,
        },
      ];
      store.globalPropsConfig = [...store.globalPropsConfig, ...value];
    },
    getStore: () => {
      return {
        schema: store.schema,
        formProps: store.formProps,
        selectedSchema: store.selectedSchema,
      };
    },
    setStore: (newStore) => {
      Object.assign(store, newStore);
    },
  }));
  return <div className="form-designer">{props.children}</div>;
});

FormDesigner.FormCanvas = FormCanvas;
FormDesigner.RegisterWidgets = RegisterWidgets;
FormDesigner.PropsConfigPanel = PropsConfigPanel;
FormDesigner.useTools = () => {
  return {
    // 获取标准数据模型
    getStandardSchema: getFormStandardSchema,
  };
};

export default FormDesigner;
