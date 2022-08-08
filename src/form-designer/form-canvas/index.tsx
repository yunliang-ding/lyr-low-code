import { useDrop } from 'react-dnd';
import { CardForm } from 'react-core-form';
import DragContainer from './drag';
import { useCallback, useEffect, useContext, useMemo } from 'react';
import { uuid as Uuid, cloneDeep } from '@/util';
import { Ctx } from '../store';
import { Empty } from 'antd';
import { deleteCompent } from './util';
import './index.less';

export interface FormCanvasType {
  /** 空数据展示 */
  empty?: string;
  /** 默认模型 */
  defaultSchema?: [];
  /* 默认选中的key */
  defaultSelectKey?: string;
  /** 字段选中事件 */
  onSchemaSelect?: Function;
  /** useDrop配置的accept */
  accept?: string;
  /** 主画布样式 */
  style?: any;
  /** 删除是否二次提示 */
  removeConfirm?: boolean;
  /** 操作栏配置 */
  extra?: [];
  /** 开启 ctrl + s */
  onCtrlS?: () => void;
}

/** 鼠标是否悬停在画布 */
let mouseIsHoveringCanvas = false;

export default ({
  empty = '点击/拖拽左侧栏的组件进行添加',
  onSchemaSelect = () => {},
  accept = 'left-box',
  defaultSchema = [],
  defaultSelectKey = '',
  style = {},
  removeConfirm = false,
  extra,
  onCtrlS,
  ...rest
}: FormCanvasType) => {
  const ctx: any = useContext(Ctx); // 拿到ctx
  // update ctx
  useEffect(() => {
    ctx.setSchema(defaultSchema);
    const selectSchema =
      defaultSchema.find((item: any) => item.key === defaultSelectKey) || {};
    ctx.setSelectSchema(selectSchema);
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
          ...dragSchema,
          key: uuid,
          name: `${dragSchema.name}_${uuid}`,
        };
        // 判断下如果已经放置在小容器，这里跳过
        // 宏任务的目的是等小容器先Push该组件
        setTimeout(() => {
          // 判断是否与已经存在
          if (localStorage.getItem('inner-add') !== '1') {
            delete _schema.isNew; // 删除isNew标识
            ctx.schema.push({
              ..._schema,
            });
            ctx.setSchema([...ctx.schema]); // ctx
          } else {
            localStorage.removeItem('inner-add'); // clear
          }
        });
      },
    }),
    [ctx.schema, ctx.selectSchema.key],
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
              schema={ctx.schema}
              selected={ctx.selectSchema.key === itemSchema.key} // 是否选中
              onSchemaUpdate={(schema) => {
                ctx.setSchema(schema); // ctx
              }}
              setSelectSchema={(i: any) => {
                ctx.setSelectSchema(i); // ctx
                onSchemaSelect(i); // 通知外面
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
    [ctx.schema, ctx.selectSchema.key],
  );
  const _schema = useMemo(() => {
    return cloneDeep(ctx.schema);
  }, [ctx.schema, ctx.selectSchema.key]);
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
        itemSchema: ctx.selectSchema,
        schema: ctx.schema,
        setSelectSchema: ctx.setSelectSchema,
        onSchemaUpdate: ctx.setSchema,
      });
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', keyboardEvent);
    return () => {
      window.removeEventListener('keydown', keyboardEvent);
    };
  }, [ctx.formProps, ctx.selectSchema, ctx.schema]);
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
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={empty}
          className="form-canvas-empty"
        />
      )}
      <CardForm
        schema={_schema}
        key={ctx.widgets}
        extra
        {...ctx?.formProps}
        {...rest}
        widgets={ctx.widgets}
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
          extra,
        }}
      />
    </div>
  );
};
