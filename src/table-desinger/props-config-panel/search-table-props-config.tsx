import { Form } from 'react-core-form';
import { Segmented } from 'antd';

export default ({
  tableType,
  setTableType,
  TableList,
  TablePropsConfig,
  onTableValuesChange,
  CellPropsConfig,
  onCellValuesChange,
  ctx,
}) => {
  return (
    <>
      <div className="props-config-panel-header" id="table-cell-props-config">
        <Segmented
          onChange={setTableType}
          value={tableType}
          options={['表格属性', '表格列属性']}
        />
      </div>
      <div
        className="props-config-panel-body"
        style={{
          display: tableType === '表格属性' ? 'block' : 'none',
        }}
      >
        <Form
          widgets={{
            TableList,
          }}
          schema={TablePropsConfig}
          initialValues={ctx.tableProps}
          onValuesChange={onTableValuesChange}
        />
      </div>
      <div
        className="props-config-panel-body"
        style={{
          display: tableType === '表格列属性' ? 'block' : 'none',
        }}
      >
        <Form
          widgets={{
            TableList,
          }}
          schema={CellPropsConfig}
          initialValues={{
            columns: ctx.columns,
          }}
          onValuesChange={onCellValuesChange}
        />
      </div>
    </>
  );
};
