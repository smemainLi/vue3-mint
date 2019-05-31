<template>
  <div class="bill-item">
    <div class="bill-info">
      <div class="bill-info-left">
        <div :class="['bill-amount',billContent.isPlus?'bill-plus-amount':'',billContent.billOther === this.refused?'bill-is-refused':'']" v-cloak>{{billContent.billAmount}}</div>
        <div class="bill-time" v-cloak>{{billContent.billTime}}</div>
      </div>
      <div class="bill-info-right">
        <div class="bill-usage" v-cloak>{{billContent.billUsage}}</div>
        <div :class="['bill-other',billContent.isExamine?'bill-examine':'',billContent.billOther === this.refused?'bill-is-refused':'']" v-show="billContent.billOther" v-cloak>{{billContent.billOther}}</div>
      </div>
    </div>
    <div class="field-br" v-show="billContent.hasBr">
      <hr class="br-style">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      refused: '已拒绝'
    }
  },
  props: ['billContent']
}
</script>

<style lang="scss" scoped>
.bill-item {
  background-color: $color-ff;
  .bill-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
    &-left {
      .bill-amount {
        font-size: 28px;
        color: $color-35;
      }
      .bill-plus-amount {
        color: $color-008CA7;
      }
      .bill-time {
        font-size: 24px;
        color: $color-88;
        margin-top: 6px;
      }
    }
    &-right {
      font-size: 28px;
      color: $color-88;
      .bill-usage {
        float: right;
      }
      .bill-other {
        clear: both;
        float: right;
      }
      .bill-examine {
        color: $color-008CA7;
      }
    }
    .bill-is-refused {
      color: $color-E08282;
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
