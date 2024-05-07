/**
 * Table的属性配置
 */
import { CreateDrawer, SchemaProps } from 'lyr-component';
import { encrypt } from '@/util';
import { CodeEditor } from 'lyr-code-editor';

/** 顶部工具栏和操作栏相同部分 */
const toolPropsConfig = (
  isRowOperation = false,
  selectModelOptions,
): SchemaProps<{}>[] => {
  return [
    {
      widget: 'Input',
      name: 'label',
      label: '标签名',
    },
    {
      widget: 'Switch',
      name: 'spin',
      label: '开启loading',
    },
    {
      widget: 'Input',
      name: 'auth',
      label: '配置权限标识',
      tooltip: '控制按钮权限',
    },
    {
      widget: 'CodeEditor',
      name: 'visible',
      label: '是否展示',
      props: {
        noChangeClearCode: true,
        mode: 'function',
        useEncrypt: true,
        style: {
          height: 100,
          width: 360,
        },
        defaultCode: isRowOperation
          ? `(record) => {
  return true
}`
          : `() => {
  return true
}`,
      },
    } as any,
    {
      widget: 'RadioGroup',
      name: 'bindFormType',
      label: '绑定表单',
      props: {
        type: 'button',
        onChange(e) {
          const v = e.target?.value;
          const { form }: any = this;
          if (v === 'modal') {
            form.setFieldsValueTouchOnValuesChange({
              drawerFormProps: undefined,
            });
          } else if (v === 'drawer') {
            form.setFieldsValueTouchOnValuesChange({
              modalFormProps: undefined,
            });
          }
        },
        options: [
          {
            label: '我的表单模型',
            value: 'modelId',
          },
          {
            label: '自定义 Modal',
            value: 'modal',
          },
          {
            label: '自定义 Drawer',
            value: 'drawer',
          },
        ],
      },
    },
    {
      widget: 'AsyncSelect',
      label: '选择表单模型',
      name: 'modelId',
      effect: ['bindFormType'],
      visible({ bindFormType }) {
        return bindFormType === 'modelId';
      },
      effectClearField: true,
      props: {
        options: selectModelOptions,
      },
    },
    {
      widget: 'RadioGroup',
      name: 'modelIdType',
      label: '展示形式',
      effect: ['modelId', 'bindFormType'],
      effectClearField: true,
      visible({ modelId, bindFormType }) {
        return modelId !== undefined && bindFormType === 'modelId';
      },
      props: {
        onChange() {
          const { form }: any = this;
          const { modelId, modelIdType } = form.getFieldsValue(true);
          if (modelIdType && modelId) {
            const key =
              modelIdType === 'modal' ? 'modalFormProps' : 'drawerFormProps';
            const clearFieldName =
              modelIdType === 'modal' ? 'drawerFormProps' : 'modalFormProps';
            form.setFieldsValueTouchOnValuesChange({
              [clearFieldName]: undefined,
            });
            form.setFieldsValueTouchOnValuesChange({
              [key]: isRowOperation
                ? encrypt(`async ({ onRefresh }, record) => {
  const formProps = await getCrudModelById(${modelId});
  return {
    ...formProps,
    initialValues: {
      ...record,
    },
    async onSubmit(v){
      try {
        await formProps.onSubmit(v);
        onRefresh();
      } catch(e) {
        return Promise.reject();
      }
    }
  }
}`)
                : encrypt(`async ({ onSearch }) => {
  const formProps = await getCrudModelById(${modelId});
  return {
    ...formProps,
    async onSubmit(v){
      try {
        await formProps.onSubmit(v);
        onSearch();
      } catch(e) {
        return Promise.reject();
      }
    }
  }
}`),
            });
          }
        },
        options: [
          {
            label: 'Modal 展示',
            value: 'modal',
          },
          {
            label: 'Drawer 展示',
            value: 'drawer',
          },
        ],
      },
    },
    {
      widget: 'CodeEditor',
      name: 'drawerFormProps',
      label: '绑定DrawerForm',
      effect: ['bindFormType', 'modelIdType'],
      visible({ bindFormType, modelIdType }) {
        return (
          bindFormType === 'drawer' ||
          (bindFormType === 'modelId' && modelIdType === 'drawer')
        );
      },
      props: {
        mode: 'function',
        useEncrypt: true,
        noChangeClearCode: true,
        defaultCode: isRowOperation
          ? `async ({ onRefresh }, record) => {
 
}`
          : `async ({ onSearch }) => {
 
}`,
      } as any,
    },
    {
      widget: 'CodeEditor',
      name: 'modalFormProps',
      label: '绑定ModalForm',
      effect: ['bindFormType', 'modelIdType'],
      visible({ bindFormType, modelIdType }) {
        return (
          bindFormType === 'modal' ||
          (bindFormType === 'modelId' && modelIdType === 'modal')
        );
      },
      props: {
        noChangeClearCode: true,
        mode: 'function',
        useEncrypt: true,
        defaultCode: isRowOperation
          ? `async ({ onRefresh }, record) => {
 
}`
          : `async ({ onSearch }) => {
 
}`,
      } as any,
    },
    {
      widget: 'CodeEditor',
      name: 'onClick',
      label: '点击事件',
      props: {
        noChangeClearCode: true,
        mode: 'function',
        useEncrypt: true,
        defaultCode: isRowOperation
          ? `async (record, { onRefresh }) => {
 
}`
          : `async (params, { onSearch }) => {
 
}`,
      } as any,
    },
  ];
};

