<template>
  <div class="datetime-select">
    <van-field
      :name="name"
      :value="text"
      :label="label"
      :placeholder="placeholder || `请选择${label}`"
      readonly
      clickable
      :is-link="isLink"
      :input-align="inputAlign"
      :required="required"
      :rules="rules"
      @click="onClick"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-datetime-picker
        ref="picker"
        v-model="selected"
        :type="type"
        :title="label"
        :min-date="minDate"
        :max-date="maxDate"
        :min-hour="minHour"
        :max-hour="maxHour"
        :filter="filter"
        :min-minute="minMinute"
        :max-minute="maxMinute"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import dayjs from 'dayjs';
import {
  Field, DatetimePicker, Popup, Toast,
} from 'vant';

/**
 * Vant的{@link DatetimePicker}组件的时间格式。
 */

// 时间类型下拉选择框。
export default {
  name: 'DatetimeSelect',

  components: {
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
  },

  props: {
    value: {              // 当前选中的日期时间的数值，注意为了支持null此参数不限制类型
      type: null,
      required: true,
    },
    readonlyToast: Boolean,
    // 见 vant field https://vant-contrib.gitee.io/vant/v2/#/zh-CN/datetime-picker
    type: {
      type: String,
      default: 'datetime',
    },
    name: String,
    required: Boolean,
    isLink: Boolean,
    disabled: Boolean,
    rules: {
      type: Array,
    },
    inputAlign: String,
    // type为time时，valueFormat无效，固定为：HH:mm
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DDTHH:mmZ',
    },
    // 见 dayjs https://dayjs.gitee.io/docs/zh-CN/display/format
    displayFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm',
    },
    // 默认选中的日期时间
    defaultSelected: String,
    label: {
      type: String,
      default: '日期时间',
    },
    placeholder: String,
    minDate: Date,
    maxDate: Date,
    minHour: [Number, String],
    maxHour: [Number, String],
    minMinute: [Number, String],
    maxMinute: [Number, String],
    filter: Function,
  },
  data() {
    return {
      showPicker: false,  //  是否显示选项下拉框
      text: '',           //  当前选中的日期时间的显示名称
      selected: null,     //  当前选中的日期时间值
    };
  },
  watch: {
    value(newValue) {
      this.$_updateUI(newValue);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$_updateUI(this.value);
    });
  },
  methods: {
    // 用户点击选项输入框后触发此事件。
    onClick() {
      if (this.disabled) {
        if (this.readonlyToast) {
          Toast(`${this.label}不可更改`);
        }
        return;
      }
      this.showPicker = true;
    },

    // 修改选项下拉框选项后触发的事件。
    onConfirm(e) {
      this.showPicker = false;
      let newValue;
      if (this.type === 'time') {
        newValue = e;
      } else {
        newValue = dayjs(e).format(this.valueFormat);
      }
      this.$emit('input', newValue);
      this.$emit('confirm', newValue);
    },

    // 日期时间字段单位格式化函数。
    formatter(type, value) {
      switch (type) {
        case 'year':
          return `${value}年`;
        case 'month':
          return `${value}月`;
        case 'day':
          return `${value}日`;
        case 'hour':
          return `${value}时`;
        case 'minute':
          return `${value}分`;
        case 'second':
          return `${value}秒`;
        default:
          return value;
      }
    },

    // 更新UI界面
    $_updateUI(newValue) {
      if (!newValue) {
        this.text = '';
        if (this.defaultSelected) {
          if (this.type === 'time') {
            this.selected = newValue;
          } else {
            const time = dayjs(this.defaultSelected, this.valueFormat);
            this.selected = time.toDate();
          }
        } else {
          this.selected = null;
        }
      } else {
        if (this.type === 'time') {
          const nowTime = dayjs().format('YYYY-MM-DD');
          this.selected = newValue;
          const time = dayjs(`${nowTime} ${newValue}`);
          this.text = time.format(this.displayFormat);
        } else {
          const time = dayjs(newValue, this.valueFormat);
          this.selected = time.toDate();
          this.text = time.format(this.displayFormat);
        }
      }
    },
  },
};
</script>
<style scoped lang="less">
</style>
