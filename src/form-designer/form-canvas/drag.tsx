/* eslint-disable max-len */
import { cloneDeep, recursionFind, uuid as Uuid } from '@/util';
import { Popconfirm } from '@arco-design/web-react';
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
        boxShadow: '0 -3px 0 rgb(var(--primary-6))',
      };
    } else if (position === 'down') {
      containerStyle = {
        ...containerStyle,
        boxShadow: '0 3px 0 rgb(var(--primary-6))',
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
          : { ...containerStyle, border: '1px dashed var(--color-fill-3)' }
      }
      onClick={onSchemaClick}
    >
      <div className="drag-container-key">{itemSchema.name}</div>
      {selected && (
        <>
          <div className="drag-container-drag" ref={dragRef}>
            <svg viewBox="0 0 1024 1024" width="16" height="16">
              <path
                d="M512.616441 309.005755a42.645895 42.645895 0 0 1-42.645894-42.645894V146.098438L375.296661 240.772324a42.645895 42.645895 0 1 1-60.55717-60.55717L482.337856 12.616788A42.645895 42.645895 0 0 1 555.262336 42.895373v223.464488a42.645895 42.645895 0 0 1-42.645895 42.645894z m-279.757068 392.34223a42.645895 42.645895 0 0 0 0-60.130711l-85.291789-85.291789H256.741074a42.645895 42.645895 0 1 0 0-85.291789H43.511601a42.645895 42.645895 0 0 0-30.278585 72.924479L171.449285 701.347985a42.645895 42.645895 0 0 0 60.130711 0zM205.99246 409.650066l26.866913-25.587536A42.645895 42.645895 0 1 0 171.449285 323.0789l-26.440455 26.440455A42.645895 42.645895 0 1 0 205.99246 409.650066z m504.074473-170.583578a42.645895 42.645895 0 0 0 0-60.130711L683.20002 152.495322A42.645895 42.645895 0 0 0 622.21639 213.478951l27.719832 28.146291a42.645895 42.645895 0 0 0 60.130711 0z m-167.171906 772.317151l167.598365-167.598366a42.645895 42.645895 0 0 0-60.130711-60.130711L555.262336 878.328448v-120.687882a42.645895 42.645895 0 0 0-85.291789 0V981.105053a42.645895 42.645895 0 0 0 72.92448 30.278586z m476.781101-483.177986a42.645895 42.645895 0 0 0-9.382097-46.484025l-158.642728-158.642728A42.645895 42.645895 0 0 0 791.520592 384.06253l85.291789 85.291789H768.491809a42.645895 42.645895 0 0 0 0 85.291789h213.229473a42.645895 42.645895 0 0 0 37.954846-26.440455z m-168.024825 172.715873l26.440455-26.440454a42.645895 42.645895 0 0 0-60.130712-60.130712l-26.440454 26.440455a42.645895 42.645895 0 1 0 60.130711 60.130711z m-448.634811 170.583578a42.645895 42.645895 0 0 0 0-60.130711l-27.719831-28.14629a42.645895 42.645895 0 0 0-60.55717 60.130711l27.719831 28.14629a42.645895 42.645895 0 0 0 60.130711 0zM512.616441 469.354319a42.645895 42.645895 0 1 0 42.645895 42.645894 42.645895 42.645895 0 0 0-42.645895-42.645894z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="drag-container-tools">
            {removeConfirm ? (
              <Popconfirm
                position="left"
                title="确认删除该组件吗?"
                onConfirm={removeCompent}
                okText="确定"
                cancelText="取消"
              >
                <svg viewBox="0 0 1024 1024" width="16" height="16">
                  <path
                    d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z"
                    fill="#fff"
                  />
                  <path
                    d="M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
                    fill="#fff"
                  />
                </svg>
              </Popconfirm>
            ) : (
              <svg
                onClick={removeCompent}
                viewBox="0 0 1024 1024"
                width="16"
                height="16"
              >
                <path
                  d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72z"
                  fill="#fff"
                />
                <path
                  d="M864 256H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
                  fill="#fff"
                />
              </svg>
            )}
            <svg
              onClick={copyCompent}
              viewBox="0 0 1024 1024"
              width="16"
              height="16"
            >
              <path
                d="M969.142857 219.428571A54.857143 54.857143 0 0 1 1024 274.285714v694.857143a54.857143 54.857143 0 0 1-54.857143 54.857143h-548.571428a54.857143 54.857143 0 0 1-54.857143-54.857143V804.571429H54.857143A54.857143 54.857143 0 0 1 0 749.714286V365.714286c0-30.281143 17.700571-72.557714 38.838857-93.696l233.142857-233.142857C293.12 17.737143 335.396571 0.036571 365.677714 0.036571h237.714286a54.857143 54.857143 0 0 1 54.857143 54.857143v187.428572c22.272-13.129143 50.870857-22.857143 73.142857-22.857143h237.714286zM658.285714 341.138286L487.424 512H658.285714V341.138286z m-365.714285-219.428572L121.709714 292.571429H292.571429V121.709714z m111.981714 369.737143l180.553143-180.553143v-237.714285h-219.428572v237.714285a54.857143 54.857143 0 0 1-54.857143 54.857143h-237.714285v365.714286h292.571428v-146.285714c0-30.281143 17.700571-72.557714 38.838857-93.696zM950.857143 950.857143V292.571429h-219.428572v237.714285a54.857143 54.857143 0 0 1-54.857142 54.857143H438.857143v365.714286h512z"
                fill="#fff"
              />
            </svg>
          </div>
        </>
      )}
      {children}
    </div>
  );
};
