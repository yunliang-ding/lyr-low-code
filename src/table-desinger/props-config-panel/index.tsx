import { useState } from 'react';
import { recursionFind } from '@/util';
import ItemPropsConfig from './item.props.config';
import FormPropsConfig from './form.props.config';
import TablePropsConfig from './table.props.config';
import CellPropsConfig from './table.cell.props.config';
import SearchFormPropsConfig from './search-form-props-config';
import SearchTablePropsConfig from './search-table-props-config';
import debounce from 'lodash.debounce';
import store from '../store';

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
  const {
    formProps,
    columns,
    tableProps,
    selectTable,
    schema,
    selectedSchema,
  } = store.useSnapshot(); // 拿到ctx
  const [compontentType, setCompontentType]: any = useState('表单项属性');
  const [tableType, setTableType]: any = useState('表格属性');
  const propsConfig = selectedSchema?.propsConfig;
  const onPropsConfigUpdate = (values, type) => {
    if (type === 'item') {
      // 更新 selectSchema
      store.selectedSchema = { ...store.selectedSchema, ...values };
    }
    if (type === 'widget') {
      // 更新 schemaProps
      store.selectedSchema = {
        ...store.selectedSchema,
        props: {
          ...store.selectedSchema.props,
          ...values,
        },
      };
    }
    // 更新 schema
    const newSchema = recursionFind(schema, selectedSchema.key);
    Object.assign(newSchema, store.selectedSchema);
    store.schema = [...store.schema];
  };
  /** 防抖0.1s */
  const onFormValuesChange = debounce((_, values) => {
    store.formProps = { ...values };
    onPropsConfigUpdate(values, 'form');
  }, debounceTime);
  /** 防抖0.1s */
  const onItemValuesChange = debounce((_, values) => {
    onPropsConfigUpdate({ ...values }, 'item');
  }, debounceTime);
  /** 防抖0.1s */
  const onWidgetValuesChange = debounce((_, values) => {
    onPropsConfigUpdate({ ...values }, 'widget');
  }, debounceTime);
  /** 防抖0.1s */
  const onTableValuesChange = debounce((v, values) => {
    // 子表单需要过滤一下
    values.tools = values.tools.filter((i) => i?.label);
    values.menus = values.menus.filter((i) => i?.label);
    store.tableProps = { ...values };
  }, debounceTime);
  /** 防抖0.1s */
  const onCellValuesChange = debounce((v, values) => {
    store.columns = [...values.columns];
  }, debounceTime);
  const PanelRender = selectTable ? (
    <SearchTablePropsConfig
      {...{
        tableType,
        setTableType,
        TablePropsConfig: TablePropsConfig({ selectModelOptions }),
        onTableValuesChange,
        CellPropsConfig,
        onCellValuesChange,
        tableProps,
        columns,
      }}
    />
  ) : (
    <SearchFormPropsConfig
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
    <div className="props-config-panel" style={style} key={selectedSchema?.key}>
      {PanelRender}
    </div>
  );
};
