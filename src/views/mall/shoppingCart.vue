<template>
  <div class="shopping-cart">
    <shopping-item :shoppingItem="item" v-for="(item,index) in shoppingList" @getSelectStatus="getSelectStatus" @requestReloadList="requestReloadList" @recalculateMoney="recalculateMoney" @click.native="selectGoods(item)" :key="index"></shopping-item>
    <div class="placeholder-info" v-if="!hasListData">
      <div class="placeholder-img">
        <img class="img-content" :src="placeholderImg" alt="">
        <div class="tips-content" v-cloak>{{tipsContent}}</div>
      </div>
    </div>
    <div class="bottom-info">
      <div class="bottom-info-right" @click="checkAllGoods">
        <div class="check-all">
          <i class="icon-unselected" v-show="!isCheckAll"></i>
          <i class="icon-selected" v-show="isCheckAll"></i>
        </div>
        <span class="check-all-content" v-cloak>{{checkAllContent}}</span>
      </div>
      <div class="bottom-info-left">
        <span class="total" v-cloak>{{total}}</span>
        <span class="total-money" v-cloak>{{totalMoney}}</span>
        <button :class="['btn-content',goodsNum?'':'btn-no-click']" :disabled="!goodsNum" @click="settleAccounts" v-cloak>{{btnContent}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import shoppingItem from '../../components/mall/shoppingItem.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '暂无数据哦~',
      shoppingList: [],
      threshold: 0, // 商品起送门槛
      checkAllContent: '全选',
      isCheckAll: true,
      allServiceFalg: true, // 购物车中是否全部为服务
      total: '总计：',
      totalMoney: '',
      currentMoney: 0,
      btnContent: '',
      goodsNum: 0, // 商品数量
      hasListData: true// false 无数据  true 有数据
    }
  },
  components: { shoppingItem },
  methods: {
    ...mapActions({ getShoppingCartList: 'getShoppingCartList' }),
    /* 加载购物车列表 */
    loadShoppingCartList () {
      this.shoppingList = []
      this.shoppingList.length = 0
      this.currentMoney = 0
      this.getShoppingCartList().then((res) => {
        if (res.status === 200) {
          this.threshold = res.data.threshold
          this.goodsNum = res.data.list.length
          this.btnContent = `结算（${res.data.list.length}）`
          this.hasListData = !!res.data.list.length
          if (!res.data.list.length) {
            this.totalMoney = '￥0.00'
            return
          }
          res.data.list.forEach(shoppingCartItem => {
            this.currentMoney = this.currentMoney + shoppingCartItem.price * shoppingCartItem.number
            this.shoppingList.push({
              isSelected: true, // 跳转购物车页面默认所有商品都选中
              goodsId: shoppingCartItem.id,
              goodsType: shoppingCartItem.type, // 类型：0 服务 1 商品
              goodsImg: shoppingCartItem.image,
              goodsIntroduce: shoppingCartItem.name,
              goodsPrice: `￥${shoppingCartItem.price}`,
              number: shoppingCartItem.number,
              stock: shoppingCartItem.stock, // 库存
              hasBr: true
            })
          })
          if (this.shoppingList.length) this.shoppingList[this.shoppingList.length - 1].hasBr = false
          this.totalMoney = `￥${Number(this.currentMoney).toFixed(2)}`
        }
      }).catch(() => { })
    },
    /* 获取商品被选中的状态 */
    getSelectStatus (statusInfo) {
      let selectedGoodsNum = 0
      this.currentMoney = 0
      /* 切换商品的选中状态之后，重新计算totalMoney */
      this.shoppingList.forEach(shoppingItem => {
        if (shoppingItem.isSelected) {
          selectedGoodsNum += 1
          this.currentMoney = this.currentMoney + Number(shoppingItem.goodsPrice.split('￥')[1]) * shoppingItem.number
        }
      })
      this.totalMoney = `￥${Number(this.currentMoney).toFixed(2)}`
      this.btnContent = `结算（${selectedGoodsNum}）`
      this.goodsNum = selectedGoodsNum
      for (let i = 0; i < this.shoppingList.length; i++) {
        if (!this.shoppingList[i].isSelected) { // 存在未被选中的，this.isCheckAll置为false
          this.isCheckAll = false
          break
        }
        this.isCheckAll = true
      }
    },
    /* 增减商品数量重新计算totalMoney */
    recalculateMoney () {
      this.currentMoney = 0
      /* 切换商品的选中状态之后，重新计算totalMoney */
      this.shoppingList.forEach(shoppingItem => {
        if (shoppingItem.isSelected) {
          this.currentMoney = this.currentMoney + Number(shoppingItem.goodsPrice.split('￥')[1]) * shoppingItem.number
        }
      })
      this.totalMoney = `￥${Number(this.currentMoney).toFixed(2)}`
    },
    /* 全选 */
    checkAllGoods () {
      this.currentMoney = 0
      this.isCheckAll = !this.isCheckAll
      this.isCheckAll ? this.btnContent = `结算（${this.shoppingList.length}）` : this.btnContent = '结算（0）'
      this.isCheckAll ? this.goodsNum = this.shoppingList.length : this.goodsNum = 0
      this.shoppingList.forEach(shoppingItem => {
        this.isCheckAll ? shoppingItem.isSelected = true : shoppingItem.isSelected = false
        if (shoppingItem.isSelected) {
          this.currentMoney = this.currentMoney + Number(shoppingItem.goodsPrice.split('￥')[1]) * shoppingItem.number
        }
      })
      this.totalMoney = `￥${Number(this.currentMoney).toFixed(2)}`
    },
    /* 请求重载数据 */
    requestReloadList () {
      this.loadShoppingCartList()
    },
    /* 结算 */
    settleAccounts () {
      let productListStr = []
      let selectedMoney = 0
      this.shoppingList.forEach(shoppingItem => {
        if (shoppingItem.isSelected) {
          if (shoppingItem.goodsType) { // 类型：0 服务 1 商品
            this.allServiceFalg = false
            selectedMoney += Number(shoppingItem.goodsPrice.split('￥')[1]) * shoppingItem.number
          }
          productListStr.push({
            id: shoppingItem.goodsId,
            number: shoppingItem.number
          })
        }
      })
      if (!productListStr.length) {
        this.$toast({ message: '没有可结算的商品', duration: 1000 })
      } else if (!this.allServiceFalg && selectedMoney < Number(this.threshold)) {
        this.$toast({ message: `不足${this.threshold}元，无法起送`, duration: 1000 })
      } else { // source   1：购物车   2：立即下单
        this.$router.push({ path: '/mall/placeOrder', query: { source: 1, productListStr: JSON.stringify(productListStr) } })
      }
    },
    /* 点击商品跳转商品详情页面 */
    selectGoods (goods) {
      this.$router.push({ path: '/mall/goodsDetail', query: { productId: goods.goodsId } })
    }
  },
  created () {
    this.loadShoppingCartList()
  }
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  padding-bottom: 240px;
  .placeholder-info {
    padding-top: 433px;
    .placeholder-img {
      width: 227px;
      height: 214px;
      margin: 0 auto;
      text-align: center;
      .img-content {
        width: 100%;
        height: 100%;
      }
      .tips-content {
        font-size: 28px;
        color: $color-88;
        margin-top: 30px;
      }
    }
  }
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
      .btn-no-click {
        color: $color-88;
        background: $color-e5;
      }
    }
  }
}
</style>
