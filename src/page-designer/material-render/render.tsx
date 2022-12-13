import { Grid } from 'react-core-form';
import renderMapping from './render-mapping';

export default ({ schema, canvasProps }) => {
  return (
    <Grid column={canvasProps.column}>
      {schema.map((item) => {
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
