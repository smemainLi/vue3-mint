<template>
  <div class="arecord">
    <subitem :subitem="item" :latitude="latitude" :longitude="longitude" v-for="(item,index) in subitemList" @click.native="detailInfo(item)" :key="index"></subitem>
  </div>
</template>

<script>
import subitem from '../../components/arecord/subitem.vue'
import wx from 'weixin-js-sdk'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      latitude: 0, // 经度
      longitude: 0, // 纬度
      subitemList: []
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
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          res.data.registers.forEach(item => {
            this.subitemList.push({
              subitemId: item.id,
              clinicName: item.shopName,
              clinicAddress: item.address,
              amountSpent: `￥${item.money}`,
              appointmentTime: item.appointment,
              orderTime: item.createDate,
              subitemStatus: item.status === '已预约' ? '预约成功' : item.status
            })
          })
        }
      }).catch((err) => {
        this.$toast('错误数据')
        throw err
      })
    },
    /* 获取当前地理位置 */
    getCurrentLocation () {
      let _this = this
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            console.log(res)
            _this.latitude = res.latitude
            _this.longitude = res.longitude
          }
        })
      })
    },
    detailInfo (subitem) {
      localStorage.setItem('registerId', subitem.subitemId)
      // this.$router.push({ path: '/arecord/appointmentDetails', query: { subitemStatus: subitem.subitemStatus === '预约成功' ? '已预约' : subitem.subitemStatus } })
      this.$router.push({ path: '/arecord/appointmentDetails', query: { clinicAddress: subitem.clinicAddress } })
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
}
</style>
