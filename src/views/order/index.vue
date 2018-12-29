<template>
  <div class="order">
    <store :store="item" v-for="(item,index) in storeList" :key="index"></store>
  </div>
</template>

<script>
import store from '../../components/order/store'

export default {
  data () {
    return {
      storeList: [
        {
          storeImg: require('../../assets/images/order/store.png'),
          storeName: '上冲诊所',
          storeDistance: '10km',
          storeLocation: '珠海上冲1阿4村里面4455号',
          storeNav: '导航'
        },
        {
          storeImg: require('../../assets/images/order/store.png'),
          storeName: '上冲诊所',
          storeDistance: '10km',
          storeLocation: '珠海上冲1阿4村里面4455号',
          storeNav: '导航'
        },
        {
          storeImg: require('../../assets/images/order/store.png'),
          storeName: '上冲诊所',
          storeDistance: '10km',
          storeLocation: '珠海上冲1阿4村里面4455号',
          storeNav: '导航'
        },
        {
          storeImg: require('../../assets/images/order/store.png'),
          storeName: '上冲诊所',
          storeDistance: '10km',
          storeLocation: '珠海上冲1阿4村里面4455号',
          storeNav: '导航'
        }
      ]
    }
  },
  components: {
    store
  }
}
</script>

<style lang="scss" scoped>
</style>
