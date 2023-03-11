import React, { useRef } from 'react';
import { Button, CreateDrawer, CodeEditor } from 'react-core-form';
import { FormDesigner } from 'react-core-form-designer';
import { encode } from 'react-core-form-tools';
import { message, Space } from 'antd';
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
                message.info('请选择表单项');
              }
            }}
          >
            导出schema
          </Button>
          <Button
            type="primary"
            key="export"
            onClick={() => {
              if (formDesignerRef.current.schema?.length > 0) {
                const code = formDesignerRef.current
                  .getStandardSchema({
                    ...formDesignerRef.current.formProps,
                    schema: formDesignerRef.current.schema,
                  })
                  .replace('export default ', '');
                const jsx = `import { CardForm } from 'react-core-form';

const schema = ${code}
export default () => {
  return <CardForm {...schema} />
}`;
                window.open(
                  `http://121.4.49.147:9000/react-playground?code=${encode(
                    jsx,
                  )}`,
                );
              } else {
                message.info('请选择表单项');
              }
            }}
          >
            去 Playground 预览
          </Button>
        </Space>
      </div>
      <div className="form-designer-playground-body">
        <FormDesigner ref={formDesignerRef}>
          <FormDesigner.RegisterWidgets />
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
