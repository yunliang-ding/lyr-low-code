/**
 * Table的属性配置
 */
import FunctionEditor from '../../function-editor';
import { CreateDrawer, SchemaProps } from 'react-core-form';
import { encrypt } from '@/util';

/** 顶部工具栏和操作栏相同部分 */
const toolPropsConfig = (
  isRowOperation = false,
  selectModelOptions,
): SchemaProps<{}>[] => {
  return [
    {
      type: 'Switch',
      name: 'spin',
      valuePropName: 'checked',
      label: '开启loading',
    },
    {
      type: 'Input',
      name: 'auth',
      label: '配置权限标识',
      tooltip: '控制按钮权限',
    },
    {
      type: 'FunctionEditor',
      name: 'visible',
      label: '是否展示',
      props: {
        noChangeClearCode: true,
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
      } as any,
    },
    {
      type: 'RadioGroup',
      name: 'bindFormType',
      label: '绑定表单',
      props: {
        optionType: 'button',
        onChange(e) {
          const v = e.target?.value;
          if (v === 'modal') {
            this.form.setFieldsValueTouchOnValuesChange({
              drawerFormProps: undefined,
            });
          } else if (v === 'drawer') {
            this.form.setFieldsValueTouchOnValuesChange({
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
      type: 'AsyncSelect',
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
      type: 'RadioGroup',
      name: 'modelIdType',
      label: '展示形式',
      effect: ['modelId', 'bindFormType'],
      effectClearField: true,
      visible({ modelId, bindFormType }) {
        return modelId !== undefined && bindFormType === 'modelId';
      },
      props: {
        onChange() {
          const { form } = this;
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
    }
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
      type: 'FunctionEditor',
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
        noChangeClearCode: true,
        defaultCode: isRowOperation
          ? `async ({ onRefresh }, record) => {

}`
          : `async ({ onSearch }) => {

}`,
      } as any,
    },
    {
      type: 'FunctionEditor',
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
        defaultCode: isRowOperation
          ? `async ({ onRefresh }, record) => {

}`
          : `async ({ onSearch }) => {

}`,
      } as any,
    },
    {
      type: 'FunctionEditor',
      name: 'onClick',
      label: '点击事件',
      props: {
        noChangeClearCode: true,
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
  footer: false,
  width: 400,
  drawerProps: {
    footer: false,
    headerStyle: {
      height: 43.5,
    },
    style: {
      top: 64,
      height: 'calc(100% - 57px)',
    },
  },
  widgets: {
    FunctionEditor,
  },
});

/** 列操作栏 */
const drawerMenuForm = CreateDrawer({
  footer: false,
  width: 400,
  drawerProps: {
    footer: false,
    headerStyle: {
      height: 43.5,
    },
    style: {
      top: 64,
      height: 'calc(100% - 57px)',
    },
  },
  widgets: {
    FunctionEditor,
  },
});

export default ({ selectModelOptions }) =>
  [
    {
      type: 'Input',
      name: 'rowKey',
      label: '唯一标识',
    },
    {
      type: 'Input',
      name: 'title',
      label: '列表标题',
    },
    {
      type: 'Input',
      name: 'emptyNode',
      label: '空数据提示文案',
    },
    {
      type: 'RadioGroup',
      name: 'size',
      label: '尺寸大小',
      props: {
        optionType: 'button',
        options: [
          {
            label: 'small',
            value: 'small',
          },
          {
            label: 'middle',
            value: 'middle',
          },
        ],
      },
    },
    {
      type: 'BlockQuote',
      props: {
        title: '顶部工具栏设置',
      },
    },
    {
      type: 'RadioGroup',
      name: 'toolsAlign',
      label: '工具栏位置',
      props: {
        optionType: 'button',
        options: [
          {
            label: '左对齐',
            value: 'left',
          },
          {
            label: '右对齐',
            value: 'right',
          },
        ],
      },
    },
    {
      type: 'Switch',
      name: 'pagination',
      valuePropName: 'checked',
      label: '启用分页',
    },
    {
      type: 'Switch',
      name: 'openDefaultTools',
      valuePropName: 'checked',
      label: '启用默认工具栏',
    },
    {
      type: 'Switch',
      name: 'autoNo',
      valuePropName: 'checked',
      label: '启用自增序号',
    },
    {
      type: 'InputNumber',
      name: 'scrollX',
      label: '容器水平宽度',
    },
    {
      type: 'TableList',
      name: 'tools',
      label: '工具栏集合',
      props: {
        openConfirm: false,
        focusName: 'label',
        actions: [
          {
            key: 'edit',
            label: '修改',
            onClick: (record, onCellChange) => {
              drawerToolForm.open({
                title: record.label,
                initialValues: record,
                schema: [
                  {
                    type: 'Select',
                    name: 'btnType',
                    label: '按钮主题',
                    props: {
                      options: [
                        {
                          label: '默认',
                          value: 'default',
                        },
                        {
                          label: '主题色',
                          value: 'primary',
                        },
                      ],
                    },
                  },
                  {
                    type: 'Switch',
                    name: 'ghost',
                    valuePropName: 'checked',
                    label: '使用ghost',
                  },
                  ...toolPropsConfig(false, selectModelOptions),
                ],
                onValuesChange: (v: any) => {
                  const k = Object.keys(v)[0];
                  onCellChange(v[k], k);
                },
              });
            },
          },
        ],
        columns: [
          {
            title: '标签名',
            dataIndex: 'label',
          },
          {
            title: '唯一标识',
            dataIndex: 'key',
          },
        ],
      },
    },
    {
      type: 'BlockQuote',
      props: {
        title: '列操作栏设置',
      },
    },
    {
      type: 'InputNumber',
      name: 'showMore',
      label: '操作栏超过几条展示更多',
    },
    {
      type: 'InputNumber',
      name: 'width',
      label: '操作栏宽度',
    },
    {
      type: 'TableList',
      name: 'menus',
      label: '操作栏列集合',
      props: {
        openConfirm: false,
        focusName: 'label',
        actions: [
          {
            key: 'edit',
            label: '修改',
            onClick: (record, onCellChange) => {
              drawerMenuForm.open({
                title: record.label,
                initialValues: record,
                schema: [
                  {
                    type: 'Switch',
                    name: 'confirm',
                    valuePropName: 'checked',
                    label: '开启二次确认',
                  },
                  {
                    type: 'Input',
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
                  const k = Object.keys(v)[0];
                  onCellChange(v[k], k);
                },
              });
            },
          },
        ],
        columns: [
          {
            title: '标签名',
            dataIndex: 'label',
          },
          {
            title: '唯一标识',
            dataIndex: 'key',
          },
        ],
      },
    },
    {
      type: 'BlockQuote',
      props: {
        title: '分页设置',
      },
    },
    {
      type: 'InputNumber',
      name: 'pageSize',
      label: '默认每页大小',
    },
    {
      type: 'BlockQuote',
      props: {
        title: '事件绑定',
      },
    },
    {
      type: 'FunctionEditor',
      name: 'request',
      label: '数据查询事件',
    },
  ] as SchemaProps<{}>[];
