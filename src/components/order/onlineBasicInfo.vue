<template>
  <div class="online-basic-info">
    <!-- 门诊 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{clinic.label}}</span>
      </div>
      <input class="field-input" type="text" :placeholder="clinic.placeholder" v-model="clinicVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 预约时间 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{appointmentDate.label}}</span>
      </div>
      <input class="field-input" type="text" readonly="readonly" :placeholder="appointmentDate.placeholder" v-model="appointmentDateVal" @click="openPicker">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 就诊时间 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{timeSlot.label}}</span>
      </div>
      <input class="field-input" type="text" readonly="readonly" :placeholder="timeSlot.placeholder" v-model="timeSlotVal" @click="openPop">
    </div>

    <!-- 获取预约日期 -->
    <mt-datetime-picker ref="pickerDate" v-model="pickerDate" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>

    <!-- 获取时间段 -->
    <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <mt-picker :slots="slots" @change="getSlotValue"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { timeFormat } from '../../utils/tools'

export default {

  data () {
    return {
      clinic: {
        label: '门诊',
        placeholder: '请填写门诊'
      },
      clinicVal: '上冲门诊',
      appointmentDate: {
        label: '预约日期',
        placeholder: '请选择日期'
      },
      appointmentDateVal: '',
      timeSlot: {
        label: '就诊时间',
        placeholder: '请选择时间段'
      },
      timeSlotVal: '',
      popupVisible: false,
      pickerDate: '',
      slots: [
        {
          flex: 1,
          values: ['请选择时间段', '9: 00 ~ 9: 30', '9: 30 ~ 10: 00', '10: 00 ~ 10: 30', '10: 30 ~ 11: 00', '11: 00 ~ 11: 30', '11: 30 ~ 12: 00', '12: 00 ~ 12: 30', '12: 30 ~ 13: 00', '13: 00 ~ 13: 30'],
          className: 'slot',
          textAlign: 'center'
        }
      ]
    }
  },
  components: {
  },
  methods: {
    openPicker () {
      this.$refs.pickerDate.open()// datetime-picker 提供了两个供外部调用的方法：open 和 close，分别用于打开和关闭选择器
    },
    handleConfirm (val) { // 点击确认按钮时的回调函数，回调的参数是目前选择的值
      this.appointmentDateVal = timeFormat(val)
      console.log(this.appointmentDateVal)
    },
    openPop () {
      this.popupVisible = true
    },
    getSlotValue (index, value) {
      this.timeSlotVal = value
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.online-basic-info {
  margin-bottom: 24px;
  .field-row {
    background-color: $color-ff;
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    font-size: 28px;
    padding: 0 32px;
    box-sizing: border-box;
    .field-label {
      color: $color-35;
      display: inline-block;
      width: 120px;
    }
    .field-input {
      color: $color-88;
      margin-left: 56px;
      width: 64%;
      font-size: 28px;
    }
  }
  .field-br {
    padding: 0 32px;
    box-sizing: border-box;
    text-align: center;
    background-color: $color-ff;
    border: 0;
    height: 1px;
    .br-style {
      border: 1px solid $color-e5;
    }
  }
  /deep/ .mint-popup {
    width: 100%;
  }
}
</style>
