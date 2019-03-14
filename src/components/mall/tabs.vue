<template>
  <div class="tabs">
    <van-tabs v-model="tabActive">
      <van-tab :title="item.tabName" v-for="(item,index) in tabList" :key="index"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabActive: 0,
      tabList: [
        { tabName: '全部' },
        { tabName: '待付款' },
        { tabName: '待发货' },
        { tabName: '待收货' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  /deep/ .van-tabs__wrap {
    height: 88px;
    .van-tabs__line {
      height: 2px;
      border-radius: 1px;
      background-color: $color-1E8FA5;
    }
    .van-tab {
      font-size: 28px;
      color: $color-35;
      line-height: 88px;
    }
    .van-tab--active {
      font-weight: normal;
      color: $color-1E8FA5;
    }
  }
  // /deep/ .van-tabs__line {
  //   height: 4px;
  //   border-radius: 4px;
  //   background-color: $color-1E8FA5;
  // }
  // /deep/ .van-tab {
  //   font-size: 28px;
  //   color: $color-35;
  //   // line-height: 88px;
  // }
  // /deep/ .van-tab--active {
  //   font-weight: normal;
  //   color: $color-1E8FA5;
  // }
}
</style>
