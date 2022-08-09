/* eslint-disable react-hooks/rules-of-hooks */
import { isEmpty, uuid } from '@/util';
import { Button } from 'react-core-form';
import { Input, Space, Table } from 'antd';
import './index.less';

export interface TableListProps {
  rowKey?: string;
  value?: any;
  onChange?: (value) => any;
  columns?: any[];
  actions?: {
    key: string;
    label: string;
    confirm?: any;
    onClick: (item, onCellChange?) => {};
  }[];
  creatorButtonProps?: any;
}

export default ({
  rowKey = 'id',
  columns,
  value = [],
  onChange = () => {},
  actions = [],
  creatorButtonProps = {
    type: 'primary',
  },
}: TableListProps) => {
  const onCellChange = (v, key, index) => {
    value[index][key] = v;
    onChange([...value]);
  };
  const add = () => {
    value.push({
      width: 200,
      dataIndex: `key_${uuid(4)}`,
    });
    onChange([...value]);
  };
  const remove = (index: number) => {
    value.splice(index, 1);
    onChange([...value]);
  };
  return (
    <div className="app-table-list">
      <Table
        pagination={false}
        rowKey={rowKey}
        columns={[
          ...columns.map((item) => {
            return {
              ...item,
              width: 100,
              render(e, record, index) {
                return (
                  <Input
                    placeholder="请输入"
                    allowClear
                    id={`app-table-list-input-${item.dataIndex}-${index}`}
                    value={e}
                    onChange={({ target }) => {
                      onCellChange(target.value, item.dataIndex, index);
                    }}
                  />
                );
              },
            };
          }),
          {
            title: '操作',
            dataIndex: 'actions',
            width: 100,
            render(a, record, index) {
              return (
                <Space>
                  {[
                    ...actions,
                    {
                      key: 'remove',
                      label: '删除',
                      confirm: {
                        title: '提示',
                        content: '是否确认删除',
                      },
                      onClick: () => {
                        remove(index);
                      },
                    },
                  ].map((item) => {
                    return (
                      <Button
                        type="link"
                        key={item.key}
                        confirm={item.confirm}
                        onClick={() => {
                          if (item.key !== 'remove') {
                            if (isEmpty(value[index].title)) {
                              return document
                                .getElementById(
                                  `app-table-list-input-title-${index}`,
                                )
                                .focus();
                            }
                          }
                          item.onClick?.(record, (v, key) => {
                            onCellChange(v, key, index);
                          });
                        }}
                        style={{ paddingLeft: 0 }}
                      >
                        {item.label}
                      </Button>
                    );
                  })}
                </Space>
              );
            },
          },
        ]}
        dataSource={value}
      />
      <div className="app-table-list-footer">
        <Button {...creatorButtonProps} onClick={add}>
          添加一项
        </Button>
      </div>
    </div>
  );
};
