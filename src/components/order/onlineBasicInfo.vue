<template>
  <div class="online-basic-info">
    <!-- 门诊 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{clinic.label}}</span>
      </div>
      <input class="field-input" type="text" readonly="readonly" :placeholder="clinic.placeholder" v-model="clinicVal">
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
      <input class="field-input" type="text" readonly="readonly" :placeholder="timeSlot.placeholder" v-model="timeSlotVal" @click="selectTime">
    </div>

    <!-- 获取预约日期 -->
    <mt-datetime-picker ref="pickerDate" :startDate="startDate" v-model="pickerDate" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>

    <!-- 获取时间段 -->
    <!-- <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <mt-picker :slots="slots" :showToolbar="showToolBar" @change="getSlotValue"></mt-picker>
    </mt-popup> -->

    <!-- <mt-datetime-picker ref="picker" type="time" v-model="pickerValue">
    </mt-datetime-picker> -->

    <!-- 获取时间段 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>

  </div>
</template>

<script>
import { timeFormat } from '../../utils/tools'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      startDate: new Date(),
      clinic: {
        label: '门诊',
        placeholder: '请填写门诊'
      },
      clinicVal: this.storeName, // 门诊
      appointmentDate: {
        label: '预约日期',
        placeholder: '请选择日期'
      },
      appointmentDateVal: '', // 预约日期
      timeSlot: {
        label: '就诊时间',
        placeholder: '请选择时间段'
      },
      actions: [],
      sheetVisible: false,
      timeSlotVal: '', // 就诊时间
      pickerDate: ''
    }
  },
  props: ['storeName', 'times'],
  components: {
  },
  computed: {
    ...mapState({
      slots: state => state.order.slots // 时间段，结合组件参照mint ui
    })
  },
  methods: {
    test1 (msg) {
      console.log(msg)
    },

    openPicker () {
      this.$refs.pickerDate.open()// datetime-picker 提供了两个供外部调用的方法：open 和 close，分别用于打开和关闭选择器
    },
    handleConfirm (val) { // 点击确认按钮时的回调函数，回调的参数是目前选择的值
      this.appointmentDateVal = timeFormat(val)
      console.log(this.appointmentDateVal)
    },
    selectTime () {
      this.sheetVisible = true
      this.actions = []
      this.actions.length = 0
      this.times.forEach(item => {
        this.actions.push({
          name: item,
          method: (time) => {
            this.timeSlotVal = item
            console.log(time)
          }
        })
      })
    }
  },
  mounted () {
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
