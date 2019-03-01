<template>
  <div class="date-shopping">
    <div class="shopping-title">
      <div class="shopping-date" v-cloak>{{dateShoppingItem.shoppingDate}}</div>
      <div :class="['shopping-status',dateShoppingItem.shoppingStatus===canceled?'status-other-style':'']" v-cloak>{{dateShoppingItem.shoppingStatus}}</div>
    </div>
    <goods-row :goodsItem="item" v-for="(item,index) in dateShoppingItem.goodsList" :key="'goodsList'+index"></goods-row>
    <div class="result-info">
      <div class="goods-total-num" v-cloak>{{dateShoppingItem.totalNum}}</div>
      <div class="goods-total-money">
        <span class="total-money-title" v-cloak>{{totalMoneyTitle}}</span><span class="total-money-content" v-cloak>{{dateShoppingItem.totalMoneyContent}}</span>
      </div>
    </div>
    <div class="date-shopping-btn">
      <small-button :smallBtnItem="item" v-for="(item,index) in dateShoppingItem.smallBtnList" :key="'smallBtnList'+index"></small-button>
    </div>
  </div>
</template>

<script>
import goodsRow from '../bought/goodsRow.vue'
import smallButton from '../bought/smallButton.vue'
export default {
  data () {
    return {
      shoppingDate: '2018-12-10',
      shoppingStatus: '已完成',
      totalNum: '共2件',
      totalMoneyTitle: '订单金额：',
      totalMoneyContent: '￥336',
      smallBtnName: '查看券码',
      canceled: '已取消'
    }
  },
  props: ['dateShoppingItem'],
  components: { goodsRow, smallButton }
}
</script>

<style lang="scss" scoped>
.date-shopping {
  padding: 18px 0 40px 0;
  margin: 0 0 24px 0;
  background-color: $color-ff;
  .shopping-title {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    padding: 0 32px;
    .shopping-date {
      color: $color-88;
    }
    .shopping-status {
      color: $color-1E8FA5;
    }
    .status-other-style {
      color: $color-88;
    }
  }
  .result-info {
    font-size: 26px;
    margin-top: 8px;
    padding: 30px 32px;
    border-top: 1px solid $color-e5;
    display: flex;
    justify-content: flex-end;
    color: $color-88;
    .goods-total-money {
      margin-left: 12px;
      .total-money-content {
        color: $color-1E8FA5;
      }
    }
  }
  .date-shopping-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 32px;
  }
}
</style>