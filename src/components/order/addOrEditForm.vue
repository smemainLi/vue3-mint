<template>
  <div class="add-or-edit-form">
    <!-- 姓名 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{name.label}}</span>
      </div>
      <input class="field-input" type="text" :placeholder="name.placeholder" v-model="nameVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 手机号码 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{phone.label}}</span>
      </div>
      <input class="field-input" type="number" :placeholder="phone.placeholder" v-model="phoneVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 性别 -->
    <div class="field-row field-sex">
      <div class="field-label">
        <span class="label-content" v-cloak>{{sexLabel}}</span>
      </div>
      <div class="field-radio">
        <label class="field-radio-row" v-for="(item,index) in sexList" :key="index">
          <input class="field-oprion" name="sexVal" type="radio" :value="item.sex" v-model="sexVal">
          <i></i>
          <span class="radio-sex" v-cloak>{{item.sex}}</span>
        </label>
      </div>
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 出生日期 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{birthdate.label}}</span>
      </div>
      <input class="field-input" type="text" readonly="readonly" :placeholder="birthdate.placeholder" v-model="birthdateVal" @click="openPicker">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 关系 -->
    <div class="field-row field-select">
      <div class="field-label">
        <span class="label-content" v-cloak>{{relationship}}</span>
      </div>
      <select class="field-option" name="relationship" v-model="relationshipVal">
        <option v-for="(item,index) in relationshipList" :value="item.relation" :key="index">{{item.relation}}</option>
      </select>
    </div>

    <!-- 获取预约日期 -->
    <mt-datetime-picker ref="pickerDate" v-model="pickerDate" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>

    <general-button :btnName="btnName"></general-button>

  </div>
</template>

<script>
import { timeFormat } from '../../utils/tools'
import generalButton from '../common/generalButton.vue'

export default {
  data () {
    return {
      name: {
        label: '姓名',
        placeholder: '请填写就诊人的姓名'
      },
      nameVal: '',
      phone: {
        label: '手机号码',
        placeholder: '请填写就诊人的手机号码'
      },
      phoneVal: '',
      sexLabel: '性别',
      sexList: [
        { sex: '男' },
        { sex: '女' }
      ],
      sexVal: '男',
      birthdate: {
        label: '出生日期',
        placeholder: '请选择出生日期'
      },
      birthdateVal: '',
      pickerDate: '',
      relationship: '关系',
      relationshipList: [
        { relation: '请选择' },
        { relation: '本人' },
        { relation: '父母' },
        { relation: '子女' },
        { relation: '夫妻' },
        { relation: '其他' }
      ],
      relationshipVal: '',
      btnName: '提交'
    }
  },
  components: {
    generalButton
  },
  created () {
    this.relationshipVal = this.relationshipList[0].relation// 下拉框默认选中第一项
  },
  methods: {
    openPicker () {
      this.$refs.pickerDate.open()// datetime-picker 提供了两个供外部调用的方法：open 和 close，分别用于打开和关闭选择器
    },
    handleConfirm (val) { // 点击确认按钮时的回调函数，回调的参数是目前选择的值
      this.birthdateVal = timeFormat(val)
      console.log(this.birthdateVal)
      console.log(this.relationshipVal)// 测试输出结果
      console.log(this.sexVal)// 测试输出结果
    }
  }
}
</script>

<style lang="scss" scoped>
.add-or-edit-form {
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
    .field-option {
      color: $color-88;
      margin-left: 56px;
      width: 70%;
      font-size: 28px;
      height: 100%;
    }
    .field-radio {
      margin-left: 56px;
      display: inline-block;
      position: relative;
      .field-radio-row {
        display: inline-block;
        margin-right: 100px;
        font-size: 28px;
        color: $color-88;
        position: relative;
        display: inline-block;
        font-weight: 400;
        padding-left: 25px;
        cursor: pointer;
        input {
          position: absolute;
          left: -9999px;
        }
        i {
          display: inline-block;
          position: absolute;
          top: 26px;
          left: 0;
          width: 30px;
          height: 30px;
          outline: 0;
          border: 1px solid $color-e5;
          background: #ffffff;
          border-radius: 50%;
          transition: border-color 0.3s;
        }
        input + i:after {
          position: absolute;
          content: "";
          top: 6px;
          left: 6px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: $color-1E8FA5;
          opacity: 0;
          transition: opacity 0.1s;
        }

        input:checked + i:after {
          opacity: 1;
        }
        .radio-sex {
          margin-left: 16px;
        }
      }
    }
  }
  .field-sex {
    display: block;
    line-height: 88px;
  }
  .field-select {
    margin-bottom: 143px;
  }
  .field-select:after {
    content: "";
    width: 28px;
    height: 28px;
    background: url("../../assets/images/order/triangle.png") no-repeat center;
    background-size: 40px 40px;
    position: absolute;
    right: 60px;
    top: 464px;
    /* //给自定义的图标实现点击下来功能 */
    pointer-events: none;
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
}
</style>
