<template>
  <div class="protocol">
    <div class="protocol-content" v-html="protocolContent"></div>
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
    this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
    this.protocolInfo({ code: this.$route.query.flag === 'login' ? 'registration_agreement' : this.$route.query.flag === 'online' ? 'reservation_protocol' : 'amount_rule' }).then((res) => {
      this.$indicator.close()
      if (res.status === 200) this.protocolContent = res.data.copywriting.value
    }).catch((err) => {
      this.$toast('数据错误')
      throw err
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/order/onlineBooking' || to.path === '/mcard/login') {
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
  height: 100%;
  background-color: $color-ff;
  .protocol-content {
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
    background-color: $color-ff;
  }
}
</style>
