<template>
  <div class="top">
    <div class="user-info">
      <div class="user-left-info">
        <div class="user-img">
          <img class="img-content" :src="headImg?headImg:userImg" alt="">
        </div>
        <div class="user-name-qrcode">
          <div class="user-name" v-cloak>{{userName}}</div>
          <div class="qrcode-info" @click="getQrcode">
            <div class="user-qrcode">
              <img class="qrcode-img" :src="userQrcode" alt="">
            </div>
            <span class="qrcode-title" v-cloak>{{qrcodeTitle}}</span>
          </div>
        </div>
      </div>
      <div class="upgrade-super-member" v-show="memberGrade.gradeStatus" @click="memberGradeAction">
        <div :class="['mupgrade-icon',memberGrade.gradeUpgradeAble?'mupgrade-icon-upgrade':'']">
          <img class="icon-img" :src="memberGrade.gradeUpgradeAble?upgradeSuperImg:superMemberImg" alt="">
        </div>
        <div :class="['member-title-action',memberGrade.gradeUpgradeAble?'member-title-action-upgrade':'']">
          <div class="member-title" v-cloak>{{memberGrade.gradeUpgradeAble?memberActionT:memberGrade.memberTitle}}</div>
          <div class="member-action">
            <span class="action-content" v-cloak>{{memberGrade.gradeUpgradeAble?memberGrade.memberTitle:memberActionO}}</span>
            <i class="icon-enter"></i>
          </div>
        </div>
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
      superMemberImg: require('../../assets/images/mcard/superMember.png'),
      upgradeSuperImg: require('../../assets/images/mcard/upgradeSuper.gif'),
      qrcodeTitle: '会员码',
      memberTitle: '超级会员',
      memberActionO: '查看权益',
      memberActionT: '立即升级',
      openTips: '马上开通',
      cardTip: '会员卡余额'
    }
  },
  props: ['headImg', 'userName', 'cardBalance', 'walletStatus', 'memberGrade'],
  methods: {
    getQrcode () {
      this.$emit('showQrcode', true)
    },
    mcardBalance () {
      if (this.walletStatus) this.$router.push({ path: '/mcard/mcardBalance' })
      else this.$router.push({ path: '/order/payPassword', query: { isSetPayPassword: 1, openFlag: 'mcardPay' } })
    },
    /* 会员等级处理方法 */
    memberGradeAction () {
      // gradeUpgradeAble  等级能否升级 false：已升级，true：可以升级
      this.memberGrade.gradeUpgradeAble && this.$router.push({ path: '/mcard/memberUpgrade' })
      !this.memberGrade.gradeUpgradeAble && this.$router.push({ path: '/mcard/membershipInterests' })
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
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    .user-left-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .user-img {
        width: 110px;
        height: 110px;
        // margin-top: 64px;
        .img-content {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid $color-ff;
        }
      }
      .user-name-qrcode {
        // margin-top: 72px;
        .user-name {
          color: $color-ff;
          font-size: 32px;
          margin-left: 28px;
        }
        .qrcode-info {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          // margin-top: 6px;
          .user-qrcode {
            width: 33px;
            height: 33px;
            margin-left: 28px;
            .qrcode-img {
              width: 100%;
              height: 100%;
            }
          }
          .qrcode-title {
            font-size: 22px;
            color: $color-ec;
            margin-left: 10px;
          }
        }
      }
    }
    .upgrade-super-member {
      width: 245px;
      height: 170px;
      margin-right: -32px;
      // margin: 38px -32px 0 0;
      background: url("../../assets/images/mcard/upgradeBg.png") no-repeat
        center;
      background-size: 245px 170px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .mupgrade-icon {
        width: 97px;
        height: 66px;
        margin: -12px 0 0 12px;
        .icon-img {
          width: 100%;
          height: 100%;
        }
      }
      .mupgrade-icon-upgrade {
        width: 108px;
        height: 124px;
        margin: -6px 0 0 4px;
      }
      .member-title-action {
        color: $color-ff;
        margin-left: 12px;
        // margin: 46px 0 0 12px;
        .member-title {
          font-size: 26px;
          white-space: nowrap;
        }
        .member-action {
          display: flex;
          align-items: center;
          .action-content {
            font-size: 20px;
            white-space: nowrap;
          }
          .icon-enter {
            font-size: 20px;
            // margin: 2px 0 0 4px;
          }
        }
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
    margin-top: -24px;
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
