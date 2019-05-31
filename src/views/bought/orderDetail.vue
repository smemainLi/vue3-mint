<template>
  <div class="order-detail">
    <div class="order-status-tips" v-cloak>{{orderStatusTips}}</div>
    <!-- <logistics v-show="hasLogistics" :logisticsInfo="logisticsInfo"></logistics> -->
    <address-item v-show="addressStatus" class="order-detail-address" :addressItem="addressItem"></address-item>
    <goods-item :goodsItem="item" v-for="(item,index) in goodsList" :key="'goods'+index"></goods-item>
    <qrcode-consumption v-show="isServiceWaitUse" :qrcodeInfo="qrcodeInfo" :qrcodeImg="qrcodeImg"></qrcode-consumption>
    <situation-row :situationItem="item" v-for="(item,index) in situationList" :key="'situation'+index"></situation-row>
    <div class="order-detail-system">
      <system-row :systemItem="item" v-for="(item,index) in systemList" :key="'system'+index"></system-row>
    </div>
    <div class="order-detail-btn" v-show="smallBtnList.length">
      <small-button :smallBtnItem="item" v-for="(item,index) in smallBtnList" @click.native="operateAction(item)" :key="'smallBtn'+index"></small-button>
    </div>
  </div>
</template>

<script>
// import logistics from '../../components/bought/logistics.vue'
import addressItem from '../../components/mall/addressItem.vue'
import goodsItem from '../../components/mall/goodsItem.vue'
import qrcodeConsumption from '../../components/bought/qrcodeConsumption.vue'
import situationRow from '../../components/bought/situationRow.vue'
import systemRow from '../../components/bought/systemRow.vue'
import smallButton from '../../components/bought/smallButton.vue'
import { connectService } from '../../utils/tools'
import { mapActions } from 'vuex'

const smallBtnMap = new Map([
  ['0', [{ operateId: 3, smallBtnName: '取消订单', isDeep: false }, { operateId: 4, smallBtnName: '立即支付', isDeep: true }]],
  ['2', []],
  ['3', [{ operateId: 8, smallBtnName: '售后', isDeep: false }, { operateId: 5, smallBtnName: '确认收货', isDeep: false }, { operateId: 6, smallBtnName: '查看物流', isDeep: true }]],
  ['4', [{ operateId: 8, smallBtnName: '售后', isDeep: false }]],
  ['5', [{ operateId: 7, smallBtnName: '删除', isDeep: true }]],
  ['6', [{ operateId: 9, smallBtnName: '预约使用', isDeep: true }]],
  ['7', []]
])

const orderStatusMap = new Map([
  ['0', '待付款'],
  ['2', '待发货'],
  ['3', '待收货'],
  ['4', '已完成'],
  ['5', '已取消'],
  ['6', '待消费'],
  ['7', '已消费']
])

