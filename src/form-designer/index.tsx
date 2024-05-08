import { forwardRef, ReactNode, useImperativeHandle } from 'react';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import FormCanvas from './form-canvas';
import store, { CustomWidgetsProps } from './store';
import { Message, Radio, Space, Tooltip } from '@arco-design/web-react';
import {
  IconEdit,
  IconEye,
  IconSort,
  IconCodeBlock,
} from '@arco-design/web-react/icon';
import { Button, CreateDrawer } from 'lyr-component';
import { CodeEditor } from 'lyr-code-editor';
import './index.less';

export interface FormDesignProps {
  logo?: ReactNode;
  extra?: ReactNode[];
}

const exportDrawer = CreateDrawer({
  title: '标准数据模型',
  width: 600,
  footer: false,
  drawerProps: {
    headerStyle: {
      display: 'none',
    },
    bodyStyle: {
      padding: 0,
    },
  },
  render({ value }) {
    return <CodeEditor value={value.code} minimapEnabled={false} />;
  },
});

export default forwardRef(
  ({ logo = null, extra = [] }: FormDesignProps, ref) => {
    const { collspan } = store.useSnapshot();
    useImperativeHandle(ref, () => ({
      getStandardSchema: () => {
        return store.getStandardSchema();
      },
      startRegisterWidgets: (custom: CustomWidgetsProps) => {
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
    }));
    return (
      <div className="form-designer">
        <div className="form-designer-header">
          {logo}
          <Radio.Group
            defaultValue={1}
            onChange={(v) => {
              store.preview = v === 2;
            }}
            options={[
              {
                label: (
                  <Space>
                    <IconEdit />
                    <span>编辑</span>
                  </Space>
                ),
                value: 1,
              },
              {
                label: (
                  <Space>
                    <IconEye />
                    <span>预览</span>
                  </Space>
                ),
                value: 2,
              },
            ]}
            type="button"
          />
          <Space>
            {extra}
            <Button
              type="primary"
              onClick={() => {
                store.schema = undefined;
                store.selectedKey = undefined;
              }}
            >
              清空
            </Button>
          </Space>
        </div>
        <div className="form-designer-body">
          <div className="form-designer-body-sider">
            <div className="form-designer-body-sider-item">
              <Tooltip content="大纲树" position="right">
                <IconSort />
              </Tooltip>
            </div>
            <div className="form-designer-body-sider-item">
              <Tooltip content="组件" position="right">
                <svg
                  viewBox="0 0 1024 1024"
                  width="26"
                  height="26"
                  onClick={() => {
                    store.collspan = !store.collspan;
                  }}
                >
                  <path
                    d="M521.188006 1024a26.697095 26.697095 0 0 1-18.834252-7.753129L10.871203 529.116312a26.29481 26.29481 0 0 1 0-37.375933l137.142613-135.899186c-36.607935-6.765702-68.754163-23.33253-94.42726-48.749627A179.675108 179.675108 0 0 1 0.009509 179.823222 176.52997 176.52997 0 0 1 52.562558 52.298878 180.113964 180.113964 0 0 1 180.269758 0.001829c48.786199 0 94.610117 18.797681 129.02377 52.918762a175.9814 175.9814 0 0 1 49.554197 93.915261L486.993782 19.823507a26.879952 26.879952 0 0 1 37.705075 0l128.109486 127.012345c6.802274-36.20565 23.405672-67.949593 49.261626-93.586119A182.710531 182.710531 0 0 1 831.605738 0.184685c48.383914 0 93.695833 18.468538 127.560915 52.077622 70.582731 69.961018 70.29016 184.136814-0.694856 254.536688a179.565394 179.565394 0 0 1-94.829545 49.005627l152.539156 151.186016a26.331382 26.331382 0 0 1 0 37.375933l-171.300265 169.764268a26.843381 26.843381 0 0 1-30.537089 5.08342 26.367953 26.367953 0 0 1-14.77483-26.989667c5.851418-46.445631-5.778275-84.370135-34.486796-112.822655a127.487772 127.487772 0 0 0-90.331267-37.083363c-34.121082 0-66.194168 13.165691-90.331267 37.083363a125.183776 125.183776 0 0 0-37.449076 89.526697c0 33.828511 13.275405 65.645597 37.412504 89.563269 28.562235 28.306235 67.510737 39.862786 113.810083 34.194224a26.623952 26.623952 0 0 1 27.245665 14.628546c5.010277 10.130268 2.925709 22.308532-5.119991 30.281088l-180.260249 178.65111a26.733667 26.733667 0 0 1-18.870824 7.753129z"
                    fill="#777"
                  ></path>
                </svg>
              </Tooltip>
            </div>
            <div className="form-designer-body-sider-footer">
              <Tooltip content="JsonSchema" position="right">
                <IconCodeBlock
                  onClick={() => {
                    if (store.schema?.length > 0) {
                      exportDrawer.open({
                        initialValues: {
                          code: store.getStandardSchema(),
                        },
                      });
                    } else {
                      Message.info('暂无数据');
                    }
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <div
            className={
              collspan
                ? 'form-designer-body-content-collspan'
                : 'form-designer-body-content'
            }
          >
            <RegisterWidgets />
            <FormCanvas />
            <PropsConfigPanel />
          </div>
        </div>
      </div>
    );
  },
);
