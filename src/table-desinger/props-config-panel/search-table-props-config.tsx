import { Form } from 'lyr-component';
import { Radio } from '@arco-design/web-react';
import { CodeEditor } from 'lyr-code-editor';

export default ({
  tableType,
  setTableType,
  tablePropsConfig,
  onTableValuesChange,
  cellPropsConfig,
  onCellValuesChange,
  tableProps,
  columns,
}) => {
  return (
    <>
      <div className="props-config-panel-header" id="table-cell-props-config">
        <Radio.Group
          onChange={setTableType}
          value={tableType}
          type="button"
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
            CodeEditor,
          }}
          schema={tablePropsConfig}
          initialValues={tableProps}
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
            CodeEditor,
          }}
          schema={cellPropsConfig}
          initialValues={{
            columns,
          }}
          onValuesChange={onCellValuesChange}
        />
      </div>
    </>
  );
};
