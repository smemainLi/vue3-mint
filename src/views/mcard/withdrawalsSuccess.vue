<template>
  <div class="withdrawals-success">
    <div class="withdrawals-success-upper">
      <div class="success-image-show">
        <div class="success-image">
          <img class="image-content" :src="successImg" alt="">
        </div>
        <div class="success-withdrawals-tips" v-cloak>{{withdrawalsTips}}</div>
        <div class="arrival-account" v-cloak>{{arrivalAcount}}</div>
      </div>
      <div class="withdrawals-info">
        <div class="withdrawals-amount">
          <div class="withdrawals-amount-title" v-cloak>{{withdrawalsAmountTitle}}</div>
          <div class="withdrawals-amount-content" v-cloak>{{`￥${$route.query.withdrawAmount}`}}</div>
        </div>
        <div class="withdrawals-way">
          <div class="withdrawals-way-title" v-cloak>{{withdrawalsWayTitle}}</div>
          <div class="withdrawals-way-content" v-cloak>{{`${$route.query.bankName}(${$route.query.cardNumber.slice(-4)})`}}</div>
        </div>
      </div>
    </div>
    <general-button @click.native="$router.go(-2)" :btnName="btnName"></general-button>
  </div>
</template>

<script>
import generalButton from '../../components/common/generalButton.vue'
export default {
  data () {
    return {
      successImg: require('../../assets/images/mcard/withdrawalsSuccess.png'),
      withdrawalsTips: '提现申请成功，等待处理',
      arrivalAcount: '预计1-3日到账',
      withdrawalsAmountTitle: '提现金额',
      withdrawalsAmountContent: '￥100',
      withdrawalsWayTitle: '提现方式',
      withdrawalsWayContent: '中国建设银行(1000)',
      btnName: '返回'
    }
  },
  components: { generalButton },
  mounted () {
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
.withdrawals-success {
  .withdrawals-success-upper {
    padding: 0 32px;
    margin-bottom: 140px;
    background-color: $color-ff;
    .success-image-show {
      text-align: center;
      border-bottom: 1px solid $color-e5;

      .success-image {
        width: 206px;
        height: 183px;
        margin: 0 auto;
        .image-content {
          width: 100%;
          height: 100%;
        }
      }
      .success-withdrawals-tips {
        font-size: 32px;
        color: $color-008CA7;
        margin: 32px 0 24px 0;
      }
      .arrival-account {
        font-size: 28px;
        color: $color-88;
        margin-bottom: 36px;
      }
    }
    .withdrawals-info {
      padding: 68px 0 98px 0;
      .withdrawals-amount,
      .withdrawals-way {
        font-size: 28px;
        color: $color-35;
        display: flex;
        justify-content: space-between;
      }
      .withdrawals-way {
        margin-top: 48px;
      }
    }
  }
}
</style>
