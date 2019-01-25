<template>
  <div class="field" v-show="value">
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{label}}</span>
      </div>
      <div class="field-content">
        <span :class="['field-value',isStatus?'field-other-style':'']" v-cloak>{{value}}</span>
      </div>
    </div>
    <div class="field-br" v-show="hasBr">
      <hr class="br-style">
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'value', 'hasBr', 'isStatus']
}
</script>

<style lang="scss" scoped>
.field {
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
    .field-input,
    .field-content {
      color: $color-88;
      margin-left: 56px;
      width: 72%;
      font-size: 28px;
      .field-other-style {
        color: $color-008CA7;
      }
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