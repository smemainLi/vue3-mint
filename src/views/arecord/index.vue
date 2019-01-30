<template>
  <div class="arecord">
    <subitem :subitem="item" v-for="(item,index) in subitemList" @click.native="detailInfo(item)" :key="index"></subitem>
  </div>
</template>

<script>
import subitem from '../../components/arecord/subitem.vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
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
              amountSpent: `￥${item.money}`,
              appointmentTime: item.appointment,
              orderTime: item.createDate,
              subitemStatus: item.status === '已预约' ? '预约成功' : item.status
            })
          })
        }
      }).catch((err) => {
        this.$toast('错误数据')
        throw new Error(err)
      })
    },
    detailInfo (subitem) {
      localStorage.setItem('registerId', subitem.subitemId)
      this.$router.push({ path: '/arecord/appointmentDetails', query: { subitemStatus: subitem.subitemStatus === '预约成功' ? '已预约' : subitem.subitemStatus } })
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
