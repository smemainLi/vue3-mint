<template>
  <div class="shopping-item">
    <div :class="['shopping-row',shoppingItem.hasBr?'shopping-row-br':'']">
      <div class="shopping-goods-info">
        <div class="shopping-goods-left">
          <div class="goods-select" @click.stop="selectCartGoods(shoppingItem)">
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
        <span class="decrease" @click.stop="decreaseNum" v-cloak>{{decrease}}</span>
        <span class="number" v-cloak>{{number}}</span>
        <span class="increase" @click.stop="increaseNum" v-cloak>{{increase}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      goodsImg: require('../../assets/images/bought/consumeImg2.png'),
      goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
      goodsPrice: '￥150',
      decrease: '-',
      number: this.shoppingItem.number,
      increase: '+',
      isSelected: true
    }
  },
  props: ['shoppingItem'],
  methods: {
    ...mapActions({ deleteCartGoods: 'deleteCartGoods', editCartGoodsNum: 'editCartGoodsNum' }),
    /* 减少数量 */
    decreaseNum () {
      if (this.number > 1) {
        this.number--
        this.editCartGoodsNum({ productId: this.shoppingItem.goodsId, number: this.number }).then((res) => {
          if (res.status === 200) {
            this.shoppingItem.number--
            this.$emit('recalculateMoney')
          }
        }).catch(() => { })
      } else {
        this.$messagebox({
          message: '是否删除该商品',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            this.deleteCartGoods({ productId: this.shoppingItem.goodsId }).then((res) => {
              if (res.status === 200) {
                this.$toast({ message: '删除成功', duration: 1000 })
                setTimeout(() => {
                  this.$emit('requestReloadList')// 请求重新加载列表数据
                }, 1000)
              }
            }).catch(() => { })
          }
        })
      }
    },
    /* 增加数量 */
    increaseNum () {
      /* 传递当前加一数量，查询加一数量是否超过库存，如果不超过，this.number+1，否则不允许增加 */
      this.editCartGoodsNum({ productId: this.shoppingItem.goodsId, number: this.number + 1 }).then((res) => {
        if (res.status === 200 && !res.data.exceed) {
          this.number++
          this.shoppingItem.number++
          this.$emit('recalculateMoney')
        } else {
          this.$toast('超出库存，不允许再添加')
        }
      }).catch(() => { })
    },
    /* 选择商品 */
    selectCartGoods (cartGoods) {
      cartGoods.isSelected = !cartGoods.isSelected
      this.$emit('getSelectStatus', { goodsId: cartGoods.goodsId, isSelected: cartGoods.isSelected })
    }
  }
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
            margin-top: 12px;
          }
          .goods-price {
            color: $color-008CA7;
            padding-top: 12px;
          }
        }
      }
    }
    .increase-decrease-box {
      width: 188px;
      height: 68px;
      position: absolute;
      border: 1px solid $color-008CA7;
      border-radius: 4px;
      line-height: 68px;
      padding: 0 14px;
      box-sizing: border-box;
      text-align: center;
      color: $color-008CA7;
      right: 0;
      bottom: 18px;
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
  .shopping-row-br {
    border-bottom: 1px solid $color-e5;
  }
}
</style>
