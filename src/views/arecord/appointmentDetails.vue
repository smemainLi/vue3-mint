<template>
  <div class="appointment-details">
    <qrcode-display v-show="subitemStatus===success"></qrcode-display>
    <status-info :statusList="statusList"></status-info>
    <service-info :subitemStatus="subitemStatus" :serviceList="serviceList"></service-info>
    <general-button class="btn-style" :btnName="btnName" v-show="subitemStatus===success" @click.native="cancelReservation"></general-button>
    <dialog-box v-show="boxMask"></dialog-box>
  </div>
</template>

<script>
import qrcodeDisplay from '../../components/arecord/qrcodeDisplay.vue'
import statusInfo from '../../components/arecord/statusInfo.vue'
import serviceInfo from '../../components/arecord/serviceInfo.vue'
import generalButton from '../../components/common/generalButton.vue'
import dialogBox from '../../components/arecord/dialogBox.vue'

export default {
  data () {
    return {
      subitemStatus: this.$route.query.subitemStatus,
      success: '预约成功',
      cancel: '已取消',
      used: '已使用',
      expired: '已失效',
      statusList: [],
      serviceList: [],
      btnName: '取消预约',
      boxMask: false // 是否显示弹框的标志
    }
  },
  components: { qrcodeDisplay, statusInfo, serviceInfo, generalButton, dialogBox },
  created () {
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
    }
  },
  methods: {
    /* 取消预约 */
    cancelReservation () {
      this.boxMask = true
      /* window.addEventListener('touchmove', (e) => { // 监听滚动事件
        console.log('sdfhsdiufhisdhfihsdihf')
        if (this.boxMask) {
          e.preventDefault()// 禁止浏览器默认行为
        }
      }, false) */
      /* document.addEventListener('touchstart', function (event) {
        event.preventDefault()
      }, false) */
      /* window.addEventListener('touchmove', function (event) {
        console.log(event)
        // 判断默认行为是否可以被禁用
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            event.preventDefault()
          }
        }
      }, false) */
      window.addEventListener('scroll', this.scrollFn)
    },
    scrollFn () {
      console.log('dskjfhsdkfhsdk')
    }
  },
  destroyed () {
    window.removeEventListener('touchmove', (e) => {
      e.preventDefault()
    }, false)
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
