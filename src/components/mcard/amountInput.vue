<template>
  <div class="amount-input">
    <div class="input-row">
      <div class="input-unit" v-cloak>{{amountUnit}}</div>
      <input class="input-field" type="number" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')}else{this.value=this.value.replace(/\D/g,'').replace(/^0{1,}/g,'')}" onblur="if(this.value.length==1){this.value=this.value.replace(/[^\d]/g, '').replace(/^0{1,}/g,'')}else{this.value=this.value.replace(/\D/g,'').replace(/^0{1,}/g,'')}" v-model="amountMoney" :placeholder="amountMoneyPlaceholder">
    </div>
    <div class="input-tips">
      <span class="tips-title" v-cloak>{{tipsTitle}}</span><span class="tips-content" v-cloak>{{tipsContent}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      amountUnit: '￥',
      amountMoney: '',
      amountMoneyPlaceholder: '请输入提现金额',
      tipsTitle: '可提现金额：'
      // tipsContent: '￥100'
    }
  },
  props: ['tipsContent'],
  watch: {
    amountMoney: function (newVal) {
      // console.log(newVal)
      this.$emit('getAmountMoney', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.amount-input {
  margin-top: 4px;
  padding: 56px 32px 74px;
  background-color: $color-ff;
  .input-row {
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid $color-e5;
    .input-unit {
      font-size: 90px;
      color: $color-008CA7;
    }
    .input-field {
      font-size: 50px;
      color: $color-008CA7;
      margin-top: 24px;
    }
  }
  .input-tips {
    font-size: 24px;
    margin-top: 24px;
    .tips-title {
      color: $color-88;
    }
    .tips-content {
      color: $color-008CA7;
    }
  }
}
</style>
