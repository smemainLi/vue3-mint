<template>
  <div class="bought-tabs">
    <van-tabs v-model="active">
      <van-tab :title="item.tabName" v-for="(item,index) in tabList" :key="index"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 2
    }
  },
  props: ['tabList'],
  methods: {
    /* 给tab标签添加上标 */
    addBadge () {
      let vanTabs = document.getElementsByClassName('van-tab')
      // console.log(vanTabs)
      for (let i = 0; i < vanTabs.length; i++) {
        const vanTab = vanTabs[i]
        var vtabSpan = document.createElement('span')
        var vtabText = document.createTextNode('8')
        vtabSpan.appendChild(vtabText)
        vtabSpan.className = 'vtab-span'
        vanTab.appendChild(vtabSpan)
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.addBadge()
    })
  }
}
</script>

<style lang="scss" scoped>
.bought-tabs {
  // /deep/ .van-tabs--line .van-tabs__wrap {
  //   height: 88px;
  // }
  /deep/ .van-tabs__line {
    height: 4px;
    border-radius: 4px;
    background-color: $color-1E8FA5;
  }
  /deep/ .van-tab {
    font-size: 28px;
    color: $color-35;
    line-height: 88px;
    .vtab-span {
      position: absolute;
      top: 10px;
      right: 30px;
      z-index: 9999;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $color-F56E72;
      border-radius: 32px;
      height: 32px;
      padding: 0 10px;
      color: $color-ff;
    }
  }
  /deep/ .van-tab--active {
    font-weight: normal;
    color: $color-1E8FA5;
  }
}
</style>
