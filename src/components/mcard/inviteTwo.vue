<template>
  <div class="invite-friends">
    <div class="head-img">
      <img class="head-img-content" :src="headImg" alt="">
    </div>
    <div class="get-the-package">
      <div class="your-friend" v-cloak>{{yourFriend}}</div>
      <div class="give-package" v-cloak>{{friendInfo}}</div>
    </div>
    <div class="qrcode-img">
      <img class="qrcode-img-content" :src="qrcodeImg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      yourFriend: '您的好友'
    }
  },
  props: ['headImg', 'qrcodeImg', 'friendInfo']
}
</script>

<style lang="scss" scoped>
.invite-friends {
  width: 100%;
  height: 1624px;
  background: url("../../assets/images/mcard/shareThreeBg.png") no-repeat center;
  background-size: 100% 1624px;
  .head-img {
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    // margin: 0 auto;
    margin-left: 290px;
    .head-img-content {
      margin-top: 215px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 6px solid $color-008CA7;
    }
  }
  .get-the-package {
    font-size: 28px;
    color: #068cb7;
    margin-top: 250px;
    text-align: center;
    font-weight: bold;
    .your-friend {
    }
    .give-package {
    }
  }
  .qrcode-img {
    width: 312px;
    height: 312px;
    margin: 0 auto;
    .qrcode-img-content {
      width: 100%;
      height: 100%;
      margin-top: 170px;
    }
  }
}
</style>
