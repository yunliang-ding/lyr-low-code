import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import PageCanvas from './page-canvas';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { getPageStandardSchema } from './util';
import { Ctx } from './store';
import defaultPageProps from './initial';
import './index.less';

const Container = (props: any, ref: any) => {
  // 设置渲染类型
  const [type, setType] = useState('canvas');
  // 统一管理 state
  const [state, setState] = useState({});
  // 统一管理 schema
  const [pageProps, setPageProps] = useState(defaultPageProps);
  // 统一管理 widgets
  const [widgets, setWidgets] = useState<{
    __originalConfig__?: object[]; // 部件的配置项模型
  }>({});
  // 统一管理 schema
  const [schema, setSchema] = useState([]);
  // 统一管理选中的 schema
  const [selectItem, setSelectItem] = useState({});
  const ctx = {
    type,
    setType,
    state,
    setState,
    pageProps,
    setPageProps,
    widgets,
    setWidgets,
    schema,
    setSchema,
    selectItem,
    setSelectItem,
    getPageStandardSchema,
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
    getPageStandardSchema,
  };
};
export default PageDesigner;
