import { Button, DragWrapper } from 'lyr-design';
import { uuid } from 'lyr-extra';
import formStore from '../store';

export interface RegisterWidgetsType {
  /** 主容器样式 */
  style?: object;
  store?: any;
}

export default ({ style = {}, store = formStore }: RegisterWidgetsType) => {
  const { builtInWidget } = store.useSnapshot();
  return (
    <div style={style} className="register-widgets">
      {builtInWidget.map((item) => {
        return (
          <div className="widgets-panel-body" key={item.label}>
            <h4>{item.label}</h4>
            <div className="widgets-panel-body-btns">
              <DragWrapper
                accept={false}
                items={item.value?.map((widget: any) => {
                  const key = uuid(8);
                  return {
                    key,
                    schema: {
                      type: widget.type,
                      label: widget.label,
                      name: `name-${key}`,
                      ...widget,
                      span:
                        widget.span === 'fill' ? store.formProps?.column : 1,
                    },
                    content: <Button>{widget.label || widget.name}</Button>,
                  };
                })}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
