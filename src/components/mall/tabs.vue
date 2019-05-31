<template>
  <div class="tabs">
    <van-tabs v-model="tabActive" @click="switchCategory">
      <van-tab :title="item.categoryName" v-for="(item,index) in tabList" :key="index"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabActive: 0
    }
  },
  props: ['tabList'],
  methods: {
    switchCategory (index) {
      this.$emit('getCategoryId', this.tabList[index].categoryId)
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
