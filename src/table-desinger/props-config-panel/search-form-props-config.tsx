import { Form } from 'react-core-form';
import { Segmented } from 'antd';

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
        <Segmented
          onChange={setCompontentType}
          value={compontentType}
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
        />
      </div>
    </>
  );
};
