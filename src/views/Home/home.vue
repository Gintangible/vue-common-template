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
import { mapState, mapMutations } from 'vuex';
import appApi from 'api/app';

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
      user: (state) => state.user,
    }),
  },
  async created() {
    if (this.user) {
      console.log('gxw get vuex-persist user ', this.user);
      return;
    }
    const user = await appApi.getUserInfo();
    console.log('gxw  get user: ', user);
    this.setUser(user);
  },
  methods: {
    ...mapMutations({
      setUser: 'SET_USER',
    }),
  },
};
</script>
<style lang='scss' scoped>
.home-title {
  font-size: 24px;
  font-weight: bold;
}
.router-item {
  display: block;
  @include lineHeight(rem(24));
}
</style>
