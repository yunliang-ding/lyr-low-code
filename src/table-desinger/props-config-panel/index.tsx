import { useContext, useState } from 'react';
import { Empty } from 'antd';
import { isEmpty, recursionFind } from '@/util';
import { TableList } from './widgets';
import { Ctx } from '@/table-desinger/store';
import ItemPropsConfig from './item.props.config';
import FormPropsConfig from './form.props.config';
import TablePropsConfig from './table.props.config';
import CellPropsConfig from './table.cell.props.config';
import SearchFormPropsConfig from './search-form-props-config';
import SearchTablePropsConfig from './search-table-props-config';
import { debounce } from 'lodash';
import './index.less';

export interface PropsConfigPanelTypes {
  props: any; // 组件描述
  propsConfig: Array<any>; // 属性配置
  onPropsConfigUpdate: Function; // 配置改变返回新的配置
  style?: any; //
  /** 设置防抖时间 */
  debounceTime?: number;
  /** 选择模型 */
  selectModelOptions?: () => Promise<[]>;
}

export default ({
  props = {},
  propsConfig = [],
  style = {},
  onPropsConfigUpdate = () => {},
  debounceTime = 100,
  selectModelOptions = async () => [],
}: PropsConfigPanelTypes) => {
  const ctx: any = useContext(Ctx); // 拿到ctx
  const [compontentType, setCompontentType]: any = useState('表单项属性');
  const [tableType, setTableType]: any = useState('表格属性');
  if (!isEmpty(props)) {
    ctx.selectSchema = {
      props,
    };
  } else if (ctx.selectSchema && ctx.widgets) {
    propsConfig = ctx.widgets.__originalConfig__?.find(
      (widget) => widget.type === ctx.selectSchema.type,
    )?.propsConfig;
    onPropsConfigUpdate = (values, type) => {
      if (type === 'item') {
        // 更新 selectSchema
        ctx.selectSchema = { ...ctx.selectSchema, ...values };
        ctx.setSelectSchema({ ...ctx.selectSchema });
      }
      if (type === 'widget') {
        // 更新 schemaProps
        ctx.selectSchema.props = { ...ctx.selectSchema.props, ...values };
        ctx.setSelectSchema({ ...ctx.selectSchema });
      }
      // 更新 schema
      const schema = recursionFind(ctx.schema, ctx.selectSchema.key);
      Object.assign(schema, ctx.selectSchema);
      ctx.setSchema([...ctx.schema]);
    };
  }
  /** 防抖0.1s */
  const onFormValuesChange = debounce((_, values) => {
    ctx.setFormProps?.(values);
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
  const onMount = ({ setSchemaByName }) => {
    const options = ctx.schema
      ?.filter((item) => item.key !== ctx.selectSchema.key) // 过滤自己
      .map((schema) => {
        return {
          label: schema.label,
          value: schema.name,
        };
      });
    setSchemaByName('effect', {
      props: {
        options,
      },
    });
  };
  /** 防抖0.1s */
  const onTableValuesChange = debounce((v, values) => {
    // 子表单需要过滤一下
    values.tools = values.tools.filter((i) => i?.label);
    values.menus = values.menus.filter((i) => i?.label);
    ctx.setTableProps({ ...values });
  }, debounceTime);
  /** 防抖0.1s */
  const onCellValuesChange = debounce((v, values) => {
    ctx.setColumns(values.columns);
  }, debounceTime);
  const PanelRender = ctx.selectTable ? (
    <SearchTablePropsConfig
      {...{
        tableType,
        setTableType,
        TableList,
        TablePropsConfig: TablePropsConfig({ selectModelOptions }),
        onTableValuesChange,
        CellPropsConfig,
        onCellValuesChange,
        ctx,
      }}
    />
  ) : (
    <SearchFormPropsConfig
      {...{
        setCompontentType,
        compontentType,
        FormPropsConfig,
        onFormValuesChange,
        onMount,
        ItemPropsConfig,
        onItemValuesChange,
        propsConfig,
        onWidgetValuesChange,
        ctx,
      }}
    />
  );
  return (
    <div
      className="props-config-panel"
      style={style}
      key={ctx.selectSchema?.key}
    >
      {isEmpty(ctx.selectSchema) && !ctx.selectTable ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="请选择需要设置的表单项"
          className="form-canvas-empty"
        />
      ) : (
        PanelRender
      )}
    </div>
  );
};
