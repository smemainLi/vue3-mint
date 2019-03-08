<template>
  <div class="appointment-details">
    <qrcode-display :qrcodeImg="qrcodeImg" v-show="subitemStatus===success"></qrcode-display>
    <status-info :statusList="statusList"></status-info>
    <service-info :subitemStatus="subitemStatus" :latitude="latitude" :longitude="longitude" :clinicAddress="$route.query.clinicAddress" :serviceList="serviceList"></service-info>
    <general-button class="btn-style" :btnName="btnName" v-show="subitemStatus===success" @click.native="cancelReservation"></general-button>
    <div class="to-be-paid-buttons" v-show="subitemStatus===toBePaid">
      <button class="com-button detail-button" @click="rePayOrder" v-cloak>{{rePay}}</button>
      <button class="com-button get-more-button" @click="cancelReservation" v-cloak>{{btnName}}</button>
    </div>
    <dialog-box v-show="boxMask" :subitemStatus="subitemStatus" :isIntraday="isIntraday" @getDialogStatusConfirm="changeDialogStatusConfirm" @getDialogStatusCancel="changeDialogStatusCancel"></dialog-box>
  </div>
</template>

<script>
import qrcodeDisplay from '../../components/arecord/qrcodeDisplay.vue'
import statusInfo from '../../components/arecord/statusInfo.vue'
import serviceInfo from '../../components/arecord/serviceInfo.vue'
import generalButton from '../../components/common/generalButton.vue'
import dialogBox from '../../components/arecord/dialogBox.vue'
import wx from 'weixin-js-sdk'
import { mapActions } from 'vuex'
import { timeFormat } from '../../utils/tools'
// import { timeFormat } from '../../utils/tools'

