import { forwardRef, useImperativeHandle } from 'react';
import TableCanvas from './table-canvas';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
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
    getStore: () => {
      return {
        schema: store.schema,
        formProps: store.formProps,
        columns: store.columns,
        tableProps: store.tableProps,
        selectedKey: store.selectedKey,
        selectTable: store.selectTable,
      };
    },
    setStore: (newStore) => {
      Object.assign(store, newStore);
    },
  }));
  return <div className="table-designer">{props.children}</div>;
});

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
