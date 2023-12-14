import { Form } from 'react-core-form';
import { Radio } from '@arco-design/web-react';
import { CodeEditor } from 'react-core-form-code-editor';

export default ({
  tableType,
  setTableType,
  TableList,
  TablePropsConfig,
  onTableValuesChange,
  CellPropsConfig,
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
            TableList,
            CodeEditor,
          }}
          schema={TablePropsConfig}
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
            TableList,
            CodeEditor,
          }}
          schema={CellPropsConfig}
          initialValues={{
            columns,
          }}
          onValuesChange={onCellValuesChange}
        />
      </div>
    </>
  );
};
