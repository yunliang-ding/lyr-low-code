import { Grid } from 'react-core-form';
import renderMapping from './render-mapping';

export default ({ pageProps, children }) => {
  return (
    <Grid column={pageProps.column}>
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
    </Grid>
  );
};
