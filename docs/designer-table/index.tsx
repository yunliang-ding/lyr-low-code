import { Button, message, Space } from 'antd';
import React, { useRef } from 'react';
import { CreateDrawer, CodeEditor, Tools } from 'react-core-form';
import { TableDesigner } from 'react-core-form-designer';
import './index.less';

const exportDrawer = CreateDrawer({
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
    return <CodeEditor value={value.code} minimapEnabled={false} />;
  },
});

export default () => {
  const { encode } = Tools;
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
                    code: tableDesignerRef.current.getStandardSchema(),
                  },
                });
              } else {
                message.info('请选择配置项');
              }
            }}
          >
            导出schema
          </Button>
          <Button
            type="primary"
            key="export"
            onClick={() => {
              if (tableDesignerRef.current.columns?.length > 0) {
                const code = tableDesignerRef.current
                  .getStandardSchema({
                    searchSchema: {
                      ...tableDesignerRef.current.formProps,
                      schema: tableDesignerRef.current.schema,
                    },
                    tableSchema: {
                      ...tableDesignerRef.current.tableProps,
                      columns: tableDesignerRef.current.columns,
                    },
                  })
                  .replace('export default ', '');
                const jsx = `import { Table } from 'react-core-form';

const schema = ${code}
export default () => {
  return <Table {...schema} />
}`;
                window.open(
                  `http://121.4.49.147:9000/react-playground?code=${encode(
                    jsx,
                  )}`,
                );
              } else {
                message.info('请选择配置项');
              }
            }}
          >
            去 Playground 预览
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
          <TableDesigner.PropsConfigPanel
            selectModelOptions={async () => [
              {
                label: '新增用户',
                value: 1,
              },
              {
                label: '新增角色',
                value: 2,
              },
            ]}
          />
        </TableDesigner>
      </div>
    </div>
  );
};
