import { Breadcrumb, Descriptions, Tabs } from 'antd';
import { useEffect } from 'react';
import { Button } from 'react-core-form';
import './index.less';

const $ = document.querySelector.bind(document);

export default ({
  title = () => null,
  breadcrumb = [],
  extra = [],
  descriptions = [],
  tabList = [],
  children = null,
  activeKey,
  onTabChange = () => {},
  footer = {},
}: any) => {
  useEffect(() => {
    const { height } = $(
      '.page-container-wapper-header',
    )?.getBoundingClientRect();
    $('.page-container-wapper-children').style.height = `calc(100% - ${
      height + (footer.length > 0 ? 50 : 0)
    }px)`;
  }, [children]);
  return (
    <div className="page-container-wapper">
      <div className="page-container-wapper-header">
        {breadcrumb.length > 0 && (
          <div className="page-container-wapper-breadcrumb">
            <Breadcrumb>
              {breadcrumb?.map((item) => {
                return (
                  <Breadcrumb.Item
                    key={item.label}
                    onClick={() => {
                      console.log(item.value);
                    }}
                  >
                    {item.label}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
        )}
        <div className="page-container-wapper-title">
          <div className="page-container-wapper-title-text">{title()}</div>
          <div className="page-container-wapper-title-extra">
            {extra.map((btn) => {
              return (
                <Button {...btn} key={btn.label}>
                  {btn.label}
                </Button>
              );
            })}
          </div>
        </div>
        {descriptions.length > 0 && (
          <div className="page-container-wapper-descriptions">
            <Descriptions>
              {descriptions.map((item) => {
                return (
                  <Descriptions.Item label={item.label} key={item.label}>
                    {item.value}
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </div>
        )}
        {tabList.length > 0 && (
          <div className="page-container-wapper-tabs">
            <Tabs onTabClick={onTabChange} activeKey={activeKey}>
              {tabList.map((item) => {
                return <Tabs.TabPane tab={item.label} key={item.value} />;
              })}
            </Tabs>
          </div>
        )}
      </div>
      <div className="page-container-wapper-children">{children}</div>
      {footer.length > 0 && (
        <div className="page-container-wapper-footer">
          {footer.map((btn) => {
            return (
              <Button {...btn} key={btn.label}>
                {btn.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};
