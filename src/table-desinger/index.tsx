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
import { defaultInitialValues } from './config';
import './index.less';

const Container = (
  { initalValues = defaultInitialValues, ...props }: any,
  ref: any,
) => {
  // 统一管理FormProps
  const [formProps, setFormProps] = useState(initalValues.formProps);
  // 统一管理 schema
  const [schema, setSchema] = useState(initalValues.schema);
  // 统一管理选中的 schema
  const [selectSchema, setSelectSchema] = useState({});
  // 统一管理 columns
  const [columns, setColumns] = useState(initalValues.columns);
  // 统一管理 TableProps
  const [tableProps, setTableProps] = useState<TableProps>(
    initalValues.tableProps,
  );
  const [selectTable, setSelectTable] = useState(true);
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
    getStandardSchema,
  };
};
export default TableDesigner;
