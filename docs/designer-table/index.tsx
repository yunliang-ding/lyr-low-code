import React, { useEffect, useRef } from 'react';
import { CreateDrawer } from 'react-core-form';
import { CodeEditor } from 'react-core-form-code-editor';
import { TableDesigner } from 'react-core-form-designer';
import { Button, Message, Space, Spin } from '@arco-design/web-react';
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
  const tableDesignerRef: any = useRef({});
  const [spin, setSpin] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 500);
  }, []);
  return (
    <div className="table-designer-playground">
      <div className="table-designer-playground-header">
        <div className="table-designer-playground-header-title">表格设计器</div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              if (tableDesignerRef.current.getStore().columns.length > 0) {
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
        {spin ? (
          <Spin
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            loading
            size={40}
          />
        ) : (
          <TableDesigner ref={tableDesignerRef}>
            <TableDesigner.RegisterWidgets />
            <TableDesigner.TableCanvas
              onCtrlS={() => {
                Message.loading('保存中');
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
        )}
      </div>
    </div>
  );
};
