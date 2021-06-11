<template>
  <div class="container">
    <div class="content">
      <van-image :src="centerPicture" />
      <div class="yi">
        咦…
      </div>
      <div class="text">
        正在努力升级系统<br> 稍等一下下，马上回来
      </div>
      <van-button
        :loading="loading"
        class="van-btn"
        size="small"
        type="info"
        @click="goHome"
      >
        回到首页
      </van-button>
    </div>
  </div>
</template>

<script>
import { Button, Image as VanImage } from 'vant';

export default {
  name: 'Error404',
  components: {
    [VanImage.name]: VanImage,
    [Button.name]: Button,
  },
  data() {
    return {
      loading: false,
      centerPicture: require('@/assets/images/err_404.png'),
    };
  },
  methods: {
    goHome() {
      this.loading = true;
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    width: 180px;
    height: 540px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .yi {
      font-size: 12px;
      color: grey;
      padding-top: 18px;
    }
    .text {
      padding-top: 15px;
      padding-bottom: 2em;
      font-size: 11px;
      width: 120px;
      color: grey;
      text-align: center;
      white-space: 12px;
    }
    .van-btn {
      margin-top: 15px;
      padding: 0 4em;
      font-size: 11px;
    }
  }
}
</style>
