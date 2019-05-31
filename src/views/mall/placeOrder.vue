<template>
  <div class="place-order">
    <address-status v-show="!allServiceFlag" :addressItem="addressItem"></address-status>
    <goods-item :goodsItem="item" v-for="(item,index) in goodsList" :key="index"></goods-item>
    <div class="place-order-remard">
      <div class="order-freight" v-show="!allServiceFlag">
        <span class="freight-title" v-cloak>{{freightTitle}}</span><span class="freight-content" v-cloak>{{freightContent}}</span>
      </div>
      <div class="order-leaving-message" v-show="!allServiceFlag">
        <span class="message-title" v-cloak>{{messageTitle}}</span><input class="message-content" type="text" maxlength="30" :placeholder="messagePlaceholder" v-model="leavingMessage">
      </div>
      <div class="order-full-reduction" v-show="reductionStatus">
        <span class="reduction-title" v-cloak>{{reductionTitle}}</span><span class="reduction-content" v-cloak>{{reductionContent}}</span>
      </div>
      <div class="order-coupon">
        <span class="coupon-title" v-cloak>{{couponTitle}}</span>
        <div class="right-info" @click="$router.push({ path: '/mcard/myCoupon', query: { pageFlag: 'placeOrder',price: originalMoney } })">
          <span :class="['coupon-content',couponStatus?'':'no-coupon-can-use']" v-cloak>{{couponContent}}</span>
          <div class="right-arrow">
            <img class="arrow-img" :src="rightArrow" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-info">
      <div class="total-content" v-cloak>{{totalContent}}</div>
      <div class="bottom-info-left">
        <div class="acount-info">
          <div class="total-money" v-cloak>{{totalMoney}}</div>
          <div class="discount-money" v-show="discountMoney" v-cloak>{{discountMoney}}</div>
        </div>
        <button class="btn-content" @click="commitOrderData" v-cloak>{{btnContent}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import addressStatus from '../../components/mall/addressStatus.vue'
import goodsItem from '../../components/mall/goodsItem.vue'
import { Toast } from 'vant'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      addressItem: {},
      goodsList: [],
      freightTitle: '运费',
      freightContent: '',
      messageTitle: '留言',
      leavingMessage: '',
      messagePlaceholder: '关于商品配送的备注',
      reductionTitle: '满减',
      reductionContent: '',
      reductionStatus: false, // 满减状态 true 存在满减  false  不存在满减
      couponTitle: '优惠券',
      couponContent: '',
      couponStatus: true, // 优惠券可选状态
      couponNum: 0, // 可用优惠券的数量
      couponList: [], // 优惠券列表
      rightArrow: require('../../assets/images/mcard/arrow.png'),
      totalContent: '总计：',
      btnContent: '',
      originalMoney: '', // 记录预下单接口返回的总额，反正选择优惠券之后，总值变化
      totalMoney: '',
      discountMoney: '',
      productListStr: [],
      allServiceFlag: false, // 是否全为服务  false 非全服务  true 全服务
      reOrder: false// 重新下单  false 商品可以正常下单  true 商品存在库存不足或者下架商品
    }
  },
  components: { addressStatus, goodsItem },
  methods: {
    ...mapActions({ orderPageData: 'orderPageData', getValidCoupon: 'getValidCoupon', submitOrderData: 'submitOrderData' }),
    /* 加载预下单数据 */
    async loadOrderPageData () {
      Toast.loading({ mask: true, duration: 0, message: '加载中...' })
      const result = await this.orderPageData({ productListStr: this.$route.query.productListStr })
      Toast.clear()
      if (result.status !== 200) {
        this.$toast({ message: '该订单有商品库存不足，请重新下单', duration: 1500 })
        this.btnContent = '重新下单'
        this.reOrder = true
        return
      }
      this.btnContent = '提交订单'
      this.allServiceFlag = !result.data.isAllService
      if (sessionStorage.getItem('addressItem')) { // 如果sessionStorage中存在addressItem，页面加载该地址
        const addressItemInfo = JSON.parse(sessionStorage.getItem('addressItem'))
        this.addressItem = {
          addressId: addressItemInfo.addressId,
          nickname: addressItemInfo.nickname,
          phone: addressItemInfo.phone,
          isDefault: false,
          operateFlag: 'placeOrder',
          address: `${addressItemInfo.province}${addressItemInfo.city}${addressItemInfo.district}${addressItemInfo.detailAddress}`,
          hasBr: false
        }
      } else if (result.data.address) { // 加载接口返回的地址
        this.addressItem = {
          addressId: result.data.address.id,
          nickname: result.data.address.name,
          phone: result.data.address.mobile,
          isDefault: false,
          operateFlag: 'placeOrder',
          address: `${result.data.address.province}${result.data.address.city}${result.data.address.district}${result.data.address.address}`,
          hasBr: false
        }
      } else this.addressItem = {}
      this.goodsList.length = 0
      this.goodsList = []
      result.data.list.length && result.data.list.forEach(listItem => {
        this.goodsList.push({
          goodsId: listItem.id,
          goodsImg: listItem.image,
          goodsIntroduce: listItem.name,
          goodsPrice: `￥${listItem.price}`,
          goodsNum: `x${listItem.number}`,
          hasBr: true
        })
      })
      if (this.goodsList.length) this.goodsList[this.goodsList.length - 1].hasBr = false
      this.freightContent = `￥${result.data.freight.toFixed(2)}`
      this.reductionContent = `-${result.data.salePromotion}元`
      this.reductionStatus = !!result.data.salePromotion// 是否存在满减
      this.originalMoney = result.data.orderAmount
      this.totalMoney = `￥${result.data.orderAmount.toFixed(2)}`
      this.couponNum = result.data.couponNum
      this.loadValidCoupon()
    },
    /* 加载优惠券列表 */
    async loadValidCoupon () {
      const couponRes = await this.getValidCoupon({ price: Number(this.totalMoney.split('￥')[1]) })
      if (couponRes.status !== 200) return
      this.couponList = couponRes.data.list
      if (sessionStorage.getItem('couponId')) {
        for (let i = 0; i < this.couponList.length; i++) {
          if (this.couponList[i].id === sessionStorage.getItem('couponId')) {
            this.couponContent = `-${this.couponList[i].denomination}元`
            this.totalMoney = `￥${Number(this.totalMoney.split('￥')[1]) - Number(this.couponList[i].denomination)}`
            break
          }
        }
      } else if (this.couponNum) {
        this.couponStatus = true
        this.couponContent = `有${this.couponNum}张优惠券可用`
      } else {
        this.couponStatus = false
        this.couponContent = '无可用优惠券'
      }
      this.discountMoney = this.cutNum(this.reductionContent) + (this.couponContent.indexOf('-') !== -1 ? this.cutNum(this.couponContent) : 0)
        ? `已优惠￥${(this.cutNum(this.reductionContent) + (this.couponContent.indexOf('-') !== -1 ? this.cutNum(this.couponContent) : 0)).toFixed(2)}` : ''
    },
    /* 截取数字 */
    cutNum (str) {
      return Number(str.split('-')[1].split('元')[0])
    },
    /* 提交订单数据 */
    commitOrderData () {
      if (this.reOrder) {
        this.$router.go(-1)
        return
      }
      if (!this.allServiceFlag && !this.addressItem.addressId) {
        this.$toast('请添加收货地址')
        return
      }
      Toast.loading({ mask: true, duration: 0, message: '提交中...' })
      this.submitOrderData({
        addressId: this.addressItem.addressId,
        couponId: sessionStorage.getItem('couponId') || '',
        isAllService: !this.allServiceFlag,
        productListStr: this.$route.query.productListStr,
        remark: this.leavingMessage,
        source: this.$route.query.source// source 1：购物车   2：立即下单
      }).then((result) => {
        Toast.clear()
        sessionStorage.removeItem('addressItem')// 清除地址项
        sessionStorage.removeItem('couponId')// 清除优惠券id
        this.$toast({ message: result.message, duration: 1000 })
        if (result.status !== 200) {
          this.$toast({ message: '该订单有商品库存不足，请重新下单', duration: 1500 })
          this.btnContent = '重新下单'
          this.reOrder = true
          return
        }
        localStorage.setItem('payId', result.data.payId)
        setTimeout(() => {
          this.$router.replace({ path: '/order/payment', query: { orderType: 'mallOrder' } })
        }, 1000)
      }).catch(() => { })
    }
  },
  activated () {
    this.loadOrderPageData()
  },
  created () {
    if (!sessionStorage.getItem('placeOrderFirst')) {
      this.loadOrderPageData()
      sessionStorage.setItem('placeOrderFirst', '1')
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path !== '/mall/chooseAddress' && to.path !== '/mcard/myCoupon') {
      sessionStorage.removeItem('addressItem')// 清除地址项
      sessionStorage.removeItem('couponId')// 清除优惠券id
      sessionStorage.removeItem('placeOrderFirst')// 清除首次进入加载
    }
    from.meta.keepAlive = false
    next()
  }
}
</script>

