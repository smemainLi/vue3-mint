<template>
  <div>
    <div class="once-protocol" v-html="protocolContent"></div>
    <bottom-button :btnName="btnName" @click.native="$router.push({path:'/order/onlineBooking',query: { storeId: $route.query.storeId,storeName: $route.query.storeName }})"></bottom-button>
  </div>
</template>

<script>
import bottomButton from '../../components/common/bottomButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      protocolContent: '',
      btnName: '同意协议并下一步'
    }
  },
  components: { bottomButton },
  methods: {
    ...mapActions({ protocolInfo: 'protocolInfo' })
  },
  created () {
    console.log(this.$route.query)
    this.protocolInfo({ code: 'reservation_protocol' }).then((res) => {
      console.log(res)
      this.protocolContent = res.data.copywriting.value
    }).catch((err) => {
      this.$toast('数据错误')
      throw new Error(err)
    })
  }
  // beforeRouteLeave (to, from, next) {
  //   console.log(to)
  //   console.log(from)
  //   console.log(next)
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
  width: 100%;
  padding: 56px 32px 0 32px;
  box-sizing: border-box;
  background-color: $color-ff;
}
</style>
