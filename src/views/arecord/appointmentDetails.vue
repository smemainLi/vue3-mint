<template>
  <div class="appointment-details">
    <qrcode-display :qrcodeImg="qrcodeImg" v-show="subitemStatus===success"></qrcode-display>
    <status-info :statusList="statusList"></status-info>
    <service-info :subitemStatus="subitemStatus" :latitude="latitude" :longitude="longitude" :clinicAddress="clinicAddress" :serviceList="serviceList"></service-info>
    <div class="cancel-reservation-btn" v-show="subitemStatus===success">
      <general-button class="btn-style" :btnName="btnName" @click.native="cancelReservation"></general-button>
    </div>
    <div class="to-be-paid-buttons" v-show="subitemStatus===toBePaid">
      <button class="com-button detail-button" @click="rePayOrder" v-cloak>{{rePay}}</button>
      <button class="com-button get-more-button" @click="cancelReservation" v-cloak>{{btnName}}</button>
    </div>
    <dialog-box v-show="boxMask" :subitemStatus="subitemStatus" :isIntraday="isIntraday" :registeredFee="registeredFee" @getDialogStatusConfirm="changeDialogStatusConfirm" @getDialogStatusCancel="changeDialogStatusCancel"></dialog-box>
  </div>
</template>

<script>
import qrcodeDisplay from '../../components/arecord/qrcodeDisplay.vue'
import statusInfo from '../../components/arecord/statusInfo.vue'
import serviceInfo from '../../components/arecord/serviceInfo.vue'
import generalButton from '../../components/common/generalButton.vue'
import dialogBox from '../../components/arecord/dialogBox.vue'
// import wx from 'weixin-js-sdk'
import { timeFormat, getUrlParam, stopBodyScroll } from '../../utils/tools'
import { mapActions } from 'vuex'

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
      registeredFee: 0, // 挂号费
      // topVal: 0, // 记录滚动的高度
      qrcodeImg: '',
      latitude: 0, // 经度
      longitude: 0, // 纬度
      clinicAddress: ''// 详细地址
    }
  },
  components: { qrcodeDisplay, statusInfo, serviceInfo, generalButton, dialogBox },
  created () {
    // this.loadData()
    this.loadAppointmentDetail()
  },
  watch: {
    boxMask: function (newVal, oldVal) {
    }
  },
  methods: {
    ...mapActions({ getAppointmentDetail: 'getAppointmentDetail', cancelOrder: 'cancelOrder' }),
    /* 加载预约详情 */
    loadAppointmentDetail () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getAppointmentDetail({ registerId: getUrlParam('registerId') || localStorage.getItem('registerId') }).then((res) => {
        localStorage.setItem('payId', res.data.payId)
        this.$indicator.close()
        if (res.status === 200) {
          if (res.data.qrcode) this.qrcodeImg = res.data.qrcode
          let orderTimeBlockList = res.data.appointment.split(' ')[0].split('-')// 预约日期---年月日时间块
          let currentTimeBlockList = timeFormat(new Date()).split(' ')[0].split('-')// 当前日期---年月日时间块
          if (parseInt(orderTimeBlockList[0]) === parseInt(currentTimeBlockList[0]) &&
            parseInt(orderTimeBlockList[1]) === parseInt(currentTimeBlockList[1]) &&
            parseInt(orderTimeBlockList[2]) === parseInt(currentTimeBlockList[2])) this.isIntraday = true
          this.latitude = res.data.latitude// 经度
          this.longitude = res.data.longitude// 纬度
          this.subitemStatus = res.data.status === '预约成功' ? '已预约' : res.data.status
          this.registeredFee = res.data.money// 挂号费
          this.clinicAddress = res.data.shopAddress// 门店详细地址
          this.statusList = [
            { label: '状态', value: res.data.status === this.success ? '预约成功' : res.data.status, hasBr: true, isStatus: res.data.status === this.success },
            { label: '预约方式', value: res.data.type, hasBr: res.data.status === this.cancel || res.data.status === this.used, isStatus: false },
            { label: res.data.status === this.cancel ? '取消时间' : '到店时间', value: res.data.status === this.cancel ? res.data.cancelDate : res.data.confirmDate, hasBr: false, isStatus: false }
          ]
          this.serviceList = [
            { label: '门店', value: res.data.shopName, hasBr: true },
            { label: '联系电话', value: res.data.mobile, hasBr: true },
            { label: '预约日期', value: res.data.appointment, hasBr: true },
            { label: '下单时间', value: res.data.createDate, hasBr: true },
            { label: '就诊人', value: res.data.relationshipName, hasBr: true },
            { label: '服务项目', value: res.data.categoryName, hasBr: true },
            { label: '情况说明', value: res.data.remarks, hasBr: true },
            { label: '挂号费', value: res.data.isRefund ? `￥${res.data.money}（已退款）` : `￥${res.data.money}`, hasBr: true },
            { label: '支付方式', value: res.data.payLable, hasBr: true },
            { label: '收银员', value: res.data.type === '线上预约' ? '' : res.data.staffName, hasBr: true },
            { label: '订单编号', value: res.data.code, hasBr: false }
          ]
        } else {
          this.$toast(res.message)
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 重新支付 */
    rePayOrder () {
      this.$router.push({ path: '/order/payment' })
    },
    /* 取消预约 */
    cancelReservation () {
      this.boxMask = true
      stopBodyScroll(this.boxMask)
    },

    /* 改变弹窗的状态，由确定按钮触发 */
    changeDialogStatusConfirm (status) {
      this.boxMask = status
      stopBodyScroll(this.boxMask)
      // this.subitemStatus = '已取消'/* 状态变为‘已取消’ */
      this.cancelOrder({ registerId: localStorage.getItem('registerId') }).then((res) => {
        this.$toast({ message: res.message, duration: 1000 })
        setTimeout(() => {
          this.loadAppointmentDetail()
        }, 1000)
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 改变弹窗的状态，由取消按钮触发 */
    changeDialogStatusCancel (status) {
      this.boxMask = status
      stopBodyScroll(this.boxMask)
    },
    /* 挂号费的显示状态 */
    feeShowStatus (status, money) {
      if (status === this.cancel && !this.isIntraday && money !== 0 && !this.$route.query.cancelFlag) { // cancelFlag 待支付跳转过来的携带的参数
        return `￥${money}（已退款）`
      } else return `￥${money}`
    }
  },

  destroyed () {
    /* 退出本页面的时候，window回到原先的0的位置 */
    stopBodyScroll(false)
  }
}
</script>

<style lang="scss" scoped>
.appointment-details {
  .cancel-reservation-btn {
    padding-bottom: 120px;
  }
  .to-be-paid-buttons {
    padding: 27px 32px 120px;
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
