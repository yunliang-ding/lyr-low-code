import { Space } from '@arco-design/web-react';
import cloneDeep from 'lodash.clonedeep';
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
      <div className="register-widgets-header">
        <Space>
          <h3>组件</h3>
          <span>添加组件点击即可</span>
        </Space>
      </div>
      <div className="register-widgets-body">
        {builtInWidget.map((item) => {
          return (
            <div className="register-widgets-body-item" key={item.label}>
              <h4>{item.label}</h4>
              <div className="register-widgets-body-item-btns">
                <DragWrapper
                  accept={false}
                  items={item.value?.map((widget: any) => {
                    const schema = cloneDeep(widget);
                    delete schema.propsConfig;
                    schema.span =
                      widget.span === 'fill' ? store.formProps?.column : 1;
                    return {
                      key: schema.name,
                      schema,
                      content: (
                        <Button
                          onClick={() => {
                            const _schema = cloneDeep(schema);
                            const unikey = uuid(8);
                            if (Array.isArray(store.schema)) {
                              store.schema.push({
                                ..._schema,
                                key: unikey,
                                name: unikey,
                              });
                              store.schema = [...store.schema];
                            } else {
                              store.schema = [
                                {
                                  ..._schema,
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
    </div>
  );
};
