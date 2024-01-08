import React, { useRef } from 'react';
import { Button, CreateDrawer } from 'lyr-design';
import { CodeEditor } from 'lyr-code-editor';
import { FormDesigner } from 'lyr-low-code';
import { Message, Space } from '@arco-design/web-react';
import './index.less';

const exportDrawer = CreateDrawer({
  title: '标准数据模型',
  width: 600,
  footer: false,
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
  const formDesignerRef: any = useRef({});
  return (
    <div className="form-designer-playground">
      <div className="form-designer-playground-header">
        <div className="form-designer-playground-header-title">表单设计器</div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              if (formDesignerRef.current.getStore().schema.length > 0) {
                exportDrawer.open({
                  initialValues: {
                    code: formDesignerRef.current.getStandardSchema(),
                  },
                });
              } else {
                Message.info('暂无数据');
              }
            }}
          >
            导出schema
          </Button>
          <Button
            type="primary"
            onClick={() => {
              formDesignerRef.current.setStore({
                schema: [],
              });
            }}
          >
            清空
          </Button>
        </Space>
      </div>
      <div className="form-designer-playground-body">
        <FormDesigner ref={formDesignerRef}>
          <FormDesigner.RegisterWidgets />
          <FormDesigner.FormCanvas
            onCtrlS={() => {
              Message.loading('保存中');
            }}
          />
          <FormDesigner.PropsConfigPanel />
        </FormDesigner>
      </div>
    </div>
  );
};
