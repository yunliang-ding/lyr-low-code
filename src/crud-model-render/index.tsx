/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useEffect, useState } from 'react';
import { Table, CardForm } from 'react-core-form';
import { queryModelBySchemaId, registerGlobalApi } from './util';
import { decode } from '@/util';
import axios from 'axios';
import { Result } from 'antd';

export const axiosInstance = axios.create({
  baseURL: 'http://121.4.49.147:8360',
  withCredentials: true,
  headers: {
    appId: 1,
  },
});

interface CrudModelRenderProps {
  schemaId: string;
  loadingText?: ReactNode;
  baseURL?: string;
  require?: any;
}

/** 渲染模型 */
const CrudModelRender = ({
  schemaId,
  loadingText = 'loading...',
  require,
}: CrudModelRenderProps) => {
  const [standRes, setStandRes]: any = useState({
    type: 'form',
    schema: {},
  });
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        /** 注册Api */
        const {
          data: { code, data, msg },
        } = await axiosInstance.get(`/crud/detail?id=${schemaId}`);
        if (code === 200) {
          // 注册接口服务
          if (data.services) {
            registerGlobalApi(decode(data.services), require);
          }
          /** 解析模型 */
          const res = await queryModelBySchemaId(schemaId, data);
          setStandRes(res);
        } else {
          setStandRes({
            type: 'error',
            msg,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    })();
  }, []);
  if (spin) {
    return loadingText;
  }
  if (standRes.type === 'form') {
    return <CardForm {...standRes.schema} />;
  } else if (standRes.type === 'table') {
    return <Table {...standRes.schema} />;
  } else if (standRes.type === 'error') {
    return <Result status="403" title="403" subTitle={standRes.msg} />;
  }
  return null;
};

CrudModelRender.queryModelBySchemaId = queryModelBySchemaId;
CrudModelRender.registerGlobalApi = registerGlobalApi;

export default CrudModelRender;
