import { cloneDeep, recursionFind } from '@/util';
import { DragForm, Table } from 'lyr-design';
import { parseTableColumns, parseTableSchema } from '../util';
import store from '../store';

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
  const [table] = Table.useTable();
  return (
    <div className="table-canvas">
      <DragForm
        {...formProps}
        items={schema}
        type="search"
        onChange={(value) => {
          store.schema = value;
        }}
        defaultSelectedKey={selectedSchema?.key}
        onSelected={(key: string) => {
          store.selectTable = false;
          store.selectedSchema = recursionFind(schema, key);
        }}
      />
      <div
        style={{
          border: selectTable
            ? '2px dashed rgb(var(--primary-6))'
            : '2px dashed #ccc',
        }}
        onClick={() => {
          store.selectTable = true;
          store.selectedSchema = undefined;
        }}
      >
        <Table
          table={table}
          {...parseTableSchema(cloneDeep(tableProps))}
          columns={parseTableColumns(cloneDeep(columns))}
          searchSchema={{ hidden: true }}
        />
      </div>
    </div>
  );
};
