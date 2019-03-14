<template>
  <div class="goods-detail">
    <goods-main></goods-main>
    <image-text></image-text>
    <goods-operate></goods-operate>
  </div>
</template>

<script>
import goodsMain from '../../components/mall/goodsMain.vue'
import imageText from '../../components/mall/imageText.vue'
import goodsOperate from '../../components/mall/goodsOperate.vue'
export default {
  data () {
    return {

    }
  },
  components: { goodsMain, imageText, goodsOperate }
}
</script>

<style lang="scss" scoped>
</style>
