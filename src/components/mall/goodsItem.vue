<template>
  <div class="goods-item">
    <div :class="['goods-row',goodsItem.hasBr?'goods-row-br':'']">
      <div class="goods-goods-info">
        <div class="goods-goods-left">
          <div class="goods-img">
            <img class="img-content" :src="goodsItem.goodsImg" alt="">
          </div>
        </div>
        <div class="goods-goods-right">
          <div class="goods-info">
            <div class="goods-introduce" v-cloak>{{goodsItem.goodsIntroduce}}</div>
            <div class="goods-price-num">
              <span class="goods-price" v-cloak>{{goodsItem.goodsPrice}}</span>
              <span class="goods-num" v-cloak>{{goodsItem.goodsNum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodsImg: require('../../assets/images/bought/consumeImg2.png'),
      goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
      goodsPrice: '￥150',
      goodsNum: 'x2',
      decrease: '-',
      number: '18',
      increase: '+',
      hasBr: true
    }
  },
  props: ['goodsItem']
}
</script>

<style lang="scss" scoped>
.goods-item {
  // padding: 20px 32px 0;
  padding: 0 32px;
  background-color: $color-ff;
  .goods-row {
    padding: 56px 0 50px 0;
    position: relative;
    .goods-goods-info {
      display: flex;
      justify-content: flex-start;
      .goods-goods-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .goods-img {
          width: 98px;
          height: 98px;
          .img-content {
            width: 100%;
            height: 100%;
          }
        }
      }
      .goods-goods-right {
        margin-left: 20px;
        .goods-info {
          font-size: 28px;
          .goods-introduce {
            color: $color-35;
            margin-top: 12px;
          }
          .goods-price-num {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .goods-price {
              color: $color-008CA7;
              padding-top: 12px;
            }
            .goods-num {
              color: $color-88;
              padding-right: 16px;
            }
          }
        }
      }
    }
  }
  .goods-row-br {
    border-bottom: 1px solid $color-e5;
  }
}
</style>
