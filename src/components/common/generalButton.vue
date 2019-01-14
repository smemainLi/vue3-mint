<template>
  <div class="general-button">
    <button :disabled="!isAgree" :class="['button-content',isAgree?'':'not-agree']" v-cloak>{{btnName}}</button>
  </div>
</template>

<script>
export default {
  props: {
    btnName: {},
    isAgree: {
      default: true
    }
  },
  created () {
    console.log(this.isAgree)
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
