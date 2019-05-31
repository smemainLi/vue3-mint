<template>
  <div class="situation-row" v-show="situationItem.rowContent">
    <div class="row-info">
      <div class="row-title" v-cloak>{{situationItem.rowTitle}}</div>
      <div :class="['row-content',situationItem.isLight?'row-light-color':'']" v-cloak>{{situationItem.rowContent}}</div>
    </div>
    <div class="field-br" v-show="situationItem.hasBr">
      <hr class="br-style">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rowTitle: '留言备注',
      rowContent: '尽量快点发货吧，我急。',
      hasBr: true
    }
  },
  props: ['situationItem']
}
</script>

<style lang="scss" scoped>
.situation-row {
  background-color: $color-ff;
  .row-info {
    padding: 24px 32px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .row-title {
      width: 124px;
      color: $color-35;
    }
    .row-content {
      width: 538px;
      color: $color-008CA7;
      margin-left: 20px;
    }
    .row-light-color {
      color: $color-88;
    }
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
