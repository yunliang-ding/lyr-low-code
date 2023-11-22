import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import FormCanvas from './form-canvas';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Ctx } from './store';
import { getStandardSchema as getFormStandardSchema } from '../util';
import './index.less';

const Container = (props: any, ref: any) => {
  // 统一管理FormProps
  const [formProps, setFormProps] = useState({
    column: 2,
    title: '默认标题',
    actionAlign: 'end',
    layout: 'vertical',
  });
  // 统一管理 widgets
  const [widgets, setWidgets] = useState<{
    __originalConfig__?: object[]; // 部件的配置项模型
  }>({});
  // 统一管理 schema
  const [schema, setSchema] = useState([]);
  // 统一管理选中的 schema
  const [selectSchema, setSelectSchema] = useState({});
  const ctx = {
    widgets,
    setWidgets,
    schema,
    setSchema,
    selectSchema,
    setSelectSchema,
    formProps,
    setFormProps,
    getStandardSchema: (
      params = {
        ...formProps,
        schema,
      },
    ) => {
      return getFormStandardSchema(params);
    },
  };
  // 通知
  useEffect(() => {
    props.onSchemaUpdate?.(schema);
  }, [schema]);
  useImperativeHandle(ref, () => ctx); // ctx挂载到ref
  return (
    <DndProvider backend={HTML5Backend}>
      <Ctx.Provider {...props} value={ctx} />
    </DndProvider>
  );
};
const FormDesigner: any = forwardRef(Container); // 接受ref
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
