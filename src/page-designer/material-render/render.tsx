import { Grid } from 'react-core-form';
import PageContainer from './page-container';
import renderMapping from './render-mapping';

export default ({ schema, pageProps }) => {
  return (
    <PageContainer {...pageProps}>
      <Grid column={pageProps.column}>
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
    </PageContainer>
  );
};
