const day = 24 * 60 * 60 * 1000;

const currentMonth = new Date();
currentMonth.setDate(1);
const lastMonth = new Date(currentMonth.getTime());
lastMonth.setMonth(lastMonth.getMonth() - 1);

export const defaultValue = [lastMonth, currentMonth];

export const pickerOptions = {
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
};
