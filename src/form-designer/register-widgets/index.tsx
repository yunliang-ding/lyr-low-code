import { Button, DragWrapper } from 'lyr-component';
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
                          const unikey = uuid(8);
                          if (Array.isArray(store.schema)) {
                            store.schema.push({
                              ...schema,
                              key: unikey,
                              name: unikey,
                            });
                            store.schema = [...store.schema];
                          } else {
                            store.schema = [
                              {
                                ...schema,
                                key: unikey,
                                name: unikey,
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
