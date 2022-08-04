import { cloneDeep, recursionFind, uuid as Uuid } from '@/util';
import { Popconfirm } from 'antd';
import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { deleteCompent } from './util';

export default ({
  schema,
  itemSchema,
  children,
  selected,
  setSelectSchema,
  accept,
  onSchemaUpdate,
  removeConfirm,
}: any) => {
  const boxRef: any = useRef({});
  const [position, setPosition]: any = useState();
  const [{ isDragging }, dragRef, dragPreview]: any = useDrag(
    () => ({
      type: 'inner-box',
      item: {
        dragSchema: itemSchema,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [schema, itemSchema],
  );
  // 处理逻辑
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: ['inner-box', accept], // 接受内部的box和侧边栏的left-box
    drop: async ({ dragSchema, dropSchema }: any) => {
      const uuid = Uuid(10);
      if (dragSchema.isNew) {
        dragSchema.key = uuid;
        dragSchema.name = `${dragSchema.name}_${uuid}`;
      }
      // 需要调整位置
      if (dropSchema.key !== dragSchema.key) {
        // 如果不是新增的则删除起点
        if (!dragSchema.isNew) {
          /**
           * 1: 删除
           */
          // 判断起点是否有父元素
          if (dragSchema.__parentKey__) {
            // 更新 schema
            const root = recursionFind(schema, dragSchema.__parentKey__);
            if (root.props.children === undefined) {
              return;
            }
            // 起点
            const startIndex = root.props.children.findIndex(
              (i: any) => i.key === dragSchema.key,
            );
            // 删除起点
            root.props.children.splice(startIndex, 1);
            if (root.props.children.length === 0) {
              delete root.props.children;
            }
          } else {
            // 找到起点
            const startIndex = schema.findIndex(
              (i) => i.key === dragSchema.key,
            );
            // 删除起点
            schema.splice(startIndex, 1);
          }
        }
        /**
         * 2: 插入
         */
        // 是FieldSet且没有孩子节点，允许插入一次
        if (
          dropSchema.type === 'FieldSet' &&
          dropSchema.props?.children === undefined &&
          dragSchema.key !== dropSchema.key
        ) {
          // 节点元素，递归查找
          const root = recursionFind(schema, dropSchema.key);
          // 添加 children
          if (root.props) {
            const newChildren = {
              ...dragSchema,
              __parentKey__: dropSchema.key, // 添加父节点id
            };
            delete newChildren.isNew; // 删除标识
            root.props.children = [newChildren];
          }
          localStorage.setItem('inner-add', '1'); // 通知外部大容器不要再次添加了
        } else {
          let _schema = schema;
          // 判断落点是否有父节点
          if (dropSchema.__parentKey__) {
            const root = recursionFind(schema, dropSchema.__parentKey__);
            if (root) {
              _schema = root.props?.children || [];
            }
            dragSchema.__parentKey__ = dropSchema.__parentKey__; // 更新父节点id
          } else {
            delete dragSchema.__parentKey__; // 移除父节点id
          }
          // 落点
          const endIndex: number = _schema.findIndex(
            (i) => i.key === dropSchema.key,
          );
          if (dragSchema.isNew) {
            // 去掉isNew标识
            delete dragSchema.isNew;
            localStorage.setItem('inner-add', '1'); // 通知外部大容器不要再次添加了
          }
          // 插入落点
          if (position === 'up') {
            // 前序插入
            _schema.splice(endIndex, 0, dragSchema);
          } else if (position === 'down') {
            // 后序插入
            _schema.splice(endIndex + 1, 0, dragSchema);
          }
        }
        setSelectSchema(dragSchema);
        onSchemaUpdate([...schema]); // 返回组装好schema
      }
    },
    hover: (item: any, monitor: any) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: true });
      if (didHover) {
        const hoverBoundingRect: any =
          boxRef.current && boxRef.current.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const dragOffset: any = monitor.getSourceClientOffset();
        const hoverClientY = dragOffset.y - hoverBoundingRect.top;
        // 处理下name和key
        if (hoverClientY <= hoverMiddleY) {
          setPosition('up');
          item.dropSchema = itemSchema;
        } else if (hoverClientY > hoverMiddleY) {
          setPosition('down');
          item.dropSchema = itemSchema;
        } else {
          item.dropSchema = {};
        }
      }
    },
    collect: (monitor: any) => {
      try {
        return {
          isOver: monitor.isOver({ shallow: true }),
          canDrop: monitor.canDrop(),
        };
      } catch (error) {
        console.warn(error);
      }
      return {};
    },
  });
  // 删除
  const removeCompent = (e) => {
    e.stopPropagation(); // stop
    deleteCompent({
      itemSchema,
      schema,
      setSelectSchema,
      onSchemaUpdate,
    });
  };
  // 拷贝
  const copyCompent = (e) => {
    e.stopPropagation(); // stop
    const uuid = Uuid(10);
    const targetSchema = cloneDeep(itemSchema);
    // TODO 暂只做了一层
    if (targetSchema.type === 'FieldSet') {
      targetSchema.props.children = targetSchema.props?.children?.map(
        (item) => {
          return {
            ...item,
            key: `key_${Uuid(10)}`,
          };
        },
      );
    }
    const copySchema = {
      ...targetSchema,
      key: `key_${uuid}`,
      name: `${targetSchema.type}_${uuid}`,
    };
    const index: number = schema.findIndex(
      ({ key }) => key === targetSchema.key,
    );
    // 判断是否有父节点
    if (targetSchema.__parentKey__) {
      // 寻找父节点
      const root = recursionFind(schema, targetSchema.__parentKey__);
      if (root) {
        root.props.children.push({
          ...copySchema,
          __parentKey__: targetSchema.__parentKey__,
        });
      }
    } else {
      schema.splice(index + 1, 0, copySchema);
    }
    onSchemaUpdate([...schema]); // 返回组装好schema
  };
  /** 样式处理 */
  const isActive = canDrop && isOver;
  dragPreview(dropRef(boxRef));
  let containerStyle: any = {
    opacity: isDragging ? 0 : 1,
  };
  if (isActive) {
    if (position === 'up') {
      containerStyle = {
        ...containerStyle,
        boxShadow: '0 -3px 0 var(--antd-wave-shadow-color)',
      };
    } else if (position === 'down') {
      containerStyle = {
        ...containerStyle,
        boxShadow: '0 3px 0 var(--antd-wave-shadow-color)',
      };
    }
  }
  // 设置列数
  if (itemSchema.span) {
    containerStyle = {
      ...containerStyle,
      gridColumnStart: `span ${itemSchema.span}`,
    };
  }
  // 点击Schema
  const onSchemaClick = (e) => {
    e.stopPropagation(); // stop
    setSelectSchema(itemSchema); // 选中
  };
  return (
    <div
      ref={boxRef}
      className="drag-container"
      style={
        selected
          ? containerStyle
          : { ...containerStyle, border: '1px dashed #ccc' }
      }
      onClick={onSchemaClick}
    >
      <div className="drag-container-key">{itemSchema.name}</div>
      {selected && (
        <>
          <div className="drag-container-drag" ref={dragRef}>
            <i className="iconfont spicon-drag" />
          </div>
          <div className="drag-container-tools">
            {removeConfirm ? (
              <Popconfirm
                placement="left"
                title="确认删除该组件吗?"
                onConfirm={removeCompent}
                okText="确定"
                cancelText="取消"
              >
                <i className="iconfont spicon-delete" />
              </Popconfirm>
            ) : (
              <i onClick={removeCompent} className="iconfont spicon-delete" />
            )}
            <i className="iconfont spicon-copy" onClick={copyCompent} />
          </div>
        </>
      )}
      {children}
    </div>
  );
};
