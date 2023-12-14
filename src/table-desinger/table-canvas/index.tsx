import { useDrop } from 'react-dnd';
import { Search, Table } from 'react-core-form';
import DragContainer from '@/form-designer/form-canvas/drag';
import { useState, useEffect, useMemo } from 'react';
import { uuid, cloneDeep } from '@/util';
import { parseTableColumns, parseTableSchema } from '../util';
import store from '../store';
import './index.css';

export interface FormCanvasType {
  empty?: string; // 空数据展示
  defaultSchema?: []; // 默认模型
  defaultSelectKey?: string; // 选中的key
  onSchemaSelect?: Function; // 字段选中
  accept?: string; // useDrop配置的accept
  style?: any;
  /** 开启 ctrl + s */
  onCtrlS?: () => void;
}

export default ({
  accept = 'left-box',
  defaultSchema = [],
  defaultSelectKey = '',
  style = {},
  onCtrlS,
}: FormCanvasType) => {
  const [reload, setReload] = useState(Math.random());
  const {
    selectTable,
    tableProps,
    columns,
    schema,
    formProps,
    selectedSchema,
  } = store.use();
  // update ctx
  useEffect(() => {
    if (defaultSchema.length > 0) {
      store.schema = defaultSchema;
      store.selectedSchema =
        defaultSchema.find((item: any) => item.key === defaultSelectKey) || {};
    }
  }, []);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept,
      collect: (monitor) => {
        try {
          return {
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
          };
        } catch (error) {
          console.warn(error);
        }
        return {};
      },
      // 拖放结束
      drop: ({ dragSchema }) => {
        // 处理下name和key
        const _uid = uuid(10);
        const _schema = {
          ...dragSchema,
          key: _uid,
          name: `${dragSchema.name}_${_uid}`,
        };
        // 判断下如果已经放置在小容器，这里跳过
        // 宏任务的目的是等小容器先Push该组件
        setTimeout(() => {
          // 判断是否与已经存在
          if (localStorage.getItem('inner-add') !== '1') {
            delete _schema.isNew; // 删除isNew标识
            schema.push({
              ..._schema,
            });
            store.schema = [...store.schema];
          } else {
            localStorage.removeItem('inner-add'); // clear
          }
        });
      },
    }),
    [schema],
  );
  // 递归处理FieldSet子元素
  const recursionSchemaItem = (children) => {
    children?.forEach((itemSchema) => {
      itemSchema.itemRender = (dom) => {
        return (
          <DragContainer
            key={itemSchema.key}
            accept={accept}
            itemSchema={itemSchema}
            schema={schema}
            selected={selectedSchema.key === itemSchema.key} // 是否选中
            onSchemaUpdate={(item) => {
              store.schema = item;
            }}
            setSelectSchema={(i: any) => {
              store.selectedSchema = i;
              store.selectTable = false;
            }}
          >
            {dom}
          </DragContainer>
        );
      };
    });
  };
  const _schema = useMemo(() => {
    return cloneDeep(schema);
  }, [schema]);
  // 生成 itemRender
  recursionSchemaItem(_schema);
  // 重新创建
  useEffect(() => {
    setReload(Math.random());
  }, [columns]);
  const cls = ['table-canvas'];
  if (formProps.hidden) {
    cls.push('table-canvas-hidden-search');
  }
  /**
   * 设置相关的键盘监听事件
   */
  const keyboardEvent = (e) => {
    if (
      typeof onCtrlS === 'function' &&
      (e.key === 's' || e.key === 'S') &&
      (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
    ) {
      e.preventDefault();
      onCtrlS();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', keyboardEvent);
    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [formProps, selectedSchema, schema, tableProps, columns]);
  /** request 变化刷新下 table */
  const [table] = Table.useTable();
  // 重新创建
  useEffect(() => {
    setReload(Math.random());
  }, [columns]);
  useEffect(() => {
    table.onSearch();
  }, [tableProps.request]);
  return (
    <div ref={drop} className={cls.join(' ')} style={style}>
      {isOver && <div className="table-canvas-mask" />}
      {_schema.length > 0 && (
        <Search
          key={selectedSchema.key}
          {...{
            ...formProps,
            hidden: false,
            schema: _schema,
          }}
        />
      )}
      <div
        style={{
          margin: '0 18px',
        }}
        className={
          selectTable ? 'table-canvas-table-selected' : 'table-canvas-table'
        }
        onClick={() => {
          store.selectTable = true;
          store.selectedSchema = {};
        }}
      >
        <Table
          key={reload}
          table={table}
          {...parseTableSchema(cloneDeep(tableProps))}
          columns={parseTableColumns(cloneDeep(columns))}
          searchSchema={{ hidden: true }}
        />
      </div>
    </div>
  );
};
