<template>
  <div class="bottom-button">
    <button class="button-content">
      <i class="icon-message" v-if="hasIcon"></i>
      <span class="btn-name" v-cloak>{{btnName}}</span>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['btnName', 'hasIcon']
}
</script>

<style lang="scss" scoped>
.bottom-button {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 88px;
  .button-content {
    width: 100%;
    color: $color-ff;
    font-size: 36px;
    background: $color-gradient;
    .btn-name {
      margin-left: 14px;
      letter-spacing: 2px;
    }
  }
}
</style>
