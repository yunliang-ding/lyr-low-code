import { Button } from 'antd';
import { useDrag } from 'react-dnd';

export default ({ type, props, onClick, widget, column = 2 }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => {
      return {
        type,
        item: {
          // 拖的元素
          dragSchema: {
            type: widget.type,
            label: widget.label,
            name: widget.type,
            span: widget.span === 'fill' ? column : 1,
            props,
            isNew: true, // 新增标识
          },
        },
        collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.5 : 1,
        }),
      };
    },
    [], // 设置依赖
  );
  return (
    <Button ref={dragRef} style={{ opacity }} onClick={onClick}>
      {widget.label || widget.name}
    </Button>
  );
};
