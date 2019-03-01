<template>
  <div class="wallet-payment">
    <div class="wallet-payment-info">
      <div class="wallet-payment-info-tips" v-cloak>{{paymentTips}}</div>
      <div class="wallet-payment-info-qrcode">
        <img class="qrcode-img" :src="`data:image/png;base64,${qrcodeImg}`" alt="">
      </div>
      <div class="wallet-payment-info-balance">
        <span class="balance-title" v-cloak>{{balanceTitle}}</span><span class="balance-content" v-cloak>{{balanceContent}}</span>
      </div>
    </div>
    <general-button :btnName="btnName"></general-button>
  </div>
</template>

<script>
import generalButton from '../../components/common/generalButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      // qrcodeImg: require('../../assets/images/mcard/qrCode.png'),
      qrcodeImg: '',
      paymentTips: '请出示二维码供收银员扫码收款',
      balanceTitle: '钱包余额：',
      balanceContent: '￥3000',
      code: '', // 用于查付款状态
      isLoop: true,
      btnName: '立即充值'
    }
  },
  components: { generalButton },
  methods: {
    ...mapActions({ getPayQrcode: 'getPayQrcode', getPayStatusByCode: 'getPayStatusByCode' }),
    getQrCode () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getPayQrcode().then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          this.balanceContent = `￥${res.data.balance}`
          this.code = res.data.code
          this.qrcodeImg = res.data.qrcode
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    getPayStatus () {
      this.getPayStatusByCode({ code: this.code }).then((res) => {
        console.log(res)
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    }
  },
  created () {
    this.getQrCode()
  }
}
</script>

<style lang="scss" scoped>
.wallet-payment {
  &-info {
    text-align: center;
    padding: 54px 0 58px 0;
    margin-bottom: 140px;
    background-color: $color-ff;
    &-tips {
      font-size: 28px;
      color: $color-88;
      margin-bottom: 24px;
    }
    &-qrcode {
      width: 409px;
      height: 409px;
      margin: 0 auto;
      .qrcode-img {
        width: 100%;
        height: 100%;
      }
    }
    &-balance {
      font-size: 28px;
      color: $color-88;
      margin-top: 42px;
    }
  }
}
</style>
