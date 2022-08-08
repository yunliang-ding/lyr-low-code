import { FormDesigner, MonacoEditor } from 'react-core-form-designer';
import * as customWidgets from '../widgets';
import customWidgetsPropsConfig from '../widgets/config.json';
import React, { useRef } from 'react';
import { Button, CreateForm } from 'react-core-form';
import { message, Space } from 'antd';
import './index.less';

const exportDrawer = CreateForm.Drawer({
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
                    code: formDesignerRef.current.getStandardSchema({
                      ...formDesignerRef.current.formProps,
                      schema: formDesignerRef.current.schema,
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
          <Button
            ghost
            confirm={{
              type: 'pop',
              title: '是否确认清空',
            }}
            type="primary"
            key="clear"
            onClick={() => {
              formDesignerRef.current.setSchema([]);
              formDesignerRef.current.setSelectSchema({});
            }}
          >
            清空
          </Button>
        </Space>
      </div>
      <div className="form-designer-playground-body">
        <FormDesigner ref={formDesignerRef}>
          <FormDesigner.RegisterWidgets
            customWidgets={customWidgets}
            customWidgetsPropsConfig={customWidgetsPropsConfig}
          />
          <FormDesigner.FormCanvas
            onCtrlS={() => {
              message.loading('保存中', 2);
            }}
          />
          <FormDesigner.PropsConfigPanel />
        </FormDesigner>
      </div>
    </div>
  );
};
