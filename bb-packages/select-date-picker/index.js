import SelectDatePicker from './src/main';

/* istanbul ignore next */
SelectDatePicker.install = function(Vue) {
  Vue.component(SelectDatePicker.name, SelectDatePicker);
};

export default SelectDatePicker;
