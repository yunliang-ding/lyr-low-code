import { recursionFind } from '@/util';

export const deleteCompent = ({
  itemSchema,
  schema,
  setSelectSchema,
  onSchemaUpdate,
}) => {
  let nextSchema: any = null;
  // 判断是否有父节点
  if (itemSchema.__parentKey__) {
    // 寻找父节点
    const root = recursionFind(schema, itemSchema.__parentKey__);
    if (root) {
      // 删除该节点
      root.props.children = root.props.children?.filter(
        (i) => i.key !== itemSchema.key,
      );
      if (root.props.children?.length === 0) {
        delete root.props.children;
      }
      // 切换到第一个子节点
      nextSchema = root.props.children?.[0] || root || {};
    }
  } else {
    // 删除该节点
    schema = schema.filter((i) => i.key !== itemSchema.key);
    nextSchema = schema[0] || {}; // 切换到第一个
  }
  if (nextSchema) {
    // 不延迟有问题??
    setTimeout(() => {
      setSelectSchema(nextSchema); // 选中
    });
  }
  onSchemaUpdate([...schema]); // 返回组装好schema
};
