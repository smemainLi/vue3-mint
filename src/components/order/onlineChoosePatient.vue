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
    <router-link :to="{path:'/order/addOrEdit'}" tag="div" class="add-patient">
      <span class="add-content" v-cloak>{{addContent}}</span>
    </router-link>
  </div>
</template>

<script>
import patientItem from './patientItem.vue'

export default {
  data () {
    return {
      titleContent: '选择就诊人',
      patientList: [
        { patientName: '一杯', selected: false, hasBr: true },
        { patientName: '矿大一天', selected: false, hasBr: false }
      ],
      addContent: '添加就诊人'
    }
  },
  components: {
    patientItem
  },
  methods: {
    /* 选择就诊人 */
    selectPatient (patientItem) {
      patientItem.selected = !patientItem.selected
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
