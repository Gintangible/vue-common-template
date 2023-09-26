<template>
  <datetime-select
    v-model="birthday"
    type="date"
    :value-format="valueFormat"
    :display-format="displayFormat"
    :label="label"
    :placeholder="placeholder"
    :min-date="minDate"
    :max-date="maxDate"
    :default-selected="defaultSelected"
    :readonly="readonly"
    @change="onChange"
  />
</template>

<script>
import dayjs from 'dayjs';
import DatetimeSelect from './DatetimeSelect.vue';

export default {
  name: 'BirthdayField',
  components: {
    [DatetimeSelect.name]: DatetimeSelect,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {                    // 绑定的出生日期的值
      type: String,
      required: true,
    },
    valueFormat: {              // 选中的出生日期数值的格式
      type: String,
      default: 'YYYY-MM-DD',
    },
    displayFormat: {            // 选中的出生日期在选择框中显示的格式
      type: String,
      default: 'YYYY年M月D日',
    },
    label: {                    // 出生日期选择框标签
      type: String,
      default: '出生日期',
    },
    placeholder: {              // 出生日期选择框提示文字
      type: String,
      default: '请选择出生日期',
    },
    minDate: {                  // 可选的最小出生日期
      type: Date,
      default: () => dayjs().subtract(120, 'year').toDate(),
    },
    maxDate: {                  // 可选的最大出生日期
      type: Date,
      default: () => dayjs().toDate(),
    },
    defaultSelected: {          // 默认选中的日期时间
      type: String,
      default: '1990-01-01',
    },
    readonly: Boolean,          // 选项框中选择的日期是否只读
  },
  data() {
    return {
      birthday: '',            // 选中的出生日期的值
    };
  },
  watch: {
    value(newValue) {
      this.birthday = newValue;
    },
  },
  mounted() {
    this.birthday = this.value;
  },
  methods: {
    /**
     * 当出生日期选择框中的选项被选中时触发此事件。
     *
     * @param {Object} e
     *     触发函数的事件，为选择的出生日期，以字符串形式表示，格式为'YYYY-MM-DD'。
     */
    onChange(e) {
      this.$emit('change', e);
    },
  },
};
</script>
<style scoped lang="less">
:deep(.van-field__control) {
  text-align: right;
}
</style>