export default {
  data () {
    return {
      // subitemStatus: this.$route.query.subitemStatus,
      subitemStatus: '',
      success: '已预约',
      cancel: '已取消',
      used: '已使用',
      expired: '已失效',
      toBePaid: '待支付',
      statusList: [],
      serviceList: [],
      btnName: '取消预约',
      rePay: '重新支付',
      boxMask: false, // 是否显示弹框的标志
      isIntraday: false, // 是否是当天的预约  false 非当天 true 当天
      topVal: 0, // 记录滚动的高度
      qrcodeImg: '',
      latitude: 0, // 经度
      longitude: 0 // 纬度
    }
  },
  components: { qrcodeDisplay, statusInfo, serviceInfo, generalButton, dialogBox },
  created () {
    // this.loadData()
    this.loadAppointmentDetail()
    // console.log(this.$route.query.subitemStatus)
    console.log(localStorage.getItem('registerId'))// 订单id
  },
  watch: {
    boxMask: function (newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {
    ...mapActions({ getAppointmentDetail: 'getAppointmentDetail', cancelOrder: 'cancelOrder' }),
    /* 加载预约详情 */
    loadAppointmentDetail () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getAppointmentDetail({ registerId: localStorage.getItem('registerId') }).then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          if (res.data.register.qrcode) this.qrcodeImg = res.data.register.qrcode
          let orderTimeBlockList = res.data.register.appointment.split(' ')[0].split('-')// 预约日期---年月日时间块
          let currentTimeBlockList = timeFormat(new Date()).split(' ')[0].split('-')// 当前日期---年月日时间块
          console.log(currentTimeBlockList)
          console.log(`${parseInt(orderTimeBlockList[0])} === ${parseInt(currentTimeBlockList[0])}`)
          console.log(`${parseInt(orderTimeBlockList[1])} === ${parseInt(currentTimeBlockList[1])}`)
          console.log(`${parseInt(orderTimeBlockList[2])} === ${parseInt(currentTimeBlockList[2])}`)
          if (parseInt(orderTimeBlockList[0]) === parseInt(currentTimeBlockList[0]) &&
            parseInt(orderTimeBlockList[1]) === parseInt(currentTimeBlockList[1]) &&
            parseInt(orderTimeBlockList[2]) === parseInt(currentTimeBlockList[2])) this.isIntraday = true
          console.log(this.isIntraday)
          this.subitemStatus = res.data.register.status === '预约成功' ? '已预约' : res.data.register.status
          this.statusList = [
            { label: '状态', value: res.data.register.status === this.success ? '预约成功' : res.data.register.status, hasBr: true, isStatus: res.data.register.status === this.success },
            { label: '预约方式', value: res.data.register.type, hasBr: res.data.register.status === this.cancel || res.data.register.status === this.used, isStatus: false },
            { label: res.data.register.status === this.cancel ? '取消时间' : '到店时间', value: res.data.register.updateDate, hasBr: false, isStatus: false }
          ]
          this.serviceList = [
            { label: '门店', value: res.data.register.shopName, hasBr: true },
            { label: '联系电话', value: res.data.register.mobile, hasBr: true },
            { label: '预约日期', value: res.data.register.appointment, hasBr: true },
            { label: '下单时间', value: res.data.register.createDate, hasBr: true },
            { label: '就诊人', value: res.data.register.relationshipName, hasBr: true },
            { label: '服务项目', value: res.data.register.categoryName, hasBr: true },
            { label: '情况说明', value: res.data.register.remarks, hasBr: true },
            { label: '挂号费', value: res.data.register.status === '已取消' && !this.isIntraday && res.data.register.money !== 0 && !this.$route.query.cancelFlag ? `￥${res.data.register.money}（已退款）` : `￥${res.data.register.money}`, hasBr: !!res.data.register.payLable },
            { label: '支付方式', value: res.data.register.payLable, hasBr: !!res.data.register.staffName },
            { label: '收银员', value: res.data.register.staffName, hasBr: false }
          ]
        } else {
          this.$toast(res.message)
        }
      }).catch((err) => {
        this.$toast('数据错误')
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
    /* 重新支付 */
    rePayOrder () {
      this.$router.push({ path: '/order/payment' })
    },
    /* 取消预约 */
    cancelReservation () {
      this.boxMask = true
      this.stopBodyScroll(this.boxMask)
    },
    /* 禁止页面滚动 */
    stopBodyScroll (isFixed) {
      let bodyEl = document.body
      let top = 0
      if (isFixed) {
        top = window.scrollY
        this.topVal = top// 存储这个值，当点击取消的时候可以用到
        bodyEl.style.position = 'fixed'
        bodyEl.style.top = -top + 'px'
      } else {
        top = this.topVal
        bodyEl.style.position = ''
        bodyEl.style.top = ''
        window.scrollTo(0, top) // 回到原先的top
      }
    },
    /* 改变弹窗的状态，由确定按钮触发 */
    changeDialogStatusConfirm (status) {
      console.log(status)
      this.boxMask = status
      this.stopBodyScroll(this.boxMask)
      // this.subitemStatus = '已取消'/* 状态变为‘已取消’ */
      this.cancelOrder({ registerId: localStorage.getItem('registerId') }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$toast({ message: '预约已取消', duration: 1000 })
          this.loadAppointmentDetail()
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 改变弹窗的状态，由取消按钮触发 */
    changeDialogStatusCancel (status) {
      console.log(status)
      this.boxMask = status
      this.stopBodyScroll(this.boxMask)
    }
  },

  destroyed () {
    /* 退出本页面的时候，window回到原先的0的位置 */
    this.stopBodyScroll(false)
  }
}
</script>

<style lang="scss" scoped>
.appointment-details {
  .btn-style {
    margin-bottom: 103px;
  }
  .to-be-paid-buttons {
    padding: 27px 32px 103px;
    text-align: center;
    .com-button {
      width: 324px;
      height: 88px;
      border-radius: 8px;
      font-size: 36px;
    }
    .detail-button {
      color: $color-008CA7;
      border: 1px solid $color-008CA7;
      background-color: $color-f5;
    }
    .get-more-button {
      color: $color-ff;
      margin-left: 37px;
      background: $color-gradient;
    }
  }
}
</style>
