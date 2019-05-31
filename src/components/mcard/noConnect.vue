<template>
  <div class="no-connect">
    <div class="placeholder-info">
      <div class="placeholder-img">
        <img class="img-content" :src="placeholderImg" alt="">
        <div class="tips-content" v-cloak>{{tipsContent}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      placeholderImg: localStorage.getItem('placeImg') || '',
      tipsContent: '暂无网络'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-connect {
  // width: 100%;
  // height: 100%;
  // display: flex;
  // justify-content: center;
  // .placeholder-info {
  //   width: 227px;
  //   height: 214px;
  //   background: url("../../assets/images/order/placeholderImg.png") no-repeat
  //     center;
  //   background-size: 227px 214px;
  //   margin-top: 240px;
  //   position: relative;
  //   display: flex;
  //   justify-content: center;
  //   .tips-content {
  //     font-size: 28px;
  //     color: $color-88;
  //     position: absolute;
  //     bottom: -60px;
  //   }
  // }
  .placeholder-info {
    .placeholder-img {
      margin-top: 360px !important;
      width: 227px;
      height: 214px;
      margin: 0 auto;
      text-align: center;
      .img-content {
        width: 100%;
        height: 100%;
      }
      .tips-content {
        font-size: 28px;
        color: $color-88;
        margin-top: 30px;
      }
    }
  }
}
</style>
