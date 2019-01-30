<template>
  <div class="order-success">
    <div class="success-message">
      <div class="success-show">
        <div class="success-image">
          <img class="image-content" :src="successImg" alt="">
        </div>
      </div>
      <div class="time-tip">
        <div class="tip-row">
          <span class="tip-content" v-cloak>{{aboveTip}}</span>
        </div>
        <div class="tip-row">
          <span class="tip-content" v-cloak>{{followingTip}}</span>
        </div>
      </div>
    </div>
    <div class="success-buttons">
      <router-link class="com-button detail-button" :to="{path:'/arecord/appointmentDetails'}" tag="button" v-cloak>{{detailButton}}</router-link>
      <router-link class="com-button get-more-button" :to="{path:'/mall/index'}" tag="button" v-cloak>{{getMoreButton}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      successImg: require('../../assets/images/order/orderSuccess.png'),
      tipDate: '2018-12-18',
      tipTime: '17:30-18:00',
      aboveTip: '',
      followingTip: '',
      detailButton: '预约详情',
      getMoreButton: '捡便宜',
      registerId: this.$route.query.registerId
    }
  },
  created () {
    this.aboveTip = `请在${this.tipDate} ${this.tipTime}前来就诊，`
    this.followingTip = '如不按时，则需要您额外等候'
  }
}
</script>

<style lang="scss" scoped>
.order-success {
  .success-message {
    background-color: $color-ff;
    padding: 0 32px;
    .success-show {
      display: flex;
      justify-content: center;
      padding: 49px 0 68px;
      border-bottom: 1px solid $color-e5;
      .success-image {
        width: 209px;
        height: 171px;
        .image-content {
          width: 100%;
          height: 100%;
        }
      }
    }
    .time-tip {
      font-size: 24px;
      color: $color-88;
      text-align: center;
      padding: 37px 0;
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
    .detail-button {
      color: $color-008CA7;
      border: 1px solid $color-008CA7;
      background-color: $color-f5;
    }
    .get-more-button {
      color: $color-ff;
      background: $color-gradient;
    }
  }
}
</style>
