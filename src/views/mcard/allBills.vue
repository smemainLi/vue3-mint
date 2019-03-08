<template>
  <div class="all-bills">
    <bill-type @getType="getSelectedType"></bill-type>
    <bill-item :billContent="item" v-for="(item,index) in billList" :key="index"></bill-item>
  </div>
</template>

<script>
import billType from '../../components/mcard/billType.vue'
import billItem from '../../components/mcard/billItem.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      billAmount: '-￥180.25',
      billTime: '2018-12-25 14:21',
      billUsage: '门店消费',
      billOther: '上冲门诊',
      selectedType: '',
      billList: [], // 列表
      data: {}, // 请求后台接口传递的数据
      pageNo: 1, // 页码
      pageSize: 16, // 每页有多少条记录
      noRecord: false, // 没有更多数据
      flag: 0// 标志 0：第一次请求 1：非第一次请求
    }
  },
  components: { billType, billItem },
  methods: {
    ...mapActions({ getBillDetails: 'getBillDetails' }),
    /* 加载账单明细 */
    async loadBillDetails () {
      this.data = {// 首次加载，默认加载全部，非首次加载，需传递类目类型
        pageNo: this.pageNo, // 页码
        pageSize: this.pageSize, // 每页有多少条记录
        type: this.flag === 0 ? '' : this.selectedType === '全部' ? '' : this.selectedType === '收入' ? 1 : 0 /* 空：全部 0：支出 ，1：收入 */
      }
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      const billResult = await this.getBillDetails(this.data)
      this.$indicator.close()
      this.pageNo += 1// 满足条件页码加一
      if (billResult.data.list.length === 0) {
        this.billList[this.billList.length - 1].hasBr = false// 当所有的数据都加载完毕之后，将最后一条数据的下划线去掉
        this.noRecord = true
        this.$toast('全部加载完了')
        return
      }
      window.addEventListener('scroll', this.scrollFn)
      if (billResult.status === 200) {
        billResult.data.list.forEach(bill => {
          this.billList.push({
            // billAmount: bill.transactionAmount.toString().indexOf('-') >= 0 ? `-￥${bill.transactionAmount.toString().slice(1)}` : `+￥${bill.transactionAmount.toString()}`,
            billAmount: bill.transactionAmount >= 0 ? `+${bill.transactionAmount}` : bill.transactionAmount,
            isPlus: bill.transactionAmount.toString().indexOf('-') < 0,
            billTime: bill.createDateStr,
            billUsage: bill.typeStr,
            billOther: bill.remark,
            isExamine: bill.type === 6,
            hasBr: true
          })
        })
      }
      console.log(billResult)
    },
    /* 当option切换之后，获取切换之后的option */
    getSelectedType (billType) {
      console.log(billType)
      this.selectedType = billType// 选择类目
      this.flag = 1// 标志置为1
      this.pageNo = 1// 切换类目之后，要将页面置1
      this.noRecord = false// 切换类目之后，noRecord置为false
      this.billList = []// 切换类目的时候，清除列表
      this.loadBillDetails()
    },
    scrollFn () {
      // 真实内容的高度
      var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight)
      // 视窗的高度
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
      // 隐藏的高度
      var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      if (pageHeight - viewportHeight - scrollHeight === 0) { // 如果滚轮滚到了底部
        if (this.noRecord) this.$toast('全部加载完了')
        else this.loadBillDetails()// 如果满足触发条件，执行
      }
    }
  },
  created () {
    this.loadBillDetails()
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollFn)// 移除window添加的"onscroll"事件
  }
}
</script>

<style lang="scss" scoped>
</style>
