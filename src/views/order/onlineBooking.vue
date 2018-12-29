<template>
  <div class="online-booking">
    <field v-model="test1" :label="'门诊'" :placeholder="'请填写门诊'" :isDate="false" :hasBr="true"></field>
    <field v-model="test2" :label="'预约日期'" :placeholder="'请选择日期'" :isDate="true" :hasBr="true"></field>
    <field v-model="test3" :label="'就诊时间'" :placeholder="'请选择时间段'" :isDate="false" :hasBr="false"></field>
    <button @click="tttestt">测试测试</button>
  </div>
</template>

<script>
import field from '../../components/order/field'

export default {
  data () {
    return {
      test1: '',
      test2: '',
      test3: '',
      fieldData: [
        {
          label: '门诊',
          // appointmentDate:'2018-12-18',
          // visitingTime:''
          placeholder: '请填写门诊',
          value: '上冲门诊',
          hasBr: true
        },
        {
          label: '预约日期',
          // appointmentDate:'2018-12-18',
          // visitingTime:''
          placeholder: '请选择日期',
          value: '2018-12-18',
          hasBr: true
        },
        {
          label: '就诊时间',
          // appointmentDate:'2018-12-18',
          // visitingTime:''
          placeholder: '请选择时间段',
          value: '',
          hasBr: false
        }
      ]
    }
  },
  components: {
    field
  },
  methods: {
    tttestt () {
      console.log(this.test1)
      console.log(this.test2)
      console.log(this.test3)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
