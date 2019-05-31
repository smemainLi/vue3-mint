<template>
  <div class="download-tips">
    <div class="tdkq-logo">
      <img class="logo-img" :src="tdkqLogo" alt="">
    </div>
    <div class="tips-words" v-cloak>{{tipsWords}}</div>
    <button class="download-now" @click="loopDown" v-cloak>{{downloadNow}}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tdkqLogo: require('../../assets/images/mall/tdkqLogo.png'),
      tipsWords: '下载同道口腔APP，更多优惠哦',
      downloadNow: '立即下载'
    }
  },
  methods: {
    loopDown () {
      this.$router.push({ path: '/mall/downloadPage' })
    }
  }
}
</script>

<style lang="scss" scoped>
.download-tips {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px 32px;
  background-color: rgba(0, 0, 0, 0.78);
  top: 0;
  position: fixed;
  z-index: 9999;
  .tdkq-logo {
    width: 96px;
    height: 96px;
    .logo-img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .tips-words {
    font-size: 28px;
    color: $color-ff;
    white-space: nowrap;
    margin: 0 46px 0 17px;
  }
  .download-now {
    width: 138px;
    height: 46px;
    font-size: 28px;
    color: $color-008CA7;
    white-space: nowrap;
    padding: 0 2px;
    box-sizing: border-box;
    border: 1px solid $color-008CA7;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0);
  }
}
</style>
