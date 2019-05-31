<template>
  <div class="goods">
    <div class="goods-img">
      <img class="img-content" v-lazy="goodsItem.goodsImg||goodsImgPlaceholder" alt="">
    </div>
    <div class="goods-introduce" v-html="goodsItem.goodsIntroduce"></div>
    <div class="last-row">
      <div class="goods-price" v-cloak>{{goodsItem.goodsPrice}}</div>
      <div class="goods-num" v-cloak>{{goodsItem.goodsNum}}</div>
    </div>
    <div class="goods-star" v-show="goodsItem.note" v-cloak>
      <img class="star-img" :src="goodsItem.note" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      starProducts: '明星产品',
      goodsImgPlaceholder: require('../../assets/images/order/tdkqLogo.png')
    }
  },
  props: ['goodsItem']
}
</script>

<style lang="scss" scoped>
.goods {
  .goods-img {
    width: 338px;
    height: 338px;
    .img-content {
      width: 100%;
      height: 100%;
    }
  }
  .goods-introduce {
    width: 338px;
    font-size: 28px;
    color: $color-35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 12px;
  }
  .last-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 22px;
    .goods-price {
      font-size: 32px;
      color: $color-008CA7;
    }
    .goods-num {
      font-size: 24px;
      color: $color-88;
      margin-right: 28px;
    }
  }
  .goods-star {
    // display: inline-block;
    // font-size: 24px;
    // color: $color-E08282;
    // border-radius: 4px;
    // margin-top: 10px;
    // padding: 0 6px;
    // border: 1px solid $color-E08282;
    width: 105px;
    height: 36px;
    .star-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
