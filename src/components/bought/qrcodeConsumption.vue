<template>
  <div class="qrcode-consumption">
    <div class="consumption-info">
      <div class="consumption-tips" v-cloak>{{consumptionTips}}</div>
      <div class="consumption-numcode" v-cloak>{{consumptionNumcode}}</div>
      <div class="consumption-qrcode">
        <img class="img-content" :src="qrcodeImg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      consumptionTips: '请到同道门店消费时，出示该二维码进行消费',
      consumptionNumcode: '消费码：4558778878877878',
      qrcodeImg: require('../../assets/images/mcard/qrCode.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.qrcode-consumption {
  padding: 0 32px;
  background-color: $color-ff;
  .consumption-info {
    padding: 32px 0 60px 0;
    border-bottom: 1px solid $color-e5;
    .consumption-tips {
      font-size: 28px;
      color: $color-88;
    }
    .consumption-numcode {
      font-size: 28px;
      color: $color-35;
      margin: 20px 0 46px 0;
    }
    .consumption-qrcode {
      width: 400px;
      height: 400px;
      margin: 0 auto;
      .img-content {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
