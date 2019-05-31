<template>
  <div class="invite-friends-result">
    <invite-two v-show="!inviteStatus" :headImg="headImg" :qrcodeImg="qrcodeImg" :friendInfo="friendInfo"></invite-two>
    <invite-three v-show="inviteStatus" :headImg="headImg" :qrcodeImg="qrcodeImg" :friendInfo="friendInfo"></invite-three>
  </div>
</template>

<script>
import inviteTwo from '../../components/mcard/inviteTwo'
import inviteThree from '../../components/mcard/inviteThree'
// import { setCookie } from '../../utils/tools'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      headImg: '',
      qrcodeImg: require('../../assets/images/arecord/qrCode.png'),
      friendInfo: '',
      inviteStatus: false
    }
  },
  components: { inviteTwo, inviteThree },
  methods: {
    ...mapActions({ getShareResult: 'getShareResult' }),
    async loadShareResult () {
      const result = await this.getShareResult({ shareId: localStorage.getItem('shareId') })
      if (result.status !== 200) return
      if (result.data.relationship) {
        this.friendInfo = result.data.shareMemberName
      } else {
        this.friendInfo = `${result.data.shareMemberName}把礼包送给您了`
      }
      this.inviteStatus = result.data.relationship
      this.headImg = result.data.shareMemberHeadimgurl
    }
  },
  created () {
    // setCookie('shareId', localStorage.getItem('shareId'))
    this.loadShareResult()
  }
}
</script>

<style lang="scss" scoped>
</style>
