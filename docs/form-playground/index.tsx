import React, { useEffect, useState, useRef } from 'react';
import SplitPane from 'react-split-pane';
import { MonacoEditor, getTools } from 'react-core-form-designer';
import { Button, Select } from 'react-core-form';
import { Space, Spin } from 'antd';
import Error from './error';
import initial from './schema/initial';
import basic from './schema/basic';
import async from './schema/async';
import effect from './schema/effect';
import './index.less';

const SchemaMapping = {
  initial,
  basic,
  async,
  effect,
};

export default () => {
  const { babelParse } = getTools();
  const tempCode: any = useRef({});
  const editorMonacoRef: any = useRef({});
  const [code, setCode] = useState('export default {}');
  const [template, setTemplate] = useState('initial');
  const [iframeSpin, setIframeSpin] = useState(true);
  const [errorInfo, setErrorInfo]: any = useState(false);
  useEffect(() => {
    setIframeSpin(true);
    setErrorInfo(false);
    tempCode.current.value = code;
    setIframeSpin(true); // 开始解析
    /** 本地存储一份在demo中需要 */
    localStorage.setItem('react-hooks-code', code);
  }, [code]);
  // 运行代码
  const runCode = async () => {
    try {
      babelParse(tempCode.current.value, ''); // 检查代码是否有报错
      setErrorInfo(false);
      setCode(tempCode.current.value);
    } catch (error) {
      setErrorInfo(String(error));
    }
  };
  useEffect(() => {
    const escode = SchemaMapping[template];
    editorMonacoRef.current.setValue(escode);
    setCode(escode);
  }, [template]);
  // Playground 入口
  useEffect(() => {
    const schema = new URLSearchParams(location.hash.split('?')[1]).get(
      'schema',
    );
    if (schema) {
      const escode = decodeURIComponent(schema);
      editorMonacoRef.current.setValue(escode);
      setCode(escode);
    }
  }, []);
  return (
    <div className="core-form-playground">
      <div className="core-form-playground-header">
        <Space>
          <Select
            style={{ width: 120 }}
            defaultValue="initial"
            onChange={setTemplate}
            dropdownClassName="app-playground-select"
            options={[
              {
                label: '默认模版',
                value: 'initial',
              },
              {
                label: '基础表单',
                value: 'basic',
              },
              {
                label: '异步选择器',
                value: 'async',
              },
              {
                label: '联动表单',
                value: 'effect',
              },
            ]}
          />
          <Button spin onClick={runCode} type="primary">
            <i className="iconfont spicon-shouqikuaijin" />
            运行
          </Button>
        </Space>
      </div>
      <div className="playground-split">
        <SplitPane
          split="vertical"
          defaultSize={'50%'}
          minSize={400}
          onDragStarted={() => (document.body.style.cursor = 'col-resize')}
          onDragFinished={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          <div className="playground-split-left">
            <MonacoEditor
              style={{
                width: '50vw',
                height: 'calc(100vh - 44px)',
              }}
              value={''}
              editorMonacoRef={editorMonacoRef}
              onSave={runCode}
              onChange={(value) => {
                tempCode.current.value = value;
              }}
            />
          </div>
          <div className="playground-split-right">
            {iframeSpin && (
              <div className="playground-iframe-loading">
                <Spin spinning></Spin>
              </div>
            )}
            {errorInfo && <Error error={errorInfo} />}
            <iframe
              src="#/~demos/iframe-demo"
              key={code}
              onLoad={() => {
                setIframeSpin(false);
              }}
            />
          </div>
        </SplitPane>
      </div>
    </div>
  );
};
