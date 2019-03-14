<template>
  <div class="swipe-image">
    <van-swipe>
      <van-swipe-item v-for="(item, index) in mallLoopImages" :key="index">
        <img v-lazy="item.loopImg" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['mallLoopImages']
}
</script>

<style lang="scss" scoped>
.swipe-image {
  /deep/ .van-swipe__track {
    height: 280px;
    .van-swipe-item {
      width: 750px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  /deep/ .van-swipe__indicators {
    .van-swipe__indicator {
      background-color: $color-ff;
    }
  }
}
</style>
