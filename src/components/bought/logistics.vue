<template>
  <div class="logistics">
    <i class="icon-logistics"></i>
    <div class="logistics-info" v-cloak>{{logisticsInfo}}</div>
    <div class="right-arrow">
      <img class="arrow-img" :src="rightArrow" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightArrow: require('../../assets/images/mcard/arrow.png'),
      logisticsInfo: '【珠海市】快件正从珠海集散中心发出，准备发往珠海高新一部'
    }
  }
}
</script>

<style lang="scss" scoped>
.logistics {
  padding: 56px 32px;
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-start;
  background-color: $color-ff;
  .icon-logistics {
    font-size: 32px;
    color: $color-0D97B2;
  }
  .logistics-info {
    width: 576px;
    font-size: 28px;
    color: $color-0D97B2;
    margin: 0 24px 0 20px;
  }
  .right-arrow {
    width: 40px;
    height: 40px;
    .arrow-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
