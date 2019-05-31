<template>
  <div class="consumption-list">
    <div class="placeholder-info" v-if="!hasListData">
      <div class="placeholder-img">
        <img class="img-content" :src="placeholderImg" alt="">
        <div class="tips-content" v-cloak>{{tipsContent}}</div>
      </div>
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
      consumptionList: [],
      hasListData: true// false 不存在数据  true 存在数据
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
      this.$indicator.close()
      if (res.status === 200) {
        this.hasListData = !!res.data.list.length
        res.data.list.length && res.data.list.forEach(listItem => {
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
      }
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
