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
    <!-- <mt-datetime-picker ref="pickerDate" :startDate="startDate" v-model="pickerDate" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker> -->

    <!-- 选择预约日期 -->
    <van-popup v-model="dateSelect" position="bottom">
      <van-picker show-toolbar :columns="dataList" @cancel="closeDateSelect" @confirm="confirmDateSelect" />
    </van-popup>

    <!-- 获取时间段 -->
    <!-- <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade">
      <mt-picker :slots="slots" :showToolbar="showToolBar" @change="getSlotValue"></mt-picker>
    </mt-popup> -->

    <!-- <mt-datetime-picker ref="picker" type="time" v-model="pickerValue">
    </mt-datetime-picker> -->

    <!-- 获取时间段 -->
    <van-popup v-model="timeSelect" position="bottom">
      <van-picker show-toolbar :columns="timeList" @cancel="closeTimeSelect" @confirm="confirmTimeSelect" />
    </van-popup>

    <!-- 获取时间段 -->
    <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet> -->

  </div>
</template>

<script>
// import { timeFormat } from '../../utils/tools'
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
      dateSelect: false,
      appointmentDateVal: '', // 预约日期
      timeSlot: {
        label: '就诊时间',
        placeholder: '请选择时间段'
      },
      // actions: [],
      // sheetVisible: false,
      timeSelect: false,
      timeSlotVal: '', // 就诊时间
      timeList: [], // 时间段列表
      numberList: [] // 时间段次数列表，后台返回
      // pickerDate: '',
    }
  },
  props: ['storeName', 'dataList', 'times'],
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
      // this.$refs.pickerDate.open()// datetime-picker 提供了两个供外部调用的方法：open 和 close，分别用于打开和关闭选择器
      this.dateSelect = true
    },
    // handleConfirm (val) { // 点击确认按钮时的回调函数，回调的参数是目前选择的值
    //   this.appointmentDateVal = timeFormat(val)
    //   console.log(this.appointmentDateVal)
    // },
    /* 取消日期选择 */
    closeDateSelect () {
      this.dateSelect = false
    },
    /* 确定日期选择 */
    confirmDateSelect (value, index) {
      this.dateSelect = false
      this.appointmentDateVal = value
    },
    /* 取消时间段选择 */
    closeTimeSelect () {
      this.timeSelect = false
    },
    /* 确定时间段选择 */
    confirmTimeSelect (value, index) {
      this.timeSelect = false
      this.timeSlotVal = value
      console.log(value)
    },
    selectTime () {
      // this.actions = []
      // this.actions.length = 0
      console.log(this.times)
      if (this.appointmentDateVal === '') {
        this.$toast({ message: '请先选择预约日期', duration: 1500 })
      } else {
        this.timeSelect = true
        this.times.forEach(item => {
          if (item.day === this.appointmentDateVal) {
            item.times.forEach(timeItem => {
              this.timeList.push(timeItem.time)
              this.numberList.push(timeItem.number)
            })
          }
        })
      }
      // this.times.forEach(item => {
      //   this.actions.push({
      //     name: item,
      //     method: (time) => { // 回调函数，携带值和方法
      //       this.timeSlotVal = item
      //       console.log(time)
      //     }
      //   })
      // })
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
