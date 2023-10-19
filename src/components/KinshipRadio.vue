<template>
  <van-field
    name="kinship"
    :label="label"
    class="kinship-field"
  >
    <template #input>
      <van-radio-group
        v-model="kinship"
        :disabled="disabled"
        direction="horizontal"
        class="kinship-group"
      >
        <van-radio
          v-for="(k, index) in kinships"
          :key="index"
          :name="k.value"
          class="kinship-radio"
        >
          <template #icon>
            {{ k.name }}
          </template>
        </van-radio>
      </van-radio-group>
    </template>
  </van-field>
</template>

<script>
import { Field, RadioGroup, Radio } from 'vant';
import KINSHIPS from '@/models/common/kinship';

export default {
  name: 'KinshipRadio',
  components: {
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
  },
  model: {
    prop: 'model',
  },
  props: {
    model: {                                // 双向绑定的参保人关系枚举值
      type: String,
      required: true,
      default: '',
    },
    label: {
      type: String,
      default: '关系',
    },
    disabled: Boolean,
    kinships: {
      type: Array,
      default: () => KINSHIPS,
    }
  },
  computed: {
    kinship: {
      get() {
        return this.model;
      },
      set(newValue) {
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      },
    },
  },
};
</script>
<style scoped lang="less">
.kinship-field {
  flex-direction: column;
}
:deep(.van-field__control--custom) {
  display: block;
}
.kinship-group {
  display: flex;
}
.kinship-radio {
  &:last-child {
    margin-right: 0;
  }
  :deep(.van-radio__icon) {
    height: auto;
    padding: 6px 12px;
    font-size: 14px;
    color: #999;
    border: 1px solid #DCDCDC;
    border-radius: 4px;
    &--checked {
      color: #fff;
      background: #4288FA;
      border-color: #4288FA;
    }
  }
}
</style>
