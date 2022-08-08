import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { CreateForm } from 'react-core-form';
import { MonacoEditor, TableDesigner } from 'react-core-form-designer';
import './index.less';

const exportDrawer = CreateForm.Drawer({
  title: '标准数据模型',
  footer: false,
  width: 600,
  drawerProps: {
    headerStyle: {
      display: 'none',
    },
    bodyStyle: {
      padding: 0,
    },
  },
  render({ value }) {
    return (
      <MonacoEditor
        id="export-schema"
        value={value.code}
        options={{
          theme: 'vs-dark',
          minimap: {
            enabled: false,
          },
        }}
      />
    );
  },
});

export default () => {
  const tableDesignerRef: any = useRef({});
  return (
    <div className="table-designer-playground">
      <div className="table-designer-playground-header">
        <div className="table-designer-playground-header-title">
          TableDesigner
        </div>
        <Space>
          <Button
            type="primary"
            key="export"
            onClick={() => {
              if (tableDesignerRef.current.columns?.length > 0) {
                exportDrawer.open({
                  initialValues: {
                    code: tableDesignerRef.current.getStandardSchema({
                      searchSchema: {
                        ...tableDesignerRef.current.formProps,
                        schema: tableDesignerRef.current.schema,
                      },
                      tableSchema: {
                        ...tableDesignerRef.current.tableProps,
                        columns: tableDesignerRef.current.columns,
                      },
                    }),
                  },
                });
              } else {
                message.info('请选择表单项');
              }
            }}
          >
            导出schema
          </Button>
        </Space>
      </div>
      <div className="table-designer-playground-body">
        <TableDesigner ref={tableDesignerRef}>
          <TableDesigner.RegisterWidgets />
          <TableDesigner.TableCanvas
            onCtrlS={() => {
              message.loading('保存中', 2);
            }}
          />
          <TableDesigner.PropsConfigPanel />
        </TableDesigner>
      </div>
    </div>
  );
};
