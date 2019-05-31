<template>
  <div class="arecord">
    <subitem :subitem="item" v-for="(item,index) in subitemList" @click.native="detailInfo(item)" :key="index"></subitem>
    <div class="placeholder-info" v-if="!hasListData">
      <div class="placeholder-img">
        <img class="img-content" :src="placeholderImg" alt="">
        <div class="tips-content" v-cloak>{{tipsContent}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import subitem from '../../components/arecord/subitem.vue'
// import wx from 'weixin-js-sdk'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '暂无数据哦~',
      // latitude: 0, // 经度
      // longitude: 0, // 纬度
      subitemList: [],
      hasListData: true// false 没有数据  true 有数据
    }
  },
  components: {
    subitem
  },
  methods: {
    ...mapActions({ getAppointmentList: 'getAppointmentList' }),
    /* 获取预约列表 */
    loadAppointmentList () {
      this.subitemList = []
      this.subitemList.length = 0
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getAppointmentList().then((res) => {
        this.$indicator.close()
        if (res.status !== 200) return
        this.hasListData = !!res.data.list.length
        res.data.list.length && res.data.list.forEach(item => {
          this.subitemList.push({
            payId: item.payId,
            subitemId: item.id,
            clinicName: item.shopName,
            clinicAddress: item.address,
            amountSpent: `￥${item.money}`,
            appointmentTime: item.appointment,
            orderTime: item.createDate,
            latitude: item.latitude, // 经度
            longitude: item.longitude, // 纬度
            subitemStatus: item.status === '已预约' ? '预约成功' : item.status
          })
        })
      }).catch((err) => {
        this.$toast('错误数据')
        throw err
      })
    },
    detailInfo (subitem) {
      localStorage.setItem('registerId', subitem.subitemId)
      localStorage.setItem('payId', subitem.payId)// 预约记录中的待支付记录，存储payId，以便于重新支付的时候使用
      this.$router.push({ path: '/arecord/appointmentDetails' })
    }
  },
  created () {
    this.loadAppointmentList()
  }
}
</script>

<style lang="scss" scoped>
.arecord {
  padding: 0 0 120px 0;
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
