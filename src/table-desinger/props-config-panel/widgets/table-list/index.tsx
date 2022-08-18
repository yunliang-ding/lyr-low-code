import { isEmpty, uuid } from '@/util';
import { Button } from 'react-core-form';
import { Input, Space, Table } from 'antd';
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DraggableBodyRow from './draggable-body-row';
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
  focusName?: string;
  openConfirm?: boolean;
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
  focusName = 'title',
  openConfirm = true,
}: TableListProps) => {
  const onCellChange = (v, key, index) => {
    value[index][key] = v;
    onChange([...value]);
  };
  const add = () => {
    value.push(
      focusName === 'title'
        ? {
            width: 200,
            dataIndex: `key_${uuid(4)}`,
          }
        : {},
    );
    onChange([...value]);
  };
  const remove = (index: number) => {
    value.splice(index, 1);
    onChange([...value]);
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = value[dragIndex];
      onChange(
        update(value, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [value],
  );

  return (
    <div className="app-table-list">
      <DndProvider backend={HTML5Backend}>
        <Table
          pagination={false}
          rowKey={rowKey}
          columns={[
            {
              title: '排序',
              dataIndex: 'sort',
              width: 40,
              render: () => (
                <i
                  className="iconfont spicon-caidan"
                  style={{ color: '#666', fontSize: 16, fontWeight: 600 }}
                />
              ),
            },
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
              width: 80,
              render(a, record, index) {
                return (
                  <Space>
                    {[
                      ...actions,
                      {
                        key: 'remove',
                        label: '删除',
                        confirm: openConfirm && {
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
                              if (isEmpty(value[index]?.[focusName])) {
                                return document
                                  .getElementById(
                                    `app-table-list-input-${focusName}-${index}`,
                                  )
                                  ?.focus();
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
          components={{
            body: {
              row: DraggableBodyRow,
            },
          }}
          dataSource={value}
          onRow={(_, index) => {
            const attr = {
              index,
              moveRow,
            };
            return attr as React.HTMLAttributes<any>;
          }}
        />
      </DndProvider>
      <div className="app-table-list-footer">
        <Button {...creatorButtonProps} onClick={add}>
          添加一项
        </Button>
      </div>
    </div>
  );
};
