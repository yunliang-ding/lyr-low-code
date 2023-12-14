/* eslint-disable @typescript-eslint/method-signature-style */
import { SchemaProps, TableProps } from 'react-core-form';
import { create } from 'react-core-form-store';
import { SearchProps } from 'react-core-form/dist/search/types';
import { TableColumnType } from 'react-core-form/dist/table/type.column';
import { getStandardSchema as getTableStandardSchema } from './util';
import { encrypt } from '@/util';

export default create<{
  // 组件
  widgets: {
    __originalConfig__?: any[]; // 部件的配置项模型
  };
  formProps: SearchProps;
  schema: SchemaProps[];
  selectedSchema: SchemaProps & {
    key?: string;
  };
  columns: TableColumnType[];
  selectTable: boolean;
  tableProps:
    | TableProps
    | {
        [key: string]: any;
      };
  getStandardSchema(): any;
}>({
  selectTable: true,
  formProps: {
    column: 2,
    layout: 'inline',
  },
  widgets: {},
  schema: [
    {
      key: 'userName',
      type: 'Input',
      label: '用户姓名',
      name: 'userName',
    },
  ],
  selectedSchema: {},
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
        key: 'add',
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
});
