<template>
  <div class="mcb-income">
    <div class="accumulated-income">
      <div class="income-column">
        <div class="num-common-style" v-cloak>{{mcbIncomeInfo.accumulatedIncomeNum}}</div>
        <div class="content-common-style" v-cloak>{{accumulatedIncomeTitle}}</div>
      </div>
    </div>
    <div class="share-friends">
      <div class="income-column">
        <div class="num-common-style" v-cloak>{{mcbIncomeInfo.shareFriendsNum}}</div>
        <div class="content-common-style" v-cloak>{{shareFriendsTitle}}</div>
      </div>
    </div>
    <div class="save-for-friends">
      <div class="income-column">
        <div class="num-common-style" v-cloak>{{mcbIncomeInfo.saveForFriendsNum}}</div>
        <div class="content-common-style" v-cloak>{{saveForFriendsTitle}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accumulatedIncomeNum: '￥1000',
      accumulatedIncomeTitle: '累计收益',
      shareFriendsNum: '45个',
      shareFriendsTitle: '分享好友',
      saveForFriendsNum: '￥10000',
      saveForFriendsTitle: '为好友节省'
    }
  },
  props: ['mcbIncomeInfo']
}
</script>

<style lang="scss" scoped>
.mcb-income {
  height: 298px;
  background: url("../../assets/images/mcard/incomeBg.png") no-repeat center;
  background-size: 100% 298px;
  display: flex;
  justify-content: space-around;
  text-align: center;
  .accumulated-income,
  .share-friends,
  .save-for-friends {
    width: 33%;
    height: 136px;
    margin-top: 130px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    .income-column {
      .num-common-style {
        color: $color-F3A133;
      }
      .content-common-style {
        color: $color-35;
      }
    }
  }
  .share-friends,
  .save-for-friends {
    border-left: 1px solid $color-e5;
  }
}
</style>
