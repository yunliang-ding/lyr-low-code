import React, { useEffect, useRef } from 'react';
import { Button, CreateDrawer } from 'lyr-design';
import { CodeEditor } from 'lyr-code-editor';
import { FormDesigner } from 'lyr-low-code';
import { Message, Space } from '@arco-design/web-react';
import { encode, getUrlSearchParams } from 'lyr-extra';
import Preview from './preview';
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
  const { schema } = getUrlSearchParams(location.hash);
  if (schema) {
    return <Preview schema={schema} />;
  }
  /** 注册业务组件 */
  useEffect(() => {
    formDesignerRef.current.startRegisterWidgets({
      CustomInput: {
        label: '原生输入框',
        props: {
          placeholder: '请选择',
          allowClear: true,
          disabled: false,
          mode: '',
        },
        propsConfig: [
          {
            type: 'Switch',
            name: 'disabled',
            label: '是否禁用',
          },
          {
            type: 'Input',
            name: 'placeholder',
            label: '提示文案',
          },
        ],
        render: (props) => {
          return <input {...props} />;
        },
      },
    });
  }, []);
  return (
    <div className="form-designer-playground">
      <div className="form-designer-playground-header">
        <div className="form-designer-playground-header-title">表单设计器</div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              if (formDesignerRef.current.getStore().schema?.length > 0) {
                window.open(
                  `${
                    location.pathname
                  }#/~demos/docs-designer-form?schema=${encode(
                    formDesignerRef.current.getStandardSchema(),
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
              if (formDesignerRef.current.getStore().schema?.length > 0) {
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
                schema: undefined,
                selectedSchema: undefined,
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
          <FormDesigner.FormCanvas />
          <FormDesigner.PropsConfigPanel />
        </FormDesigner>
      </div>
    </div>
  );
};
