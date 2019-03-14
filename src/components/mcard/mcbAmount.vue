<template>
  <div class="mcb-amount">
    <div class="amount-info">
      <div class="amount-rule" v-cloak>{{amountRule}}</div>
      <div class="balance-title" v-cloak>{{balanceTitle}}</div>
      <div class="balance-money">
        <span class="balance-money-unit" v-cloak>{{balanceMoneyUnit}}</span><span class="balance-money-content" v-cloak>{{balanceMoneyContent}}</span>
      </div>
      <div class="cashable-balance" v-cloak>{{cashableBalance}}</div>
    </div>
    <div class="amount-action">
      <div class="amount-recharge" @click="$router.push({path:'/mcard/recharge',query:{balanceMoneyContent:balanceMoneyContent}})">
        <div class="recharge-img">
          <img class="img-content" :src="rechargeImg" alt="">
        </div>
        <div class="recharge-content" v-cloak>{{amountRecharge}}</div>
      </div>
      <div class="amount-payment" @click="$router.push({path:'/mcard/walletPayment'})">
        <div class="payment-img">
          <img class="img-content" :src="paymentImg" alt="">
        </div>
        <div class="payment-content" v-cloak>{{amountPayment}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amountRule: '会员卡金额规则>>',
      balanceTitle: '卡内余额',
      // balanceMoneyContent: '8690.50',
      balanceMoneyUnit: '￥',
      // cashableBalance: '可提现余额：￥280',
      amountRecharge: '充值',
      amountPayment: '付款',
      rechargeImg: require('../../assets/images/mcard/recharge.png'),
      paymentImg: require('../../assets/images/mcard/payment.png')
    }
  },
  props: ['balanceMoneyContent', 'cashableBalance']
}
</script>

<style lang="scss" scoped>
.mcb-amount {
  .amount-info {
    height: 375px;
    background: url("../../assets/images/mcard/amountBg.png") no-repeat center;
    background-size: 100% 375px;
    color: $color-ff;
    padding: 0 32px;
    .amount-rule {
      display: flex;
      justify-content: flex-end;
      font-size: 28px;
      padding-top: 30px;
    }
    .balance-title {
      margin-top: 2px;
      font-size: 28px;
    }
    .balance-money {
      margin-top: 6px;
      .balance-money-content {
        font-size: 76px;
        font-weight: bold;
        font-family: PingFang-SC-Heavy;
      }
      .balance-money-unit {
        font-size: 37px;
      }
    }
    .cashable-balance {
      font-size: 28px;
      color: $color-ff;
      margin-top: 22px;
    }
  }
  .amount-action {
    width: 686px;
    height: 80px;
    font-size: 28px;
    color: $color-35;
    margin: -70px 32px 0;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    background-color: $color-ff;
    box-shadow: 0px 12px 7px 0px rgba($color: $color-EADCDC, $alpha: 0.45);
    .amount-recharge,
    .amount-payment {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .recharge-img,
      .payment-img {
        width: 48px;
        height: 48px;
        .img-content {
          width: 100%;
          height: 100%;
        }
      }
      .recharge-content,
      .payment-content {
        margin-left: 24px;
      }
    }
    .amount-payment {
      box-sizing: border-box;
      border-left: 1px solid $color-e5;
    }
  }
}
</style>
