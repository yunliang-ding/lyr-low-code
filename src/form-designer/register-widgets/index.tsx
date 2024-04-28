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
                  const schema = {
                    type: widget.type,
                    label: widget.label,
                    name: uuid(4),
                    ...widget,
                    propsConfig: undefined,
                    span: widget.span === 'fill' ? store.formProps?.column : 1,
                  };
                  return {
                    key: schema.name,
                    schema,
                    content: (
                      <Button
                        onClick={() => {
                          if (Array.isArray(store.schema)) {
                            store.schema.push({
                              ...schema,
                              key: uuid(8),
                            });
                            store.schema = [...store.schema];
                          } else {
                            store.schema = [
                              {
                                ...schema,
                                key: uuid(8),
                              },
                            ];
                          }
                        }}
                      >
                        {widget.label || widget.name}
                      </Button>
                    ),
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
