<template>
  <div class="online-booking">
    <online-basic-info ref="onlineBasicInfo" :storeName="$route.query.storeName" :times="times"></online-basic-info>
    <online-service-items ref="onlineServiceItems" @getServiceItemId="getServiceItemId" :serviceList="serviceList"></online-service-items>
    <online-description ref="onlineDescription"></online-description>
    <online-choose-patient ref="onlineChoosePatient" @getPatientItemId="getPatientItemId" :patientList="patientList"></online-choose-patient>
    <general-button :isAgree="isAgree" :btnName="btnName" @click.native="makeAnAppointment"></general-button>
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
      times: [] // 时间段
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
        this.submitAppointment(this.bookingData).then((res) => {
          console.log(res)
          console.log(typeof res.status)
          if (res.status === 200) {
            localStorage.setItem('registerId', res.data.register)// 存储预约id
            this.$router.push({ path: '/order/payment' })
          }
        }).catch((err) => {
          this.$toast('数据错误')
          throw new Error(err)
        })
      }
    },
    isAgreeProtocol (val) { // 回调方法，接收子组件传的参数
      this.isAgree = val
    },
    /* 加载预约界面初始化数据 */
    loadRegisterData () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getRegisterData().then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          this.times = res.data.times
          res.data.categories.map((item) => {
            this.serviceList.push({
              serviceId: item.categoryId,
              serviceName: item.categoryName,
              serviceSelected: false
            })
          })
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
        throw new Error(err)
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
        res.data.relationships.forEach((item) => {
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
      throw new Error(err)
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
</style>
