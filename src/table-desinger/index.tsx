import { forwardRef, useImperativeHandle } from 'react';
import TableCanvas from './table-canvas';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {
  getStandardSchema as getTableStandardSchema,
  parseTableSchema,
} from './util';
import './index.less';
import store from './store';

const TableDesigner: any = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getStandardSchema: () => {
      return store.getStandardSchema();
    },
    getColumn: () => {
      return store.columns;
    },
    update: (newStore) => {
      Object.assign(store, newStore);
    },
  })); // api挂载到ref
  return <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>;
}); // 接受ref
TableDesigner.TableCanvas = TableCanvas;
TableDesigner.RegisterWidgets = RegisterWidgets;
TableDesigner.PropsConfigPanel = PropsConfigPanel;
TableDesigner.useTools = () => {
  return {
    parseTableSchema,
    getStandardSchema: getTableStandardSchema,
  };
};
export default TableDesigner;
