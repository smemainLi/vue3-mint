<template>
  <div class="order">
    <div class="store-list">
      <store :store="item" v-for="(item,index) in storeList" @click.native="selectStore(item)" :key="index"></store>
    </div>
    <bottom-button :btnName="btnName" @click.native="customerService" :hasIcon="true"></bottom-button>
  </div>
</template>

<script>
import store from '../../components/order/store.vue'
import bottomButton from '../../components/common/bottomButton.vue'
import { connectService } from '../../utils/tools'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      storeList: [],
      btnName: '我还没想好，想先咨询一下',
      placeholderImg: require('../../assets/images/order/storeDefault.png')
    }
  },
  components: {
    store,
    bottomButton
  },
  methods: {
    ...mapActions({ getStoreList: 'getStoreList' }),
    selectStore (store) {
      // false：读取协议 true：无需读取协议
      if (!localStorage.getItem('agreement')) {
        localStorage.setItem('agreement', true)
        this.$router.push({ path: '/order/onceProtocol', query: { storeId: store.storeId, storeName: store.storeName, orderId: this.$route.query.orderId || '' } })
      } else {
        this.$router.push({ path: '/order/onlineBooking', query: { storeId: store.storeId, storeName: store.storeName, orderId: this.$route.query.orderId || '' } })
      }
    },
    /* 禁止滑动 */
    noSliding () {
      window.addEventListener('touchmove',
        function (ev) {
          event.preventDefault()
        },
        { passive: false })
    },
    /* 获取店铺列表数据 */
    loadStoreList () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getStoreList({ latitude: localStorage.getItem('latitude'), longitude: localStorage.getItem('longitude') }).then((res) => {
        this.$indicator.close()
        if (res.status === 200) {
          res.data.list.map(shop => {
            this.storeList.push({
              storeId: shop.id,
              storeImg: shop.image ? shop.image : this.placeholderImg,
              storeName: shop.name,
              storeDistance: shop.distanceName,
              storeLocation: shop.address,
              latitude: shop.latitude, // 经度
              longitude: shop.longitude// 纬度
            })
          })
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 联系客服 */
    customerService () {
      // eslint-disable-next-line no-undef
      _MEIQIA('showPanel')
    }
  },
  beforeCreate () {
  },
  created () {
    if (sessionStorage.getItem('reload')) {
      sessionStorage.removeItem('reload')
      this.$router.go(0)
      return
    }
    /* 联系客服配置准备 */
    connectService(0)
    // this.getCurrentLocation()// 暂时关闭
    this.loadStoreList()// 暂时添加
  },
  destroyed () {
    // eslint-disable-next-line no-undef
    _MEIQIA('hidePanel')
  }
}
</script>

<style lang="scss" scoped>
.order {
  .store-list {
    padding-bottom: 120px;
  }
}
</style>
