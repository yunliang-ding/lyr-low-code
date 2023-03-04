/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import CodeEditor from '@/code-editor';
import { babelParse } from '@/tools';
import { decrypt, encrypt, uuid } from '@/util';
import { debounce, isEmpty } from 'lodash';
import { CSSProperties, memo, useEffect, useRef, useState } from 'react';
import './index.less';

interface FunctionEditorProps {
  /** es6 module 代码片段 */
  value: string;
  /** 改变钩子 */
  onChange: Function;
  /** name */
  name?: string;
  /** 主容器样式 */
  style?: CSSProperties;
  /**
   * 配置解析前缀
   * @default 不配置默认加上 export default 前缀
   */
  prefix?: string;
  /**
   * 是否需要解码
   * @default true
   */
  useEncrypt?: boolean;
  /**
   * 默认代码段
   * @default () => {}
   */
  defaultCode?: string;
  /**
   * 没有改变代码自动设置为 undefined
   * @default false
   */
  noChangeClearCode?: boolean;
  /** ref 引用 */
  functionRef?: any;
  /** 配置第三方依赖 */
  require?: any;
  /**
   * 设置防抖时间(ms)
   * @default 300
   */
  debounceTime?: number;
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
  require,
  debounceTime = 300,
}: FunctionEditorProps) => {
  const [errorInfo, setErrorInfo] = useState('');
  const [fullScreen, setFullScreen] = useState(false);
  const valueRef = useRef(value);
  useEffect(() => {
    functionRef.current = {
      getModuleDefault: () => {
        return babelParse({
          code: decrypt(valueRef.current, false), // 解码
          prefix,
          require,
        });
      },
      getModule: () => {
        return babelParse({
          code: decrypt(valueRef.current, false), // 解码
          prefix,
          exportDefault: false,
          require,
        });
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
      <MemoCode
        value={value}
        onChange={(v) => {
          valueRef.current = v; // 同步文本
          onChange(v);
        }}
        setErrorInfo={setErrorInfo}
        prefix={prefix}
        useEncrypt={useEncrypt}
        defaultCode={defaultCode}
        noChangeClearCode={noChangeClearCode}
        require={require}
        debounceTime={debounceTime}
      />
    </div>
  );
};

const MemoCode = memo(
  ({
    value,
    onChange,
    setErrorInfo,
    prefix,
    useEncrypt,
    defaultCode,
    noChangeClearCode,
    require,
    debounceTime,
  }: any) => {
    const codeRef: any = useRef({});
    return (
      <CodeEditor
        value={value ? decrypt(value, false) : defaultCode}
        codeRef={codeRef}
        minimap={{
          enabled: false,
        }}
        onChange={debounce(async (codeString) => {
          try {
            if (
              isEmpty(codeString) ||
              (codeString === defaultCode && noChangeClearCode)
            ) {
              setErrorInfo('');
              return onChange(undefined);
            }
            await new Promise((res) => setTimeout(res, 1000));
            babelParse({
              code: codeString,
              prefix,
              require,
            });
            onChange(useEncrypt ? encrypt(codeString) : codeString);
            setErrorInfo('');
          } catch (error) {
            setErrorInfo(error.toString());
          }
        }, debounceTime)}
      />
    );
  },
  () => {
    return true;
  },
);
