<template>
  <div class="recharge">
    <div class="recharge-message-show">
      <div class="wallet-balance">
        <span class="balance-title" v-cloak>{{balanceTitle}}</span>
        <span class="balance-unit" v-cloak>{{balanceUnit}}</span>
        <span class="balance-num" v-cloak>{{balanceNum}}</span>
      </div>
    </div>
    <recharge-info :rechargeList="rechargeList" @getRechargeMess="rechargeMess"></recharge-info>
    <recharge-tips></recharge-tips>
    <div class="recharge-btn">
      <general-button :btnName="btnName" @click.native="confirmRecharge"></general-button>
    </div>
  </div>
</template>

<script>
import rechargeInfo from '../../components/mcard/rechargeInfo.vue'
import rechargeTips from '../../components/mcard/rechargeTips.vue'
import generalButton from '../../components/common/generalButton.vue'
import wx from 'weixin-js-sdk'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      balanceTitle: '钱包余额：',
      balanceUnit: '￥',
      balanceNum: '0',
      btnName: '微信充值0元',
      rechargeList: [], // 充值方案
      rechargeId: ''// 充值方案id
    }
  },
  components: { rechargeInfo, rechargeTips, generalButton },
  methods: {
    ...mapActions({ getRechargeWays: 'getRechargeWays', walletRecharge: 'walletRecharge', getWechatPayConfig: 'getWechatPayConfig' }),
    rechargeMess (recharge) { /* 获取子组件传递过来的值 */
      console.log(recharge)
      this.btnName = `微信充值${recharge.chargeInfo.replace(/[^0-9]/ig, '')}元`
      this.rechargeId = recharge.rechargeId
    },
    confirmRecharge () {
      this.walletRecharge({ parameterId: this.rechargeId }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          // localStorage.setItem('payId', res.data.payId)// 存储支付id
          console.log(res.data.payId)
          this.getWechatPayConfig({ payId: res.data.payId }).then((res) => {
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
                    _this.$toast({ message: '充值成功', duration: 1000 })
                    setTimeout(() => {
                      if (_this.$route.query.openFlag && _this.$route.query.openFlag === 'orderPay') {
                        location.href = decodeURIComponent(`${location.origin}/order/payment`)
                      }
                    }, 1000)
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
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    }
  },
  created () {
    console.log(this.$route.query)
    console.log(this.$route.query.openFlag)
    this.balanceNum = this.$route.query.balanceMoneyContent
    this.getRechargeWays().then((res) => {
      console.log(res)
      if (res.status === 200) {
        let n = 0// 辅助
        let currentItem = []// 辅助
        res.data.list.map((item) => {
          currentItem.push({
            rechargeId: item.id,
            chargeInfo: `充${item.rechargeAmount}元`,
            getInfo: `得${item.givenAmount}元`,
            rechargeSelected: false
          })
          n++
          if (n % 3 === 0) {
            this.rechargeList.push(currentItem)
            currentItem = []
            currentItem.length = 0
          }
        })
        if (currentItem.length !== 0) this.rechargeList.push(currentItem)
        console.log(this.rechargeList)
      }
    }).catch((err) => {
      this.$toast('数据错误')
      throw err
    })
  }
}
</script>

<style lang="scss" scoped>
.recharge {
  .recharge-message-show {
    padding: 0 32px;
    background-color: $color-ff;
    .wallet-balance {
      color: $color-35;
      padding: 6px 0 20px;
      border-bottom: 1px solid $color-e5;
      .balance-title {
        font-size: 28px;
      }
      .balance-unit {
        font-size: 32px;
      }
      .balance-num {
        font-size: 48px;
        font-weight: bold;
      }
    }
  }
  .recharge-btn {
    margin-top: 140px;
  }
}
</style>
