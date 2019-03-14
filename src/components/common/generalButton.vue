<template>
  <div class="general-button">
    <button :disabled="disabled" :class="['button-content',isAgree&&!hasUnpaid?'':'not-agree']" v-cloak>{{btnName}}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: !this.isAgree || this.hasUnpaid
    }
  },
  props: {
    btnName: {},
    isAgree: {
      default: true// true表示同意协议  false表示不同意协议
    },
    hasUnpaid: {
      default: false// 是否存在未支付订单 false 不存在 true 存在
    }
  },
  watch: {
    hasUnpaid: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.disabled = !this.isAgree || this.hasUnpaid
    },
    isAgree: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      console.log(!this.isAgree || this.hasUnpaid)
      this.disabled = !this.isAgree || this.hasUnpaid
    }
  }

}
</script>

<style lang="scss" scoped>
.general-button {
  margin: 0 32px;
  text-align: center;
  .button-content {
    width: 686px;
    height: 88px;
    background: $color-gradient;
    border-radius: 8px;
    color: $color-ff;
    font-size: 36px;
  }
  .not-agree {
    background: $color-e5;
    color: $color-88;
  }
}
</style>
