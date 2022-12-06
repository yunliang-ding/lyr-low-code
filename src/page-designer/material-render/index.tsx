import DragContainer from '@/form-designer/form-canvas/drag';
import renderMapping from './render-mapping';

export default ({ accept, ctx }) => {
  return (
    <>
      {ctx.schema.map((item) => {
        const Comp = renderMapping[item.type] || (() => null);
        return (
          <div
            style={{
              width: item.props.width ? item.props.width + '%' : '100%',
            }}
          >
            <DragContainer
              key={item.key}
              accept={accept}
              itemSchema={item}
              schema={ctx.schema}
              selected={ctx.selectItem.key === item.key} // 是否选中
              onSchemaUpdate={(schema) => {
                ctx.setSchema([...schema]);
              }}
              setSelectSchema={(i: any) => {
                ctx.setSelectItem({ ...i });
              }}
            >
              <Comp {...item.props}>{item.props.text}</Comp>
            </DragContainer>
          </div>
        );
      })}
    </>
  );
};