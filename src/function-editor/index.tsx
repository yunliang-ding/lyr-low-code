/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import MonacoEditor from '@/monaco-editor';
import { babelParse } from '@/tools';
import { decrypt, encrypt, uuid } from '@/util';
import { debounce, isEmpty } from 'lodash';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import './index.less';

interface FunctionEditorProps {
  value: string;
  onChange: Function;
  name?: string;
  style?: CSSProperties;
  prefix?: string;
  /**
   * 是否需要解码
   * @default true
   */
  useEncrypt?: boolean;
  /**
   * 默认代码段
   * @efault () => {}
   */
  defaultCode?: string;
  /**
   * 没有改变代码自动设置为 undefined
   * @efault false
   */
  noChangeClearCode?: boolean;
  functionRef?: any;
}
export default ({
  value,
  onChange = () => {},
  name = uuid(10),
  style = { height: 300, width: 360 },
  prefix,
  useEncrypt = true,
  defaultCode = '() => {}',
  noChangeClearCode = false,
  functionRef = useRef({}),
}: FunctionEditorProps) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    functionRef.current = {
      getModuleDefault: () => {
        return babelParse(
          decrypt(value, false), // 解码
          prefix,
          undefined,
        );
      },
      getModule: () => {
        return babelParse(
          decrypt(value, false), // 解码
          prefix,
          undefined,
          false,
        );
      },
    };
  }, []);
  return (
    <div
      className={fullScreen ? 'function_data_box_full' : 'function_data_box'}
      style={style}
    >
      {errorInfo && <div className="function_data_error_info">{errorInfo}</div>}
      <div className="function_data_box_full_screen">
        <i
          className={
            fullScreen
              ? 'iconfont spicon-fullscreen-exit'
              : 'iconfont spicon-fullscreen'
          }
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        />
      </div>
      <MemoMonaco
        value={value}
        onChange={onChange}
        name={name}
        setErrorInfo={setErrorInfo}
        prefix={prefix}
        useEncrypt={useEncrypt}
        defaultCode={defaultCode}
        noChangeClearCode={noChangeClearCode}
      />
    </div>
  );
};

const MemoMonaco = memo(
  ({
    value,
    name,
    onChange,
    setErrorInfo,
    prefix,
    useEncrypt,
    defaultCode,
    noChangeClearCode,
  }: any) => {
    const monacoRef: any = useRef({});
    return (
      <MonacoEditor
        id={`bind-function_${name}`}
        value={value ? decrypt(value, false) : defaultCode}
        editorMonacoRef={monacoRef}
        options={{
          theme: 'vs-dark',
          minimap: {
            enabled: false,
          },
        }}
        onChange={debounce(async (codeString) => {
          try {
            if (
              isEmpty(codeString) ||
              (codeString === defaultCode && noChangeClearCode)
            ) {
              return onChange(undefined);
            }
            await new Promise((res) => setTimeout(res, 1000));
            babelParse(codeString, prefix);
            onChange(useEncrypt ? encrypt(codeString) : codeString);
            setErrorInfo('');
          } catch (error) {
            setErrorInfo(error.toString());
          }
        }, 300)}
      />
    );
  },
  () => {
    return true;
  },
);
