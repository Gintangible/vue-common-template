<template>
  <div class="home-container">
    <div class="home-title">
      主页 {{ user && user.IDCard }}
    </div>
    <div class="router-list">
      <router-link
        v-for="(route, index) in routes"
        :key="index"
        class="router-item"
        :to="{ name: route.name }"
      >
        {{ route.title }}
      </router-link>
      <router-link
        class="router-item"
        to="/bar"
      >
        错误页面
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Layout',
  data() {
    return {
      routes: [
        {
          name: 'Test',
          title: '跳转test',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  created() {
    console.log('gintangible get this.user', this.user);
  },
};
</script>
<style lang='less' scoped>
.home-title {
  font-size: 24px;
  font-weight: bold;
}
.router-item {
  display: block;
  line-height: 24px;
}
</style>
