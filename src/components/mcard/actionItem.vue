<template>
  <div class="action-item">
    <div class="item-row">
      <div class="item-left-info">
        <div class="icon-img" v-show="actionItem.imgContent">
          <img class="img-content" :src="actionItem.imgContent" alt="">
        </div>
        <div :class="['remark-content',actionItem.flag?'remark-content-other-style':'']" v-cloak>{{actionItem.remarkContent}}</div>
      </div>
      <div class="item-right-info">
        <div class="item-right-content" v-show="actionItem.arrowInfo" v-cloak>{{actionItem.arrowInfo}}</div>
        <div :class="['item-right-arrow',actionItem.flag?'item-right-arrow-other-style':'']">
          <img class="arrow-img" :src="rightArrow" alt="">
        </div>
      </div>
    </div>
    <div class="field-br" v-show="actionItem.hasBr">
      <hr class="br-style">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightArrow: require('../../assets/images/mcard/arrow.png')
    }
  },
  props: ['actionItem']
}
</script>

<style lang="scss" scoped>
.action-item {
  .item-row {
    height: 88px;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    background-color: $color-ff;
    align-items: center;
    .item-left-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon-img {
        width: 48px;
        height: 48px;
        .img-content {
          width: 100%;
          height: 100%;
        }
      }
      .remark-content {
        font-size: 28px;
        color: $color-35;
        margin-left: 20px;
      }
      .remark-content-other-style {
        color: $color-88;
        margin-left: 0;
      }
    }
    .item-right-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .item-right-content {
        font-size: 28px;
        color: $color-88;
      }
      .item-right-arrow {
        width: 40px;
        height: 40px;
        .arrow-img {
          width: 100%;
          height: 100%;
        }
      }
      .item-right-arrow-other-style {
        width: 36px;
        height: 36px;
        .arrow-img {
          width: 100%;
          height: 100%;
        }
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
