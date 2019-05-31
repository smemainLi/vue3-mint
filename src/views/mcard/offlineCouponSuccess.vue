<template>
  <div class="offline-coupon-success">
    <div class="success-message">
      <div class="success-show">
        <div class="success-image">
          <img class="image-content" :src="successImg" alt="">
        </div>
      </div>
      <div class="benefit-tip">
        <div class="tip-row">
          <span class="tip-content" v-cloak>{{aboveTip}}</span>
        </div>
      </div>
      <div class="general-qrcode">
        <img class="qrcode-img" :src="qrcodeImg" alt="">
      </div>
    </div>
    <bottom-button :btnName="btnName"></bottom-button>
  </div>
</template>

<script>
import bottomButton from '../../components/common/bottomButton.vue'
export default {
  data () {
    return {
      successImg: require('../../assets/images/mcard/receiveSuccess.png'),
      qrcodeImg: require('../../assets/images/arecord/qrCode.png'),
      aboveTip: '请长按以下二维码进入公众号内商城使用或下载APP使用，偷偷告诉你，APP更多优惠呦',
      btnName: '下载同道口腔APP'
    }
  },
  components: { bottomButton }
}
</script>

<style lang="scss" scoped>
.offline-coupon-success {
  .success-message {
    background-color: $color-ff;
    padding: 0 32px 150px;
    .success-show {
      display: flex;
      justify-content: center;
      padding: 44px 0 61px;
      border-bottom: 1px solid $color-e5;
      .success-image {
        width: 180px;
        height: 182px;
        .image-content {
          width: 100%;
          height: 100%;
        }
      }
    }
    .benefit-tip {
      font-size: 24px;
      color: $color-88;
      // text-align: center;
      display: flex;
      justify-content: center;
      padding: 32px 0 68px;
      .tip-row {
        width: 520px;
        text-align: center;
      }
    }
    .general-qrcode {
      width: 400px;
      height: 400px;
      margin: 0 auto;
      .qrcode-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .success-buttons {
    padding: 130px 32px 0;
    display: flex;
    justify-content: space-between;
    .com-button {
      width: 324px;
      height: 88px;
      border-radius: 8px;
      font-size: 36px;
    }
    .detail-button {
      color: $color-008CA7;
      border: 1px solid $color-008CA7;
      background-color: $color-f5;
    }
    .get-more-button {
      color: $color-ff;
      background: $color-gradient;
    }
  }
}
</style>
