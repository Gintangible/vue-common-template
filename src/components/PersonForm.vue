<template>
  <div>
    <name-field
      v-model="person.name"
      :label="buyerNameLabel"
      placeholder="请填写您的姓名"
      :readonly="readonly"
      @change="onChangeName"
      @clear-error="onClearError"
      @error="onError"
    />
    <credential-field
      v-model="person.credential"
      type-placeholder="请选择您的证件类型"
      number-placeholder="请填写您的证件号码"
      type-readonly
      :number-readonly="readonly"
      @change="onChangeCredential"
      @clear-error="onClearError"
      @error="onError"
    />
    <mobile-field
      v-model="person.mobile"
      placeholder="请填写您的手机号码"
      :readonly="readonly"
      @change="onChangeMobile"
      @clear-error="onClearError"
      @error="onError"
    />
    <birthday-field
      v-model="person.birthday"
      :readonly="readonly"
      @change="onChangeBirthday"
      @clear-error="onClearError"
      @error="onError"
    />
    <gender-field
      v-model="person.gender"
      :readonly="readonly"
      @confirm="onChangeGender"
      @clear-error="onClearError"
      @error="onError"
    />
    <slot />
  </div>
</template>

<script>
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
      default: '姓名',
    },
    readonly: Boolean,
  },
  data() {
    return {
      person: new Person(),
    };
  },
  watch: {
    model: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.person = Person.create(newValue);
      },
    },
  },
  methods: {
    onChangeName(name) {
      this.onChange(this.person, { name });
    },

    onChangeCredential(credential) {
      const changes = {};
      this.person.setCredential(credential, changes);
      this.onChange(this.person, changes);
    },
    onChangeBirthday(birthday) {
      this.onChange(this.person, { birthday });
    },
    onChangeGender(gender) {
      this.onChange(this.person, { gender });
    },

    onChangeMobile(mobile) {
      this.onChange(this.person, { mobile });
    },

    onChange(person, changes) {
      // 触发 input 事件
      this.$emit('input', Person.create(person));   // 注意传递对象必须复制拷贝
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
