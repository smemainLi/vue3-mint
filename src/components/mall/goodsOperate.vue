<template>
  <div class="goods-operate">
    <div class="operate-shopping-cart" @click="loginStatus?$router.push({ path: '/mall/shoppingCart' }):$router.push({ path: '/mcard/login' })">
      <i class="icon-shopping-cart-operation">
        <span class="cart-goods-num" v-show="cartGoodsNum" v-cloak>{{cartGoodsNum}}</span>
      </i>
    </div>
    <div class="operate-button">
      <button class="add-shopping-cart" @click="addShoppingCartAction" v-cloak>{{addIntoCart}}</button>
      <button class="immediate-purchase" @click="immediatePurchaseAction" v-cloak>{{immediatePurchase}}</button>
    </div>

    <van-popup v-model="shoppingCartPopup" :close-on-click-overlay="false" position="bottom">
      <div class="shopping-cart-popup">
        <div class="goods-self-info">
          <div class="self-info-left">
            <span class="goods-current-price" v-cloak>{{goodsOperateInfo.goodsCurrentPrice}}</span>
            <span class="goods-current-inventory" v-cloak>{{goodsOperateInfo.goodsCurrentInventory}}</span>
          </div>
          <div class="self-info-right" @click.stop="shoppingCartPopup=false">
            <span class="cart-popup-close" v-cloak>{{cartPopupClose}}</span>
          </div>
        </div>
        <div class="goods-num-display">
          <span class="num-display-title" v-cloak>{{numDisplayTitle}}</span>
          <div class="increase-decrease-box">
            <span class="decrease" @click.stop="decreaseNum" v-cloak>{{decrease}}</span>
            <span class="number" v-cloak>{{number}}</span>
            <span class="increase" @click.stop="increaseNum" v-cloak>{{increase}}</span>
          </div>
        </div>
        <button class="confirm-button" @click="submitInfo" v-cloak>{{confirmBtn}}</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      addIntoCart: '加入购物车',
      immediatePurchase: '立即购买',
      shoppingCartPopup: false,
      goodsCurrentPrice: '￥58',
      goodsCurrentInventory: '（库存4500）',
      cartPopupClose: '×',
      numDisplayTitle: '数量',
      decrease: '-',
      number: 1,
      increase: '+',
      confirmBtn: '确定',
      jumpFlag: 0// 0 添加购物车操作 1 立即购买操作
    }
  },
  props: ['goodsOperateInfo', 'loginStatus'],
  computed: {
    ...mapGetters(['cartGoodsNum'])
  },
  methods: {
    ...mapActions({ addShoppingCart: 'addShoppingCart', getCartGoodsNum: 'getCartGoodsNum', orderPageData: 'orderPageData' }),
    /* 减少数量 */
    decreaseNum () {
      this.number > 1 && this.number--
    },
    /* 增加数量 */
    increaseNum () {
      this.number < this.goodsOperateInfo.stockNum && this.number++
    },
    /* 添加购物车 */
    addShoppingCartAction () {
      this.number = 1
      if (!this.loginStatus) this.$router.push({ path: '/mcard/login' })
      else {
        this.jumpFlag = 0
        this.shoppingCartPopup = true
      }
    },
    /* 立即购买 */
    immediatePurchaseAction () {
      this.number = 1
      if (!this.loginStatus) this.$router.push({ path: '/mcard/login' })
      else {
        this.jumpFlag = 1
        this.shoppingCartPopup = true
      }
    },
    /* 添加购物车 */
    async shoppingCartAdd () {
      const result = await this.addShoppingCart({ number: this.number, productId: this.goodsOperateInfo.goodsId })
      this.$toast({ message: result.message, duration: 1000 })
      if (result.status === 200) {
        this.shoppingCartPopup = false
        this.getCartGoodsNum()// 获取购物车商品数量
      }
    },
    /* 提交数据 */
    async submitInfo () {
      if (this.jumpFlag) { //  jumpFlag   0：立即下单   1：立即下单    source   1：购物车   2：立即下单
        const result = await this.orderPageData({ productListStr: JSON.stringify([{ id: this.goodsOperateInfo.goodsId, number: this.number }]) })
        this.$toast({ message: result.message, duration: 1000 })
        if (result.status !== 200) return
        // goodsType  0：服务  1：商品
        if (this.goodsOperateInfo.goodsType) {
          if (Number(this.goodsOperateInfo.goodsCurrentPrice.split('￥')[1]) * this.number < Number(this.goodsOperateInfo.threshold)) {
            this.$toast({ message: `不足${this.goodsOperateInfo.threshold}元，无法起送`, duration: 1000 })
            return
          }
        }
        this.$router.push({ path: '/mall/placeOrder', query: { source: 2, productListStr: JSON.stringify([{ id: this.goodsOperateInfo.goodsId, number: this.number }]) } })
      } else {
        this.shoppingCartAdd()
      }
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
        // width: 26px;
        height: 26px;
        font-size: 24px;
        position: absolute;
        top: -12px;
        right: -12px;
        // padding-bottom: 2px;
        padding: 0 6px 2px;
        box-sizing: border-box;
        color: #ffffff;
        text-align: center;
        border-radius: 26px;
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
        width: 188px;
        height: 68px;
        border: 1px solid $color-008CA7;
        border-radius: 4px;
        line-height: 68px;
        padding: 0 14px;
        box-sizing: border-box;
        text-align: center;
        color: $color-008CA7;
        .decrease {
          float: left;
          font-size: 36px;
        }
        .increase {
          float: right;
          font-size: 36px;
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
