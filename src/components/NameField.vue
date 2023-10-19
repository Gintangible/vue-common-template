<template>
  <van-field
    v-model="text"
    :name="name"
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-message-align="inputAlign"
    :rules="nameRule"
    :input-align="inputAlign"
    @click="onClick"
    @input="onChange"
    @blur="onBlur"
  />
</template>

<script>
import { Field, Toast } from 'vant';
import removemidspace from '@/utils/remove-mid-space';
import Name from '@/models/validate/name';

export default {
  name: 'NameField',
  components: {
    [Field.name]: Field,
  },
  model: {
    prop: 'value',
  },
  props: {
    name: {
      type: String,
      default: 'name',
    },
    value: {
      type: String,
      required: true,
      default: '',
    },
    required: Boolean,
    errorMessage: {
      type: String,
      default: '姓名错误',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    validator: {
      type: Function,
      default: Name.isValid,
    },
    label: {
      type: String,
      default: '姓　　名',
    },
    placeholder: {
      type: String,
      default: '请填写姓名',
    },
    inputAlign: {
      type: String,
      default: 'right',
    },
    readonly: Boolean,
  },
  data() {
    return {
      text: '',
    };
  },
  computed: {
    nameRule() {
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
      this.text = newValue;
    },
  },
  mounted() {
    this.text = this.value;
  },
  methods: {
    onClick() {
      if (this.readonly) {
        const label = removemidspace(this.label);
        Toast(`${label}不可更改`);
      }
    },

    onChange(value) {
      this.text = value?.toUpperCase();
      this.$emit('clear-error');
      this.$emit('input', this.text);
    },

    onBlur() {
      const result = this.validator(this.text);
      this.$emit('input', this.text);
      this.$emit('change', this.text);
      if (!result) {
        this.$emit('error', this.errorMessage);
      }
    },
  },
};
</script>
<style scoped lang="less">
</style>
