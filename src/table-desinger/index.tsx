import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import TableCanvas from './table-canvas';
import RegisterWidgets from './register-widgets';
import PropsConfigPanel from './props-config-panel';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Ctx } from '@/table-desinger/store';
import { getStandardSchema, parseTableSchema } from './util';
import { TableProps } from 'react-core-form';
import { isEmpty } from '@/util';
import './index.less';

const Container = (props: any, ref: any) => {
  // 统一管理FormProps
  const [formProps, setFormProps] = useState({
    column: 3,
    hidden: false,
    layout: 'inline',
  });
  // 统一管理 schema
  const [schema, setSchema] = useState([]);
  // 统一管理选中的 schema
  const [selectSchema, setSelectSchema] = useState({});
  // 统一管理 columns
  const [columns, setColumns] = useState([
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
  ]);
  // 统一管理 TableProps
  const [tableProps, setTableProps] = useState<TableProps>({
    title: '用户列表',
    emptyNode: '-',
    tools: [
      {
        label: '新增用户',
        key: 'add',
        btnType: 'primary',
      },
    ],
    pageSize: 10,
    showMore: 4,
    width: 180,
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
    request: `{{_#async function(){
  return {
    success: true,
    list: [{}],
    total: 1
  }
} _#}}`,
    toolsClick: `{{_#async function(tool){
  if(tool.key === 'add'){
    console.log('add')
  }
} _#}}`,
    rowOperationsClick: `{{_#async function(menu, record){
  if(menu.key === 'edit'){
    console.log('record', record)
  }
} _#}}`,
  } as any);
  const [selectTable, setSelectTable] = useState(false);
  useEffect(() => {
    if (selectTable) {
      setSelectSchema({});
    }
  }, [selectTable]);
  // 统一管理 widgets
  const [widgets, setWidgets] = useState<{
    __originalConfig__?: object[]; // 部件的配置项模型
  }>({});
  useEffect(() => {
    if (!isEmpty(selectSchema)) {
      setSelectTable(false);
    }
  }, [selectSchema]);
  const ctx = {
    widgets,
    setWidgets,
    schema,
    setSchema,
    selectSchema,
    setSelectSchema,
    selectTable,
    setSelectTable,
    formProps,
    setFormProps,
    columns,
    setColumns,
    tableProps,
    setTableProps,
    parseTableSchema,
    getStandardSchema,
  };
  // 通知
  useEffect(() => {
    props.onSchemaUpdate?.(schema);
  }, [schema]);
  useImperativeHandle(ref, () => ctx); // ctx挂载到ref
  return (
    <DndProvider backend={HTML5Backend}>
      <Ctx.Provider {...props} value={ctx} />
    </DndProvider>
  );
};
const TableDesigner: any = forwardRef(Container); // 接受ref
TableDesigner.TableCanvas = TableCanvas;
TableDesigner.RegisterWidgets = RegisterWidgets;
TableDesigner.PropsConfigPanel = PropsConfigPanel;
TableDesigner.useTools = () => {
  return {
    parseTableSchema,
  };
};
export default TableDesigner;
