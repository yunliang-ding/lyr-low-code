/* eslint-disable react-hooks/rules-of-hooks */
import { ReactNode, useEffect, useState } from 'react';
import { Table, CardForm } from 'react-core-form';
import { queryModelBySchemaId, registerGlobalApi } from './util';
import axios from 'axios';

interface CrudModelRenderProps {
  schemaId: string;
  loadingText?: ReactNode;
  baseURL?: string;
}

/** 渲染模型 */
const CrudModelRender = ({
  schemaId,
  loadingText = 'loading...',
  baseURL = 'https://yl.server.net',
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
          data: { code, data },
        } = await axios.post(`${baseURL}/crud-model/selectSource`, {
          schemaId,
        });
        if (code === 200) {
          registerGlobalApi(data);
        }
        /** 解析模型 */
        const res = await queryModelBySchemaId(schemaId, baseURL);
        setStandRes(res);
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
  if (standRes.type === 1) {
    return <CardForm {...standRes.schema} />;
  } else if (standRes.type === 2) {
    return <Table {...standRes.schema} />;
  }
  return null;
};

CrudModelRender.queryModelBySchemaId = queryModelBySchemaId;
CrudModelRender.registerGlobalApi = registerGlobalApi;

export default CrudModelRender;
