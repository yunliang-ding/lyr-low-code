import { CSSProperties, useContext, useState } from 'react';
import { Empty, Segmented } from 'antd';
import { isEmpty, recursionFind } from '@/util';
import { Ctx } from '../store';
import { debounce } from 'lodash';
import { FunctionEditor, JsonEditor } from '@/index';
import { Form } from 'react-core-form';
import pageConfig from './page.config';
import './index.less';

export interface PropsConfigPanelTypes {
  onPropsConfigUpdate: Function; // 配置改变返回新的配置
  style?: CSSProperties;
  /** 设置防抖时间 */
  debounceTime?: number;
  /** 选择模型 */
  selectModelOptions?: () => Promise<[]>;
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
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请选择需要设置的物料"
          className="page-canvas-empty"
        />
      ) : (
        <>
          <div className="props-config-panel-header">
            <Segmented
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
                widgets: {
                  JsonEditor,
                  FunctionEditor,
                },
                initialValues: {
                  ...ctx.pageProps,
                },
                form,
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
                  {
                    type: 'RadioGroup',
                    name: 'span',
                    label: '设置等份',
                    props: {
                      optionType: 'button',
                      options: [
                        {
                          label: '占一份',
                          value: 1,
                        },
                        {
                          label: '占二份',
                          value: 2,
                        },
                        {
                          label: '占三份',
                          value: 3,
                        },
                        {
                          label: '占四份',
                          value: 4,
                        },
                      ],
                    },
                  },
                  ...propsConfig,
                ],
                initialValues: {
                  span: 1,
                  ...ctx.selectItem.props,
                },
                onValuesChange,
                widgets: {
                  FunctionEditor,
                  JsonEditor,
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
