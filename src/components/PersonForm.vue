<template>
  <div>
    <name-field
      v-model="buyer.name"
      :label="buyerNameLabel"
      placeholder="请填写您的姓名"
      :readonly="buyerReadonly"
      @change="onChangeName"
      @clear-error="onClearError"
      @error="onError"
    />
    <credential-field
      v-model="buyer.credential"
      type-placeholder="请选择您的证件类型"
      number-placeholder="请填写您的证件号码"
      type-readonly
      :number-readonly="buyerReadonly"
      @change="onChangeCredential"
      @clear-error="onClearError"
      @error="onError"
    />
    <mobile-field
      v-model="buyer.mobile"
      placeholder="请填写您的手机号码"
      :readonly="buyerReadonly"
      @change="onChangeMobile"
      @clear-error="onClearError"
      @error="onError"
    />
    <birthday-field
      v-model="buyer.birthday"
      :readonly="buyerReadonly"
      @change="onChangeBirthday"
      @clear-error="onClearError"
      @error="onError"
    />
    <gender-field
      v-model="buyer.gender"
      :readonly="buyerReadonly"
      @confirm="onChangeGender"
      @clear-error="onClearError"
      @error="onError"
    />
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Notify } from 'vant';
import NameField from '@/components/NameField';
import MobileField from '@/components/MobileField';
import GenderField from '@/components/GenderField';
import BirthdayField from '@/components/BirthdayField';
import CredentialField from '@/components/CredentialField';
import Person from '@/models/Person';

export default {
  name: 'PersonForm',
  components: {
    [NameField.name]: NameField,
    [CredentialField.name]: CredentialField,
    [MobileField.name]: MobileField,
    GenderField,
    BirthdayField,
  },
  model: {
    prop: 'model',
  },
  props: {
    model: {                            // 绑定的购买者对象
      type: Object,
      required: true,
    },
    buyerNameLabel: {
      type: String,
      default: '缴费人',
    },
  },
  data() {
    return {
      buyer: new Person(),
    };
  },
  computed: {
    ...mapState({
      buyerReadonly: (state) => state.user.buyerReadonly,
    }),
    isIdentityCard() {
      return this.buyer.isIdentityCard();
    },
  },
  watch: {
    model: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.buyer.assign(newValue);
      },
    },
  },
  methods: {
    onChangeName(name) {
      this.onChange(this.buyer, { name });
    },

    onChangeCredential(credential) {
      const changes = {};
      this.buyer.setCredential(credential, changes);
      this.onChange(this.buyer, changes);
    },
    onChangeBirthday(birthday) {
      this.onChange(this.buyer, { birthday });
    },
    onChangeGender(gender) {
      this.onChange(this.buyer, { gender });
    },

    onChangeMobile(mobile) {
      this.onChange(this.buyer, { mobile });
    },

    onChange(buyer, changes) {
      // 触发 input 事件
      this.$emit('input', Person.create(buyer));   // 注意传递对象必须复制拷贝
      // 触发 change 事件
      this.$emit('change', changes);
    },

    onClearError() {
      Notify.clear();
      this.$emit('clear-error');
    },

    onError(message) {
      Notify({ type: 'danger', message });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
