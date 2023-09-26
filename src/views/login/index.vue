<template>
  <div class="login-container">
    <person-form v-model="user" class="login-form" />
    <van-button
      round
      color="linear-gradient(to bottom, #537dff, #0057d6)"
      text="提交"
      class="login-btn"
      @click="handleLogin"
    />
  </div>
</template>

<script>
import { Button } from 'vant';
import PersonForm from '@/components/PersonForm';
import Person from '@/models/Person';

export default {
  name: 'Login',
  components: {
    [Button.name]: Button,
    PersonForm,
  },
  data() {
    return {
      user: new Person(),
    };
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('user/login', this.userInfo).then(() => {
        this.$router.push({ path: this.redirect || '/' });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  padding-top: 40px;
  min-height: 100vh;
  background: #f5f5f5;
}
.login-form {
  margin: 0 10px;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 8px 0 #e2e2e2;
}
.login-btn {
  display: block;
  margin: 20px auto 0;
  width: 200px;
}
</style>
