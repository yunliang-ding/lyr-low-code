import { IconClose } from '@arco-design/web-react/icon';
import store from '../store';

export default () => {
  return (
    <div className="form-designer-absolute-panel form-designer-data-source">
      <div className="panel-header">
        <span className="panel-title">配置数据源</span>
        <IconClose
          className="icon-close"
          onClick={() => {
            store.activeBar = undefined;
          }}
        />
      </div>
      <div className="panel-body">设计中...</div>
    </div>
  );
};
