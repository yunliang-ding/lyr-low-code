import { Form } from 'lyr-design';
import { useState } from 'react';
import { Empty, Radio } from '@arco-design/web-react';
import ItemPropsConfig from './item.props.config';
import FormPropsConfig from './form.props.config';
import { isEmpty, recursionFind } from '@/util';
import debounce from 'lodash.debounce';
import { CodeEditor } from 'lyr-code-editor';
import store from '../store';
import './index.less';

export interface PropsConfigPanelTypes {
  /**
   * 设置防抖时间 (ms)
   * @default 100
   */
  debounceTime?: number;
  /** 主容器样式 */
  style?: any;
}

export default ({ style = {}, debounceTime = 100 }: PropsConfigPanelTypes) => {
  const [compontentType, setCompontentType]: any = useState('表单项配置');
  const { schema, widgets, selectedSchema, formProps } = store.use();
  const propsConfig = widgets.__originalConfig__?.find(
    (widget: any) => widget.type === selectedSchema.type,
  )?.propsConfig;
  /** 更新 */
  const onPropsConfigUpdate = (values, type) => {
    if (type === 'item') {
      store.selectedSchema = { ...store.selectedSchema, ...values };
    }
    if (type === 'widget') {
      store.selectedSchema = {
        ...store.selectedSchema,
        props: {
          ...store.selectedSchema.props,
          ...values,
        },
      };
    }
    // 更新 schema
    const newSchema = recursionFind(schema, selectedSchema.key);
    Object.assign(newSchema, store.selectedSchema);
    store.schema = [...store.schema];
  };
  /** 防抖0.1s */
  const onFormValuesChange = debounce((_, values) => {
    store.formProps = values;
    onPropsConfigUpdate({ ...values }, 'form');
  }, debounceTime);
  /** 防抖0.1s */
  const onItemValuesChange = debounce((_, values) => {
    onPropsConfigUpdate({ ...values }, 'item');
  }, debounceTime);
  /** 防抖0.1s */
  const onWidgetValuesChange = debounce((_, values) => {
    onPropsConfigUpdate({ ...values }, 'widget');
  }, debounceTime);
  return (
    <div className="props-config-panel" style={style} key={selectedSchema?.key}>
      {isEmpty(selectedSchema) ? (
        <Empty
          description="请选择需要设置的表单项"
          className="form-canvas-empty"
        />
      ) : (
        <>
          <div className="props-config-panel-header">
            <Radio.Group
              onChange={setCompontentType}
              value={compontentType}
              type="button"
              options={['表单配置', '表单项配置', '子部件配置']}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '表单配置' ? 'block' : 'none',
            }}
          >
            <Form
              schema={FormPropsConfig}
              initialValues={formProps}
              onValuesChange={onFormValuesChange}
              widgets={{
                CodeEditor,
              }}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '表单项配置' ? 'block' : 'none',
            }}
          >
            <Form
              schema={ItemPropsConfig(undefined, schema, selectedSchema)}
              initialValues={selectedSchema || {}}
              onValuesChange={onItemValuesChange}
              widgets={{
                CodeEditor,
              }}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '子部件配置' ? 'block' : 'none',
            }}
          >
            <Form
              schema={propsConfig}
              initialValues={selectedSchema?.props || {}}
              onValuesChange={onWidgetValuesChange}
              widgets={{
                CodeEditor,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
