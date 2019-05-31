<template>
  <div class="invite-friends">
    <div class="friend-info">
      <div class="your-friend" v-cloak>{{yourFriend}}</div>
      <div class="friend-name" v-cloak>{{friendInfo}}</div>
    </div>
    <div class="head-img">
      <img class="head-img-content" :src="headImg" alt="">
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
  background: url("../../assets/images/mcard/shareBgTwo.png") no-repeat center;
  background-size: 100% 1624px;
  .friend-info {
    color: #068cb7;
    padding-top: 20px;
    text-align: center;
    font-weight: bold;
    .your-friend {
      font-size: 28px;
    }
    .friend-name {
      font-size: 32px;
    }
  }
  .head-img {
    width: 150px;
    height: 150px;
    margin-left: 295px;
    .head-img-content {
      margin-top: 32px;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 6px solid $color-008CA7;
    }
  }
  .qrcode-img {
    width: 312px;
    height: 312px;
    margin: 0 auto;
    .qrcode-img-content {
      width: 100%;
      height: 100%;
      margin-top: 400px;
    }
  }
}
</style>
