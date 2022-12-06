import { CSSProperties, useContext } from 'react';
import { Empty } from 'antd';
import { isEmpty } from '@/util';
import { Ctx } from '../store';
import { debounce } from 'lodash';
import MaterialPropsConfig from './material-props-config';
import { FunctionEditor } from '@/index';
import './index.less';

export interface PropsConfigPanelTypes {
  onPropsConfigUpdate: Function; // 配置改变返回新的配置
  style?: CSSProperties;
  /** 设置防抖时间 */
  debounceTime?: number;
  /** 选择模型 */
  selectModelOptions?: () => Promise<[]>;
}

export default ({
  style = {},
  onPropsConfigUpdate = () => {},
  debounceTime = 100,
}: PropsConfigPanelTypes) => {
  // 拿到 ctx
  const ctx: any = useContext(Ctx);
  // 获取模型
  const propsConfig = ctx.widgets.__originalConfig__?.find(
    (widget) => widget.type === ctx.selectItem.type,
  )?.propsConfig;
  /** 防抖0.1s */
  const onValuesChange = debounce((v, values) => {
    onPropsConfigUpdate(v, values);
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
        <MaterialPropsConfig
          {...{
            schema: propsConfig,
            initialValues: ctx.selectItem.props,
            onValuesChange,
            widgets: {
              FunctionEditor,
            },
          }}
        />
      )}
    </div>
  );
};
