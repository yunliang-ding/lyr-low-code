import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'react-core-form';

export default ({
  header: { title = '', breadcrumb = [], extra = [] },
  tabList = [],
  children = null,
  onTabChange = () => {},
}: any) => {
  return (
    <PageContainer
      header={{
        title,
        breadcrumb: {
          routes: breadcrumb,
        },
        extra: extra.map((btn) => {
          return (
            <Button {...btn} key={btn.label}>
              {btn.label}
            </Button>
          );
        }),
      }}
      tabList={tabList}
      onTabChange={onTabChange}
    >
      {children}
    </PageContainer>
  );
};
