<template>
  <div class="bottom-button">
    <button :class="['button-content',noClicks?'no-clicks':'']" :disabled="noClicks" v-cloak>
      <i class="icon-message" v-if="hasIcon"></i>
      {{btnName}}
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    btnName: {

    },
    hasIcon: {

    },
    noClicks: {
      default: false
    }
  },
  created () {
  }
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
    letter-spacing: 2px;
    background: $color-gradient;
    .icon-message {
      margin-right: 14px;
    }
  }
  .no-clicks {
    background: $color-88;
  }
}
</style>
