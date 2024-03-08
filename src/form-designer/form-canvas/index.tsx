import { useDrop } from 'react-dnd';
import { CardForm } from 'lyr-design';
import DragContainer from './drag';
import { useCallback, useEffect, useMemo } from 'react';
import { uuid as Uuid, cloneDeep } from '@/util';
import { Empty } from '@arco-design/web-react';
import { deleteCompent } from './util';
import store from '../store';
import './index.css';

export interface FormCanvasType {
  /** 空数据展示 */
  empty?: string;
  /** 默认模型 */
  defaultSchema?: [];
  /* 默认选中的key */
  defaultSelectKey?: string;
  /** 字段选中事件 */
  onSchemaSelect?: Function;
  /** 更新钩子、拖拽、新增、删除、触发 */
  onSchemaUpdate?: Function;
  /**
   * 拖拽可接受的accept
   * @default left-box
   */
  accept?: string;
  /** 主画布样式 */
  style?: any;
  /**
   * 删除是否二次提示
   * @default false
   */
  removeConfirm?: boolean;
  /** 开启 ctrl + s */
  onCtrlS?: () => void;
}

/** 鼠标是否悬停在画布 */
let mouseIsHoveringCanvas = false;

export default ({
  style = {},
  empty = '点击/拖拽左侧栏的组件进行添加',
  accept = 'left-box',
  defaultSchema = [],
  defaultSelectKey = '',
  removeConfirm = false,
  onCtrlS,
  ...rest
}: FormCanvasType) => {
  const { widgets, schema, selectedSchema, formProps } = store.use();
  useEffect(() => {
    store.schema = defaultSchema;
    store.selectedSchema =
      defaultSchema.find((item: any) => item.key === defaultSelectKey) || {};
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
      drop: ({ dragSchema }: any) => {
        // 处理下name和key
        const uuid = Uuid(10);
        const _schema = {
          ...cloneDeep(dragSchema),
          key: uuid,
          name: `${dragSchema.name}_${uuid}`,
        };
        // 判断下如果已经放置在小容器，这里跳过
        // 宏任务的目的是等小容器先Push该组件
        setTimeout(() => {
          // 判断是否与已经存在
          if (localStorage.getItem('inner-add') !== '1') {
            delete _schema.isNew; // 删除isNew标识
            store.schema.push({
              ..._schema,
            });
            store.schema = [...store.schema];
          } else {
            localStorage.removeItem('inner-add'); // clear
          }
        });
      },
    }),
    [schema, selectedSchema],
  );
  // 递归处理FieldSet子元素
  const recursionSchemaItem = useCallback(
    (children) => {
      children?.forEach((itemSchema) => {
        itemSchema.itemRender = (dom) => {
          return (
            <DragContainer
              key={itemSchema.key}
              removeConfirm={removeConfirm}
              accept={accept}
              itemSchema={itemSchema}
              schema={schema}
              selected={selectedSchema.key === itemSchema.key} // 是否选中
              onSchemaUpdate={(value) => {
                store.schema = value;
              }}
              setSelectSchema={(item) => {
                store.selectedSchema = item;
              }}
            >
              {dom}
            </DragContainer>
          );
        };
        // 处理子节点
        if (
          itemSchema.type === 'FieldSet' &&
          itemSchema.props?.children?.length > 0
        ) {
          recursionSchemaItem(itemSchema.props.children);
        }
      });
    },
    [schema, selectedSchema],
  );
  /** 拷贝一份 */
  const _schema = useMemo(() => {
    return cloneDeep(schema);
  }, [schema, selectedSchema]);
  // 生成 itemRender
  recursionSchemaItem(_schema);
  const cls = ['form-canvas'];
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
    } else if (e.key === 'Backspace' && mouseIsHoveringCanvas) {
      /** 删除该字段 */
      deleteCompent({
        itemSchema: selectedSchema,
        schema,
        setSelectSchema: (item) => {
          store.selectedSchema = item;
        },
        onSchemaUpdate: (item) => {
          store.schema = item;
        },
      });
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', keyboardEvent);
    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [formProps, selectedSchema, schema]);
  return (
    <div
      ref={drop}
      className={cls.join(' ')}
      style={style}
      onMouseEnter={() => {
        mouseIsHoveringCanvas = true;
      }}
      onMouseLeave={() => {
        mouseIsHoveringCanvas = false;
      }}
    >
      {isOver && <div className="form-canvas-mask" />}
      {_schema.length === 0 && (
        <Empty description={empty} className="form-canvas-empty" />
      )}
      <CardForm
        schema={_schema}
        {...formProps}
        {...rest}
        widgets={widgets}
        actions={[
          {
            label: '取消',
            type: 'default',
          },
          {
            label: '提交',
            type: 'primary',
            spin: true, // 开启加载
            onClick: () => {},
          },
        ]}
        cardProps={{
          className: 'form-canvas-card-box',
        }}
      />
    </div>
  );
};