<style lang="scss" scoped>
.place-order {
  padding-bottom: 160px;
  .place-order-remard {
    padding: 0 32px;
    margin-top: 24px;
    background-color: $color-ff;
    .order-freight {
      font-size: 28px;
      padding: 24px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $color-e5;
      .freight-title {
        color: $color-35;
      }
      .freight-content {
        color: $color-008CA7;
        margin-left: 24px;
      }
    }
    .order-leaving-message {
      font-size: 28px;
      padding: 24px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $color-e5;
      .message-title {
        color: $color-35;
      }
      .message-content {
        width: 80%;
        color: $color-35;
        margin-left: 24px;
      }
    }
    .order-full-reduction {
      font-size: 28px;
      padding: 24px 0;
      border-bottom: 1px solid $color-e5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .reduction-title {
        color: $color-35;
      }
      .reduction-content {
        color: $color-008CA7;
      }
    }
    .order-coupon {
      font-size: 28px;
      padding: 24px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .coupon-title {
        color: $color-35;
      }
      .right-info {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .coupon-content {
          color: $color-008CA7;
        }
        .no-coupon-can-use {
          color: $color-88;
        }
        .right-arrow {
          width: 40px;
          height: 40px;
          margin-left: 8px;
          .arrow-img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .bottom-info {
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 98px;
    padding: 0 0 0 32px;
    box-sizing: border-box;
    background-color: $color-ff;
    .total-content {
      font-size: 28px;
      color: $color-35;
    }
    .bottom-info-left {
      display: flex;
      align-items: center;
      .acount-info {
        margin-right: 24px;
        .total-money {
          float: right;
          font-size: 32px;
          color: $color-008CA7;
        }
        .discount-money {
          clear: both;
          float: right;
          font-size: 20px;
          color: $color-00;
        }
      }
      .btn-content {
        font-size: 36px;
        color: $color-ff;
        width: 295px;
        height: 98px;
        border-radius: 8px;
        background: $color-gradient;
      }
    }
  }
}
</style>
