<template>
  <div class="order">
    <div class="store-list">
      <store :store="item" :latitude="latitude" :longitude="longitude" v-for="(item,index) in storeList" @click.native="selectStore(item)" :key="index"></store>
    </div>
    <bottom-button :btnName="btnName" :hasIcon="true"></bottom-button>
  </div>
</template>

<script>
import store from '../../components/order/store.vue'
import bottomButton from '../../components/common/bottomButton.vue'
import wx from 'weixin-js-sdk'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      storeList: [],
      btnName: '我还没想好，想先咨询一下',
      latitude: 0, // 经度
      longitude: 0, // 纬度
      placeholderImg: require('../../assets/images/order/tdkqLogo.png')
    }
  },
  components: {
    store,
    bottomButton
  },
  methods: {
    ...mapActions({ getStoreList: 'getStoreList' }),
    selectStore (store) {
      if (localStorage.getItem('isLogin') === 'false') { // 如果没有登录的话就跳转登录页面
        this.$router.push({ path: '/mcard/login' })
      } else {
        console.log(localStorage.getItem('agreement'))
        // false：读取协议 true：无需读取协议
        if (localStorage.getItem('agreement') === 'false') {
          this.$router.push({ path: '/order/onceProtocol', query: { storeId: store.storeId, storeName: store.storeName } })
          localStorage.setItem('agreement', true)
        } else {
          this.$router.push({ path: '/order/onlineBooking', query: { storeId: store.storeId, storeName: store.storeName } })
        }
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
    /* 获取当前地理位置 */
    getCurrentLocation () {
      let _this = this
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            console.log(res)
            localStorage.setItem('latitude', res.latitude)// 经度
            localStorage.setItem('longitude', res.longitude)// 纬度
            _this.latitude = res.latitude
            _this.longitude = res.longitude
            _this.loadStoreList()
          }
        })
      })
    },
    /* 获取店铺列表数据 */
    loadStoreList () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getStoreList({ latitude: this.latitude, longitude: this.longitude }).then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          res.data.shops.map(shop => {
            console.log(shop)
            this.storeList.push({
              storeId: shop.id,
              storeImg: shop.image ? shop.image : this.placeholderImg,
              storeName: shop.name,
              storeDistance: shop.distanceName,
              storeLocation: shop.address
            })
          })
        }
        console.log(this.storeList)
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    }

  },
  created () {
    // this.getCurrentLocation()// 暂时关闭
    this.loadStoreList()// 暂时添加
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
