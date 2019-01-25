<template>
  <div class="qrcode-display">
    <div class="qrcode-image">
      <img class="image-content" :src="`data:image/png;base64,${qrcodeImg}`" alt="">
    </div>
    <div class="qrcode-tips">
      <div class="usage-tip" v-cloak>{{tipOne}}</div>
      <div class="usage-tip" v-cloak>{{tipTwo}}</div>
      <div class="usage-tip" v-cloak>{{tipThree}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // qrcodeImg: require('../../assets/images/arecord/qrCode.png'),
      tipOne: '1 到门店后请去前台登记并出示二维码。',
      tipTwo: '2 请按时到来，否则可能需要额外等候。',
      tipThree: '3 就诊当天，不能取消预约。'
    }
  },
  props: ['qrcodeImg']
}
</script>

<style lang="scss" scoped>
.qrcode-display {
  background-color: $color-ff;
  padding: 63px 0 35px;
  margin-bottom: 24px;
  .qrcode-image {
    width: 370px;
    height: 370px;
    margin: 0 auto;
    margin-bottom: 42px;
    .image-content {
      width: 100%;
      height: 100%;
    }
  }
  .qrcode-tips {
    margin-left: 158px;
    font-size: 24px;
    color: $color-88;
    .usage-tip {
      margin-bottom: 12px;
    }
  }
}
</style>
