<template>
  <div class="bb-select-date-picker" :style="`width: ${width}`">
    <el-select v-model="select" :placeholder="placeholder" :size="size" class="select" @change="handleChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-date-picker
      v-model="date"
      class="btn-datepicker"
      align="left"
      type="daterange"
      start-placeholder=""
      end-placeholder=""
      :size="size"
      :value-format="valueFormat"
      :clearable="false"
      :default-value="defaultValue"
      :picker-options="pickerOptions"
      @change="datechange">
    </el-date-picker>
  </div>
</template>

<script>
import ElSelect from 'element-ui/packages/select';
import ElDatePicker from 'element-ui/packages/date-picker';
import { test } from 'element-ui/src/bb-utils/util';

export default {
  name: 'BbSelectDatePicker',

  componentName: 'BbSelectDatePicker',

  components: {
    ElSelect,
    ElDatePicker
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    width: {
      type: String,
      default: '252px'
    },
    size: {
      type: String
    },
    align: {
      type: String,
      default: 'left'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    separator: {
      type: String,
      default: ' ~ '
    },
    placeholder: {
      type: String,
      default: ''
    },
    pickerOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    defaultValue: {
      type: Array
    }
  },
  data() {
    return {
      select: this.value,
      date: '',
      oldDate: ''
    };
  },
  methods: {
    datechange(date) {
      test();
      if (date !== '' && JSON.stringify(date) !== JSON.stringify(this.olddate)) {
        this.select = date.join(this.separator);
        this.olddate = date;
        this.handleEmit();
      }
    },
    handleChange() {
      this.handleEmit();
    },
    handleEmit() {
      this.$emit('input', this.select);
      this.$emit('change', this.select);
    }
  }
};
</script>
