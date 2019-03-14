<template>
  <div class="goods-main">
    <div class="goods-main-img">
      <img class="img-content" :src="mainImg" alt="">
    </div>
    <div class="goods-main-info">
      <div class="main-price-flag">
        <span class="current-price" v-cloak>{{currentPrice}}</span>
        <span class="old-price" v-cloak>{{oldPrice}}</span>
        <span class="star-product" v-cloak>{{starProduct}}</span>
      </div>
      <div class="main-name" v-cloak>{{mainName}}</div>
      <div class="main-introduct" v-cloak>{{mainIntroduct}}</div>
      <div class="main-num">
        <span class="sales-volume" v-cloak>{{salesVolume}}</span>
        <span class="full-discount" v-cloak>{{fullDiscount}}</span>
        <span class="stock-balance" v-cloak>{{stockBalance}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainImg: require('../../assets/images/mall/goodsMainImg.png'),
      currentPrice: '￥98',
      oldPrice: '580',
      starProduct: '明星产品',
      mainName: '日本Propolinse比那氏蜂胶漱口水600ML',
      mainIntroduct: '入口是蜂胶特有的那种酸涩味配合绿茶香，能有效将口腔中蛋白质污垢固化。清新口气，防止口气。天后王菲的梳妆台上也有TA！！',
      salesVolume: '销量：555',
      fullDiscount: '全场满99起送',
      stockBalance: '库存：4566'
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-main {
  background-color: $color-ff;
  .goods-main-img {
    height: 562px;
    .img-content {
      width: 100%;
      height: 100%;
    }
  }
  .goods-main-info {
    padding: 0 32px;
    .main-price-flag {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      margin-top: 32px;
      .current-price {
        font-size: 36px;
        color: $color-008CA7;
      }
      .old-price {
        font-size: 26px;
        color: $color-88;
        margin: 0 16px;
        text-decoration: line-through;
      }
      .star-product {
        display: inline-block;
        font-size: 24px;
        color: $color-E08282;
        border-radius: 4px;
        margin-top: 10px;
        padding: 0 6px;
        border: 1px solid $color-E08282;
      }
    }
    .main-name {
      font-size: 32px;
      color: $color-35;
      margin-top: 22px;
    }
    .main-introduct {
      font-size: 28px;
      color: $color-88;
      margin-top: 28px;
    }
    .main-num {
      font-size: 26px;
      color: $color-008CA7;
      padding-bottom: 34px;
      margin-top: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
