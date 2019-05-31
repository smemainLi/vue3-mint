<template>
  <div :class="['swipe-mall-image',loopImageFlag==='mallIndex'?'':'swipe-goods-detail-image']">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in totalLoopImages" @click.native="selectLoop(item)" :key="index">
        <img :src="item.loopImg" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { typeJump } from '../../utils/tools'
export default {
  data () {
    return {

    }
  },
  methods: {
    selectLoop (loop) {
      typeJump(loop)
    }
  },
  props: ['totalLoopImages', 'loopImageFlag']
}
</script>

<style lang="scss" scoped>
.swipe-mall-image {
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
.swipe-goods-detail-image {
  /deep/ .van-swipe__track {
    height: 750px;
  }
}
</style>
