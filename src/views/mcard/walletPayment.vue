<template>
  <div class="wallet-payment">
    <div class="wallet-payment-info" v-if="openStatus">
      <div class="wallet-payment-info-tips" v-cloak>{{paymentTips}}</div>
      <div class="wallet-payment-info-qrcode">
        <img class="qrcode-img" :src="`data:image/png;base64,${qrcodeImg}`" alt="">
      </div>
      <div class="wallet-payment-info-balance">
        <span class="balance-title" v-cloak>{{balanceTitle}}</span><span class="balance-content" v-cloak>{{balanceContent}}</span>
      </div>
    </div>
    <general-button :btnName="btnName" @click.native="immediateRecharge" v-if="openStatus"></general-button>
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
      balanceContent: '',
      code: '', // 用于查付款状态
      isLoop: false,
      btnName: '立即充值',
      loop: true,
      openStatus: 0// 0 未开通  1 已开通
    }
  },
  components: { generalButton },
  methods: {
    ...mapActions({ getMyWalletInfo: 'getMyWalletInfo', getPayQrcode: 'getPayQrcode', getPayStatusByCode: 'getPayStatusByCode' }),
    async getQrCode () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      const codeResult = await this.getPayQrcode()
      this.$indicator.close()
      if (codeResult.status === 200) {
        this.balanceContent = `￥${codeResult.data.balance}`
        this.code = codeResult.data.code
        this.qrcodeImg = codeResult.data.qrcode
        while (this.loop) {
          const payStatusResult = await this.getPayStatusByCode({ code: this.code })
          if (payStatusResult.data.status === '1') {
            // this.$messagebox({ title: '提示', message: '付款成功' })
            this.loop = false
            this.$toast({ message: '付款成功', duration: 1000 })
            payStatusResult.data.registerId && localStorage.setItem('registerId', payStatusResult.data.registerId) && setTimeout(() => { this.$router.push({ path: '/arecord/appointmentDetails' }) }, 1000)
            payStatusResult.data.consumptionId && setTimeout(() => { this.$router.push({ path: '/mcard/consumptionDetail', query: { consumptionId: payStatusResult.data.consumptionId } }) }, 1000)
          } else if (payStatusResult.data.status === '2') {
            this.getQrCode()
          }
        }
      }
    },
    /* 立即充值 */
    immediateRecharge () {
      this.$router.push({ path: '/mcard/recharge', query: { balanceMoneyContent: this.balanceContent.split('￥')[1] } })
    },
    /* 加载钱包信息 */
    async loadMyWalletInfo () {
      const result = await this.getMyWalletInfo()
      if (result.status !== 200) {
        // this.$toast({ message: result.message, duration: 1000 })
        return
      }
      this.openStatus = result.data.status
      if (result.data.status) { // 0 未开通  1 已开通
        this.getQrCode()
      } else {
        /* isSetPayPassword: 1, // 是否设置支付密码 1：未设置 2：已设置 */
        this.$router.replace({ path: '/order/payPassword', query: { isSetPayPassword: 1, openFlag: 'walletPay', balanceMoneyContent: result.data.balance } })/* 未设置钱包支付密码也同样处理 */
      }
    }
  },
  created () {
    this.loadMyWalletInfo()
  },
  destroyed () {
    this.loop = false
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
