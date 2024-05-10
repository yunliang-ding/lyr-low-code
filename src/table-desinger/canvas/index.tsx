import { cloneDeep } from '@/util';
import { DragForm, Table } from 'lyr-component';
import { parseTableColumns, parseTableSchema } from '../util';
import { useEffect, useState } from 'react';
import store from '../store';
import { babelParse } from 'lyr-extra';

export default () => {
  const {
    schema,
    formProps,
    tableProps,
    columns,
    selectTable,
    selectedKey,
    preview,
  } = store.useSnapshot();
  /** request 变化刷新下 table */
  const [refreshTable, setRefreshTable] = useState(Math.random());
  const [table] = Table.useTable();
  useEffect(() => {
    setRefreshTable(Math.random());
  }, [columns]);
  let pureProps;
  try {
    pureProps = babelParse({
      code: store.getStandardSchema(),
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="table-canvas">
      {preview ? (
        <Table {...pureProps} />
      ) : (
        <>
          <DragForm
            {...formProps}
            items={schema}
            type="search"
            onChange={(value) => {
              store.schema = value;
            }}
            selectedKey={selectedKey}
            onSelected={(key: string) => {
              store.selectTable = false;
              store.selectedKey = key;
            }}
          />
          <div
            onClick={() => {
              store.selectTable = true;
              store.selectedKey = undefined;
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
        </>
      )}
    </div>
  );
};
