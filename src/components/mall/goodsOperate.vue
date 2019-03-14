<template>
  <div class="goods-operate">
    <div class="operate-shopping-cart">
      <i class="icon-shopping-cart-operation">
        <span class="cart-goods-num" v-cloak>{{cartGoodsNum}}</span>
      </i>
    </div>
    <div class="operate-button">
      <button class="add-shopping-cart" @click="shoppingCartPopup=true" v-cloak>{{addShoppingCart}}</button>
      <button class="immediate-purchase" @click="$router.push('/mall/placeOrder')" v-cloak>{{immediatePurchase}}</button>
    </div>

    <van-popup v-model="shoppingCartPopup" :close-on-click-overlay="false" position="bottom">
      <div class="shopping-cart-popup">
        <div class="goods-self-info">
          <div class="self-info-left">
            <span class="goods-current-price" v-cloak>{{goodsCurrentPrice}}</span>
            <span class="goods-current-inventory" v-cloak>{{goodsCurrentInventory}}</span>
          </div>
          <div class="self-info-right" @click.stop="shoppingCartPopup=false">
            <span class="cart-popup-close" v-cloak>{{cartPopupClose}}</span>
          </div>
        </div>
        <div class="goods-num-display">
          <span class="num-display-title" v-cloak>{{numDisplayTitle}}</span>
          <div class="increase-decrease-box">
            <span class="decrease" v-cloak>{{decrease}}</span>
            <span class="number" v-cloak>{{number}}</span>
            <span class="increase" v-cloak>{{increase}}</span>
          </div>
        </div>
        <button class="confirm-button" v-cloak>{{confirmBtn}}</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartGoodsNum: 9,
      addShoppingCart: '加入购物车',
      immediatePurchase: '立即购买',
      shoppingCartPopup: false,
      goodsCurrentPrice: '￥58',
      goodsCurrentInventory: '（库存4500）',
      cartPopupClose: '×',
      numDisplayTitle: '数量',
      decrease: '-',
      number: '18',
      increase: '+',
      confirmBtn: '确定'
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-operate {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 98px;
  box-sizing: border-box;
  background-color: $color-ff;
  .operate-shopping-cart {
    width: 158px;
    display: flex;
    justify-content: center;
    .icon-shopping-cart-operation {
      font-size: 48px;
      color: $color-028EA9;
      position: relative;
      .cart-goods-num {
        display: inline-block;
        width: 26px;
        height: 26px;
        font-size: 24px;
        position: absolute;
        top: -12px;
        right: -10px;
        padding-bottom: 2px;
        box-sizing: border-box;
        color: #ffffff;
        text-align: center;
        border-radius: 50%;
        background-color: $color-F56E72;
      }
    }
  }
  .operate-button {
    .add-shopping-cart {
      font-size: 36px;
      color: $color-028EA9;
      width: 295px;
      height: 98px;
      border-radius: 8px;
      background: $color-F2FDFF;
    }
    .immediate-purchase {
      font-size: 36px;
      color: $color-ff;
      width: 295px;
      height: 98px;
      border-radius: 8px;
      background: $color-gradient;
    }
  }
  .shopping-cart-popup {
    .goods-self-info {
      padding: 18px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid $color-f5;
      .self-info-left {
        display: flex;
        align-items: center;
        .goods-current-price {
          font-size: 32px;
          color: $color-008CA7;
        }
        .goods-current-inventory {
          font-size: 28px;
          color: $color-88;
        }
      }
      .self-info-right {
        .cart-popup-close {
          font-size: 52px;
          color: $color-35;
        }
      }
    }
    .goods-num-display {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 32px;
      .num-display-title {
        font-size: 28px;
        color: $color-35;
      }
      .increase-decrease-box {
        width: 156px;
        height: 46px;
        font-size: 24px;
        border: 1px solid $color-008CA7;
        border-radius: 4px;
        line-height: 42px;
        padding: 0 14px;
        box-sizing: border-box;
        text-align: center;
        color: $color-008CA7;
        .decrease {
          float: left;
        }
        .increase {
          float: right;
        }
      }
    }
    .confirm-button {
      width: 100%;
      height: 98px;
      font-size: 36px;
      color: $color-ff;
      background: $color-gradient;
    }
  }
}
</style>
