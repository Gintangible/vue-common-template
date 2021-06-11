<template>
  <div>
    注册页面
    <div @click="handleLogin">
      注册
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: 'gintangible',
        password: 'gintangible',
      },
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

<style>

</style>
