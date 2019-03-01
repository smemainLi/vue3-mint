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
      <input class="field-input" type="number" onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="phone.placeholder" v-model="phoneVal">
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

    <!-- 获取出生日期 -->
    <mt-datetime-picker :startDate="startDate" ref="pickerDate" v-model="pickerDate" @confirm="handleConfirm" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>

    <!-- 如果没有获取到就诊人id，表示进行添加操作 -->
    <general-button :btnName="btnName" v-show="!$route.query.patientId" @click.native="confirmData"></general-button>

    <!-- 如果获取到就诊人id，表示进行编辑操作，编辑操作存在删除按钮 -->
    <div class="add-or-edit-buttons">
      <button class="com-button delete-button" v-show="$route.query.patientId" @click="deleteData" v-cloak>{{deleteButton}}</button>
      <button class="com-button confirm-button" v-show="$route.query.patientId" @click="confirmData" v-cloak>{{confirmButton}}</button>
    </div>

  </div>
</template>

<script>
import { timeFormat } from '../../utils/tools'
import { mapActions } from 'vuex'
import generalButton from '../../components/common/generalButton.vue'

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
      startDate: new Date(1900, 0, 1),
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
      btnName: '提交',
      deleteButton: '删除',
      confirmButton: '提交'
    }
  },
  components: {
    generalButton
  },
  created () {
    this.relationshipVal = this.relationshipList[0].relation// 下拉框默认选中第一项
    if (this.$route.query.patientId) { // 如果能获取到就诊人id，表示进行编辑操作
      console.log(this.$route.query.patientId)
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getPatientInfo({ relationshipId: this.$route.query.patientId }).then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          this.nameVal = res.data.name
          this.phoneVal = res.data.mobile
          this.sexVal = res.data.gender === 0 ? '女' : '男'
          this.birthdateVal = res.data.birthday
          this.relationshipVal = res.data.relationship === 1 ? this.relationshipList[1].relation : res.data.relationship === 2 ? this.relationshipList[2].relation : res.data.relationship === 3 ? this.relationshipList[3].relation : res.data.relationship === 4 ? this.relationshipList[4].relation : this.relationshipList[5].relation
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    }
  },
  methods: {
    ...mapActions({ addPatient: 'addPatient', getPatientInfo: 'getPatientInfo', deletePatient: 'deletePatient', updatePatient: 'updatePatient' }),
    openPicker () {
      this.$refs.pickerDate.open()// datetime-picker 提供了两个供外部调用的方法：open 和 close，分别用于打开和关闭选择器
    },
    handleConfirm (val) { // 点击确认按钮时的回调函数，回调的参数是目前选择的值
      this.birthdateVal = timeFormat(val)
    },
    /* 删除就诊人 */
    deleteData () {
      this.deletePatient({ relationshipId: this.$route.query.patientId }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$toast({ message: '删除成功', duration: 1000 })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 提交表单 */
    confirmData () {
      if (this.nameVal === '') this.$toast('姓名不能为空')
      else if (this.phoneVal === '' || this.phoneVal.length !== 11) this.$toast('手机号码有误')
      else if (this.birthdateVal === '') this.$toast('请选择出生日期')
      else if (this.relationshipVal === '请选择') this.$toast('请选择关系')
      else if (this.$route.query.patientId) {
        console.log(this.$route.query.patientId)
        console.log(this.nameVal)
        console.log(this.phoneVal)
        console.log(this.sexVal)
        console.log(this.birthdateVal)
        console.log(this.relationshipVal)
        /* 更新就诊人信息 */
        this.updatePatient({
          id: this.$route.query.patientId,
          name: this.nameVal,
          mobile: this.phoneVal,
          gender: this.sexVal === '男' ? 1 : 0,
          birthday: this.birthdateVal,
          relationship: this.relationshipVal === '本人' ? 1 : this.relationshipVal === '父母' ? 2 : this.relationshipVal === '子女' ? 3 : this.relationshipVal === '夫妻' ? 4 : 5
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.$toast({ message: '更改成功', duration: 1000 })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        }).catch((err) => {
          this.$toast('数据错误')
          throw err
        })
      } else {
        /* 添加就诊人 */
        this.addPatient({
          name: this.nameVal,
          mobile: this.phoneVal,
          gender: this.sexVal === '男' ? 1 : 0,
          birthday: this.birthdateVal,
          relationship: this.relationshipVal === '本人' ? 1 : this.relationshipVal === '父母' ? 2 : this.relationshipVal === '子女' ? 3 : this.relationshipVal === '夫妻' ? 4 : 5
        }).then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.$toast({ message: '添加成功', duration: 1000 })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        }).catch((err) => {
          this.$toast('数据错误')
          throw err
        })
      }
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
    margin-bottom: 130px;
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
  .add-or-edit-buttons {
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    .com-button {
      width: 324px;
      height: 88px;
      border-radius: 8px;
      font-size: 36px;
    }
    .delete-button {
      color: $color-008CA7;
      border: 1px solid $color-008CA7;
      background-color: $color-f5;
    }
    .confirm-button {
      color: $color-ff;
      background: $color-gradient;
    }
  }
}
</style>
