<template>
  <van-field
    v-model.trim="mobile"
    :name="name"
    type="tel"
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-message-align="inputAlign"
    :rules="mobileRule"
    :input-align="inputAlign"
    @click="onClick"
    @input="onChange"
    @blur="onBlur"
  />
</template>

<script>
import { Field, Toast } from 'vant';
import removemidspace from '@/utils/remove-mid-space';
import Mobile from '@/models/validate/mobile';

export default {
  name: 'MobileField',
  components: {
    [Field.name]: Field,
  },
  model: {
    prop: 'value',
  },
  props: {
    name: {
      type: String,
      default: 'mobile',
    },
    value: {                          // 绑定的手机号码值
      type: String,
      required: true,
    },
    required: Boolean,
    errorMessage: {
      type: String,
      default: '手机号错误',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    validator: {
      type: Function,
      default: Mobile.isValid,
    },
    label: {                          // 手机号码输入框标签
      type: String,
      default: '手机号码',
    },
    placeholder: {                    // 手机号码输入框提示文字
      type: String,
      default: '请填写手机号码',
    },
    inputAlign: {
      type: String,
      default: 'right',
    },
    readonly: Boolean,
  },
  data() {
    return {
      mobile: '',                     // 当前手机号码
    };
  },
  computed: {
    mobileRule() {
      return [{
        required: this.required,
        trigger: 'onBlur',
        message: this.errorMessage,
        validator: (val) => this.validator(val),
      }].concat(this.rules);
    },
  },
  watch: {
    value(newValue) {
      this.mobile = newValue;
    },
  },
  mounted() {
    this.mobile = this.value;
  },
  methods: {
    onClick() {
      if (this.readonly) {
        const label = removemidspace(this.label);
        Toast(`${label}不可更改`);
      }
    },
    onChange(value) {
      this.mobile = value?.toUpperCase();
      this.$emit('clear-error');
      this.$emit('input', this.mobile);
    },
    onBlur() {
      this.$emit('input', this.mobile);
      this.$emit('change', this.mobile);
      const result = this.validator(this.mobile);
      if (!result) {
        this.$emit('error', this.errorMessage);
      }
    },
  },
};
</script>
<style scoped lang="less">
</style>
