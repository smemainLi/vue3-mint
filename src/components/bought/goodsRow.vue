<template>
  <div class="goods-row">
    <div :class="['row-info',goodsItem.hasBr?'row-info-br':'']">
      <div class="goods-img">
        <img class="img-content" :src="goodsItem.goodsImg" alt="">
      </div>
      <div class="goods-info" v-cloak>{{goodsItem.goodsInfo}}</div>
      <div class="number-info">
        <div class="goods-price" v-cloak>{{goodsItem.goodsPrice}}</div>
        <div class="goods-number" v-cloak>{{goodsItem.goodsNumber}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsImg: require('../../assets/images/bought/consumeImg2.png'),
      goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
      goodsPrice: '￥168.00',
      goodsNumber: 'x2',
      hasBr: true
    }
  },
  props: ['goodsItem']
}
</script>

<style lang="scss" scoped>
.goods-row {
  padding: 0 32px;
  .row-info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 24px 0;
    .goods-img {
      width: 98px;
      height: 98px;
      .img-content {
        // width: 100%;
        height: 100%;
      }
    }
    .goods-info {
      font-size: 24px;
      color: $color-35;
      margin-left: 20px;
    }
    .number-info {
      font-size: 26px;
      color: $color-88;
      margin-left: 80px;
      .goods-price {
        float: right;
      }
      .goods-number {
        clear: both;
        float: right;
      }
    }
  }
  .row-info-br {
    border-bottom: 1px solid $color-e5;
  }
}
</style>
