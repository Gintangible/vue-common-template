<template>
  <div class="home-container">
    <div class="home-title">主页</div>
    <div class="router-list">
      <router-link
        v-for="(route, index) in routes"
        :key="index"
        class="router-item"
        :to="{ name: route.name }"
        >{{route.name}}</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      routes: [{
        name: 'Icons',
        title: '跳转icons'
      }],
    };
  },
  components: {},
};
</script>
<style lang='scss' scoped>
.home-title {
  font-size: 24px;
  font-weight: bold;
}
.router-item {
  display: block;
  font-size: rem(16);
  @include lineHeight(rem(24));
}
</style>