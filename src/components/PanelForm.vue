<template>
  <van-form class="panel-form_container">
    <van-cell
      v-if="title || closeable"
      :title="title"
      :border="false"
      class="title-cell"
    >
      <van-icon
        v-if="closeable"
        name="clear"
        size="17"
        style="cursor: pointer"
        @click="onClose"
      />
    </van-cell>
    <slot />
  </van-form>
</template>

<script>
import { Form, Cell, Icon } from 'vant';

export default {
  name: 'PanelForm',
  components: {
    [Form.name]: Form,
    [Cell.name]: Cell,
    [Icon.name]: Icon,
  },
  props: {
    index: {                      // 此表单的编号索引
      type: Number,
      default: 0,
    },
    title: {                      // 表单标题
      type: String,
      default: '',
    },
    closeable: {                  // 表单是否可关闭
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClose() {
      this.$emit('close', this.index);
    },
  },
};
</script>
<style lang="less">
.panel-form_container {
  overflow: hidden;
  background: #fff;
  .title-cell {
    .van-cell__title {
      min-width: 90%;
      max-width: 100%;
      font-weight: bold;
      font-size: 15px;
    }
    .van-cell__value {
      .van-icon {
        top: 5px;
      }
    }
  }
}
</style>
