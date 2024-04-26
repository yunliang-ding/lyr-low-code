import React, { useRef } from 'react';
import { CreateDrawer } from 'lyr-design';
import { CodeEditor } from 'lyr-code-editor';
import { TableDesigner } from 'lyr-low-code';
import { Button, Message, Space } from '@arco-design/web-react';
import { encode, getUrlSearchParams } from 'lyr-extra';
import Preview from './preview';
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
  const { schema } = getUrlSearchParams(location.hash);
  if (schema) {
    return <Preview schema={schema} />;
  }
  const tableDesignerRef: any = useRef({});
  return (
    <div className="table-designer-playground">
      <div className="table-designer-playground-header">
        <div className="table-designer-playground-header-title">表格设计器</div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              if (tableDesignerRef.current.getStore().columns?.length > 0) {
                window.open(
                  `${
                    location.pathname
                  }#/~demos/docs-designer-table?schema=${encode(
                    JSON.stringify(tableDesignerRef.current.getStore()),
                  )}`,
                );
              } else {
                Message.info('暂无数据');
              }
            }}
          >
            新窗口预览
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (tableDesignerRef.current.getStore().columns?.length > 0) {
                exportDrawer.open({
                  initialValues: {
                    code: tableDesignerRef.current.getStandardSchema(),
                  },
                });
              } else {
                Message.info('暂无数据');
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
          <TableDesigner.TableCanvas />
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
