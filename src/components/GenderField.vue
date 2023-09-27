<template>
  <enum-select
    v-model="gender"
    :columns="genders"
    :label="label"
    :placeholder="placeholder"
    :readonly="readonly"
    @confirm="onConfirm"
    @change="onChange"
  />
</template>

<script>
import GENDERS from '@/models/common/gender';
import EnumSelect from './EnumSelect';

export default {
  name: 'GenderField',
  components: {
    [EnumSelect.name]: EnumSelect,
  },
  model: {
    prop: 'model',
  },
  props: {
    model: {                                // 绑定的性别枚举值
      type: null,
      required: true,
    },
    label: {                                // 选项框标签
      type: String,
      default: '性　　别',
    },
    placeholder: {                          // 选项框提示文字
      type: String,
      default: '请选择性别',
    },
    genders: {                             // 性别下拉框的选项列表
      type: Array,
      default: () => GENDERS,
    },
    readonly: {                             // 选项框中选择的选项是否只读
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      gender: '',                   // 选中的性别枚举值
    };
  },
  watch: {
    model: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.gender = newValue;
      },
    },
  },
  methods: {
    /**
     * 当性别选择框中的选项被确认修改时触发此事件。
     *
     * @param {String} value
     *     触发函数的事件，为{@link Gender}枚举中某个元素的值。
     */
    onConfirm(value) {
      this.$emit('input', value);
      this.$emit('confirm', value);
    },

    /**
     * 当用户改变弹出的性别选择框中的选项值时触发此事件。
     *
     * @param {String} value
     *     触发函数的事件，为{@link Gender}枚举中某个元素的值。
     */
    onChange(value) {
      this.$emit('change', value);
    },
  },
};
</script>
<style scoped lang="less">
.gender-field {
  display: block;
  padding: 0;
}
</style>
