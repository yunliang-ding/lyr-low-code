import { useDrop } from 'react-dnd';
import { useState, useEffect, useContext, useMemo } from 'react';
import { uuid as Uuid, cloneDeep } from '@/util';
import { Ctx } from '../store';
import { getPageStandardSchema } from '../util';
import MaterialRender from '@/page-designer/material-render';
import './index.css';

export interface FormCanvasType {
  empty?: string; // 空数据展示
  defaultSchema?: []; // 默认模型
  defaultSelectKey?: string; // 选中的key
  accept?: string; // useDrop配置的accept
  style?: any;
  /** 开启 ctrl + s */
  onCtrlS?: () => void;
}

export default ({
  empty = '点击/拖拽左侧栏的组件进行添加',
  accept = 'left-box',
  defaultSchema = [],
  defaultSelectKey = '',
  style = {},
  onCtrlS,
}: FormCanvasType) => {
  const [reload, setReload] = useState(Math.random());
  const ctx: any = useContext(Ctx); // 拿到ctx
  // update ctx
  useEffect(() => {
    if (defaultSchema.length > 0) {
      ctx.setSchema(defaultSchema);
      const selectSchema =
        defaultSchema.find((item: any) => item.key === defaultSelectKey) || {};
      ctx.setSelectSchema(selectSchema);
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
      drop: ({ dragSchema }: any) => {
        console.log(dragSchema);
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
    [ctx.schema],
  );
  const _schema = useMemo(() => {
    return cloneDeep(ctx.schema);
  }, [ctx.schema]);
  // 重新创建
  useEffect(() => {
    setReload(Math.random());
  }, [ctx.selectItem, ctx.selectItem.key, _schema]);
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
  }, [ctx.schema, ctx.selectItem]);
  const cls = ['page-canvas'];
  return (
    <div ref={drop} className={cls.join(' ')} style={style}>
      {isOver && <div className="page-canvas-mask" />}
      <MaterialRender
        accept={accept}
        schema={getPageStandardSchema({
          pageProps: ctx.pageProps,
          children: ctx.schema,
        })}
      />
    </div>
  );
};
