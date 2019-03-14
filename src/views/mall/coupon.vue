<template>
  <div class="coupon">
    <coupon-item :couponItem="item" v-for="(item,index) in $route.query.pageFlag?myCouponList:couponList" :key="index"></coupon-item>
  </div>
</template>

<script>
import couponItem from '../../components/mall/couponItem.vue'
export default {
  data () {
    return {
      couponList: [
        { moneyContent: '50', fullReduction: '满￥1000可用', couponLimit: '全线上商城通用', couponDeadline: '2017.01.15~2017.01.28', canGrab: true, robbed: false, hasGot: false, waitUse: false, hasUsed: false, isOverdue: false },
        { moneyContent: '100', fullReduction: '满￥1500可用', couponLimit: '全线上商城通用', couponDeadline: '2017.01.15~2017.01.28', canGrab: false, robbed: true, hasGot: false, waitUse: false, hasUsed: false, isOverdue: false },
        { moneyContent: '150', fullReduction: '满￥2000可用', couponLimit: '全线上商城通用', couponDeadline: '2017.01.15~2017.01.28', canGrab: false, robbed: false, hasGot: true, waitUse: false, hasUsed: false, isOverdue: false },
        { moneyContent: '200', fullReduction: '满￥3000可用', couponLimit: '全线上商城通用', couponDeadline: '2017.01.15~2017.01.28', canGrab: false, robbed: true, hasGot: false, waitUse: false, hasUsed: false, isOverdue: false }
      ],
      myCouponList: [
        { moneyContent: '50', fullReduction: '满￥1000可用', couponLimit: '全线上商城通用', couponDeadline: '2017.01.15~2017.01.28', canGrab: false, robbed: false, hasGot: false, waitUse: true, hasUsed: false, isOverdue: false },
        { moneyContent: '100', fullReduction: '满￥1500可用', couponLimit: '全线上商城通用', couponDeadline: '2017.01.15~2017.01.28', canGrab: false, robbed: false, hasGot: false, waitUse: false, hasUsed: true, isOverdue: false },
        { moneyContent: '150', fullReduction: '满￥2000可用', couponLimit: '全线上商城通用', couponDeadline: '2017.01.15~2017.01.28', canGrab: false, robbed: false, hasGot: false, waitUse: false, hasUsed: false, isOverdue: true }
      ]
    }
  },
  components: { couponItem }
}
</script>

<style lang="scss" scoped>
</style>
