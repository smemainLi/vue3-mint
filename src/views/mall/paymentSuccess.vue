<template>
  <div class="payment-success">
    <div class="image-word-info">
      <div class="image-display">
        <div class="success-img">
          <img class="img-content" :src="paySuccessImg" alt="">
        </div>
      </div>
      <div class="delivery-tips" v-cloak>{{deliveryTips}}</div>
    </div>
    <div class="success-buttons">
      <button class="com-button return-button" @click="$router.push('/mall/index/0')" v-cloak>{{returnButton}}</button>
      <button class="com-button order-list-button" @click="$router.push('/bought/index')" v-cloak>{{orderListButton}}</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      paySuccessImg: require('../../assets/images/bought/paySuccessImg.png'),
      deliveryTips: '如购买了服务请到订单详情处预约使用',
      returnButton: '返回',
      orderListButton: '订单列表'
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-success {
  .image-word-info {
    padding: 0 32px;
    background-color: $color-ff;
    .image-display {
      padding: 36px 0 52px 0;
      border-bottom: 1px solid $color-e5;
      .success-img {
        width: 236px;
        height: 198px;
        margin: 0 auto;
        .img-content {
          width: 100%;
          height: 100%;
        }
      }
    }
    .delivery-tips {
      text-align: center;
      font-size: 24px;
      color: $color-88;
      padding: 30px 0 66px 0;
    }
  }
  .success-buttons {
    padding: 130px 32px 0;
    display: flex;
    justify-content: space-between;
    .com-button {
      width: 324px;
      height: 88px;
      border-radius: 8px;
      font-size: 36px;
    }
    .return-button {
      color: $color-008CA7;
      border: 1px solid $color-008CA7;
      background-color: $color-f5;
    }
    .order-list-button {
      color: $color-ff;
      background: $color-gradient;
    }
  }
}
</style>
