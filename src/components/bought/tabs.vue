<template>
  <div class="bought-tabs">
    <van-tabs v-model="active" @click="switchTabs">
      <van-tab :title="item.tabName" v-for="(item,index) in tabList" :key="index"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      /* 待付款：0    待发货：2    待收货：3    已完成：4    已取消：5    待消费：6    已消费：7 */
      tabList: [
        { status: -1, tabName: '全部' },
        { status: 0, tabName: '待付款' },
        { status: 2, tabName: '待发货' },
        { status: 3, tabName: '待收货' }
      ],
      tabStatus: []// 存储个状态下对应订单的数量
    }
  },
  props: [],
  methods: {
    ...mapActions({ getOrderStatusNum: 'getOrderStatusNum' }),
    /* 给tab标签添加上标 */
    addBadge () {
      let vanTabs = document.getElementsByClassName('van-tab')
      for (let i = 0; i < vanTabs.length; i++) {
        this.tabStatus.forEach(statusItem => {
          if (statusItem.status === this.tabList[i].status /* && statusItem.num */) {
            const vanTab = vanTabs[i]
            var vtabSpan = document.createElement('span')
            var vtabText = document.createTextNode(`${statusItem.num}`)
            vtabSpan.appendChild(vtabText)
            statusItem.num ? vtabSpan.className = 'vtab-span' : vtabSpan.className = 'vtab-span vtab-span-other'
            vanTab.appendChild(vtabSpan)
          }
        })
      }
    },
    /* 订单状态对应的数字提醒 */
    async loadOrderStatusNum () {
      this.tabStatus.length = 0
      this.tabStatus = []
      const result = await this.getOrderStatusNum()
      if (result.status === 200) {
        /* 待付款：0    待发货：2    待收货：3  */
        result.data.list.length && result.data.list.forEach(listItem => {
          this.tabStatus.push({
            status: listItem.status,
            num: listItem.num
          })
        })
        this.addBadge()
      }
    },
    /* 切换tab选项 */
    switchTabs (index) {
      this.$emit('getCurrentTab', this.tabList[index].status)
    }
  },
  mounted () {
    this.loadOrderStatusNum()
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
    .vtab-span-other {
      display: none;
    }
  }
  /deep/ .van-tab--active {
    font-weight: normal;
    color: $color-1E8FA5;
  }
}
</style>
