<template>
  <div class="consumption-item">
    <div class="use-info">
      <div class="store-name">
        <i class="icon-address"></i>
        <span class="store-name-content" v-cloak>{{consumptionItem.storeName}}</span>
      </div>
      <div class="pay-time" v-cloak>{{consumptionItem.payTime}}</div>
      <div class="pay-use" v-cloak>{{consumptionItem.payUse}}</div>
    </div>
    <div class="payment-info">
      <div class="payment-title" v-cloak>{{consumptionItem.paymentTile}}</div>
      <div class="payment-money" v-cloak>{{consumptionItem.paymentMoney}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['consumptionItem']
}
</script>

<style lang="scss" scoped>
.consumption-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  background-color: $color-ff;
  margin-bottom: 24px;
  .use-info {
    .store-name {
      .icon-address {
        font-size: 24px;
        color: $color-008CA7;
      }
      .store-name-content {
        font-size: 32px;
        color: $color-35;
        margin-left: 6px;
      }
    }
    .pay-time {
      font-size: 24px;
      color: $color-88;
      padding: 12px 0;
      font-family: PingFang-SC-Medium;
    }
    .pay-use {
      font-size: 26px;
      color: $color-008CA7;
    }
  }
  .payment-info {
    .payment-title {
      font-size: 28px;
      color: $color-88;
      padding-bottom: 8px;
      float: right;
    }
    .payment-money {
      font-size: 28px;
      color: $color-35;
      clear: both;
      float: right;
      font-family: PingFang-SC-Medium;
    }
  }
}
</style>
