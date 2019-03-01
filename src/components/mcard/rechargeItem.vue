<template>
  <div class="recharge-item">
    <div :class="['item-content',rechargeItem.rechargeSelected?'selected':'']">
      <div class="item-detail">
        <div class="charge-info" v-cloak>{{rechargeItem.chargeInfo}}</div>
        <div class="get-info" v-if="rechargeItem.getInfo!==getZeroYuan" v-cloak>{{rechargeItem.getInfo}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      getZeroYuan: '得0元'
    }
  },
  props: ['rechargeItem']
}
</script>

<style lang="scss" scoped>
.recharge-item {
  margin: 0 16px 20px 0;
  .item-content {
    width: 218px;
    height: 110px;
    color: $color-88;
    border: 1px solid $color-0590AB;
    background-color: $color-ff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    .item-detail {
      color: $color-008CA7;
      .charge-info {
        font-size: 28px;
        font-weight: bold;
      }
      .get-info {
        font-size: 24px;
      }
    }
  }
  .selected {
    width: 218px;
    height: 110px;
    border: 0;
    color: $color-ff;
    background: $color-gradient;
    .item-detail {
      color: $color-ff;
      .charge-info {
        font-size: 28px;
        font-weight: bold;
      }
      .get-info {
        font-size: 24px;
      }
    }
  }
}
</style>
