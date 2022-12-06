import { Ctx } from '../store';
import RegisterWidgets from '@/form-designer/register-widgets';
import innerWidgets from '../material-config';

export default (props) => {
  return (
    <RegisterWidgets
      context={Ctx}
      {...props}
      innerWidgets={innerWidgets}
      customWidgets={{}}
      customWidgetsPropsConfig={[]}
    />
  );
};
