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
import { DataSource, getTools } from 'react-core-form-designer';
import { Button, Form } from 'react-core-form';
import { Space } from 'antd';
import axios from 'axios';

export default () => {
  const [form] = Form.useForm();
  const { babelParse } = getTools();
  const runApi = async () => {
    const data = await form.submit();
    axios(babelParse(data.axiosConfig, ''));
  };
  return (
    <Space direction="vertical">
      <Button spin type="primary" onClick={runApi}>
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
          axiosConfig: `export default {
  url: 'http://www.baidu.com/api/demo',
  method: 'post',
  headers: {
    token: 'sdsdsd3wewewe',
  },
  data: {
    userName: 'test',
  },
  timeout: 1000,
  withCredentials: true,
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l',
    },
  },
}`,
        }}
      />
    </Space>
  );
};
```
