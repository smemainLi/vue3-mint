<template>
  <div class="appointment-details">
    <qrcode-display :qrcodeImg="qrcodeImg" v-show="subitemStatus===success"></qrcode-display>
    <status-info :statusList="statusList"></status-info>
    <service-info :subitemStatus="subitemStatus" :serviceList="serviceList"></service-info>
    <general-button class="btn-style" :btnName="btnName" v-show="subitemStatus===success" @click.native="cancelReservation"></general-button>
    <dialog-box v-show="boxMask" @getDialogStatusConfirm="changeDialogStatusConfirm" @getDialogStatusCancel="changeDialogStatusCancel"></dialog-box>
  </div>
</template>

<script>
import qrcodeDisplay from '../../components/arecord/qrcodeDisplay.vue'
import statusInfo from '../../components/arecord/statusInfo.vue'
import serviceInfo from '../../components/arecord/serviceInfo.vue'
import generalButton from '../../components/common/generalButton.vue'
import dialogBox from '../../components/arecord/dialogBox.vue'
import { mapActions } from 'vuex'
import { timeFormat } from '../../utils/tools'

export default {
  data () {
    return {
      subitemStatus: this.$route.query.subitemStatus,
      success: '已预约',
      cancel: '已取消',
      used: '已使用',
      expired: '已失效',
      statusList: [],
      serviceList: [],
      btnName: '取消预约',
      boxMask: false, // 是否显示弹框的标志
      topVal: 0, // 记录滚动的高度
      qrcodeImg: ''
    }
  },
  components: { qrcodeDisplay, statusInfo, serviceInfo, generalButton, dialogBox },
  created () {
    // this.loadData()
    this.loadAppointmentDetail()
  },
  watch: {
    boxMask: function (newVal, oldVal) {
      console.log(newVal)
    }
  },
  methods: {
    ...mapActions({ getAppointmentDetail: 'getAppointmentDetail' }),
    /* 根据状态加载数据 */
    loadData () {
      switch (this.subitemStatus) {
        case this.success:
          this.statusList = [
            { label: '状态', value: '预约成功', hasBr: true, isStatus: true },
            { label: '预约方式', value: '线上预约', hasBr: false, isStatus: false }
          ]
          this.serviceList = [
            { label: '门店', value: '上冲诊所', hasBr: true },
            { label: '预约日期', value: '2018-01-12 10:00~10:30', hasBr: true },
            { label: '下单时间', value: '2018-01-10 14:21', hasBr: true },
            { label: '就诊人', value: '露久', hasBr: true },
            { label: '服务项目', value: '矫正', hasBr: true },
            { label: '情况说明', value: '正颚手术', hasBr: true },
            { label: '挂号费', value: '￥8', hasBr: true },
            { label: '支付方式', value: '微信支付', hasBr: true },
            { label: '收银员', value: '刘百搭', hasBr: false }
          ]
          break
        case this.cancel:
          this.statusList = [
            { label: '状态', value: '已取消', hasBr: true, isStatus: true },
            { label: '预约方式', value: '线上预约', hasBr: true, isStatus: false },
            { label: '取消时间', value: '2018-01-14 14:21', hasBr: false, isStatus: false }
          ]
          this.serviceList = [
            { label: '门店', value: '上冲诊所', hasBr: true },
            { label: '预约日期', value: '2018-01-12 10:00~10:30', hasBr: true },
            { label: '下单时间', value: '2018-01-10 14:21', hasBr: true },
            { label: '就诊人', value: '露久', hasBr: true },
            { label: '服务项目', value: '矫正', hasBr: true },
            { label: '情况说明', value: '正颚手术', hasBr: true },
            { label: '挂号费', value: '￥8（已退款）', hasBr: true },
            { label: '支付方式', value: '微信支付', hasBr: true },
            { label: '收银员', value: '刘百搭', hasBr: false }
          ]
          break
        case this.used:
          this.statusList = [
            { label: '状态', value: '已使用', hasBr: true, isStatus: true },
            { label: '预约方式', value: '线上预约', hasBr: true, isStatus: false },
            { label: '到店时间', value: '2018-01-14 14:21', hasBr: false, isStatus: false }
          ]
          this.serviceList = [
            { label: '门店', value: '上冲诊所', hasBr: true },
            { label: '预约日期', value: '2018-01-12 10:00~10:30', hasBr: true },
            { label: '下单时间', value: '2018-01-10 14:21', hasBr: true },
            { label: '就诊人', value: '露久', hasBr: true },
            { label: '服务项目', value: '矫正', hasBr: true },
            { label: '情况说明', value: '正颚手术', hasBr: true },
            { label: '挂号费', value: '￥8', hasBr: true },
            { label: '支付方式', value: '微信支付', hasBr: true },
            { label: '收银员', value: '刘百搭', hasBr: false }
          ]
          break
        case this.expired:
          this.statusList = [
            { label: '状态', value: '已失效', hasBr: true, isStatus: true },
            { label: '预约方式', value: '线上预约', hasBr: false, isStatus: false }
          ]
          this.serviceList = [
            { label: '门店', value: '上冲诊所', hasBr: true },
            { label: '预约日期', value: '2018-01-12 10:00~10:30', hasBr: true },
            { label: '下单时间', value: '2018-01-10 14:21', hasBr: true },
            { label: '就诊人', value: '露久', hasBr: true },
            { label: '服务项目', value: '矫正', hasBr: true },
            { label: '情况说明', value: '正颚手术', hasBr: true },
            { label: '挂号费', value: '￥8（已退款）', hasBr: true },
            { label: '支付方式', value: '微信支付', hasBr: true },
            { label: '收银员', value: '刘百搭', hasBr: false }
          ]
          break
        default:
          break
      };
    },
    /* 加载预约详情 */
    loadAppointmentDetail () {
      console.log(this.$route.query.registerId)
      console.log(timeFormat(new Date(1548121493000)))
      this.getAppointmentDetail({ registerId: this.$route.query.registerId }).then((res) => {
        console.log(res)
        console.log(res.data.cashierId)
        console.log(!res.data.cashierId)
        console.log(!!res.data.cashierId)
        this.subitemStatus = res.data.statusLable
        if (res.data.qrcode) this.qrcodeImg = res.data.qrcode
        switch (this.subitemStatus) {
          case this.success:
            this.statusList = [
              { label: '状态', value: '预约成功', hasBr: true, isStatus: true },
              { label: '预约方式', value: '线上预约', hasBr: false, isStatus: false }
            ]
            this.serviceList = [
              { label: '门店', value: res.data.shopName, hasBr: true },
              { label: '预约日期', value: `${res.data.appointmentDateLalbe} ${res.data.appointmentTime}`, hasBr: true },
              { label: '下单时间', value: timeFormat(new Date(res.data.createDate)), hasBr: true },
              { label: '就诊人', value: res.data.relationshipName, hasBr: true },
              { label: '服务项目', value: res.data.categoryName, hasBr: true },
              { label: '情况说明', value: res.data.remarks, hasBr: true },
              { label: '挂号费', value: `￥${res.data.money}`, hasBr: !!res.data.payTypeLable },
              { label: '支付方式', value: res.data.payTypeLable, hasBr: !!res.data.cashierId },
              { label: '收银员', value: res.data.cashierId, hasBr: false }
            ]
            break
          case this.cancel:
            this.statusList = [
              { label: '状态', value: '已取消', hasBr: true, isStatus: true },
              { label: '预约方式', value: '线上预约', hasBr: true, isStatus: false },
              { label: '取消时间', value: '2018-01-14 14:21', hasBr: false, isStatus: false }
            ]
            this.serviceList = [
              { label: '门店', value: '上冲诊所', hasBr: true },
              { label: '预约日期', value: '2018-01-12 10:00~10:30', hasBr: true },
              { label: '下单时间', value: '2018-01-10 14:21', hasBr: true },
              { label: '就诊人', value: '露久', hasBr: true },
              { label: '服务项目', value: '矫正', hasBr: true },
              { label: '情况说明', value: '正颚手术', hasBr: true },
              { label: '挂号费', value: '￥8（已退款）', hasBr: true },
              { label: '支付方式', value: '微信支付', hasBr: true },
              { label: '收银员', value: '刘百搭', hasBr: false }
            ]
            break
          case this.used:
            this.statusList = [
              { label: '状态', value: '已使用', hasBr: true, isStatus: true },
              { label: '预约方式', value: '线上预约', hasBr: true, isStatus: false },
              { label: '到店时间', value: '2018-01-14 14:21', hasBr: false, isStatus: false }
            ]
            this.serviceList = [
              { label: '门店', value: '上冲诊所', hasBr: true },
              { label: '预约日期', value: '2018-01-12 10:00~10:30', hasBr: true },
              { label: '下单时间', value: '2018-01-10 14:21', hasBr: true },
              { label: '就诊人', value: '露久', hasBr: true },
              { label: '服务项目', value: '矫正', hasBr: true },
              { label: '情况说明', value: '正颚手术', hasBr: true },
              { label: '挂号费', value: '￥8', hasBr: true },
              { label: '支付方式', value: '微信支付', hasBr: true },
              { label: '收银员', value: '刘百搭', hasBr: false }
            ]
            break
          case this.expired:
            this.statusList = [
              { label: '状态', value: '已失效', hasBr: true, isStatus: true },
              { label: '预约方式', value: '线上预约', hasBr: false, isStatus: false }
            ]
            this.serviceList = [
              { label: '门店', value: '上冲诊所', hasBr: true },
              { label: '预约日期', value: '2018-01-12 10:00~10:30', hasBr: true },
              { label: '下单时间', value: '2018-01-10 14:21', hasBr: true },
              { label: '就诊人', value: '露久', hasBr: true },
              { label: '服务项目', value: '矫正', hasBr: true },
              { label: '情况说明', value: '正颚手术', hasBr: true },
              { label: '挂号费', value: '￥8（已退款）', hasBr: true },
              { label: '支付方式', value: '微信支付', hasBr: true },
              { label: '收银员', value: '刘百搭', hasBr: false }
            ]
            break
          default:
            break
        };
      }).catch((err) => {
        this.$toast('数据错误')
        throw new Error(err)
      })
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
      this.subitemStatus = '已取消'/* 状态变为‘已取消’ */
      this.loadData()
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
}
</style>
