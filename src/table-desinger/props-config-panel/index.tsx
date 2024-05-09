import { useState } from 'react';
import store from '../store';
import ItemPropsConfig from './config/props-item';
import FormPropsConfig from './config/props-form';
import TablePropsConfig from './config/props-table';
import CellPropsConfig from './config/props-table-cell';
import PropsSearchPanel from './props-search-panel';
import PropsTablePanel from './props-table-panel';
import debounce from 'lodash.debounce';
import { Empty } from '@arco-design/web-react';
import { isEmpty } from '@/util';

export interface PropsConfigPanelTypes {
  style?: any; //
  /** 设置防抖时间 */
  debounceTime?: number;
  /** 选择模型 */
  selectModelOptions?: () => Promise<[]>;
}

export default ({
  style = {},
  debounceTime = 100,
  selectModelOptions = async () => [],
}: PropsConfigPanelTypes) => {
  const { formProps, columns, tableProps, selectTable, schema, selectedKey } =
    store.useSnapshot(); // 拿到ctx
  const [compontentType, setCompontentType]: any = useState('表单项属性');
  const [tableType, setTableType]: any = useState('表格属性');
  const { propsConfig, selectedSchema } = store.getPropsConfig();
  /** 防抖0.1s */
  const onFormValuesChange = debounce((_, values) => {
    store.formProps = values;
  }, debounceTime);
  /** 防抖0.1s */
  const onItemValuesChange = debounce((value) => {
    Object.assign(selectedSchema, value);
    store.schema = [...store.schema];
  }, debounceTime);
  /** 防抖0.1s */
  const onWidgetValuesChange = debounce((value) => {
    Object.assign(selectedSchema.props, value);
    store.schema = [...store.schema];
  }, debounceTime);
  /** 防抖0.1s */
  const onTableValuesChange = debounce((v, values) => {
    store.tableProps = values;
  }, debounceTime);
  /** 防抖0.1s */
  const onCellValuesChange = debounce((v, values) => {
    store.columns = values.columns;
  }, debounceTime);
  const PanelRender = selectTable ? (
    <PropsTablePanel
      {...{
        tableType,
        setTableType,
        tablePropsConfig: TablePropsConfig({ selectModelOptions }),
        onTableValuesChange,
        cellPropsConfig: CellPropsConfig,
        onCellValuesChange,
        tableProps,
        columns,
      }}
    />
  ) : isEmpty(selectedKey) ? (
    <Empty
      description="请选择需要设置的表单项"
      className="props-config-panel-empty"
    />
  ) : (
    <PropsSearchPanel
      {...{
        setCompontentType,
        compontentType,
        FormPropsConfig,
        onFormValuesChange,
        ItemPropsConfig,
        onItemValuesChange,
        propsConfig,
        onWidgetValuesChange,
        formProps,
        schema,
        selectedSchema,
      }}
    />
  );
  return (
    <div className="props-config-panel" style={style} key={selectedKey}>
      {PanelRender}
    </div>
  );
};
