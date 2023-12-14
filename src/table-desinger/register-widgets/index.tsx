import store from '../store';
import RegisterWidgets from '@/form-designer/register-widgets';
import innerWidgets from './material-config';

export default (props) => {
  return (
    <RegisterWidgets
      store={store}
      innerWidgets={innerWidgets}
      customWidgets={props.customWidgets || {}}
      customWidgetsPropsConfig={props.customWidgetsPropsConfig || []}
    />
  );
};
