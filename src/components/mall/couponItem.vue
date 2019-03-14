<template>
  <div class="coupon-item">
    <div :class="['coupon-row-pick',couponItem.canGrab||couponItem.waitUse?'':'coupon-row-unpick']">
      <div class="coupon-detail">
        <div class="coupon-money">
          <span class="money-unit" v-cloak>{{moneyUnit}}</span>
          <span class="money-content" v-cloak>{{couponItem.moneyContent}}</span>
        </div>
        <div class="coupon-info">
          <div class="full-reduction" v-cloak>{{couponItem.fullReduction}}</div>
          <div class="coupon-limit" v-cloak>{{couponItem.couponLimit}}</div>
          <div class="coupon-deadline" v-cloak>{{couponItem.couponDeadline}}</div>
        </div>
      </div>
      <div :class="[couponItem.canGrab?'coupon-action':'coupon-img']">
        <div class="action-content" v-if="couponItem.canGrab">
          <div class="content-style" v-cloak>{{actionContento}}</div>
          <div class="content-style" v-cloak>{{actionContentt}}</div>
        </div>
        <div class="action-img" v-if="couponItem.robbed||couponItem.hasGot">
          <img class="img-content" :src="couponItem.robbed?loogingImg:hasGotImg" alt="">
        </div>
        <div class="wait-use" v-if="couponItem.waitUse" v-cloak>{{waitUse}}</div>
        <div class="has-used" v-if="couponItem.hasUsed" v-cloak>{{hasUsed}}</div>
        <div class="is-overdue" v-if="couponItem.isOverdue" v-cloak>{{isOverdue}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loogingImg: require('../../assets/images/mall/lootingImg.png'),
      hasGotImg: require('../../assets/images/mall/hasGotImg.png'),
      moneyUnit: '￥',
      actionContento: '立即',
      actionContentt: '领取',
      waitUse: '待使用',
      hasUsed: '已使用',
      isOverdue: '已过期'
    }
  },
  props: ['couponItem'],
  methods: {
    // get pickImgStatus () {
    //   if (this.couponItem.canGrab) return true
    //   else if (this.couponItem.waitUse) return true
    //   else return false
    // }
  }
}
</script>

<style lang="scss" scoped>
.coupon-item {
  padding: 32px 32px 0;
  .coupon-row-pick {
    width: 686px;
    height: 216px;
    background: url("../../assets/images/mall/pickImg.png") no-repeat center;
    background-size: 686px 216px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .coupon-detail {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .coupon-money {
        width: 170px;
        color: $color-008CA7;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .money-unit {
          font-size: 40px;
          padding-bottom: 8px;
        }
        .money-content {
          font-size: 82px;
          float: right;
          margin-left: -4px;
        }
      }
      .coupon-info {
        margin-left: 24px;
        .full-reduction {
          color: $color-35;
          font-size: 28px;
        }
        .coupon-limit {
          color: $color-88;
          font-size: 28px;
        }
        .coupon-deadline {
          color: $color-88;
          font-size: 24px;
        }
      }
    }
    .coupon-action {
      margin-right: 64px;
      .action-content {
        .content-style {
          font-size: 34px;
          color: $color-ff;
        }
      }
    }
    .coupon-img {
      margin-right: 44px;
      .action-img {
        width: 102px;
        height: 102px;
        .img-content {
          width: 100%;
          height: 100%;
        }
      }
    }
    .wait-use,
    .has-used,
    .is-overdue {
      font-size: 34px;
      color: $color-ff;
    }
  }
  .coupon-row-unpick {
    width: 686px;
    height: 216px;
    background: url("../../assets/images/mall/unPickImg.png") no-repeat center;
    background-size: 686px 216px;
  }
}
</style>
