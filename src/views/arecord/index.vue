<template>
  <div class="arecord">
    <subitem :subitem="item" v-for="(item,index) in subitemList" @click.native="detailInfo(item)" :key="index"></subitem>
  </div>
</template>

<script>
import subitem from '../../components/arecord/subitem.vue'
export default {
  data () {
    return {
      subitemList: [
        { clinicName: '上冲诊所', amountSpent: '￥30', appointmentTime: '2018-12-20 10:30-11:00', orderTime: '2018-12-10 14:20', subitemStatus: '预约成功' },
        { clinicName: '上冲诊所', amountSpent: '￥30', appointmentTime: '2018-12-20 10:30-11:00', orderTime: '2018-12-10 14:20', subitemStatus: '已取消' },
        { clinicName: '上冲诊所', amountSpent: '￥0', appointmentTime: '2018-12-20 10:30-11:00', orderTime: '2018-12-10 14:20', subitemStatus: '已使用' },
        { clinicName: '上冲诊所', amountSpent: '', appointmentTime: '2018-12-20 10:30-11:00', orderTime: '2018-12-10 14:20', subitemStatus: '已失效' }
      ]
    }
  },
  components: {
    subitem
  },
  methods: {
    detailInfo (subitem) {
      this.$router.push({ path: '/arecord/appointmentDetails', query: { subitemStatus: subitem.subitemStatus } })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
