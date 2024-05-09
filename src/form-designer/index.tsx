import { MutableRefObject, ReactNode, useEffect, useRef } from 'react';
import store, { CustomWidgetsProps } from './store';
import SiderPanel from './sider-panel';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import FormCanvas from './canvas';
import Header from './header';
import JsonSchema from './json-schema';
import OutlineTree from './outline-tree';
import DataSource from './data-source';
import './index.less';

export interface FormInstance {
  getStandardSchema(): any;
  registerWidgets(props: CustomWidgetsProps): void;
  getStore(): any;
  setStore(data: any): void;
}

export interface FormRefInstance extends Omit<MutableRefObject<{}>, 'current'> {
  current: FormInstance;
}

export interface FormDesignerProps {
  logo?: ReactNode;
  extra?: ReactNode[];
  form?: FormInstance;
}

const FormDesigner = ({
  logo = null,
  extra = [],
  form = FormDesigner.useForm()[0],
}: FormDesignerProps) => {
  const { activeBar } = store.useSnapshot();
  useEffect(() => {
    Object.assign(form, {
      getStandardSchema: () => {
        return store.getStandardSchema();
      },
      registerWidgets: (custom: CustomWidgetsProps) => {
        const value = [];
        const customWidgets = {};
        Object.keys(custom).forEach((key: string) => {
          customWidgets[key] = custom[key].render;
          delete custom[key].render;
          value.push({
            ...custom[key],
            widget: key,
          });
        });
        store.customWidgets = customWidgets;
        store.builtInWidget = [
          ...store.builtInWidget,
          {
            label: '自定义组件',
            value,
          },
        ];
      },
      getStore: () => {
        return {
          schema: store.schema,
          formProps: store.formProps,
          selectedKey: store.selectedKey,
        };
      },
      setStore: (newStore) => {
        Object.assign(store, newStore);
      },
    });
  }, []);
  return (
    <div className="form-designer">
      <div className="form-designer-header">
        <Header logo={logo} extra={extra} />
      </div>
      <div className="form-designer-body">
        <SiderPanel />
        <div className="form-designer-body-content">
          <RegisterWidgets />
          <FormCanvas />
          <PropsConfigPanel />
        </div>
        {activeBar === 1 && <OutlineTree />}
        {activeBar === 2 && <DataSource />}
        {activeBar === 3 && <JsonSchema />}
      </div>
    </div>
  );
};

FormDesigner.useForm = () => {
  const ref: FormRefInstance = useRef({
    getStandardSchema: () => {},
    getStore: () => {},
    registerWidgets: () => {},
    setStore: () => {},
  });
  return [ref.current];
};

export default FormDesigner as {
  useForm: () => FormInstance[];
} & ((props: FormDesignerProps) => React.ReactElement);
