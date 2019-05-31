<template>
  <div class="invite-friends">
    <bottom-button :btnName="btnName" @click.native="maskDownload=true"></bottom-button>
    <van-popup v-model="maskDownload" @click.native="maskDownload=false">
      <div class="invite-point">
        <img class="point-img" :src="invitePoint" alt="">
      </div>
      <div class="invite-tips">
        <img class="tips-img" :src="inviteTips" alt="">
      </div>
    </van-popup>
  </div>
</template>

<script>
import bottomButton from '../../components/common/bottomButton.vue'
export default {
  data () {
    return {
      btnName: '马上赚',
      maskDownload: false,
      invitePoint: require('../../assets/images/mcard/invitePoint.png'),
      inviteTips: require('../../assets/images/mcard/inviteTips.png')
    }
  },
  components: { bottomButton }
}
</script>

<style lang="scss" scoped>
.invite-friends {
  width: 100%;
  height: 1447px;
  background: url("../../assets/images/mcard/shareBgOne.png") no-repeat center;
  background-size: 100% 1447px;
  /deep/ .van-popup {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    .invite-point {
      width: 378px;
      height: 312px;
      float: right;
      margin: 0 24px 48px 0;
      .point-img {
        width: 100%;
        height: 100%;
      }
    }
    .invite-tips {
      width: 605px;
      height: 296px;
      margin: 0 auto;
      clear: both;
      .tips-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
