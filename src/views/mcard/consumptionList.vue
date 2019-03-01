<template>
  <div class="consumption-list">
    <consumption-item :consumptionItem="item" v-for="(item,index) in consumptionList" @click.native="selectConsumption(item)" :key="index"></consumption-item>
  </div>
</template>

<script>
import consumptionItem from '../../components/mcard/consumptionItem.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      consumptionList: [
        // {
        //   storeName: '上冲诊所',
        //   payTime: '付款时间 2018-12-20 14:20',
        //   payUse: '挂号',
        //   paymentTile: '微信支付',
        //   paymentMoney: '￥1566.25'
        //   // path: '/mcard/consumptionDetail'
        // },
        // {
        //   storeName: '上冲诊所',
        //   payTime: '付款时间 2018-12-20 14:20',
        //   payUse: '消费服务&商品',
        //   paymentTile: '钱包支付',
        //   paymentMoney: '￥188.25'
        //   // path: '/mcard/consumptionDetail'
        // }
      ]
    }
  },
  components: { consumptionItem },
  methods: {
    ...mapActions({ getConsumptionList: 'getConsumptionList' }),
    selectConsumption (consumption) {
      this.$router.push({ path: '/mcard/consumptionDetail', query: { consumptionId: consumption.consumptionId } })
    }
  },
  created () {
    this.getConsumptionList().then((res) => {
      console.log(res)
      res.data.list.forEach(listItem => {
        this.consumptionList.push(
          {
            consumptionId: listItem.id,
            storeName: listItem.shopName,
            payTime: `付款时间 ${listItem.createDate}`,
            payUse: listItem.source,
            paymentTile: listItem.payType,
            paymentMoney: `￥${listItem.money}`
          }
        )
      })
    }).catch((err) => {
      this.$toast('数据错误')
      throw err
    })
  }
}
</script>

<style lang="scss" scoped>
.consumption-list {
  padding-bottom: 120px;
}
</style>
