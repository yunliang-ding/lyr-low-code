import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import PageCanvas from './page-canvas';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { getStandardSchema } from '../util';
import { Ctx } from './store';
import './index.less';

const Container = (props: any, ref: any) => {
  // 统一管理FormProps
  const [formProps, setFormProps] = useState({
    column: 2,
    title: '默认标题',
    actionAlign: 'end',
    layout: 'vertical',
    size: 'middle',
  });
  // 统一管理 widgets
  const [widgets, setWidgets] = useState<{
    __originalConfig__?: object[]; // 部件的配置项模型
  }>({});
  // 统一管理 schema
  const [schema, setSchema] = useState([]);
  // 统一管理选中的 schema
  const [selectItem, setSelectItem] = useState({});
  const ctx = {
    widgets,
    setWidgets,
    schema,
    setSchema,
    selectItem,
    setSelectItem,
    getStandardSchema,
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
const PageDesigner: any = forwardRef(Container); // 接受ref
PageDesigner.PageCanvas = PageCanvas;
PageDesigner.RegisterWidgets = RegisterWidgets;
PageDesigner.PropsConfigPanel = PropsConfigPanel;
PageDesigner.useTools = () => {
  return {
    // 获取标准数据模型
    getStandardSchema,
  };
};
export default PageDesigner;
