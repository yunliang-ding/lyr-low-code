/**
 * Table的属性配置
 */
import FunctionEditor from '../../function-editor';
import { CreateForm, SchemaProps } from 'react-core-form';

/** 顶部工具栏 */
const drawerToolForm = CreateForm.Drawer({
  containId: 'table-tools-drawer',
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
      name: 'spin',
      valuePropName: 'checked',
      label: '开始loading',
    },
    {
      type: 'Switch',
      name: 'ghost',
      valuePropName: 'checked',
      label: '使用ghost',
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
        defaultCode: `() => {
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
        options: [
          {
            label: 'Modal 弹出层',
            value: 'modal',
          },
          {
            label: 'Drawer 抽屉',
            value: 'drawer',
          },
        ],
      },
    },
    {
      type: 'FunctionEditor',
      name: 'drawerFormProps',
      label: '绑定DrawerForm',
      effect: ['bindFormType'],
      visible({ bindFormType }) {
        return bindFormType === 'drawer';
      },
      props: {
        noChangeClearCode: true,
        defaultCode: `({ onSearch }) => {
 
}`,
      } as any,
    },
    {
      type: 'FunctionEditor',
      name: 'modalFormProps',
      label: '绑定ModalForm',
      effect: ['bindFormType'],
      visible({ bindFormType }) {
        return bindFormType === 'modal';
      },
      props: {
        noChangeClearCode: true,
        defaultCode: `({ onSearch }) => {
 
}`,
      } as any,
    },
    {
      type: 'FunctionEditor',
      name: 'onClick',
      label: '点击事件',
      props: {
        noChangeClearCode: true,
        defaultCode: `async (params, { onSearch }) => {
 
}`,
      } as any,
    },
  ],
});

/** 列操作栏 */
const drawerMenuForm = CreateForm.Drawer({
  containId: 'table-menu-drawer',
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
  schema: [
    {
      type: 'Switch',
      name: 'spin',
      valuePropName: 'checked',
      label: '开始loading',
    },
    {
      type: 'Input',
      name: 'auth',
      label: '配置权限标识',
      tooltip: '控制按钮权限',
    },
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
        defaultCode: `(record) => {
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
        options: [
          {
            label: 'Modal 弹出层',
            value: 'modal',
          },
          {
            label: 'Drawer 抽屉',
            value: 'drawer',
          },
        ],
      },
    },
    {
      type: 'FunctionEditor',
      name: 'drawerFormProps',
      label: '绑定DrawerForm',
      effect: ['bindFormType'],
      visible({ bindFormType }) {
        return bindFormType === 'drawer';
      },
      props: {
        noChangeClearCode: true,
        defaultCode: `(record, { query }) => {
 
}`,
      } as any,
    },
    {
      type: 'FunctionEditor',
      name: 'modalFormProps',
      label: '绑定ModalForm',
      effect: ['bindFormType'],
      visible({ bindFormType }) {
        return bindFormType === 'modal';
      },
      props: {
        noChangeClearCode: true,
        defaultCode: `(record, { query }) => {
 
}`,
      } as any,
    },
    {
      type: 'FunctionEditor',
      name: 'onClick',
      label: '点击事件',
      props: {
        noChangeClearCode: true,
        defaultCode: `async (record, { query }) => {
 
}`,
      } as any,
    },
  ],
});

const schema: SchemaProps<{}>[] = [
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
];

export default schema;