/** 顶部工具栏 */
const drawerToolForm = CreateDrawer({
  footerRender: () => null,
  width: 400,
  widgets: {
    CodeEditor,
  },
});

/** 列操作栏 */
const drawerMenuForm = CreateDrawer({
  footerRender: () => null,
  width: 400,
  widgets: {
    CodeEditor,
  },
});

export default ({ selectModelOptions }) =>
  [
    {
      widget: 'Input',
      name: 'rowKey',
      label: '唯一标识',
    },
    {
      widget: 'Input',
      name: 'title',
      label: '列表标题',
    },
    {
      widget: 'Input',
      name: 'emptyNode',
      label: '空数据提示文案',
    },
    {
      widget: 'BlockQuote',
      props: {
        title: '顶部工具栏设置',
      },
    },
    {
      widget: 'Switch',
      name: 'pagination',
      label: '启用分页',
    },
    {
      widget: 'Switch',
      name: 'openDefaultTools',
      label: '启用默认工具栏',
    },
    {
      widget: 'Switch',
      name: 'autoNo',
      label: '启用自增序号',
    },
    {
      widget: 'InputNumber',
      name: 'scrollX',
      label: '容器水平宽度',
    },
    {
      widget: 'TableList',
      name: 'tools',
      label: '工具栏集合',
      props: {
        showNo: false,
        sortable: true,
        removeConfirm: true,
        copy: false,
        defaultAddValue: {
          label: '新增',
        },
        children: [
          {
            widget: 'Input',
            name: 'label',
            label: '展示文案',
            props: {
              readOnly: true,
            },
          },
        ],
        actions: [
          {
            key: 'edit',
            label: '配置',
            type: 'text',
            onClick: (record, onCellChange) => {
              drawerToolForm.open({
                title: record.label,
                initialValues: record,
                schema: [
                  {
                    widget: 'RadioGroup',
                    name: 'btnType',
                    label: '按钮主题',
                    props: {
                      options: [
                        {
                          label: 'Secondary',
                          value: 'secondary',
                        },
                        {
                          label: 'Primary',
                          value: 'primary',
                        },
                        {
                          label: 'Outline',
                          value: 'outline',
                        },
                      ],
                    },
                  },
                  ...toolPropsConfig(false, selectModelOptions),
                ],
                onValuesChange: (v) => {
                  onCellChange(v);
                },
              });
            },
          },
        ],
      },
    },
    {
      widget: 'BlockQuote',
      props: {
        title: '列操作栏设置',
      },
    },
    {
      widget: 'InputNumber',
      name: 'showMore',
      label: '操作栏超过几条展示更多',
    },
    {
      widget: 'InputNumber',
      name: 'width',
      label: '操作栏宽度',
    },
    {
      widget: 'TableList',
      name: 'menus',
      label: '操作栏列集合',
      props: {
        showNo: false,
        sortable: true,
        removeConfirm: true,
        copy: false,
        defaultAddValue: () => {
          return {
            label: '新增',
          };
        },
        children: [
          {
            widget: 'Input',
            name: 'label',
            label: '展示文案',
            props: {
              readOnly: true,
            },
          },
        ],
        actions: [
          {
            key: 'edit',
            label: '配置',
            type: 'text',
            onClick: (record, onCellChange) => {
              drawerMenuForm.open({
                title: record.label,
                initialValues: record,
                schema: [
                  {
                    widget: 'Switch',
                    name: 'confirm',
                    label: '开启二次确认',
                  },
                  {
                    widget: 'Input',
                    name: 'content',
                    label: '提示内容',
                    effect: ['confirm'],
                    visible({ confirm }) {
                      return confirm;
                    },
                  },
                  ...toolPropsConfig(true, selectModelOptions),
                ],
                onValuesChange: (v: any) => {
                  onCellChange(v);
                },
              });
            },
          },
        ],
      },
    },
    {
      widget: 'BlockQuote',
      props: {
        title: '分页设置',
      },
    },
    {
      widget: 'InputNumber',
      name: 'pageSize',
      label: '默认每页大小',
    },
    {
      widget: 'BlockQuote',
      props: {
        title: '事件绑定',
      },
    },
    {
      widget: 'CodeEditor',
      name: 'request',
      label: '数据查询事件',
      props: {
        mode: 'function',
        useEncrypt: true,
      },
    },
  ] as SchemaProps<{}>[];
