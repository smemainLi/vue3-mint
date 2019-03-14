<template>
  <div class="place-order">
    <address-status :testStatus="testStatus"></address-status>
    <goods-item :goodsItem="item" v-for="(item,index) in goodsList" :key="index"></goods-item>
    <div class="place-order-remard">
      <div class="order-freight">
        <span class="freight-title" v-cloak>{{freightTitle}}</span><span class="freight-content" v-cloak>{{freightContent}}</span>
      </div>
      <div class="order-leaving-message">
        <span class="message-title" v-cloak>{{messageTitle}}</span><input class="message-content" type="text" :placeholder="messagePlaceholder" v-model="leavingMessage">
      </div>
      <div class="order-full-reduction">
        <span class="reduction-title" v-cloak>{{reductionTitle}}</span><span class="reduction-content" v-cloak>{{reductionContent}}</span>
      </div>
      <div class="order-coupon">
        <span class="coupon-title" v-cloak>{{couponTitle}}</span>
        <div class="right-info">
          <span class="coupon-content" v-cloak>{{couponContent}}</span>
          <div class="right-arrow">
            <img class="arrow-img" :src="rightArrow" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-info">
      <div class="total-content" v-cloak>{{totalContent}}</div>
      <div class="bottom-info-left">
        <div class="acount-info">
          <div class="total-money" v-cloak>{{totalMoney}}</div>
          <div class="discount-money" v-cloak>{{discountMoney}}</div>
        </div>
        <button class="btn-content" v-cloak>{{btnContent}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import addressStatus from '../../components/mall/addressStatus.vue'
import goodsItem from '../../components/mall/goodsItem.vue'
export default {
  data () {
    return {
      goodsList: [
        { goodsImg: require('../../assets/images/bought/consumeImg2.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', goodsNum: 'x2', hasBr: true },
        { goodsImg: require('../../assets/images/bought/consumeImg2.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', goodsNum: 'x2', hasBr: true },
        { goodsImg: require('../../assets/images/bought/consumeImg2.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', goodsNum: 'x2', hasBr: false }
      ],
      freightTitle: '运费',
      freightContent: '￥10',
      messageTitle: '留言',
      leavingMessage: '',
      messagePlaceholder: '关于商品配送的备注',
      reductionTitle: '满减',
      reductionContent: '-30元',
      couponTitle: '优惠券',
      couponContent: '-30元',
      rightArrow: require('../../assets/images/mcard/arrow.png'),
      totalContent: '总计：',
      btnContent: '提交订单',
      totalMoney: '￥150',
      discountMoney: '已优惠￥30',
      testStatus: true// 测试
    }
  },
  components: { addressStatus, goodsItem }
}
</script>

<style lang="scss" scoped>
.place-order {
  padding-bottom: 160px;
  .place-order-remard {
    padding: 0 32px;
    margin-top: 24px;
    background-color: $color-ff;
    .order-freight {
      font-size: 28px;
      padding: 24px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $color-e5;
      .freight-title {
        color: $color-35;
      }
      .freight-content {
        color: $color-008CA7;
        margin-left: 24px;
      }
    }
    .order-leaving-message {
      font-size: 28px;
      padding: 24px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $color-e5;
      .message-title {
        color: $color-35;
      }
      .message-content {
        width: 80%;
        color: $color-35;
        margin-left: 24px;
      }
    }
    .order-full-reduction {
      font-size: 28px;
      padding: 24px 0;
      border-bottom: 1px solid $color-e5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .reduction-title {
        color: $color-35;
      }
      .reduction-content {
        color: $color-008CA7;
      }
    }
    .order-coupon {
      font-size: 28px;
      padding: 24px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .coupon-title {
        color: $color-35;
      }
      .right-info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .coupon-content {
          color: $color-008CA7;
        }
        .right-arrow {
          width: 40px;
          height: 40px;
          margin-left: 8px;
          .arrow-img {
            width: 100%;
            height: 100%;
          }
        }
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
    .total-content {
      font-size: 28px;
      color: $color-35;
    }
    .bottom-info-left {
      display: flex;
      align-items: center;
      .acount-info {
        margin-right: 24px;
        .total-money {
          float: right;
          font-size: 32px;
          color: $color-008CA7;
        }
        .discount-money {
          clear: both;
          float: right;
          font-size: 20px;
          color: $color-00;
        }
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
