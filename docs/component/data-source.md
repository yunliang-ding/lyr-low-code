---
order: 6
title: DataSource 数据源配置
toc: menu
---

## 基本使用

```tsx
/**
 * background: '#f6f7f9'
 */
import React from 'react';
import { DataSource } from 'react-core-form-designer';
import { Button, Form } from 'react-core-form';
import { Space } from 'antd';
import axios from 'axios';

export default () => {
  const [form] = Form.useForm();
  const test = async () => {
    const data = await form.submit();
    const options = {
      url: data.url,
      method: data.method,
      headers: data.headers,
    };
    if (options.method === 'post') {
      options.data = data.params;
    } else {
      options.params = data.params;
    }
    axios(options);
  };
  return (
    <Space direction="vertical">
      <Button spin type="primary" onClick={test}>
        测试
      </Button>
      <DataSource
        form={form}
        initialValues={{
          schemaId: 1,
          createUser: 'dyl',
          modifyUser: 'dyl',
          name: 'userList',
          desc: '用户列表',
          url: 'http://www.abc.net/api/user',
          method: 'post',
          headers: {
            token: '123abc',
          },
          params: { userName: 'dyl' },
        }}
      />
    </Space>
  );
};
```
