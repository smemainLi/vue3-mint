<template>
  <div class="coupon">
    <coupon-item :couponItem="item" :offlineId="offlineId" v-for="(item,index) in $route.query.pageFlag==='placeOrder'?selectCouponList:couponList" @click.native="selectCoupon(item)" @requestReloadMall="requestReloadMall" :key="index"></coupon-item>
    <div class="placeholder-info" v-if="!hasListData">
      <div class="placeholder-img">
        <img class="img-content" :src="placeholderImg" alt="">
        <div class="tips-content" v-cloak>{{tipsContent}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import couponItem from '../../components/mall/couponItem.vue'
import { getUrlParam } from '../../utils/tools'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '暂无数据哦~',
      couponList: [],
      // myCouponList: [],
      selectCouponList: [],
      hasListData: true, // false 无数据   true 有数据
      offlineId: ''// 线下扫码优惠券的id
    }
  },
  components: { couponItem },
  methods: {
    ...mapActions({ getValidCoupon: 'getValidCoupon', mallCouponList: 'mallCouponList', getMyCouponList: 'getMyCouponList' }),
    /* 下单选择优惠券列表 */
    async loadValidCoupon () {
      this.selectCouponList = []
      this.selectCouponList.length = 0
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      const result = await this.getValidCoupon({ price: Number(this.$route.query.price) })
      this.$indicator.close()
      if (result.status === 200) {
        this.hasListData = !!result.data.list.length
        result.data.list.length && result.data.list.forEach(listItem => {
          this.selectCouponList.push({
            couponId: listItem.id,
            moneyContent: listItem.denomination,
            fullReduction: `满￥${listItem.threshold}可用`,
            couponLimit: '全线上商城通用',
            couponDeadline: listItem.useDate,
            canSelect: listItem.use,
            canNotSelect: !listItem.use
          })
        })
      }
    },
    /* 获取商城优惠券列表 */
    async loadMallCouponList () {
      this.couponList = []
      this.couponList.length = 0
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.offlineId = getUrlParam('id') || sessionStorage.getItem('offId') || ''
      const result = await this.mallCouponList({ id: getUrlParam('id') || sessionStorage.getItem('offId') || '' })
      this.$indicator.close()
      /* state 1、正常、2、已抢过、3、已抢光 */
      if (result.status !== 200) {
        return
      }
      this.hasListData = !!result.data.list.length
      if ((!result.data.list.length && getUrlParam('id')) || (!result.data.list.length && sessionStorage.getItem('offId'))) {
        this.$messagebox('暂无法领取', '该优惠券尚未开始或者已经结束，请下次再来哟')
        return
      }
      result.data.list.length && result.data.list.forEach(listItem => {
        this.couponList.push({
          couponId: listItem.id,
          moneyContent: listItem.denomination,
          fullReduction: `满￥${listItem.threshold}可用`,
          couponLimit: '全线上商城通用',
          couponDeadline: listItem.useDate,
          canGrab: this.$route.query.pageFlag === 'mall' && listItem.state === 1,
          robbed: this.$route.query.pageFlag === 'mall' && listItem.state === 3,
          hasGot: this.$route.query.pageFlag === 'mall' && listItem.state === 2,
          waitUse: this.$route.query.pageFlag === 'myCoupon' && listItem.state === 1,
          hasUsed: this.$route.query.pageFlag === 'myCoupon' && listItem.state === 2,
          isOverdue: this.$route.query.pageFlag === 'myCoupon' && listItem.state === 3
        })
      })
    },
    /* 我的优惠券列表 */
    async loadMyCouponList () {
      this.couponList = []
      this.couponList.length = 0
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      const result = await this.getMyCouponList()
      this.$indicator.close()
      /* 1、待使用，2、已使用，3、已过期 */
      if (result.status === 200) {
        this.hasListData = !!result.data.list.length
        result.data.list.length && result.data.list.forEach(listItem => {
          this.couponList.push({
            couponId: listItem.id,
            moneyContent: listItem.denomination,
            fullReduction: `满￥${listItem.threshold}可用`,
            couponLimit: '全线上商城通用',
            couponDeadline: listItem.useDate,
            waitUse: listItem.state === 1,
            hasUsed: listItem.state === 2,
            isOverdue: listItem.state === 3
          })
        })
      }
    },
    /* 选择优惠券 */
    selectCoupon (couponItem) {
      if (this.$route.query.pageFlag === 'mall') {

      } else if (this.$route.query.pageFlag === 'myCoupon') {

      } else {
        if (couponItem.canSelect) {
          sessionStorage.setItem('couponId', couponItem.couponId)
          this.$router.go(-1)
        }
      }
    },
    /* 重新调用商城优惠券接口 */
    requestReloadMall () {
      this.loadMallCouponList()
    }
  },
  created () {
    if (sessionStorage.getItem('offId') || getUrlParam('id')) {
      document.title = '领取优惠券'
    } else if (this.$route.query.pageFlag === 'mall') {
      document.title = '优惠券'
    } else if (this.$route.query.pageFlag === 'placeOrder') {
      document.title = '选择优惠券'
    }
  },
  mounted () {
    if (this.$route.query.pageFlag === 'placeOrder') { // 通过下单页面跳转至本页面
      this.loadValidCoupon()
    } else if (this.$route.query.pageFlag === 'myCoupon') { // 通过我的商城优惠券跳转至本页面
      this.loadMyCouponList()
    } else if (this.$route.query.pageFlag === 'mall' || sessionStorage.getItem('offId')) { // 通过商城跳转至本页面
      this.loadMallCouponList()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/mall/placeOrder') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.coupon {
  padding-bottom: 120px;
  .placeholder-info {
    padding-top: 433px;
    .placeholder-img {
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
</style>