export default {
  data () {
    return {
      // orderStatusTips: '待收货',
      orderStatusTips: '', // 状态提示
      hasLogistics: false, // 是否有物流信息  待收货以前的状态，都没有物流信息那一行
      isServiceWaitUse: false, // 是否为服务
      payId: '', // 支付id
      orderId: '', // 订单id
      orderNo: '', // 订单编号
      logisticsNo: '', // 物流单号
      logisticsCompany: '', // 物流公司
      logisticsInfo: '需调用第三方物流接口',
      addressItem: {}, // 用户地址信息
      goodsList: [],
      qrcodeInfo: {},
      qrcodeImg: '',
      situationList: [],
      systemList: [],
      smallBtnList: [],
      addressStatus: false// false 没有地址  true 有地址
    }
  },
  components: {
    // logistics,
    addressItem,
    goodsItem,
    situationRow,
    systemRow,
    smallButton,
    qrcodeConsumption
  },
  methods: {
    ...mapActions({ getBoughtDetail: 'getBoughtDetail', cancelBoughtOrder: 'cancelBoughtOrder', deleteBoughtOrder: 'deleteBoughtOrder', confirmBoughtOrder: 'confirmBoughtOrder' }),
    /* 加载订单详情 */
    /*
      statusFlag:  0:待付款  2:待发货  3:待收货  4:已完成  5:已取消  6:待消费  7:已消费

      operateId: 1：查看详情  2：查看劵码  3：取消订单  4：立即支付  5：确认收货  6：查看物流  7：删除  8：售后  9:预约使用

      待发货、待收货、已完成:  商品订单
      待消费、已消费:  服务订单
      待付款、已取消:  商品+服务订单

      待收货以前的状态，都没有物流信息那一行
      待付款 则没有付款时间和付款方式
      已取消 则多一个取消时间

      基本 = 列表上的操作除了“查看详情”和“查看券码”不用出现
      待收货、已完成：增加一个“售后”按钮，点击后跳去客服咨询页面
      */
    async loadBoughtDetail () {
      const result = await this.getBoughtDetail({ orderId: this.$route.query.orderId, status: this.$route.query.status })
      if (result.status === 200) {
        this.payId = result.data.payId
        this.orderId = result.data.orderId
        this.orderNo = result.data.orderNo
        this.logisticsNo = result.data.logisticsNo
        this.logisticsCompany = result.data.logisticsCompany
        this.hasLogistics = ['3', '4'].includes(result.data.state)
        this.isServiceWaitUse = ['6'].includes(result.data.state)
        this.orderStatusTips = orderStatusMap.get(result.data.state)
        if (['0', '5'].includes(result.data.state)) {
          this.addressStatus = result.data.allService
        } else if (['6', '7'].includes(result.data.state)) {
          this.addressStatus = false
        } else this.addressStatus = true
        this.addressItem = {
          nickname: result.data.consigneeName,
          phone: result.data.contactNumber,
          isDefault: false,
          operateFlag: 'orderDetail',
          address: result.data.deliveryAddress,
          hasBr: false
        }
        result.data.productList.length && result.data.productList.forEach(productItem => {
          this.goodsList.push({
            goodsId: productItem.productId,
            goodsImg: productItem.image,
            goodsIntroduce: productItem.name,
            goodsPrice: `￥${productItem.price}`,
            goodsNum: `x${productItem.number}`,
            hasBr: true
          })
        })
        // if (this.goodsList.length) this.goodsList[this.goodsList.length - 1].hasBr = false
        this.qrcodeInfo = {
          consumptionNumcode: `消费码：${result.data.consumeCode}`,
          qrcodeImg: result.data.consumeQr
        }
        this.qrcodeImg = result.data.consumeQr
        this.situationList = [
          { rowTitle: '核销门店', rowContent: result.data.verifyShopName, isLight: true, hasBr: true },
          { rowTitle: '核销时间', rowContent: result.data.verifyTime, isLight: true, hasBr: true },
          { rowTitle: '运费', rowContent: this.feeStatus(result.data.state, result.data.allService, result.data.freight), isLight: false, hasBr: true },
          { rowTitle: '留言备注', rowContent: this.leavingStatus(result.data.state, result.data.allService, result.data.remark), isLight: true, hasBr: true },
          { rowTitle: '商品总价', rowContent: `￥${result.data.productAmount}`, isLight: false, hasBr: true },
          { rowTitle: '满减', rowContent: result.data.fullReducePrice === '0.00' ? '' : `-￥${result.data.fullReducePrice}`, isLight: false, hasBr: true },
          { rowTitle: '优惠券', rowContent: result.data.couponPrice === '0.00' ? '' : `-￥${result.data.couponPrice}`, isLight: false, hasBr: true },
          { rowTitle: '订单金额', rowContent: `￥${result.data.orderPrice}`, isLight: false, hasBr: false }
        ]
        this.systemList = [
          { systemTitle: '订单编号：', systemContent: result.data.orderNo },
          { systemTitle: '创建时间：', systemContent: result.data.createTime },
          { systemTitle: '付款时间：', systemContent: result.data.paymentTime },
          { systemTitle: '付款方式：', systemContent: result.data.payment === 'null' ? '' : result.data.payment },
          { systemTitle: '取消时间：', systemContent: result.data.cancelTime }
        ]
        this.smallBtnList = smallBtnMap.get(result.data.state)
      }
    },
    /* 点击执行按钮事件 */
    operateAction (smallBtn) {
      /* operateId: 1：查看详情  2：查看劵码  3：取消订单  4：立即支付  5：确认收货  6：查看物流  7：删除  8：售后  9:预约使用 */
      /*
         statusFlag:  0:待付款  2:待发货  3:待收货  4:已完成  5:已取消  6:待消费  7:已消费
         待发货、待收货、已完成:  商品订单
         待消费、已消费:  服务订单
         待付款、已取消:  商品+服务订单
      */
      if (smallBtn.operateId === 3) { // 取消订单
        this.$messagebox({ message: '确定取消订单', showCancelButton: true, showConfirmButton: true, confirmButtonText: '确定', cancelButtonText: '取消' }).then(action => {
          action === 'confirm' && this.cancelBoughtOrder({ orderId: this.orderId }).then((res) => {
            if (res.status === 200) {
              this.$toast({ message: res.message, duration: 1000 })
              setTimeout(() => {
                this.$router.go(-1)
              }, 1000)
            }
          }).catch(() => { })
        })
      } else if (smallBtn.operateId === 4) {
        localStorage.setItem('payId', this.payId)
        this.$router.push({ path: '/order/payment', query: { orderType: 'mallOrder' } })
      } else if (smallBtn.operateId === 5) { // 确认收货
        this.$messagebox({ message: '您确定收到货品了吗？', showCancelButton: true, showConfirmButton: true, confirmButtonText: '确定', cancelButtonText: '取消' }).then(action => {
          action === 'confirm' && this.confirmBoughtOrder({ orderId: this.orderId }).then((res) => {
            if (res.status === 200) {
              this.$toast({ message: res.message, duration: 1000 })
              setTimeout(() => {
                this.$router.go(-1)
              }, 1000)
            }
          }).catch(() => { })
        })
      } else if (smallBtn.operateId === 6) {
        this.$router.push({ path: '/bought/logistics', query: { logisticsNo: '3729240042057' } })
        // window.location.href = `https://m.kuaidi100.com/index_all.html?postid=3729240042057`
        // window.location.href = `https://m.kuaidi100.com/index_all.html?postid=3729240042057`
        // window.location.href = `https://m.kuaidi100.com/result.jsp?nu=3729240042057`
        // window.location.href = `https://m.kuaidi100.com/result.jsp?nu=${this.logisticsNo}`
      } else if (smallBtn.operateId === 7) { // 删除订单
        this.$messagebox({ message: '确定删除订单', showCancelButton: true, showConfirmButton: true, confirmButtonText: '确定', cancelButtonText: '取消' }).then(action => {
          action === 'confirm' && this.deleteBoughtOrder({ orderId: this.orderId }).then((res) => {
            if (res.status === 200) {
              this.$toast({ message: res.message, duration: 1000 })
              setTimeout(() => {
                this.$router.go(-1)
              }, 1000)
            }
          }).catch(() => { })
        })
      } else if (smallBtn.operateId === 8) {
        // eslint-disable-next-line no-undef
        _MEIQIA('showPanel')
      } else if (smallBtn.operateId === 9) {
        sessionStorage.setItem('reload', 1)
        this.$router.push({ path: '/order/index', query: { orderId: this.orderId } })
      }
    },
    /* 运费是否显示 */
    feeStatus (status, allService, freight) { // 全服务----allService----false
      if (['6', '7'].includes(status)) return ''
      else if (['0', '5'].includes(status)) {
        if (allService) return `￥${Number(freight).toFixed(2)}`
        else return ''
      } else return `￥${Number(freight).toFixed(2)}`
    },
    /* 留言是否显示 */
    leavingStatus (status, allService, remark) {
      if (['6', '7'].includes(status)) return ''
      else if (['0', '5'].includes(status)) {
        if (allService) return remark === 'null' ? '' : remark
        else return ''
      } else return remark === 'null' ? '' : remark
    }
  },
  mounted () {
    /* 联系客服配置准备 */
    connectService(0)
    this.loadBoughtDetail()
  },
  destroyed () {
    // eslint-disable-next-line no-undef
    _MEIQIA('hidePanel')
  }
}
</script>

<style lang="scss" scoped>
.order-detail {
  padding-bottom: 120px;
  .order-status-tips {
    width: 100%;
    height: 88px;
    font-size: 28px;
    color: $color-028EA9;
    padding: 0 0 0 32px;
    box-sizing: border-box;
    line-height: 88px;
    background-color: $color-F2FDFF;
  }
  .order-detail-address {
    margin-bottom: 24px;
  }
  .order-detail-system {
    margin-top: 24px;
    padding: 12px 32px;
    background-color: $color-ff;
  }
  .order-detail-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 24px 32px;
    box-sizing: border-box;
    background-color: $color-ff;
  }
}
</style>
