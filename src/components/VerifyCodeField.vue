<template>
  <van-field
    v-model.trim="code"
    center
    clearable
    :label="label"
    :placeholder="placeholder || `请填写${label}`"
    :input-align="inputAlign"
    @blur="onBlur"
    @input="onChange"
  >
    <template #button>
      <van-button
        size="mini"
        type="info"
        :disabled="disabled || showCountDown"
        @click="onClickSend"
      >
        <van-count-down
          v-if="showCountDown"
          :style="{color: countDownColor}"
          :time="resendTimeout"
          format="ss秒"
          @finish="onCountDownFinish"
        />
        <template v-else>
          {{ buttonText }}
        </template>
      </van-button>
    </template>
  </van-field>
</template>

<script>
import { Field, Button, CountDown } from 'vant';

// 验证码输入框组件。
export default {
  name: 'VerifyCodeField',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CountDown.name]: CountDown,
  },
  props: {
    value: {
      type: String,
      required: true,
      default: '',
    },
    label: {
      type: String,
      default: '短信验证码',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: Boolean,
    sendButtonText: {
      type: String,
      default: '发送验证码',
    },
    resendButtonText: {
      type: String,
      default: '重新发送验证码',
    },
    resendTimeout: {
      type: Number,
      default: 60000,
    },
    countDownColor: {
      type: String,
      default: '#fff',
    },
    inputAlign: {
      type: String,
      default: 'right',
    },
    // eslint-disable-next-line
    onSend: Function,
  },
  data() {
    return {
      buttonText: this.sendButtonText,
      code: '',
      showCountDown: false,
    };
  },
  watch: {
    value(newValue) {
      this.code = newValue;
    },
  },
  methods: {
    onClickSend() {
      if (this.onSend) {
        const res = this.onSend();
        if (!res) {
          return;
        }
        if (res.then) {
          res.then(() => {
            this.showCountDown = true;
          }).catch(() => {
            this.showCountDown = false;
          });
        }
      }
    },
    onCountDownFinish() {
      this.buttonText = this.resendButtonText;
      this.showCountDown = false;
    },
    onChange() {
      this.$emit('input', this.code);
    },
    onBlur() {
      this.$emit('blur', this.code);
    },
  },
};
</script>

<style lang="less" scoped>
.van-button {
  min-width: 80px;
}
</style>
