<template>
  <div class="small-button">
    <button :class="['small-btn-content',smallBtnItem.isDeep?'small-btn-content-deep':'']" v-cloak>{{smallBtnItem.smallBtnName}}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      smallBtnName: '查看券码'
    }
  },
  props: {
    smallBtnItem: {}
  }
}
</script>

<style lang="scss" scoped>
.small-button {
  margin-left: 40px;
  .small-btn-content {
    width: 158px;
    height: 50px;
    padding: 0 10px;
    // white-space: nowrap;
    font-size: 28px;
    border: 1px solid $color-e5;
    // box-sizing: border-box;
    border-radius: 8px;
    color: $color-1E8FA5;
    background: $color-ff;
  }
  .small-btn-content-deep {
    width: 160px;
    height: 52px;
    color: $color-ff;
    background: $color-gradient;
  }
}
</style>
