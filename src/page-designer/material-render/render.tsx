import renderMapping from './render-mapping';

export default ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {children.map((item) => {
        // 控制是否渲染逻辑
        if (item.props.visible?.() === false) {
          return null;
        }
        const Comp = renderMapping[item.type] || (() => null);
        return (
          <div
            style={{
              gridColumnStart: `span ${item.props.span || 1}`,
            }}
          >
            <Comp {...item.props} />
          </div>
        );
      })}
    </div>
  );
};
