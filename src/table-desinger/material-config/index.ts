/** 基础组件 */
import input from '../../form-designer/material-config/base/input.json';
import rangeInput from '../../form-designer/material-config/base/range-input.json';
import select from '../../form-designer/material-config/base/select.json';
import radio from '../../form-designer/material-config/base/radio.json';
import checked from '../../form-designer/material-config/base/checked.json';
import datePicker from '../../form-designer/material-config/base/date-picker.json';
import dateRangePicker from '../../form-designer/material-config/base/date-range-picker.json';
import Switch from '../../form-designer/material-config/base/switch.json';
import cascader from '../../form-designer/material-config/base/cascader.json';
import treeselect from '../../form-designer/material-config/base/tree-select.json';
/** 高级组件 */
import asyncSelect from '../../form-designer/material-config/advance/async-select.json';
import asyncCascader from '../../form-designer/material-config/advance/async-cascader.json';
import asyncTreeSelect from '../../form-designer/material-config/advance/async-tree-select.json';
import debounceSelect from '../../form-designer/material-config/advance/debounce-select.json';

export default {
  base: [
    input,
    rangeInput,
    radio,
    checked,
    select,
    datePicker,
    dateRangePicker,
    Switch,
    cascader,
    treeselect,
  ],
  advance: [asyncSelect, asyncCascader, asyncTreeSelect, debounceSelect],
};
