<template>
  <div class="shopping-cart">
    <shopping-item :shoppingItem="item" v-for="(item,index) in shoppingList" :key="index"></shopping-item>
    <div class="bottom-info">
      <div class="bottom-info-right">
        <div class="check-all">
          <i class="icon-unselected" v-show="true"></i>
          <i class="icon-selected" v-show="false"></i>
        </div>
        <span class="check-all-content" v-cloak>{{checkAllContent}}</span>
      </div>
      <div class="bottom-info-left">
        <span class="total" v-cloak>{{total}}</span>
        <span class="total-money" v-cloak>{{totalMoney}}</span>
        <button class="btn-content" v-cloak>{{btnContent}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import shoppingItem from '../../components/mall/shoppingItem.vue'
export default {
  data () {
    return {
      /*
        isSelected: true,
        goodsImg: require('../../assets/images/bought/consumeImg1.png'),
        goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
        goodsPrice: '￥150',
        decrease: '-',
        number: '18',
        increase: '+'
      */
      shoppingList: [
        { isSelected: true, goodsImg: require('../../assets/images/bought/consumeImg1.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', number: '18', hasBr: true },
        { isSelected: true, goodsImg: require('../../assets/images/bought/consumeImg1.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', number: '18', hasBr: true },
        { isSelected: true, goodsImg: require('../../assets/images/bought/consumeImg1.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', number: '18', hasBr: true },
        { isSelected: true, goodsImg: require('../../assets/images/bought/consumeImg1.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', number: '18', hasBr: false }
      ],
      checkAllContent: '全选',
      total: '总计：',
      totalMoney: '￥600',
      btnContent: '结算 (1)'
    }
  },
  components: { shoppingItem }
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  .bottom-info {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 98px;
    padding: 0 0 0 32px;
    box-sizing: border-box;
    background-color: $color-ff;
    .bottom-info-right {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .check-all {
        font-size: 32px;
        .icon-unselected {
          color: $color-e5;
        }
        .icon-selected {
          color: $color-008CA7;
        }
      }
      .check-all-content {
        font-size: 28px;
        color: $color-35;
        margin-left: 19px;
      }
    }
    .bottom-info-left {
      display: flex;
      align-items: center;
      .total {
        font-size: 28px;
        color: $color-35;
      }
      .total-money {
        font-size: 32px;
        color: $color-008CA7;
        margin-right: 35px;
      }
      .btn-content {
        font-size: 36px;
        color: $color-ff;
        width: 295px;
        height: 98px;
        border-radius: 8px;
        background: $color-gradient;
      }
    }
  }
}
</style>
