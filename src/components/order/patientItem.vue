<template>
  <div class="patient-item">
    <div :class="['patient-info',patient.hasBr?'patient-br':'']">
      <div class="font-info">
        <div class="patient-name" v-cloak>{{patient.patientName}}</div>
        <router-link :to="{path:'/order/addOrEdit'}" tag="div" class="patient-edit">
          <i class="icon-edit"></i>
        </router-link>
      </div>
      <div class="patient-select">
        <i class="icon-unselected" v-show="!patient.selected"></i>
        <i class="icon-selected" v-show="patient.selected"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      patientName: '一杯'
    }
  },
  props: ['patient'],
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.patient-item {
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;
  .patient-info {
    height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .font-info {
      display: flex;
      justify-content: flex-start;
      .patient-name {
        font-size: 28px;
        color: $color-35;
      }
      .patient-edit {
        color: $color-88;
        font-size: 30px;
        margin-left: 25px;
      }
    }
    .patient-select {
      font-size: 32px;
      .icon-unselected {
        color: $color-e5;
      }
      .icon-selected {
        color: $color-008CA7;
      }
    }
  }
  .patient-br {
    border-bottom: 1px solid $color-e5;
  }
}
</style>
