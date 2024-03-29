import { forwardRef, useImperativeHandle } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FormCanvas from './form-canvas';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import { getStandardSchema as getFormStandardSchema } from '../util';
import store from './store';

const FormDesigner: any = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getStandardSchema: () => {
      return store.getStandardSchema();
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
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
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
