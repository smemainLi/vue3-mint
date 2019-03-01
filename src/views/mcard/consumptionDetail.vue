<template>
  <div class="consumption-list">
    <use-info :useInfoList="useInfoList"></use-info>
    <store-info :storeInfoList="storeInfoList"></store-info>
  </div>
</template>

<script>
import useInfo from '../../components/mcard/useInfo.vue'
import storeInfo from '../../components/mcard/storeInfo.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      useInfoList: [
        // { titleName: '补牙', titleFlag: require('../../assets/images/mcard/serviceIcon.png'), userMoney: '￥162', useNum: 'x2', hasBr: true },
        // { titleName: '口腔护理药水', titleFlag: require('../../assets/images/mcard/goodsIcon.png'), userMoney: '￥10', useNum: 'x2', hasBr: false }
      ],
      storeInfoList: []
    }
  },
  components: { useInfo, storeInfo },
  methods: {
    ...mapActions({ getConsumptionDetail: 'getConsumptionDetail' })
  },
  created () {
    this.getConsumptionDetail({ consumptionId: this.$route.query.consumptionId }).then((res) => {
      console.log(res)
      if (res.status === 200) {
        this.useInfoList.length = 0
        this.useInfoList = []
        res.data.list.forEach(listItem => {
          this.useInfoList.push(
            {
              titleName: listItem.name,
              titleFlag: listItem.type ? require('../../assets/images/mcard/goodsIcon.png') : require('../../assets/images/mcard/serviceIcon.png'), // type: 0 服务 1 商品
              userMoney: `￥${listItem.money}`,
              useNum: `x${listItem.number}`,
              hasBr: true
            }
          )
        })
        if (this.useInfoList.length !== 0) this.useInfoList[this.useInfoList.length - 1].hasBr = false// 样式设置，是否有下划线
        this.storeInfoList = [
          { label: '门店', value: res.data.consumption.shopName, isMoney: false, hasBr: true },
          { label: '消费金额', value: `￥${res.data.consumption.sum}`, isMoney: true, hasBr: true },
          { label: '就诊人', value: res.data.consumption.relationshipName, isMoney: false, hasBr: true },
          { label: '医生', value: res.data.consumption.doctorName, isMoney: false, hasBr: true },
          { label: '收银员', value: res.data.consumption.staffName, isMoney: false, hasBr: true },
          { label: '支付时间', value: res.data.consumption.creatDate, isMoney: false, hasBr: true },
          { label: '支付方式', value: res.data.consumption.payType, isMoney: false, hasBr: true },
          { label: '订单编号', value: res.data.consumption.code, isMoney: false, hasBr: false }
        ]
      }
    }).catch((err) => {
      console.log('数据错误')
      throw err
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
