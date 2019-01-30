<template>
  <div class="online-choose-patient">
    <div class="choose-patient-list">
      <div class="choose-title">
        <span class="title-content" v-cloak>{{titleContent}}</span>
      </div>
      <div class="choose-list">
        <patient-item :patient="item" v-for="(item,index) in patientList" @click.native="selectPatient(item)" :key="index"></patient-item>
      </div>
    </div>
    <div class="add-patient" @click="addPatient">
      <span class="add-content" v-cloak>{{addContent}}</span>
    </div>
  </div>
</template>

<script>
import patientItem from './patientItem.vue'

export default {
  data () {
    return {
      titleContent: '选择就诊人',
      addContent: '添加就诊人'
    }
  },
  props: ['patientList'],
  components: {
    patientItem
  },
  methods: {
    /* 选择就诊人 */
    selectPatient (patientItem) {
      console.log(patientItem)

      this.patientList.map((item) => {
        item.patientSelected = false
      })
      patientItem.patientSelected = true
      console.log(patientItem.patientId)
      this.$emit('getPatientItemId', patientItem.patientId)
    },
    addPatient () {
      if (this.patientList.length === 5) {
        this.$toast({ message: '最多只能添加5位就诊人', duration: 1000 })
        return
      }
      this.$router.push({ path: '/order/addPatient' })
    }
  }
}
</script>

<style lang="scss" scoped>
.online-choose-patient {
  margin-bottom: 55px;
  .choose-patient-list {
    background-color: $color-ff;
    .choose-title {
      padding: 0 0 0 32px;
      box-sizing: border-box;
      width: 100%;
      height: 88px;
      line-height: 88px;
      border-bottom: 1px solid $color-e5;
      .title-content {
        color: $color-88;
        font-size: 28px;
      }
    }
  }
  .add-patient {
    padding: 0 0 0 32px;
    box-sizing: border-box;
    width: auto;
    height: 88px;
    display: inline-block;
    line-height: 88px;
    .add-content {
      font-size: 28px;
      color: $color-008CA7;
    }
  }
}
</style>
