<template>
  <div class="payment-mode">
    <div class="mode-row">
      <div class="font-content">
        <div :class="['pay-image',mode.id===2?'pay-image-or':'']">
          <img class="image-style" :src="mode.payImg" alt="">
        </div>
        <div class="mode-name" v-cloak>{{mode.modeName}}</div>
        <div class="mode-tip" v-show="mode.id===1 && (isSetPayPassword===1 || !mode.enough)" @click="modeRecharge" v-cloak>
          {{isSetPayPassword===1 ? modeTipO : !mode.enough ? modeTipT : ''}}
          <span class="right-arrow" v-cloak>{{rightArrow}}</span>
        </div>
      </div>
      <div class="mode-select">
        <i class="icon-unselected" v-show="!mode.selected"></i>
        <i class="icon-selected" v-show="mode.selected"></i>
      </div>
    </div>
    <div class="field-br" v-show="mode.hasBr">
      <hr class="br-style">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modeTipO: '开通会员卡，更多优惠',
      modeTipT: '余额不足，充值省超多',
      rightArrow: '>>'
    }
  },
  props: ['mode', 'isSetPayPassword', 'orderType', 'balanceMoneyContent'],
  methods: {
    modeRecharge () {
      if (this.isSetPayPassword === 1) {
        if (this.orderType === 'mallOrder') {
          this.$router.replace({ path: '/order/payPassword', query: { isSetPayPassword: this.isSetPayPassword, openFlag: 'mallOrder', balanceMoneyContent: this.balanceMoneyContent } })/* 未设置钱包支付密码也同样处理 */
        } else if (this.orderType === 'upgradeOrder') {
          this.$router.replace({ path: '/order/payPassword', query: { isSetPayPassword: this.isSetPayPassword, openFlag: 'upgradeOrder', balanceMoneyContent: this.balanceMoneyContent } })/* 未设置钱包支付密码也同样处理 */
        } else {
          this.$router.replace({ path: '/order/payPassword', query: { isSetPayPassword: this.isSetPayPassword, openFlag: 'orderPay', balanceMoneyContent: this.balanceMoneyContent } })/* 未设置钱包支付密码也同样处理 */
        }
      } else {
        this.$router.push({ path: '/mcard/recharge', query: { openFlag: 'orderPay', balanceMoneyContent: this.balanceMoneyContent } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-mode {
  background-color: $color-ff;
  .mode-row {
    height: 88px;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .font-content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .pay-image {
        width: 48px;
        height: 48px;
        .image-style {
          width: 100%;
          height: 100%;
        }
      }
      .pay-image-or {
        width: 50px;
        height: 44px;
      }
      .mode-name {
        margin-left: 43px;
        color: $color-88;
        font-size: 28px;
      }
      .mode-tip {
        font-size: 24px;
        color: $color-008CA7;
        margin-left: 26px;
        .right-arrow {
          font-size: 22px;
        }
      }
    }
    .mode-select {
      font-size: 32px;
      .icon-unselected {
        color: $color-e5;
      }
      .icon-selected {
        color: $color-008CA7;
      }
    }
  }
  .field-br {
    padding: 0 32px;
    box-sizing: border-box;
    text-align: center;
    background-color: $color-ff;
    border: 0;
    height: 1px;
    .br-style {
      border: 1px solid $color-e5;
    }
  }
}
</style>
