<template>
  <div class="online-booking">
    <router-link class="unpaid-tips" v-show="hasUnpaid" :to="{path:'/arecord/appointmentDetails'}" tag="div" v-cloak>{{unpaidTips}}</router-link>
    <online-basic-info ref="onlineBasicInfo" :storeName="$route.query.storeName" :dataList="dataList" :times="times"></online-basic-info>
    <online-service-items ref="onlineServiceItems" @getServiceItemId="getServiceItemId" :serviceList="serviceList"></online-service-items>
    <online-description ref="onlineDescription"></online-description>
    <online-choose-patient ref="onlineChoosePatient" @getPatientItemId="getPatientItemId" :patientList="patientList"></online-choose-patient>
    <general-button :isAgree="isAgree" :hasUnpaid="hasUnpaid" :btnName="btnName" @click.native="makeAnAppointment"></general-button>
    <agree-notice :protocolName="protocolName" :flag="flag" @isAgreePro="isAgreeProtocol"></agree-notice>
  </div>
</template>

<script>
import onlineBasicInfo from '../../components/order/onlineBasicInfo.vue'
import onlineServiceItems from '../../components/order/onlineServiceItems.vue'
import onlineDescription from '../../components/order/onlineDescription.vue'
import onlineChoosePatient from '../../components/order/onlineChoosePatient.vue'
import generalButton from '../../components/common/generalButton.vue'
import agreeNotice from '../../components/order/agreeNotice.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isAgree: true,
      btnName: '确定预约',
      protocolName: '预约须知',
      flag: 'online',
      serviceId: '', // 选中的服务项目id
      patientId: '', // 就诊人id
      serviceList: [], // 服务项目
      patientList: [], // 就诊人列表
      bookingData: {}, // 预约界面提交表单
      dataList: [], // 日期列表
      times: [], // 时间段列表
      // timesList: [], // 时间段列表组成的列表，数组嵌套数组
      hasUnpaid: false, // 是否存在未支付订单 false 不存在 true 存在
      unpaidTips: '你有尚未支付的订单，请点此付款或取消才能重新下单>>'// 未支付提示
    }
  },
  components: {
    onlineBasicInfo, onlineServiceItems, onlineDescription, onlineChoosePatient, generalButton, agreeNotice
  },
  created () {
    this.loadRegisterData()
  },
  methods: {
    ...mapActions({ getRegisterData: 'getRegisterData', getPatientList: 'getPatientList', submitAppointment: 'submitAppointment' }),
    ...mapMutations({ changeFeeVal: 'changeFeeVal', changeTimeList: 'changeTimeList' }),
    makeAnAppointment () {
      console.log(this.$refs.onlineBasicInfo.appointmentDateVal)
      console.log(this.$refs.onlineBasicInfo.timeSlotVal)
      // console.log(this.serviceId)
      // console.log(this.patientId)
      /* 获取子组件中的参数 */
      // console.log(this.$refs.onlineBasicInfo)
      // console.log(this.$refs.onlineServiceItems)
      // console.log(this.$refs.onlineDescription)
      // console.log(this.$refs.onlineChoosePatient)
      /* 表单判断 */
      if (this.$refs.onlineBasicInfo.appointmentDateVal === '') this.$toast({ message: '请选择预约日期', duration: 1000 })
      else if (this.$refs.onlineBasicInfo.timeSlotVal === '') this.$toast({ message: '请选择就诊时间', duration: 1000 })
      else if (this.serviceId === '') this.$toast({ message: '请选择服务项目', duration: 1000 })
      else if (this.patientId === '') this.$toast({ message: '请选择就诊人', duration: 1000 })
      else {
        this.bookingData = {
          shopId: this.$route.query.storeId,
          appointmentDate: this.$refs.onlineBasicInfo.appointmentDateVal,
          appointmentTime: this.$refs.onlineBasicInfo.timeSlotVal,
          categoryId: this.serviceId,
          money: parseInt(this.$refs.onlineDescription.feeVal),
          remarks: this.$refs.onlineDescription.situationVal,
          relationshipId: this.patientId
        }
        // localStorage.setItem('bookingData', JSON.stringify(this.bookingData))// 序列化，JSON.stringify() 方法可以将任意的 JavaScript 值序列化成 JSON 字符串
        // console.log(JSON.parse(localStorage.getItem('bookingData')))// 反序列化，JSON.parse()将JSON字符串转成JSON对象
        // this.$router.push('/order/payment')
        this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
        this.submitAppointment(this.bookingData).then((res) => {
          this.$indicator.close()
          console.log(res)
          console.log(typeof res.status)
          if (res.status === 200) {
            localStorage.setItem('registerId', res.data.registerId)// 存储预约id
            localStorage.setItem('payId', res.data.payId)// 存储支付id
            if (res.data.payStatus) { // true 表示已支付 false 表示未支付
              this.$router.push({ path: '/order/orderSuccess' })
            } else {
              this.$router.push({ path: '/order/payment' })
            }
          } else if (res.status === -200) {
            this.$toast({ message: `${res.message}`, duration: 1000 })
          }
        }).catch((err) => {
          this.$toast('数据错误')
          throw err
        })
      }
    },
    isAgreeProtocol (val) { // 回调方法，接收子组件传的参数
      this.isAgree = val
    },
    /* 加载预约界面初始化数据 */
    loadRegisterData () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getRegisterData({ shopId: this.$route.query.storeId }).then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          if (res.data.erro) { // 如果存在erro，表示存在未支付订单
            this.hasUnpaid = res.data.erro
            localStorage.setItem('registerId', res.data.registerId)
          }
          // this.times = res.data.times
          res.data.dayList.map((item) => {
            this.dataList.push(item.day)// 日期列表
            this.times.push({
              day: item.day,
              times: item.timeList
            })
          })

          /* 在serviceList中存储多个数组，每个数组的元素最多3个 */
          let n = 0// 辅助
          let currentItem = []// 辅助
          res.data.categories.map((item) => {
            currentItem.push({
              serviceId: item.categoryId,
              serviceName: item.categoryName,
              serviceSelected: false
            })
            n++
            if (n % 3 === 0) {
              this.serviceList.push(currentItem)
              currentItem = []
              currentItem.length = 0
            }
          })
          if (currentItem.length !== 0) this.serviceList.push(currentItem)
          console.log(this.serviceList)

          this.changeFeeVal(res.data.money)
          /* 清空数组 */
          this.patientList.length = 0
          this.patientList = []
          res.data.relationships.map((item) => {
            this.patientList.push({
              patientId: item.relationshipId,
              patientName: item.relationshipName,
              patientSelected: false,
              hasBr: true// 样式设置，是否有下划线
            })
          })
          if (res.data.relationships.length !== 0) this.patientList[this.patientList.length - 1].hasBr = false// 样式设置，是否有下划线
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 获取服务项目的id */
    getServiceItemId (id) {
      console.log(id)
      this.serviceId = id
    },
    /* 获取就诊人的id */
    getPatientItemId (id) {
      console.log(id)
      this.patientId = id
    }
  },
  /* keep-alive 组件激活时调用 */
  activated () {
    this.getPatientList().then((res) => {
      console.log(res)
      if (res.status === 200) {
        this.patientList.length = 0
        this.patientList = []
        res.data.list.forEach((item) => {
          this.patientList.push({
            patientId: item.relationshipId,
            patientName: item.relationshipName,
            patientSelected: false,
            hasBr: true// 样式设置，是否有下划线
          })
        })
        if (this.patientList.length !== 0) this.patientList[this.patientList.length - 1].hasBr = false// 样式设置，是否有下划线
      }
    }).catch((err) => {
      this.$toast('数据错误')
      throw err
    })
  },
  beforeRouteLeave (to, from, next) {
    console.log(to)
    console.log(from)
    from.meta.keepAlive = false
    next()
  }
}
</script>

<style lang="scss" scoped>
.online-booking {
  .unpaid-tips {
    padding: 8px 0 8px 32px;
    font-size: 24px;
    color: $color-048FAA;
    background-color: $color-FFF8E0;
  }
}
</style>
