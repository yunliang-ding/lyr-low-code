/* eslint-disable @typescript-eslint/method-signature-style */
import { SchemaProps, TableProps } from 'lyr-design';
import { create } from 'lyr-hooks';
import { SearchProps } from 'lyr-design/dist/search/types';
import { TableColumnType } from 'lyr-design/dist/table/type.column';
import { getStandardSchema as getTableStandardSchema } from './util';
import { encrypt } from '@/util';
import { ReactNode } from 'react';
import materialConfig from '@/form-designer/register-widgets/material-config';

interface DesignerSchemaProps extends SchemaProps {
  key: string;
  propsConfig?: any;
}

export interface CustomWidgetsProps {
  [key: string]: {
    label: string;
    props: any;
    propsConfig: any[];
    render: () => ReactNode;
  };
}

export default create<{
  /** 表单属性 */
  formProps: SearchProps;
  /** 表单模型 */
  schema: DesignerSchemaProps[];
  /** 内置组件 */
  builtInWidget: any[];
  /** 自定义组件 */
  customWidgets: any;
  /** 选中的模型 */
  selectedSchema?: DesignerSchemaProps;
  /** 表格模型 */
  columns: TableColumnType[];
  /** 选中表格 */
  selectTable: boolean;
  /** 表格属性 */
  tableProps:
    | TableProps
    | {
        [key: string]: any;
      };
  /** 获取模型 */
  getStandardSchema(): any;
  /** 获取选中的属性配置 */
  getPropsConfig: () => any;
}>({
  selectTable: true,
  formProps: {
    column: 2,
    layout: 'inline',
  },
  customWidgets: undefined,
  builtInWidget: [
    {
      label: '基础组件',
      value: materialConfig.base,
    },
    {
      label: '高级组件',
      value: materialConfig.advance,
    },
  ],
  schema: undefined,
  selectedSchema: undefined,
  columns: [
    {
      title: '用户姓名',
      dataIndex: 'userName',
      width: 200,
    },
    {
      title: '联系方式',
      dataIndex: 'userPhone',
      width: 200,
    },
    {
      title: '用户年龄',
      dataIndex: 'userAge',
      width: 200,
    },
    {
      title: '详细地址',
      dataIndex: 'userAddress',
      width: 200,
    },
  ],
  tableProps: {
    title: '用户列表',
    emptyNode: '-',
    scrollX: 800,
    tools: [
      {
        label: '新增用户',
        btnType: 'primary',
      },
    ],
    pageSize: 10,
    showMore: 4,
    width: 150,
    pagination: true,
    rowKey: 'id',
    openDefaultTools: true,
    menus: [
      {
        label: '详情',
        key: 'view',
      },
      {
        label: '编辑',
        key: 'edit',
      },
      {
        label: '删除',
        key: 'delete',
        confirm: true,
        content: '是否确认删除?',
      },
    ],
    request: encrypt(`async () => {
  return {
    success: true,
    list: [{
      id: 1,
      userName: '张三',
      userPhone: '13923783472',
      userAge: 20,
      userAddress: '测试地址'
    }],
    total: 1
  }
}`),
  },
  getStandardSchema() {
    return getTableStandardSchema({
      searchSchema: {
        ...this.formProps,
        schema: this.schema,
      },
      tableSchema: {
        ...this.tableProps,
        columns: this.columns,
      },
    });
  },
  getPropsConfig() {
    if (this.selectedSchema) {
      let propsConfig = undefined;
      this.builtInWidget.forEach((item) => {
        const widget = item.value.find(
          (i) => i.type === this.selectedSchema.type,
        );
        if (widget) {
          propsConfig = widget.propsConfig;
        }
      });
      return propsConfig;
    }
  },
});
