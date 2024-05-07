import { cloneDeep, recursionFind } from '@/util';
import { DragForm, Table } from 'lyr-component';
import { parseTableColumns, parseTableSchema } from '../util';
import store from '../store';
import { useEffect, useState } from 'react';

export default () => {
  const {
    schema,
    formProps,
    tableProps,
    columns,
    selectTable,
    selectedSchema,
  } = store.useSnapshot();
  /** request 变化刷新下 table */
  const [refreshTable, setRefreshTable] = useState(Math.random());
  const [table] = Table.useTable();
  useEffect(() => {
    setRefreshTable(Math.random());
  }, [columns]);
  return (
    <div className="table-canvas">
      <DragForm
        {...formProps}
        items={schema}
        type="search"
        onChange={(value) => {
          store.schema = value;
        }}
        selectedKey={selectedSchema?.key}
        onSelected={(key: string) => {
          store.selectTable = false;
          store.selectedSchema = recursionFind(schema, key);
        }}
      />
      <div
        onClick={() => {
          store.selectTable = true;
          store.selectedSchema = undefined;
        }}
      >
        <Table
          table={table}
          key={refreshTable}
          style={{
            border: selectTable
              ? '2px dashed rgb(var(--primary-6))'
              : '2px dashed #ccc',
          }}
          {...parseTableSchema(cloneDeep(tableProps))}
          columns={parseTableColumns(cloneDeep(columns))}
          searchSchema={{ hidden: true }}
        />
      </div>
    </div>
  );
};
