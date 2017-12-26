<template>
  <div class="bb-select-date-picker" :style="`width: ${width}`">
    <el-select v-model="select" placeholder="请选择" :size="size" class="select" @change="handleChange">
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

<style scoped>
.bb-select-date-picker{display: inline-block;position: relative;}
.bb-select-date-picker .select{width: 100%;padding-right: 40px;box-sizing: border-box;}
.bb-select-date-picker .btn-datepicker{width: 38px;overflow: hidden;cursor: pointer;position: absolute;top: 0;right: 0;}
</style>
