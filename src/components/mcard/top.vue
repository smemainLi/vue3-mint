<template>
  <div class="top">
    <div class="user-info">
      <div class="user-left-info">
        <div class="user-img">
          <img class="img-content" :src="headImg?headImg:userImg" alt="">
        </div>
        <div class="user-name" v-cloak>{{userName}}</div>
      </div>
      <div class="user-qrcode" @click="getQrcode">
        <img class="qrcode-img" :src="userQrcode" alt="">
      </div>
    </div>
    <div class="membership-card" @click="mcardBalance">
      <div class="card-title">
        <div class="card-img">
          <img class="img-content" :src="cardImg" alt="">
        </div>
        <div class="card-tip" v-cloak>{{cardTip}}</div>
      </div>
      <div class="card-content">
        <div :class="['card-balance',!walletStatus?'open-tips':'']" v-cloak>{{walletStatus?cardBalance:openTips}}</div>
        <div class="right-arrow">
          <img class="arrow-img" :src="rightArrow" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userImg: require('../../assets/images/mcard/userImg.png'),
      userQrcode: require('../../assets/images/mcard/qrcodeIcon.png'),
      cardImg: require('../../assets/images/mcard/mcard.png'),
      rightArrow: require('../../assets/images/mcard/arrow.png'),
      openTips: '马上开通',
      cardTip: '会员卡余额'
    }
  },
  props: ['headImg', 'userName', 'cardBalance', 'walletStatus'],
  methods: {
    getQrcode () {
      this.$emit('showQrcode', true)
    },
    mcardBalance () {
      if (this.walletStatus) this.$router.push({ path: '/mcard/mcardBalance' })
      else this.$router.push({ path: '/order/payPassword', query: { isSetPayPassword: 1, openFlag: 'mcardPay' } })
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  .user-info {
    height: 250px;
    background: url("../../assets/images/mcard/mcardBg.png") no-repeat center;
    background-size: 100% 250px;
    display: flex;
    justify-content: space-between;
    padding: 0 32px;
    .user-left-info {
      display: flex;
      justify-content: flex-start;
      .user-img {
        width: 110px;
        height: 110px;
        margin-top: 41px;
        .img-content {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-name {
        color: $color-ff;
        font-size: 32px;
        margin: 78px 0 0 28px;
      }
    }
    .user-qrcode {
      width: 48px;
      height: 48px;
      margin-top: 78px;
      .qrcode-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .membership-card {
    height: 120px;
    background-color: $color-ff;
    margin: 0 32px;
    padding: 0 29px 0 19px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -15px;
    box-shadow: 0px 6px 5px 0px rgba($color: $color-e5, $alpha: 0.5);
    .card-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .card-img {
        width: 48px;
        height: 48px;
        .img-content {
          width: 100%;
          height: 100%;
        }
      }
      .card-tip {
        font-size: 28px;
        color: $color-35;
        margin-left: 19px;
      }
    }
    .card-content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .card-balance {
        font-size: 32px;
        color: $color-008CA7;
        margin-right: 15px;
      }
      .open-tips {
        font-size: 28px;
      }
      .right-arrow {
        width: 40px;
        height: 40px;
        .arrow-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
