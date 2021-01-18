<template>
  <div class="icon-container">
    <svg-icon v-for="(name, index) in iconNames" :name="name" :key="index"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'iconView',
  data() {
    return {
      iconNames: ['download', 'fail', 'plus', 'right-arrow', 'star', 'success'],
    };
  },
};
</script>

<style>
</style>