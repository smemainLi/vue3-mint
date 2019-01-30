<template>
  <div>
    <div class="protocol" v-html="protocolContent"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      protocolContent: ''
    }
  },
  methods: {
    ...mapActions({ protocolInfo: 'protocolInfo' })
  },
  created () {
    console.log(this.$route.query.flag)
    this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
    if (this.$route.query.flag === 'login') { // 从登陆界面点击会员卡协议跳转到本页面
      this.protocolInfo({ code: 'registration_agreement' }).then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) this.protocolContent = res.data.copywriting.value
      }).catch((err) => {
        this.$toast('数据错误')
        throw new Error(err)
      })
    } else if (this.$route.query.flag === 'online') { // 通过预约界面的预约须知跳转到本页面
      this.protocolInfo({ code: 'reservation_protocol' }).then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) this.protocolContent = res.data.copywriting.value
      }).catch((err) => {
        this.$toast('数据错误')
        throw new Error(err)
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to)
    console.log(from)
    console.log(next)
    if (to.path === '/order/onlineBooking') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.protocol {
  width: 100%;
  padding: 56px 32px 0 32px;
  box-sizing: border-box;
  background-color: $color-ff;
}
</style>
