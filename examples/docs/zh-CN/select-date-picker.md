<script>
  const day = 24 * 60 * 60 * 1000;
  export default {
    data() {
      return {
        date: '',
        date1: 'cycle',
        date2: '',
        date3: '',
        date4: '',
        placeholder: '请选择',
        options: [{
          value: '14',
          label: '发布后14天'
        }, {
          value: 'cycle',
          label: '发布周期'
        }],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - day;
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - day * 8);
              end.setTime(end.getTime() - day);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - day * 30);
              end.setTime(end.getTime() - day);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - day * 90);
              end.setTime(end.getTime() - day);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      };
    },
    methods: {
      hello() {
        alert('Hello World!');
      }
    }
  }
</script>
<style>
  .demo-select-date-picker-size {
    .bb-select-date-picker {
      margin-right: 10px;
    }
  }
</style>

## SelectDatePicker 带日期的选择器

用于选择普通选项或日期

### 基本用法

:::demo
```html
<template>
  <bb-select-date-picker
    v-model="date"
    :placeholder="placeholder"
    :options="options"
    :picker-options="pickerOptions"></bb-select-date-picker>
</template>

<script>
  const day = 24 * 60 * 60 * 1000;
  export default {
    data() {
      return {
        date: '',
        placeholder: '请选择',
        options: [{
          value: '14',
          label: '发布后14天'
        }, {
          value: 'cycle',
          label: '发布周期'
        }],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - day;
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - day * 8);
              end.setTime(end.getTime() - day);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - day * 30);
              end.setTime(end.getTime() - day);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - day * 90);
              end.setTime(end.getTime() - day);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      };
    }
  }
</script>
```
:::

### 当前月份在左边

日期选择下拉面板，当前月份在左边
但仍存在一个问题 [issues](https://github.com/ElemeFE/element/issues/3241)

:::demo
```html
<template>
  <bb-select-date-picker
    v-model="date1"
    :options="options"
    :default-value="defaultValue"></bb-select-date-picker>
</template>

<script>
  export default {
    data() {
      return {
        date1: 'cycle',
        options: [{
          value: '14',
          label: '发布后14天'
        }, {
          value: 'cycle',
          label: '发布周期'
        }]
      };
    },
    computed() {
      defaultValue() {
        const currentMonth = new Date();
        currentMonth.setDate(1);
        const lastMonth = new Date(currentMonth.getTime());
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return [lastMonth, currentMonth];
      }
    }
  }
</script>
```
:::

### 不同尺寸

SelectDatePicker 组件提供除了默认值以外的三种尺寸

:::demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 medium、small 和 mini 三种尺寸。
```html
<div class="demo-select-date-picker-size">
  <bb-select-date-picker
    v-model="date2"
    :options="options"
    size="medium"></bb-select-date-picker>
  <bb-select-date-picker
  v-model="date3"
  :options="options"
  size="small"></bb-select-date-picker>
  <bb-select-date-picker
  v-model="date4"
  :options="options"
  size="mini"></bb-select-date-picker>
</div>

<script>
  export default {
    data() {
      return {
        date1: 'cycle',
        options: [{
          value: '14',
          label: '发布后14天'
        }, {
          value: 'cycle',
          label: '发布周期'
        }],
        date2: '',
        date3: '',
        date4: ''
      };
    }
  }
</script>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 选项的值 | string | — | — |
| options | 下拉选项 | Array | — | — |
| width | 宽度 | string | — | 252px |
| size | 输入框尺寸 | string | large/small/mini | — |
| align | 日期选择下拉框对齐方式 | string | left, center, right | left |
| value-format | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | string | 年 yyyy，月 MM，日 dd，小时 HH，分 mm，秒 ss，AM/PM A | yyyy-MM-dd |
| separator | 日期范围分隔符 | string | — |  &nbsp;~&nbsp;  |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| default-value | 可选，选择器打开时默认显示的时间 | Array([Date, Date]) | — |   |

### Picker Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| shortcuts | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表 | Object[] | — | — |
| disabledDate | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function | — | — |
| firstDayOfWeek | 周起始日 | Number | 1 到 7 | 7 |
| onPick | 选中日期后会执行的回调，只有当 `daterange` 或 `datetimerange` 才生效 | Function({ maxDate, minDate }) | — | — |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 `value-format` 控制 |
