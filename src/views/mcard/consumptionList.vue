<template>
  <div class="consumption-list">
    <div class="placeholder-img" v-if="consumptionList.length===0">
      <img class="img-content" :src="placeholderImg" alt="">
      <div class="tips-content" v-cloak>{{tipsContent}}</div>
    </div>
    <consumption-item :consumptionItem="item" v-for="(item,index) in consumptionList" @click.native="selectConsumption(item)" :key="index"></consumption-item>
  </div>
</template>

<script>
import consumptionItem from '../../components/mcard/consumptionItem.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '暂无数据哦~',
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
    this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
    this.getConsumptionList().then((res) => {
      console.log(res)
      this.$indicator.close()
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
  .placeholder-img {
    width: 223px;
    height: 214px;
    margin: 0 auto;
    padding-top: 433px;
    text-align: center;
    .img-content {
      width: 100%;
      height: 100%;
    }
    .tips-content {
      font-size: 32px;
      color: $color-88;
      margin-top: 30px;
    }
  }
}
</style>
