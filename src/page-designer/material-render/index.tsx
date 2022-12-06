import DragContainer from '@/form-designer/form-canvas/drag';
import { useContext } from 'react';
import { Ctx } from '../store';

export default ({ schema, accept }) => {
  const ctx: any = useContext(Ctx); // 拿到ctx
  return (
    <>
      {schema.map((item) => {
        return (
          <DragContainer
            key={item.key}
            accept={accept}
            itemSchema={item}
            schema={ctx.schema}
            selected={ctx.selectItem.key === item.key} // 是否选中
            onSchemaUpdate={(schema) => {
              ctx.setSchema(schema);
            }}
            setSelectSchema={(i: any) => {
              ctx.setSelectItem({ ...i });
            }}
          >
            render-is-{item.label}
          </DragContainer>
        );
      })}
    </>
  );
};
