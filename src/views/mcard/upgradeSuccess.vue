<template>
  <div class="upgrade-success">
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
      </div>
    </div>
    <div class="success-buttons">
      <button class="com-button detail-button" @click="$router.go(-2)" v-cloak>{{detailButton}}</button>
      <button class="com-button get-more-button" @click="$router.push({path:'/mcard/membershipInterests'})" v-cloak>{{getMoreButton}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      successImg: require('../../assets/images/mcard/upgradeSuccess.png'),
      aboveTip: '',
      detailButton: '返回',
      getMoreButton: '马上领取权益'
    }
  },
  methods: {
    ...mapActions({ paySuccessData: 'paySuccessData' })
  },
  created () {
    this.paySuccessData({ payId: localStorage.getItem('payId') }).then((res) => {
      if (res.status === 200) {
        this.aboveTip = `付费会员到期日：${res.data.validDate}`
      }
    }).catch(() => { })
  }
}
</script>

<style lang="scss" scoped>
.upgrade-success {
  .success-message {
    background-color: $color-ff;
    padding: 0 32px;
    .success-show {
      display: flex;
      justify-content: center;
      padding: 49px 0 24px;
      border-bottom: 1px solid $color-e5;
      .success-image {
        width: 262px;
        height: 230px;
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
      padding: 32px 0 68px;
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
