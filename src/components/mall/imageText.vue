<template>
  <div class="image-text">
    <div class="image-text-title">
      <div class="left-line"></div>
      <div class="small-box"></div>
      <div class="text-content" v-cloak>{{imageTextTitle}}</div>
      <div class="small-box"></div>
      <div class="right-line"></div>
    </div>
    <div class="image-text-content">
      <img class="img-content" :src="imageTextContent" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageTextContent: require('../../assets/images/mall/goodsIntroductImg.png'),
      imageTextTitle: '图文详情'
    }
  }
}
</script>

<style lang="scss" scoped>
.image-text {
  margin-top: 24px;
  background-color: $color-ff;
  .image-text-title {
    padding: 44px 32px 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .left-line,
    .right-line {
      height: 1px;
      width: 200px;
      background: $color-e5;
    }
    .left-line {
      margin-right: 52px;
    }
    .right-line {
      margin-left: 52px;
    }
    .small-box {
      width: 14px;
      height: 14px;
      background: $color-e5;
      transform: rotate(45deg);
    }
    .text-content {
      font-size: 28px;
      color: $color-88;
      margin: 0 20px;
    }
  }
  .image-text-content {
    width: 750px;
    height: 761px;
    .img-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
