import React, { useEffect, useRef } from 'react';
import { FormDesigner } from 'lyr-low-code';
import { Space } from '@arco-design/web-react';
import { IconLarkColor } from '@arco-design/web-react/icon';

export default () => {
  const formDesignerRef: any = useRef({});
  useEffect(() => {
    /** 注册业务组件 */
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
            widget: 'Switch',
            name: 'disabled',
            label: '是否禁用',
          },
          {
            widget: 'Input',
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
    <div style={{ height: '80vh' }}>
      <FormDesigner
        ref={formDesignerRef}
        logo={
          <Space>
            <IconLarkColor style={{ fontSize: 34 }} />
            <h2>FormDesigner</h2>
          </Space>
        }
      />
    </div>
  );
};
