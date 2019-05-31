<template>
  <div class="bought">
    <tabs ref="boughtTabs" @getCurrentTab="getCurrentTab"></tabs>
    <van-list :class="[!hasListData?'no-more-data':'']" v-model="loading" :finished="finished" :finished-text="noMore" @load="loadBoughtList">
      <date-shopping :tabStatus="tabStatus" :dateShoppingItem="item" v-for="(item,index) in dateShoppingList" @requestReload="requestReload" :key="index"></date-shopping>
      <div class="placeholder-info" v-if="!hasListData">
        <div class="placeholder-img">
          <img class="img-content" :src="placeholderImg" alt="">
          <div class="tips-content" v-cloak>{{tipsContent}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import tabs from '../../components/bought/tabs.vue'
import dateShopping from '../../components/bought/dateShopping.vue'
import { mapActions } from 'vuex'

const smallBtnMap = new Map([
  ['0', [{ operateId: 3, smallBtnName: '取消订单', isDeep: false }, { operateId: 1, smallBtnName: '查看详情', isDeep: false }, { operateId: 4, smallBtnName: '立即支付', isDeep: true }]],
  ['2', [{ operateId: 1, smallBtnName: '查看详情', isDeep: false }]],
  ['3', [{ operateId: 1, smallBtnName: '查看详情', isDeep: false }, { operateId: 5, smallBtnName: '确认收货', isDeep: false }, { operateId: 6, smallBtnName: '查看物流', isDeep: true }]],
  ['4', [{ operateId: 1, smallBtnName: '查看详情', isDeep: false }]],
  ['5', [{ operateId: 1, smallBtnName: '查看详情', isDeep: false }, { operateId: 7, smallBtnName: '删除', isDeep: true }]],
  ['6', [{ operateId: 1, smallBtnName: '查看详情', isDeep: false }, { operateId: 2, smallBtnName: '查看劵码', isDeep: true }]],
  ['7', [{ operateId: 1, smallBtnName: '查看详情', isDeep: false }]]
])

export default {
  data () {
    return {
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '暂无数据哦~',
      shoppingStatus: '已完成',
      pageNo: 1, // 页码
      pageSize: 6, // 每页有多少条记录
      tabStatus: -1, // 当前tab 全部订单传-1或空
      dateShoppingList: [], // 订单列表
      loading: false,
      finished: false,
      noMore: '没有更多了',
      firstPaging: true, // true 第一个分页请求  false 非第一个分页请求
      hasListData: true// false 没有数据  true 有数据
    }
  },
  components: { tabs, dateShopping },
  methods: {
    ...mapActions({ getBoughtList: 'getBoughtList' }),
    /* 加载订单列表 */
    async loadBoughtList () {
      /* 0:待付款    2:待发货    3:待收货    4:已完成    5:已取消    6:待消费    7:已消费  */
      const result = await this.getBoughtList({ status: this.tabStatus, pageNo: this.pageNo, pageSize: this.pageSize })
      if (result.status === 200) {
        this.pageNo += 1// 符合条件页码加一
        this.firstPaging && (this.hasListData = !!result.data.list.length)// 在第一个分页请求回来之后对hasListData进行判断，之后都不需要进行判断了
        this.firstPaging = false
        result.data.list.length && result.data.list.forEach(listItem => {
          let currentGoodsList = []
          listItem.productList.length && listItem.productList.forEach(productItem => {
            currentGoodsList.push({
              goodsId: productItem.productId,
              goodsImg: productItem.image,
              goodsInfo: productItem.name,
              goodsPrice: `￥${productItem.price}`,
              goodsNumber: `x${productItem.number}`,
              hasBr: true
            })
          })
          if (currentGoodsList.length) currentGoodsList[currentGoodsList.length - 1].hasBr = false
          this.dateShoppingList.push({
            payId: listItem.payId, // 支付id
            shoppingId: listItem.orderId, // 订单id
            shoppingNo: listItem.orderNo, // 订单编号
            logisticsNo: listItem.logisticsNo, // 物流单号
            logisticsCompany: listItem.logisticsCompany, // 物流公司
            shoppingDate: listItem.createTime.split(' ')[0], // 截取年月日
            statusFlag: listItem.state, // 状态码
            shoppingStatus: listItem.state === '0' ? '待付款' : listItem.state === '2' ? '待发货' : listItem.state === '3' ? '待收货' : listItem.state === '4' ? '已完成' : listItem.state === '5' ? '已取消' : listItem.state === '6' ? '待消费' : '已消费',
            goodsList: currentGoodsList,
            gradePack: listItem.gradePack, // 是否为会员权益  false 非会员权益   true 会员权益
            smallBtnList: smallBtnMap.get(listItem.state),
            totalNum: `共${listItem.productList.length}件`,
            totalMoneyContent: `￥${listItem.orderPrice}`
          })
        })
        // 加载状态结束
        this.loading = false
        this.finished = false
        if (result.data.list.length === 0 || result.data.list.length < 6) {
          this.finished = true
        }
      }
    },
    /* 获取当前tab选项 */
    getCurrentTab (tabStatus) {
      this.tabStatus = tabStatus
      this.pageNo = 1
      this.firstPaging = true
      this.dateShoppingList = []
      this.dateShoppingList.length = 0
      this.loadBoughtList()
    },
    /* 请求重新加载数据 */
    requestReload (tabStatus) {
      // this.$refs.boughtTabs.loadOrderStatusNum()// 调用子组件的方法
      // // this.$refs.boughtTabs.addBadge()// 调用子组件的方法
      // this.tabStatus = tabStatus
      // this.pageNo = 1
      // this.firstPaging = true
      // this.dateShoppingList = []
      // this.dateShoppingList.length = 0
      // this.loadBoughtList()
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.bought {
  padding: 0 0 120px 0;
  .no-more-data {
    /deep/ .van-list__finished-text {
      display: none;
    }
    .placeholder-info {
      .placeholder-img {
        margin-top: 360px !important;
        width: 227px;
        height: 214px;
        margin: 0 auto;
        text-align: center;
        .img-content {
          width: 100%;
          height: 100%;
        }
        .tips-content {
          font-size: 28px;
          color: $color-88;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
