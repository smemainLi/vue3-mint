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
      <payment-mode :mode="item" :isSetPayPassword="isSetPayPassword" v-for="(item, index) in modeList" @click.native="selectMode(item)" :key="index"></payment-mode>
    </div>
    <general-button :btnName="btnName" @click.native="immediatePay"></general-button>
  </div>
</template>

<script>
import paymentMode from '../../components/order/paymentMode.vue'
import generalButton from '../../components/common/generalButton.vue'
import wx from 'weixin-js-sdk'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      paymentTip: '请在10分钟内完成付款，逾期作废',
      amountSymbol: '￥',
      amountValue: '',
      modeList: [/* 默认存在会员卡支付 */
        { id: 1, modeName: '会员卡支付', selected: true, enough: false, hasBr: true, payImg: require('../../assets/images/order/tdkqLogo.png') }
        // { id: 2, modeName: '微信支付', hasTip: false, selected: false, hasBr: false, payImg: require('../../assets/images/order/wechatPay.png') }
      ],
      btnName: '立即支付',
      balanceMoneyContent: '', // 余额
      isSetPayPassword: 1 // 是否设置支付密码 1：未设置 2：已设置
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
          this.$router.push({ path: '/order/payPassword', query: { isSetPayPassword: this.isSetPayPassword, openFlag: 'orderPay', balanceMoneyContent: this.balanceMoneyContent } })
        } else if (this.modeList[0].enough === false) { // 存在余额不足的时候
          /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!余额不足的时候，要跳转充值页面!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
          this.$router.push({ path: '/mcard/recharge', query: { openFlag: 'orderPay', balanceMoneyContent: this.balanceMoneyContent } })
        } else {
          // 如果用户已经设置了钱包支付密码，当选择会员支付会跳转密码输入页面，否则跳转钱包密码设置页面
          this.$router.push({ path: '/order/payPassword', query: { payType: 2 } })/* 当时接口设计 2 会员钱包 3 微信 4 支付宝 */
        }
      } else {
        // alert('微信支付')
        this.getWechatPayConfig({ payId: localStorage.getItem('payId') }).then((res) => {
          console.log(res)
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
                  // 支付成功后的回调函数
                  _this.$toast({ message: '支付成功', duration: 1000 })
                  setTimeout(() => {
                    location.href = decodeURIComponent(`${location.origin}/order/orderSuccess`)
                  }, 1000)
                  // console.log(res)
                  // this.$toast({ message: '支付成功', duration: 1000 })
                  // setTimeout(() => {
                  //   this.$router.push({ path: '/order/orderSuccess' })
                  // }, 1000)
                },
                // 支付取消回调函数
                cencel: function (res) {
                  console.log(res)
                  console.log('用户取消支付~')
                },
                // 支付失败回调函数
                fail: function (res) {
                  console.log(res)
                  console.log('支付失败~')
                }
              })
            })
          }
        }).catch((err) => {
          console.log('数据错误')
          throw err
        })
      }
    }
  },
  created () {
    this.$router.go(0)// 刷新一次页面，以防止对接微信支付接口存在缓存
    /* 获取支付渠道 */
    this.getPayChannel({ payId: localStorage.getItem('payId') }).then((res) => {
      console.log(res)
      /* 就是用户还没有开通钱包密码
          Sme_面 2019/2/23 15:51:06
          这个余额不足就不显示出来
      */
      if (res.status === 200) {
        this.amountValue = res.data.cash
        console.log(res.data.wealth.balance)

        this.balanceMoneyContent = res.data.wealth.balance
        res.data.wealth.balance > res.data.cash ? this.modeList[0].enough = true : this.modeList[0].enough = false// 判断是否存在余额不足 false 存在余额不足  true 不存在余额不足
        this.isSetPayPassword = res.data.wealth.status ? 2 : 1 // status，0 未开通，1 已开通
        if (res.data.weixin.status) { // 支付渠道存在微信支付  res.data.weixin.status 0 不存在，1 存在
          this.modeList.push({ id: 2, modeName: '微信支付', selected: false, enough: true, hasBr: false, payImg: require('../../assets/images/order/wechatPay.png') })
        }
      }
    }).catch((err) => {
      console.log('数据错误')
      throw err
    })
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
