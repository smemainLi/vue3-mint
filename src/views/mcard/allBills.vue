<template>
  <div class="all-bills">
    <bill-type :billList="billList" @getType="getSelectedType"></bill-type>
    <van-list :class="[!hasListData?'no-more-data':'']" v-model="loading" :finished="finished" :finished-text="noMore" @load="loadBillDetails">
      <bill-item :billContent="item" v-for="(item,index) in billList" :key="index"></bill-item>
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
      loading: false,
      finished: false,
      noMore: '没有更多了',
      data: {}, // 请求后台接口传递的数据
      pageNo: 1, // 页码
      pageSize: 16, // 每页有多少条记录
      noRecord: false, // 没有更多数据
      flag: 0, // 标志 0：第一次请求 1：非第一次请求
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '暂无数据哦~',
      hasListData: true, // false 没有数据  true 有数据
      firstPaging: true // true 第一个分页请求  false 非第一个分页请求
    }
  },
  components: { billType, billItem },
  methods: {
    ...mapActions({ getBillDetails: 'getBillDetails' }),
    /* 加载账单明细 */
    async loadBillDetails () {
      /* 使用vant列表 */
      this.data = {// 首次加载，默认加载全部，非首次加载，需传递类目类型
        pageNo: this.pageNo, // 页码
        pageSize: this.pageSize, // 每页有多少条记录
        type: this.flag === 0 ? '' : this.selectedType === '全部' ? '' : this.selectedType === '收入' ? 1 : 0 /* 空：全部 0：支出 ，1：收入 */
      }
      const billResult = await this.getBillDetails(this.data)
      if (billResult.status === 200) {
        this.pageNo += 1
        this.firstPaging && (this.hasListData = !!billResult.data.list.length)// 在第一个分页请求回来之后对hasListData进行判断，之后都不需要进行判断了
        this.firstPaging = false
        billResult.data.list.length && billResult.data.list.forEach(bill => {
          this.billList.push({
            billAmount: bill.transactionAmount >= 0 ? `+${bill.transactionAmount}` : bill.transactionAmount,
            isPlus: bill.transactionAmount.toString().indexOf('-') < 0,
            billTime: bill.createDateStr,
            billUsage: bill.typeStr,
            billOther: bill.remark,
            isExamine: bill.type === 6,
            hasBr: true
          })
        })
        // 加载状态结束
        this.loading = false
        this.finished = false
        if (billResult.data.list.length === 0 || billResult.data.list.length < 16) {
          this.finished = true
          if (this.billList.length) {
            this.billList[this.billList.length - 1].hasBr = false // 当所有的数据都加载完毕之后，将最后一条数据的下划线去掉
          }
        }
        // else if (billResult.data.list.length < 16) {
        //   this.finished = true
        // }
      }
    },
    /* 当option切换之后，获取切换之后的option */
    getSelectedType (billType) {
      this.selectedType = billType// 选择类目
      this.flag = 1// 标志置为1
      this.pageNo = 1// 切换类目之后，要将页面置1
      this.firstPaging = true
      this.billList = []// 切换类目的时候，清除列表
      this.loadBillDetails()
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
.all-bills {
  padding-bottom: 120px;
  /deep/ .van-list__finished-text {
    display: none;
  }
  .no-more-data {
    /deep/ .van-list__finished-text {
      display: none;
    }
    .placeholder-info {
      // margin-top: 120px !important;
      .placeholder-img {
        width: 227px;
        height: 214px;
        margin: 0 auto;
        margin-top: 280px;
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
