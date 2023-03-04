import { uuid } from '@/util';
import { useEffect, useRef, CSSProperties } from 'react';
import './index.less';

export interface MonacoProps {
  id?: string;
  /** 语言设置 */
  language?: string;
  /** 默认值 */
  value: string;
  /** 主题 */
  theme?: 'vs-dark' | 'vs';
  /** 是否展示小地图 */
  minimap?: any;
  /** 容器样式 */
  style?: CSSProperties;
  /** onChange 钩子 */
  onChange?: Function;
  /** ctrl + s 钩子 */
  onSave?: Function;
  /** monaco 实例引用 */
  editorMonacoRef?: any;
}
/**
 * 编辑器
 */
export default ({
  id = `monaco-container-${uuid(8)}`,
  value = '',
  onChange = () => {},
  onSave = () => {},
  style = {},
  language = 'javascript',
  theme = 'vs-dark',
  editorMonacoRef = useRef<any>({}),
  ...rest
}: MonacoProps) => {
  // 加载资源
  useEffect(() => {
    const _require: any = (window as any).require;
    if (_require) {
      _require.config({
        paths: {
          vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.36.0/min/vs',
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
  return <div id={id} className="app-monaco-editor" style={style} />;
};
