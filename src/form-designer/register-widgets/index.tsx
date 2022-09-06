/* eslint-disable no-await-in-loop */
import Drag from './drag';
import { Ctx } from '@/form-designer/store';
import { useContext, useEffect, useMemo } from 'react';
import { uuid as Uuid, cloneDeep } from '@/util';
import builtInWidget from '../config';
import './index.less';

export interface RegisterWidgetsType {
  /** 自定义组件 */
  customWidgets?: any;
  /** 自定义组件配置 */
  customWidgetsPropsConfig?: any;
  /** 接受的拖拽元素 */
  type?: string;
  /** 点击的钩子 */
  onClick?: Function;
  /** 主容器样式 */
  style?: object;
  /** 自定义上下文store */
  context?: any;
  /**
   * 内置组件
   * @default react-core-form 所有表单组件
   */
  innerWidgets?: any;
}

const RegisterWidgets = ({
  customWidgets = {},
  customWidgetsPropsConfig = [],
  type = 'left-box',
  style = {},
  context = Ctx,
  innerWidgets = builtInWidget,
  ...rest
}: RegisterWidgetsType) => {
  const ctx: any = useContext(context); // 拿到ctx
  const widgetsOptions = useMemo(
    () =>
      [
        {
          label: '基础组件',
          value: innerWidgets.base,
        },
        {
          label: '高级组件',
          value: innerWidgets.advance,
        },
        {
          label: '布局组件',
          value: innerWidgets.layout,
        },
        {
          label: '自定义组件',
          value: customWidgetsPropsConfig,
        },
      ].filter((i) => i.value?.length > 0),
    [builtInWidget],
  );
  const startRegisterWidgets = async () => {
    const _widgets: any = customWidgets;
    // 原始的widgets
    _widgets.__originalConfig__ = [
      ...(innerWidgets?.base || []),
      ...(innerWidgets?.advance || []),
      ...(innerWidgets?.layout || []),
      ...customWidgetsPropsConfig,
    ];
    ctx.setWidgets(_widgets); // 注入内置组件
  };
  const onClick = (widget) => {
    if (ctx.schema) {
      const uuid = Uuid(10);
      ctx.schema.push({
        key: uuid,
        type: widget.type,
        label: widget.label,
        span: widget.span === 'fill' ? ctx.formProps.column : 1,
        name: `${widget.type || ''}_${uuid}`,
        props: cloneDeep(widget.props), // 剔除引用关系
      });
      ctx.setSchema([...ctx.schema]);
    }
    rest.onClick?.(widget);
  };
  useEffect(() => {
    startRegisterWidgets();
  }, []);
  return (
    <div style={style} className="widgets-panel">
      {widgetsOptions.map((item) => {
        return (
          <div className="widgets-panel-body" key={item.label}>
            <h4>{item.label}</h4>
            {item.value?.map((widget) => {
              return (
                <Drag
                  widget={widget}
                  props={widget.props}
                  type={type}
                  key={widget.label || widget.name}
                  onClick={() => {
                    onClick(widget);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
/** 抛出内置组件 */
export default RegisterWidgets;
