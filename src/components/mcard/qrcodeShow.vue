<template>
  <div class="qrcode-show">
    <div class="upper-part">
      <div class="title-info">
        <div class="tooth-img">
          <img class="tooth-content" :src="teethImg" alt="">
        </div>
      </div>
      <div class="tip-one">
        <div class="tip-content" v-cloak>{{oneTip}}</div>
      </div>
      <div class="close-img" @click="close">
        <img class="close-content" :src="qrcodeClose" alt="">
      </div>
    </div>
    <div class="middle-part" v-cloak>
      <div class="tip-two">{{twoTip}}</div>
    </div>
    <div class="last-part">
      <div class="qrcode-img">
        <img class="qrcode-content" :src="`data:image/png;base64,${qrcodeImg}`" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      teethImg: require('../../assets/images/mcard/teeth.png'),
      qrcodeClose: require('../../assets/images/mcard/close.png'),
      frameImg: require('../../assets/images/mcard/frame.png'),
      oneTip: '该二维码只作身份验证',
      twoTip: '不会进行扣款的哟，请放心'
    }
  },
  props: ['qrcodeImg'],
  methods: {
    close () {
      this.$emit('closeQrcode', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.qrcode-show {
  margin-top: 146px;
  .upper-part {
    text-align: center;
    .title-info {
      display: flex;
      justify-content: center;
      .tooth-img {
        width: 390px;
        height: 192px;
        .tooth-content {
          width: 100%;
          height: 100%;
        }
      }
    }
    .tip-one {
      margin-top: -18px;
      .tip-content {
        font-size: 28px;
        padding: 5px 16px;
        border-radius: 20px;
        display: inline-block;
        color: $color-ff;
        background-color: $color-008CA7;
      }
    }
    .close-img {
      position: absolute;
      right: 67px;
      top: 197px;
      width: 48px;
      height: 48px;
      .close-content {
        width: 100%;
        height: 100%;
      }
    }
  }
  .middle-part {
    margin: 18px 0 35px 0;
    text-align: center;
    .tip-two {
      font-size: 28px;
      color: $color-ff;
    }
  }
  .last-part {
    width: 469px;
    height: 469px;
    background: url("../../assets/images/mcard/frame.png") no-repeat center;
    background-size: 469px 469px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .qrcode-img {
      width: 409px;
      height: 409px;
      .qrcode-content {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
