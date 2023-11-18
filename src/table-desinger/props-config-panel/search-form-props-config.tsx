import { Form } from 'react-core-form';
import { Radio } from '@arco-design/web-react';
import { CodeEditor } from 'react-core-form-code-editor';

export default ({
  setCompontentType,
  compontentType,
  FormPropsConfig,
  onFormValuesChange,
  ItemPropsConfig,
  onItemValuesChange,
  propsConfig,
  onWidgetValuesChange,
  ctx,
}) => {
  return (
    <>
      <div className="props-config-panel-header">
        <Radio.Group
          onChange={setCompontentType}
          value={compontentType}
          type="button"
          options={['表单属性', '表单项属性', '部件属性']}
        />
      </div>
      <div
        className="props-config-panel-body"
        style={{
          display: compontentType === '表单属性' ? 'block' : 'none',
        }}
      >
        <Form
          schema={FormPropsConfig}
          initialValues={ctx.formProps}
          onValuesChange={onFormValuesChange}
          widgets={{ CodeEditor }}
        />
      </div>
      <div
        className="props-config-panel-body"
        style={{
          display: compontentType === '表单项属性' ? 'block' : 'none',
        }}
      >
        <Form
          schema={ItemPropsConfig(ctx)}
          initialValues={ctx.selectSchema || {}}
          onValuesChange={onItemValuesChange}
          widgets={{ CodeEditor }}
        />
      </div>
      <div
        className="props-config-panel-body"
        style={{
          display: compontentType === '部件属性' ? 'block' : 'none',
        }}
      >
        <Form
          schema={propsConfig}
          initialValues={ctx.selectSchema?.props || {}}
          onValuesChange={onWidgetValuesChange}
          widgets={{ CodeEditor }}
        />
      </div>
    </>
  );
};
