import { CSSProperties, useContext, useState } from 'react';
import { Empty, Radio } from '@arco-design/web-react';
import { encrypt, isEmpty, recursionFind } from '@/util';
import { Ctx } from '../store';
import { debounce } from 'lodash';
import { Form } from 'react-core-form';
import pageConfig from './page.config';
import { CodeEditor } from 'react-core-form-code-editor';
import './index.less';

export interface PropsConfigPanelTypes {
  // onPropsConfigUpdate: Function; // 配置改变返回新的配置
  style?: CSSProperties;
  /** 设置防抖时间 */
  debounceTime?: number;
  /** 选择模型 */
  // selectModelOptions?: () => Promise<[]>;
}

export default ({ style = {}, debounceTime = 100 }: PropsConfigPanelTypes) => {
  const [form] = Form.useForm();
  const [compontentType, setCompontentType]: any = useState('物料配置');
  // 拿到 ctx
  const ctx: any = useContext(Ctx);
  // 获取模型
  const propsConfig = ctx.widgets.__originalConfig__?.find(
    (widget) => widget.type === ctx.selectItem.type,
  )?.propsConfig;
  /** 防抖0.1s */
  const onValuesChange = debounce((v, values) => {
    // 更新 selectItem
    ctx.selectItem = { ...ctx.selectItem, props: values };
    ctx.setSelectItem(ctx.selectItem);
    // 更新 schema
    const schema = recursionFind(ctx.schema, ctx.selectItem.key);
    Object.assign(schema, ctx.selectItem);
    ctx.setSchema([...ctx.schema]);
  }, debounceTime);
  return (
    <div className="props-config-panel" style={style} key={ctx.selectItem?.key}>
      {isEmpty(ctx.selectItem) ? (
        <Empty
          description="请选择需要设置的物料"
          className="page-canvas-empty"
        />
      ) : (
        <>
          <div className="props-config-panel-header">
            <Radio.Group
              type="button"
              onChange={setCompontentType}
              value={compontentType}
              options={['画布配置', '物料配置']}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '画布配置' ? 'block' : 'none',
            }}
          >
            <Form
              {...{
                schema: pageConfig,
                initialValues: {
                  ...ctx.pageProps,
                },
                form,
                widgets: {
                  CodeEditor,
                },
                onValuesChange: async () => {
                  ctx.setPageProps(await form.submit());
                },
              }}
            />
          </div>
          <div
            className="props-config-panel-body"
            style={{
              display: compontentType === '物料配置' ? 'block' : 'none',
            }}
          >
            <Form
              {...{
                schema: [
                  ...propsConfig,
                  {
                    type: 'CodeEditor',
                    label: '是否展示',
                    name: 'visible',
                    props: {
                      mode: 'function',
                      useEncrypt: true,
                    },
                  },
                ],
                initialValues: {
                  visible: encrypt(`() => {
  return true
}`),
                  ...ctx.selectItem.props,
                },
                onValuesChange,
                widgets: {
                  CodeEditor,
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
