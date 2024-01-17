/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { Table, CardForm } from 'lyr-design';
import { queryModelBySchemaId, registerGlobalApi } from './util';
import { isEmpty } from '@/util';
import { Empty, Result } from '@arco-design/web-react';
import PageRender from '@/page-designer/material-render';
import { decode } from 'lyr-extra';

let axiosInstance = null;

export const getAxiosInstance = () => axiosInstance;

const setAxiosInstance = ({ baseURL }) => {
  axiosInstance = axios.create({
    baseURL,
    headers: {
      token: localStorage.getItem('token'),
    },
  });
};

interface CrudModelRenderProps {
  /** 应用Id */
  baseURL?: string;
  /** 模型Id */
  schemaId: string;
  /** 加载提示 */
  loadingText?: ReactNode;
  /** 注入模型依赖 */
  require?: any;
}

/** 渲染模型 */
const CrudModelRender = ({
  schemaId,
  loadingText = 'loading...',
  require,
  baseURL = 'https://dev-ops.yunliang.cloud',
}: CrudModelRenderProps): any => {
  if (isEmpty(schemaId)) {
    return <Empty description="缺少模型ID" />;
  }
  // 绑定应用
  setAxiosInstance({
    baseURL,
  });
  const [standRes, setStandRes]: any = useState({
    type: 'form',
    schema: {},
  });
  const [spin, setSpin] = useState(true);
  useEffect(() => {
    if (schemaId) {
      (async () => {
        try {
          /** 注册Api */
          const {
            data: { code, data, msg },
          } = await getAxiosInstance().get(`/crud/detail?id=${schemaId}`);
          if (code === 200) {
            if (isEmpty(data)) {
              return setStandRes({
                type: 'error',
                msg: '不存在该模型',
              });
            }
            // 注册接口服务
            registerGlobalApi(data.services && decode(data.services), require);
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
          setStandRes({
            type: 'error',
            msg: String(error),
          });
        } finally {
          setSpin(false);
        }
      })();
    }
  }, [schemaId]);
  if (spin) {
    return loadingText;
  }
  if (standRes.type === 'form') {
    return <CardForm {...standRes.schema} />;
  } else if (standRes.type === 'table') {
    return <Table {...standRes.schema} />;
  } else if (standRes.type === 'page') {
    return <PageRender schema={standRes.schema} />;
  } else if (standRes.type === 'error') {
    return <Result status="error" title={standRes.msg} />;
  }
  return null;
};

CrudModelRender.queryModelBySchemaId = queryModelBySchemaId;
CrudModelRender.registerGlobalApi = registerGlobalApi;

export default CrudModelRender;
