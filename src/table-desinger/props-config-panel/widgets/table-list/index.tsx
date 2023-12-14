/* eslint-disable max-len */
import { isEmpty, uuid } from '@/util';
import { Button } from 'react-core-form';
import { Input, Message, Space, Table } from '@arco-design/web-react';
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import DraggableBodyRow from './draggable-body-row';
import './index.css';

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
    if (value.length === 1) {
      return Message.info('至少保留一项');
    }
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
              title: '',
              dataIndex: 'sort',
              width: 40,
              render: () => (
                <svg viewBox="0 0 1024 1024" width="22" height="22">
                  <path
                    d="M199.68 300.032m-49.152 0a4.8 4.8 0 1 0 98.304 0 4.8 4.8 0 1 0-98.304 0Z"
                    fill="#707070"
                  />
                  <path
                    d="M402.432 343.04 829.44 343.04c23.552 0 44.032-19.456 44.032-44.032S852.992 256 829.44 256L402.432 256c-23.552 0-44.032 19.456-44.032 44.032S377.856 343.04 402.432 343.04z"
                    fill="#707070"
                  />
                  <path
                    d="M199.68 512m-49.152 0a4.8 4.8 0 1 0 98.304 0 4.8 4.8 0 1 0-98.304 0Z"
                    fill="#707070"
                  />
                  <path
                    d="M829.44 468.992 402.432 468.992c-23.552 0-44.032 19.456-44.032 44.032s19.456 44.032 44.032 44.032L829.44 557.056c23.552 0 44.032-19.456 44.032-44.032S852.992 468.992 829.44 468.992z"
                    fill="#707070"
                  />
                  <path
                    d="M199.68 724.992m-49.152 0a4.8 4.8 0 1 0 98.304 0 4.8 4.8 0 1 0-98.304 0Z"
                    fill="#707070"
                  />
                  <path
                    d="M829.44 680.96 402.432 680.96c-23.552 0-44.032 19.456-44.032 44.032s19.456 44.032 44.032 44.032L829.44 769.024c23.552 0 44.032-19.456 44.032-44.032S852.992 680.96 829.44 680.96z"
                    fill="#707070"
                  />
                </svg>
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
                      onChange={(v) => {
                        onCellChange(v, item.dataIndex, index);
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
                          type="text"
                          key={item.key}
                          style={{ padding: '0 6px' }}
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
          data={value}
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
