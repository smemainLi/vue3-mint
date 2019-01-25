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
      <payment-mode :mode="item" v-for="(item, index) in modeList" @click.native="selectMode(item)" :key="index"></payment-mode>
    </div>
    <general-button :btnName="btnName" @click.native="immediatePay"></general-button>
  </div>
</template>

<script>
import paymentMode from '../../components/order/paymentMode.vue'
import generalButton from '../../components/common/generalButton.vue'

export default {
  data () {
    return {
      paymentTip: '请在10分钟内完成付款，逾期作废',
      amountSymbol: '￥',
      amountValue: '8.00',
      modeList: [
        { id: 1, modeName: '会员卡支付', hasTip: true, selected: true, hasBr: true, payImg: require('../../assets/images/order/tdkqLogo.png') },
        { id: 2, modeName: '微信支付', hasTip: false, selected: false, hasBr: false, payImg: require('../../assets/images/order/wechatPay.png') }
      ],
      btnName: '立即支付'
    }
  },
  components: { paymentMode, generalButton },
  methods: {
    selectMode (mode) {
      this.modeList.map((item) => {
        item.selected = false
      })
      mode.selected = true
    },
    immediatePay () {
      if (this.modeList[0].selected) {
        // 如果用户已经设置了钱包支付密码，当选择会员支付会跳转密码输入页面，否则跳转钱包密码设置页面
        this.$router.push({ path: '/order/payPassword', query: { payType: 2 } })
      } else {
        alert('微信支付')
      }
    }
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
