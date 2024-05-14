import { copyImg } from '@/util';
import { Message, Radio, Space } from '@arco-design/web-react';
import { IconEdit, IconEmpty, IconEye } from '@arco-design/web-react/icon';
import { Button } from 'lyr-component';
import store from '../store';

export default ({ logo, extra, preview }) => {
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
      <Space style={{ width: 300, justifyContent: 'flex-end' }}>
        {extra}
        {preview && (
          <Button
            type="primary"
            spin
            onClick={async () => {
              await new Promise((res) => {
                setTimeout(res, 600);
              });
              if (store.schema?.length > 0) {
                await copyImg(
                  document.querySelector('.form-canvas .arco-card-body'),
                );
              } else {
                Message.info('暂无模型数据.');
              }
            }}
          >
            一键截图
          </Button>
        )}
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
