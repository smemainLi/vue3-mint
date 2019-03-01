<template>
  <div class="all-bills">
    <bill-type></bill-type>
    <bill-item :billContent="item" v-for="(item,index) in billList" :key="index"></bill-item>
  </div>
</template>

<script>
import billType from '../../components/mcard/billType.vue'
import billItem from '../../components/mcard/billItem.vue'
export default {
  data () {
    return {
      billAmount: '-￥180.25',
      billTime: '2018-12-25 14:21',
      billUsage: '门店消费',
      billOther: '上冲门诊',
      billList: [
        { billAmount: '-￥180.25', isPlus: false, billTime: '2018-12-25 14:21', billUsage: '门店消费', billOther: '上冲门诊', isExamine: false, hasBr: true },
        { billAmount: '-￥180.25', isPlus: false, billTime: '2018-12-25 14:21', billUsage: '提现', billOther: '审批中', isExamine: true, hasBr: true },
        { billAmount: '+￥185.25', isPlus: true, billTime: '2018-12-25 14:21', billUsage: '会员收益', isExamine: false, hasBr: true },
        { billAmount: '+￥180.25', isPlus: true, billTime: '2018-12-25 14:21', billUsage: '充值', isExamine: false, hasBr: true },
        { billAmount: '-￥8', isPlus: false, billTime: '2018-12-25 14:21', billUsage: '挂号', billOther: '上冲诊所', isExamine: false, hasBr: false }
      ]
    }
  },
  components: { billType, billItem }
}
</script>

<style lang="scss" scoped>
</style>
