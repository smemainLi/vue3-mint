<template>
  <div class="field">
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{label}}</span>
      </div>
      <input class="field-input" v-if="!isDate" type="text" :placeholder="placeholder" v-model="content">
      <input class="field-input" v-if="isDate" type="text" :placeholder="placeholder" v-model="value" @click="openPicker">
      <div class="field-br" v-show="hasBr"></div>
    </div>
    <mt-datetime-picker ref="pickerDate" v-model="pickerDate" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
  </div>
</template>

<script>
import { timeFormat } from '../../utils/tools'

export default {
  data () {
    return {
      pickerDate: '',
      value: '',
      content: ''
    }
  },
  methods: {
    openPicker () {
      this.$refs.pickerDate.open()// datetime-picker 提供了两个供外部调用的方法：open 和 close，分别用于打开和关闭选择器
    },
    handleConfirm (val) { // 点击确认按钮时的回调函数，回调的参数是目前选择的值
      this.value = timeFormat(val)
      console.log(this.value)
    }
  },
  props: ['label', 'placeholder', 'isDate', 'hasBr'],
  watch: {
    value: function (newVal, oldVal) {
      console.log(`${newVal}------${oldVal}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  .field-row {
    background-color: $color-ff;
    width: 100%;
    height: 88px;
    line-height: 88px;
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
    }
    .field-br {
      border-bottom: 1px solid $color-e5;
    }
  }
}
</style>
