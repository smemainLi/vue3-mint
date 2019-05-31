<template>
  <div class="payment">
    <div class="payment-show">
      <div class="payment-tip" v-cloak>{{paymentTip}}</div>
      <div class="payment-amount">
        <span class="amount-symbol" v-cloak>{{amountSymbol}}</span>
        <span class="amount-value" v-cloak>{{amountValue}}</span>
      </div>
    </div>
    <div class="payment-method">
      <payment-mode :mode="item" :isSetPayPassword="isSetPayPassword" :orderType="$route.query.orderType" :balanceMoneyContent="balanceMoneyContent" v-for="(item, index) in modeList" @click.native="selectMode(item)" :key="index"></payment-mode>
    </div>
    <general-button :btnName="btnName" :isAgree="isAgree" @click.native="immediatePay"></general-button>
  </div>
</template>

<script>
import paymentMode from '../../components/order/paymentMode.vue'
import generalButton from '../../components/common/generalButton.vue'
import wx from 'weixin-js-sdk'
import { formatHMS } from '../../utils/tools'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      paymentTip: '请在00时00分00秒内完成付款，逾期作废',
      amountSymbol: '￥',
      amountValue: '',
      modeList: [/* 默认存在会员卡支付 */
        { id: 1, modeName: '会员卡支付', selected: true, enough: false, hasBr: true, payImg: require('../../assets/images/order/tdkqLogo.png') }
        // { id: 2, modeName: '微信支付', hasTip: false, selected: false, hasBr: false, payImg: require('../../assets/images/order/wechatPay.png') }
      ],
      btnName: '立即支付',
      balanceMoneyContent: '', // 余额
      isSetPayPassword: 1, // 是否设置支付密码 1：未设置 2：已设置
      isAgree: true// false表示不允许点击  true表示允许点击
    }
  },
  components: { paymentMode, generalButton },
  methods: {
    ...mapActions({ getPayChannel: 'getPayChannel', getWechatPayConfig: 'getWechatPayConfig' }),
    selectMode (mode) {
      this.modeList.map((item) => {
        item.selected = false
      })
      mode.selected = true
    },
    /* 立即支付 */
    immediatePay () {
      if (this.modeList[0].selected) {
        if (this.isSetPayPassword === 1) { // 未设置钱包支付密码
          if (this.$route.query.orderType === 'mallOrder') {
            this.$router.replace({ path: '/order/payPassword', query: { isSetPayPassword: this.isSetPayPassword, openFlag: 'mallOrder', balanceMoneyContent: this.balanceMoneyContent } })/* 未设置钱包支付密码也同样处理 */
          } else if (this.$route.query.orderType === 'upgradeOrder') {
            this.$router.replace({ path: '/order/payPassword', query: { isSetPayPassword: this.isSetPayPassword, openFlag: 'upgradeOrder', balanceMoneyContent: this.balanceMoneyContent } })/* 未设置钱包支付密码也同样处理 */
          } else {
            this.$router.replace({ path: '/order/payPassword', query: { isSetPayPassword: this.isSetPayPassword, openFlag: 'orderPay', balanceMoneyContent: this.balanceMoneyContent } })/* 未设置钱包支付密码也同样处理 */
          }
        } else if (this.modeList[0].enough === false) { // 存在余额不足的时候
          /* 余额不足的时候，要跳转充值页面 */
          if (this.$route.query.orderType === 'mallOrder') this.$router.push({ path: '/mcard/recharge', query: { openFlag: 'mallOrder', balanceMoneyContent: this.balanceMoneyContent } })
          else if (this.$route.query.orderType === 'upgradeOrder') this.$router.push({ path: '/mcard/recharge', query: { openFlag: 'mallOrder', balanceMoneyContent: this.balanceMoneyContent } })
          else this.$router.push({ path: '/mcard/recharge', query: { openFlag: 'orderPay', balanceMoneyContent: this.balanceMoneyContent } })
        } else {
          // 如果用户已经设置了钱包支付密码，当选择会员支付会跳转密码输入页面，否则跳转钱包密码设置页面
          /* 当时接口设计 payType 2 会员钱包 3 微信 4 支付宝 */
          if (this.$route.query.orderType === 'mallOrder' || this.$route.query.openFlag === 'mallOrder') this.$router.replace({ path: '/order/payPassword', query: { payType: 2, orderType: 'mallOrder' } })/* 商城订单支付 */
          else if (this.$route.query.orderType === 'upgradeOrder' || this.$route.query.openFlag === 'upgradeOrder') this.$router.replace({ path: '/order/payPassword', query: { payType: 2, orderType: 'upgradeOrder' } })/* 会员升级支付 */
          else this.$router.replace({ path: '/order/payPassword', query: { payType: 2 } })/* 预约支付 */
        }
      } else {
        // alert('微信支付')
        this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
        this.getWechatPayConfig({ payId: localStorage.getItem('payId') }).then((res) => {
          this.$indicator.close()
          if (res.status === 200) {
            let _this = this
            wx.ready(function () {
              wx.chooseWXPay({
                timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: res.data.paySign, // 支付签名
                success: function (res) {
                  _this.$indicator.close()
                  // 支付成功后的回调函数
                  _this.$toast({ message: '支付成功', duration: 1000 })
                  setTimeout(() => {
                    if (_this.$route.query.orderType === 'mallOrder') location.replace(decodeURIComponent(`${location.origin}/mall/paymentSuccess`))
                    else if (_this.$route.query.orderType === 'upgradeOrder') location.replace(decodeURIComponent(`${location.origin}/mcard/upgradeSuccess`))
                    else location.replace(decodeURIComponent(`${location.origin}/order/orderSuccess`))
                  }, 1000)
                },
                // 支付取消回调函数
                cencel: function (res) {
                  _this.$indicator.close()
                },
                // 支付失败回调函数
                fail: function (res) {
                  _this.$indicator.close()
                },
                complete: function (res) {
                  _this.$indicator.close()
                }
              })
            })
          }
        }).catch((err) => {
          throw err
        })
      }
    },
    /* 获取支付渠道 */
    async loadPayChannel () { // payId存在localStorage
      const result = await this.getPayChannel({ payId: localStorage.getItem('payId') })
      if (result.status !== 200) {
        this.$toast({ message: result.message, duration: 1000 })
        return
      }
      this.amountValue = result.data.cash
      this.balanceMoneyContent = result.data.wealth.balance
      result.data.wealth.balance > result.data.cash ? this.modeList[0].enough = true : this.modeList[0].enough = false// 判断是否存在余额不足 false 存在余额不足  true 不存在余额不足
      this.isSetPayPassword = result.data.wealth.status ? 2 : 1 // status，0 未开通，1 已开通
      if (result.data.weixin.status) { // 支付渠道存在微信支付  result.data.weixin.status 0 不存在，1 存在
        this.modeList.push({ id: 2, modeName: '微信支付', selected: false, enough: true, hasBr: false, payImg: require('../../assets/images/order/wechatPay.png') })
      }
      let timeout = result.data.timeout
      if (timeout > 0) {
        let timer = setInterval(() => {
          this.paymentTip = `请在${formatHMS(timeout)}内完成付款，逾期作废`
          timeout--
          if (timeout < 0) {
            clearInterval(timer)
          }
        }, 1000)
      }
      if (result.data.timeout < 0) {
        this.isAgree = false
        return
      }
      setTimeout(() => {
        this.isAgree = false
      }, Number(result.data.timeout) * 1000)
    }
  },
  created () {
    // this.$router.go(0)// 刷新一次页面，以防止对接微信支付接口存在缓存，出现错误：当前页面的URL未注册：http://tdkq-wx.q-cloud.com/
    if (!sessionStorage.getItem('paymentFirst')) {
      this.$router.go(0)// 强制首次进入页面刷新一次
      sessionStorage.setItem('paymentFirst', '1')
    }
    this.loadPayChannel()
  }
}
</script>

<style lang="scss" scoped>
.payment {
  .payment-show {
    padding: 23px 32px 52px;
    box-sizing: border-box;
    background-color: $color-ff;
    margin-bottom: 23px;
    .payment-tip {
      color: $color-008CA7;
      font-size: 24px;
      margin-bottom: 24px;
    }
    .payment-amount {
      color: $color-35;
      .amount-symbol {
        font-size: 48px;
      }
      .amount-value {
        font-size: 80px;
        font-family: PingFang-SC-Medium;
      }
    }
  }
  .payment-method {
    margin-bottom: 143px;
  }
}
</style>
