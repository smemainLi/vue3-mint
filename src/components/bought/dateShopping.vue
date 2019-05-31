<template>
  <div class="date-shopping">
    <div class="shopping-title">
      <div class="shopping-date" v-cloak>{{dateShoppingItem.shoppingDate}}</div>
      <div :class="['shopping-status',dateShoppingItem.statusFlag===5?'status-other-style':'']" v-cloak>{{dateShoppingItem.shoppingStatus}}</div>
    </div>
    <goods-row :goodsItem="item" v-for="(item,index) in dateShoppingItem.goodsList" @click.native="$router.push({path:'/bought/orderDetail',query:{orderId:dateShoppingItem.shoppingId,status:dateShoppingItem.statusFlag}})" :key="'goodsList'+index"></goods-row>
    <div class="result-info">
      <div class="goods-total-num" v-cloak>{{dateShoppingItem.totalNum}}</div>
      <div class="goods-total-money">
        <span class="total-money-title" v-cloak>{{totalMoneyTitle}}</span><span class="total-money-content" v-cloak>{{dateShoppingItem.totalMoneyContent}}</span>
      </div>
    </div>
    <div class="date-shopping-btn">
      <div class="interests-flag" v-show="dateShoppingItem.gradePack">
        <img class="flag-img" :src="flagImg" alt="">
      </div>
      <small-button :smallBtnItem="item" v-for="(item,index) in dateShoppingItem.smallBtnList" @click.native="operateAction(item)" :key="'smallBtnList'+index"></small-button>
    </div>
  </div>
</template>

<script>
import goodsRow from '../bought/goodsRow.vue'
import smallButton from '../bought/smallButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      shoppingDate: '2018-12-10',
      shoppingStatus: '已完成',
      totalNum: '共2件',
      totalMoneyTitle: '订单金额：',
      totalMoneyContent: '',
      smallBtnName: '查看券码',
      canceled: '已取消',
      flagImg: require('../../assets/images/bought/interestsFlag.gif')
    }
  },
  props: ['tabStatus', 'dateShoppingItem', 'gradePack'],
  components: { goodsRow, smallButton },
  methods: {
    ...mapActions({ cancelBoughtOrder: 'cancelBoughtOrder', deleteBoughtOrder: 'deleteBoughtOrder', confirmBoughtOrder: 'confirmBoughtOrder' }),
    /* 点击执行按钮事件 */
    operateAction (smallBtn) {
      /* operateId: 1：查看详情  2：查看劵码  3：取消订单  4：立即支付  5：确认收货  6：查看物流  7：删除  8：售后  9:预约使用 */
      /*
         statusFlag:  0:待付款  2:待发货  3:待收货  4:已完成  5:已取消  6:待消费  7:已消费
         待发货、待收货、已完成:  商品订单
         待消费、已消费:  服务订单
         待付款、已取消:  商品+服务订单
      */
      if ([1, 2].includes(smallBtn.operateId)) this.$router.push({ path: '/bought/orderDetail', query: { orderId: this.dateShoppingItem.shoppingId, status: this.dateShoppingItem.statusFlag } })
      else if (smallBtn.operateId === 3) { // 取消订单
        this.$messagebox({ message: '确定取消订单', showCancelButton: true, showConfirmButton: true, confirmButtonText: '确定', cancelButtonText: '取消' }).then(action => {
          if (action === 'confirm') {
            this.cancelBoughtOrder({ orderId: this.dateShoppingItem.shoppingId }).then((res) => {
              if (res.status === 200) {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  this.$emit('requestReload', this.tabStatus)// 请求父组件重新加载数据，顺便将当前的tab状态传递过去以便加载当前列表
                }, 1000)
              }
            }).catch(() => { })
          }
        })
      } else if (smallBtn.operateId === 4) { // 立即支付
        localStorage.setItem('payId', this.dateShoppingItem.payId)
        this.$router.push({ path: '/order/payment', query: { orderType: 'mallOrder' } })
      } else if (smallBtn.operateId === 5) { // 确认收货
        this.$messagebox({ message: '您确定收到货品了吗？', showCancelButton: true, showConfirmButton: true, confirmButtonText: '确定', cancelButtonText: '取消' }).then(action => {
          if (action === 'confirm') {
            this.confirmBoughtOrder({ orderId: this.dateShoppingItem.shoppingId }).then((res) => {
              if (res.status === 200) {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  this.$emit('requestReload', this.tabStatus)// 请求父组件重新加载数据，顺便将当前的tab状态传递过去以便加载当前列表
                }, 1000)
              }
            }).catch(() => { })
          }
        })
      } else if (smallBtn.operateId === 6) {
        this.$router.push({ path: '/bought/logistics', query: { logisticsNo: '3729240042057' } })
        // window.location.href = `https://m.kuaidi100.com/index_all.html?postid=3729240042057`
        // window.location.href = `https://m.kuaidi100.com/index_all.html?postid=3729240042057`
        // window.location.href = `https://m.kuaidi100.com/result.jsp?nu=3729240042057`
        // window.location.href = `https://m.kuaidi100.com/result.jsp?nu=${this.dateShoppingItem.logisticsNo}`
      } else if (smallBtn.operateId === 7) { // 删除订单
        this.$messagebox({ message: '确定删除订单', showCancelButton: true, showConfirmButton: true, confirmButtonText: '确定', cancelButtonText: '取消' }).then(action => {
          if (action === 'confirm') {
            this.deleteBoughtOrder({ orderId: this.dateShoppingItem.shoppingId }).then((res) => {
              if (res.status === 200) {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  this.$emit('requestReload', this.tabStatus)// 请求父组件重新加载数据，顺便将当前的tab状态传递过去以便加载当前列表
                }, 1000)
              }
            }).catch(() => { })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.date-shopping {
  padding: 18px 0 40px 0;
  margin: 0 0 24px 0;
  background-color: $color-ff;
  .shopping-title {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    padding: 0 32px;
    .shopping-date {
      color: $color-88;
    }
    .shopping-status {
      color: $color-1E8FA5;
    }
    .status-other-style {
      color: $color-88;
    }
  }
  .result-info {
    font-size: 26px;
    margin-top: 8px;
    padding: 30px 32px;
    border-top: 1px solid $color-e5;
    display: flex;
    justify-content: flex-end;
    color: $color-88;
    .goods-total-money {
      margin-left: 12px;
      .total-money-content {
        color: $color-1E8FA5;
      }
    }
  }
  .date-shopping-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 32px;
    position: relative;
    .interests-flag {
      width: 156px;
      height: 52px;
      position: absolute;
      left: 32px;
      bottom: 6px;
      .flag-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>