/** 基础组件 */
import input from './base/input.json';
import inputNumber from './base/input-number.json';
import rangeInput from './base/range-input.json';
import textArea from './base/text-area.json';
import select from './base/select.json';
import radio from './base/radio.json';
import checked from './base/checked.json';
import datePicker from './base/date-picker.json';
import dateRangePicker from './base/date-range-picker.json';
import timePicker from './base/time-picker.json';
import Switch from './base/switch.json';
import cascader from './base/cascader.json';
import rate from './base/rate.json';
import slider from './base/slider.json';
import treeselect from './base/tree-select.json';
import upload from './base/upload.json';
/** 高级组件 */
import asyncSelect from './advance/async-select.json';
import asyncCascader from './advance/async-cascader.json';
import asyncChecked from './advance/async-checked.json';
import asyncRadio from './advance/async-radio.json';
import asyncTreeSelect from './advance/async-tree-select.json';
import debounceSelect from './advance/debounce-select.json';
import render from './advance/render.json';
import asyncRender from './advance/async-render.json';
/** 布局组件 */
import fieldSet from './layout/field-set.json';
import formList from './layout/form-list.json';
import blockQuote from './layout/block-quote.json';
import tableList from './layout/table-list.json';

export default {
  base: [
    input,
    inputNumber,
    rangeInput,
    textArea,
    radio,
    checked,
    select,
    timePicker,
    datePicker,
    dateRangePicker,
    Switch,
    cascader,
    rate,
    slider,
    treeselect,
    upload,
  ],
  advance: [
    asyncSelect,
    asyncCascader,
    asyncTreeSelect,
    debounceSelect,
    asyncChecked,
    asyncRadio,
    render,
    asyncRender,
  ],
  layout: [blockQuote, fieldSet, formList, tableList],
};
