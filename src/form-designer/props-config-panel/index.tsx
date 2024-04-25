import { Form } from 'lyr-design';
import { useState } from 'react';
import { Empty, Radio } from '@arco-design/web-react';
import FormPropsConfig from './config/props-form';
import ItemPropsConfig from './config/props-item';
import { isEmpty } from '@/util';
import debounce from 'lodash.debounce';
import { CodeEditor } from 'lyr-code-editor';
import store from '../store';

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
  const { schema, selectedSchema, formProps } = store.useSnapshot();
  const propsConfig = selectedSchema?.propsConfig;
  /** 防抖0.1s */
  const onFormValuesChange = debounce((_, values) => {
    store.formProps = values;
  }, debounceTime);
  /** 防抖0.1s */
  const onItemValuesChange = debounce((value) => {
    Object.assign(store.selectedSchema, value);
    store.schema = [...store.schema];
  }, debounceTime);
  /** 防抖0.1s */
  const onPropsValuesChange = debounce((value) => {
    Object.assign(store.selectedSchema.props, value);
    store.schema = [...store.schema];
  }, debounceTime);
  return (
    <div className="props-config-panel" style={style} key={selectedSchema?.key}>
      {isEmpty(selectedSchema) ? (
        <Empty
          description="请选择需要设置的表单项"
          className="props-config-panel-empty"
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
              initialValues={selectedSchema}
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
              onValuesChange={onPropsValuesChange}
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
