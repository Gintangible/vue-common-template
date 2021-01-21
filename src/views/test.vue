<template>
  <div>测试页面 {{ user.name }}</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Test',
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
};
</script>

<style>
</style>