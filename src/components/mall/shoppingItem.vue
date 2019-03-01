<template>
  <div class="shopping-item">
    <div :class="['shopping-row',shoppingItem.hasBr?'shopping-row-br':'']">
      <div class="shopping-goods-info">
        <div class="shopping-goods-left">
          <div class="goods-select">
            <i class="icon-unselected" v-show="!shoppingItem.isSelected"></i>
            <i class="icon-selected" v-show="shoppingItem.isSelected"></i>
          </div>
          <div class="goods-img">
            <img class="img-content" :src="shoppingItem.goodsImg" alt="">
          </div>
        </div>
        <div class="shopping-goods-right">
          <div class="goods-info">
            <div class="goods-introduce" v-cloak>{{shoppingItem.goodsIntroduce}}</div>
            <div class="goods-price" v-cloak>{{shoppingItem.goodsPrice}}</div>
          </div>
        </div>
      </div>
      <div class="increase-decrease-box">
        <span class="decrease" v-cloak>{{decrease}}</span>
        <span class="number" v-cloak>{{shoppingItem.number}}</span>
        <span class="increase" v-cloak>{{increase}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsImg: require('../../assets/images/bought/consumeImg1.png'),
      goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
      goodsPrice: '￥150',
      decrease: '-',
      number: '18',
      increase: '+',
      isSelected: true
    }
  },
  props: ['shoppingItem']
}
</script>

<style lang="scss" scoped>
.shopping-item {
  // padding: 20px 32px 0;
  padding: 0 32px;
  background-color: $color-ff;
  .shopping-row {
    padding: 56px 0 50px 0;
    position: relative;
    .shopping-goods-info {
      display: flex;
      justify-content: space-between;
      .shopping-goods-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .goods-select {
          font-size: 32px;
          .icon-unselected {
            color: $color-e5;
          }
          .icon-selected {
            color: $color-008CA7;
          }
        }
        .goods-img {
          width: 98px;
          height: 98px;
          margin-left: 28px;
          .img-content {
            width: 100%;
            height: 100%;
          }
        }
      }
      .shopping-goods-right {
        .goods-info {
          width: 500px;
          font-size: 28px;
          .goods-introduce {
            color: $color-35;
            margin-top: 6px;
          }
          .goods-price {
            color: $color-008CA7;
            padding-top: 6px;
          }
        }
      }
    }
    .increase-decrease-box {
      width: 156px;
      height: 46px;
      font-size: 24px;
      position: absolute;
      border: 1px solid $color-008CA7;
      border-radius: 4px;
      line-height: 42px;
      padding: 0 14px;
      box-sizing: border-box;
      text-align: center;
      color: $color-008CA7;
      right: 0;
      top: 153px;
      .decrease {
        float: left;
      }
      .increase {
        float: right;
      }
    }
  }
  .shopping-row-br {
    border-bottom: 1px solid $color-e5;
  }
}
</style>
