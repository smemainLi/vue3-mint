<template>
  <div class="consumption-detail">
    <use-info :useInfoList="useInfoList"></use-info>
    <store-info :storeInfoList="storeInfoList"></store-info>
    <div class="consumption-detail-btn">
      <general-button :btnName="btnName" @click.native="$router.go(-1)"></general-button>
    </div>
  </div>
</template>

<script>
import useInfo from '../../components/mcard/useInfo.vue'
import storeInfo from '../../components/mcard/storeInfo.vue'
import generalButton from '../../components/common/generalButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      useInfoList: [
        // { titleName: '补牙', titleFlag: require('../../assets/images/mcard/serviceIcon.png'), userMoney: '￥162', useNum: 'x2', hasBr: true },
        // { titleName: '口腔护理药水', titleFlag: require('../../assets/images/mcard/goodsIcon.png'), userMoney: '￥10', useNum: 'x2', hasBr: false }
      ],
      storeInfoList: [],
      btnName: '返回'
    }
  },
  components: { useInfo, storeInfo, generalButton },
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
          { label: '门店', value: res.data.shopName, isMoney: false, hasBr: true },
          { label: '消费金额', value: `￥${res.data.sum}`, isMoney: true, hasBr: !!res.data.relationshipName },
          { label: '就诊人', value: res.data.relationshipName, isMoney: false, hasBr: !!res.data.doctorName },
          { label: '医生', value: res.data.doctorName, isMoney: false, hasBr: !!res.data.staffName },
          { label: '收银员', value: res.data.staffName, isMoney: false, hasBr: !!res.data.creatDate },
          { label: '支付时间', value: res.data.creatDate, isMoney: false, hasBr: !!res.data.payType },
          { label: '支付方式', value: res.data.payType, isMoney: false, hasBr: !!res.data.code },
          { label: '订单编号', value: res.data.code, isMoney: false, hasBr: false }
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
.consumption-detail {
  &-btn {
    margin-top: 140px;
    padding-bottom: 120px;
  }
}
</style>
