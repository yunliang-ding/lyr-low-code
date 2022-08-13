import FunctionEditor from '@/function-editor';
import { Form } from 'react-core-form';
import schema from './schema';
import './index.less';
/**
 * 数据源设置、远程接口配置
 */
export default ({ initialValues = {}, form = Form.useForm()[0] }) => {
  return (
    <div className="app-data-source">
      <Form
        schema={schema}
        form={form}
        widgets={{ FunctionEditor }}
        initialValues={initialValues}
      />
    </div>
  );
};
