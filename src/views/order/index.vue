<template>
  <div class="order">
    <div class="store-list">
      <store :store="item" v-for="(item,index) in storeList" @click.native="selectStore" :key="index"></store>
    </div>
    <bottom-button :btnName="btnName" :hasIcon="true"></bottom-button>
  </div>
</template>

<script>
import store from '../../components/order/store.vue'
import bottomButton from '../../components/common/bottomButton.vue'

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
        },
        {
          storeImg: require('../../assets/images/order/store.png'),
          storeName: '上冲诊所',
          storeDistance: '10km',
          storeLocation: '珠海上冲1阿4村里面4455号',
          storeNav: '导航'
        }
      ],
      btnName: '我还没想好，想先咨询一下'
    }
  },
  components: {
    store,
    bottomButton
  },
  methods: {
    selectStore () {
      // 状态管理需要存储一个状态，表示是否为用户第一次点击门店列表，第一次的话，进入‘预约须知’
      let flag = 0
      if (flag === 0) {
        this.$router.push('/order/notice')
      }
    },
    test () {
      window.addEventListener('touchmove',
        function (ev) {
          event.preventDefault()
        },
        { passive: false })
    }
  },
  created () {
    this.test()
  }
}
</script>

<style lang="scss" scoped>
.order {
  .store-list {
    margin-bottom: 124px;
  }
}
</style>
