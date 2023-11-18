import React, { useRef } from 'react';
import { Button, CreateDrawer } from 'react-core-form';
import { CodeEditor } from 'react-core-form-code-editor';
import { FormDesigner } from 'react-core-form-designer';
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
        <div className="form-designer-playground-header-title">
          FormDesigner
        </div>
        <Space>
          <Button
            type="primary"
            key="export"
            onClick={() => {
              if (formDesignerRef.current.schema?.length > 0) {
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
            key="export"
            onClick={() => {
              formDesignerRef.current.setSchema([]);
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
