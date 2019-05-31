<template>
  <div class="download-page">
    <div class="download-page-image" @click="maskDownload = true"></div>
    <div class="mask-download-popup">
      <van-popup v-model="maskDownload" @click.native="maskDownload = false">
        <div class="invite-point">
          <img class="point-img" :src="downloadTip" alt="">
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      maskDownload: false,
      downloadTip: require('../../assets/images/mall/downloadTips.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.download-page {
  height: 100%;
  background-color: $color-008da8;
  .download-page-image {
    width: 100%;
    height: 1448px;
    background: url("../../assets/images/mall/downloadImg.png") no-repeat center;
    background-size: 100% 1448px;
  }
  .mask-download-popup {
    /deep/ .van-popup {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      .invite-point {
        width: 568px;
        height: 607px;
        float: right;
        margin: 0 22px 0 0;
        .point-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
