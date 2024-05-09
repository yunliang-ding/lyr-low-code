import { Button, Radio, Space } from '@arco-design/web-react';
import { IconEdit, IconEmpty, IconEye } from '@arco-design/web-react/icon';
import store from '../store';

export default ({ logo, extra }) => {
  return (
    <>
      {logo}
      <Radio.Group
        defaultValue={1}
        onChange={(v) => {
          store.preview = v === 2;
        }}
        options={[
          {
            label: (
              <Space>
                <IconEdit />
                <span>编辑</span>
              </Space>
            ),
            value: 1,
          },
          {
            label: (
              <Space>
                <IconEye />
                <span>预览</span>
              </Space>
            ),
            value: 2,
          },
        ]}
        type="button"
      />
      <Space>
        {extra}
        <Button
          type="primary"
          icon={<IconEmpty />}
          onClick={() => {
            store.schema = undefined;
            store.selectedKey = undefined;
          }}
        >
          清空
        </Button>
      </Space>
    </>
  );
};
