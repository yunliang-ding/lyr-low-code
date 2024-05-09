import { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import store from './store';
import SiderPanel from './sider-panel';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import TableCanvas from './canvas';
import Header from './header';
import JsonSchema from './json-schema';
import OutlineTree from './outline-tree';
import DataSource from './data-source';
import './index.less';

export interface TableInstance {
  getStandardSchema(): any;
  getStore(): any;
  setStore(data: any): void;
}

export interface TableRefInstance
  extends Omit<MutableRefObject<{}>, 'current'> {
  current: TableInstance;
}

export interface TableDesignerProps {
  logo?: ReactNode;
  extra?: ReactNode[];
  table?: TableInstance;
}

const TableDesigner = ({
  logo = null,
  extra = [],
  table = TableDesigner.useTable()[0],
}: TableDesignerProps) => {
  const { activeBar } = store.useSnapshot();
  useEffect(() => {
    Object.assign(table, {
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
    });
  }, []);
  return (
    <div className="table-designer">
      <div className="table-designer-header">
        <Header logo={logo} extra={extra} />
      </div>
      <div className="table-designer-body">
        <SiderPanel />
        <div className="table-designer-body-content">
          <RegisterWidgets />
          <TableCanvas />
          <PropsConfigPanel />
        </div>
        {activeBar === 1 && <OutlineTree />}
        {activeBar === 2 && <DataSource />}
        {activeBar === 3 && <JsonSchema />}
      </div>
    </div>
  );
};

TableDesigner.useTable = () => {
  const ref: TableRefInstance = useRef({
    getStandardSchema: () => {},
    getStore: () => {},
    setStore: () => {},
  });
  return [ref.current];
};

export default TableDesigner as {
  useTable: () => TableInstance[];
} & ((props: TableDesignerProps) => React.ReactElement);
