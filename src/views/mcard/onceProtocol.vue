<template>
  <div class="once-protocol">
    <div class="protocol-content" v-html="protocolContent"></div>
    <bottom-button :btnName="btnName" @click.native="$router.push({path:'/order/onlineBooking',
    query: { storeId: $route.query.storeId,storeName: $route.query.storeName,orderId: $route.query.orderId || ''  }})"></bottom-button>
  </div>
</template>

<script>
import bottomButton from '../../components/common/bottomButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      protocolContent: '',
      btnName: '下一步'
    }
  },
  components: { bottomButton },
  methods: {
    ...mapActions({ protocolInfo: 'protocolInfo' })
  },
  created () {
    this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
    this.protocolInfo({ code: 'reservation_protocol' }).then((res) => {
      this.$indicator.close()
      if (res.status === 200) this.protocolContent = res.data.copywriting.value
    }).catch((err) => {
      this.$toast('数据错误')
      throw err
    })
  }
  // beforeRouteLeave (to, from, next) {
  //   if (to.path === '/order/onlineBooking') {
  //     to.meta.keepAlive = true
  //   } else {
  //     to.meta.keepAlive = false
  //   }
  //   next()
  // }
}
</script>

<style lang="scss" scoped>
.once-protocol {
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
