<template>
  <div class="bill-type">
    <!-- 关系 -->
    <div class="field-row field-select">
      <select :class="['field-option',billList.length?'':'field-option-no-br']" name="billType" v-model="billTypeVal" @change="getBillType">
        <option v-for="(item,index) in billTypeList" :value="item.billType" :key="index">{{item.billType}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      billTypeVal: '',
      billTypeList: [
        { billType: '全部' },
        { billType: '收入' },
        { billType: '支出' }
      ]
    }
  },
  props: ['billList'],
  created () {
    this.billTypeVal = this.billTypeList[0].billType// 下拉框默认选中第一项
  },
  methods: {
    getBillType () {
      this.$emit('getType', this.billTypeVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.bill-type {
  .field-row {
    background-color: $color-ff;
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    font-size: 28px;
    padding: 0 32px;
    box-sizing: border-box;
    .field-option {
      color: $color-88;
      width: 100%;
      font-size: 28px;
      height: 100%;
      border-bottom: 1px solid $color-e5;
    }
    .field-option-no-br {
      border: 0;
    }
  }
  .field-select:after {
    content: "";
    width: 48px;
    height: 48px;
    background: url("../../assets/images/mcard/pullDown.png") no-repeat center;
    background-size: 48px 48px;
    position: absolute;
    right: 32px;
    top: 24px;
    /* //给自定义的图标实现点击下来功能 */
    pointer-events: none;
  }
}
</style>
