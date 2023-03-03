/* eslint-disable no-bitwise */
import { uuid } from '@/util';
import { useEffect, useRef, CSSProperties } from 'react';
import './index.less';

export interface MonacoProps {
  language?: string;
  value: string;
  originalValue?: string;
  theme?: 'vs-dark' | 'vs';
  style?: CSSProperties;
  onChange?: Function;
  onSave?: Function;
  reload?: any;
  options?: any;
  className?: string;
  onMount?: Function;
  editorMonacoRef?: any;
  id?: string;
  mode?: 'nomal' | 'diff';
  renderSideBySide?: boolean;
  cdnPath: string;
}
/**
 * 编辑器
 */
export default ({
  id = `monaco-container-${uuid(8)}`,
  value = '',
  onChange = () => {},
  onSave = () => {},
  style = {
    width: 800,
    height: 400,
  },
  language = 'javascript',
  theme = 'vs-dark',
  editorMonacoRef = useRef<any>({}),
  options = {},
  cdnPath = 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.36.0/min/vs',
  ...rest
}: MonacoProps) => {
  // 加载资源
  useEffect(() => {
    if (cdnPath) {
      const _require: any = (window as any).require;
      _require.config({
        paths: {
          vs: cdnPath,
        },
      });
      _require(['vs/editor/editor.main'], () => {
        const _monaco: any = (window as any).monaco;
        const monacoInstance = _monaco.editor.create(
          document.getElementById(id),
          {
            language,
            selectOnLineNumbers: true,
            automaticLayout: true,
            tabSize: 2,
            fontSize: 14,
            theme,
            fontWeight: '400',
            minimap: {
              enabled: true,
            },
            value,
            ...options,
            ...rest,
          },
        );
        // ctrl + s 执行 onSave
        monacoInstance.addCommand(
          _monaco.KeyMod.CtrlCmd | _monaco.KeyCode.KeyS,
          () => {
            const code = monacoInstance.getValue();
            onSave(code);
          },
        );
        // onChange
        monacoInstance.onDidChangeModelContent((e) => {
          const code = monacoInstance.getValue();
          if (!e.isFlush) {
            onChange(code);
          }
        });
        editorMonacoRef.current = monacoInstance; // 挂到ref
      });
    }
  }, []);
  return cdnPath ? (
    <div id={id} className="app-monaco-editor" style={style} />
  ) : null;
};
