<template>
  <div class="store">
    <div class="store-info">
      <div class="store-picture">
        <img class="store-image" :src="store.storeImg" alt="">
      </div>
      <div class="store-detail">
        <div class="store-first-row">
          <div class="store-name" v-cloak>{{store.storeName}}</div>
          <div class="store-distance" v-cloak>{{store.storeDistance}}</div>
        </div>
        <div class="store-location">
          <i class="icon-address"></i>
          <span class="location-content" v-cloak>{{store.storeLocation}}</span>
        </div>
        <div class="store-nav">
          <i class="icon-guidepost"></i>
          <span class="nav-content" @click.stop="consultAMap" v-cloak>{{storeNav}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      storeNav: '导航'
    }
  },
  props: ['store', 'latitude', 'longitude'],
  methods: {
    /* 查看地图接口 */
    consultAMap () {
      let _this = this
      wx.ready(function () {
        wx.openLocation({
          latitude: _this.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: _this.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: _this.store.storeName, // 位置名
          address: _this.store.storeLocation, // 地址详情说明
          scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.store {
  width: 100%;
  height: 240px;
  background-color: $color-ff;
  margin-bottom: 24px;
  padding: 0 0 6px 0;
  .store-info {
    padding: 30px 32px;
    display: flex;
    justify-content: flex-start;
    .store-picture {
      width: 180px;
      height: 180px;
      display: block;
      .store-image {
        width: 100%;
        height: 100%;
      }
    }
    .store-detail {
      margin-left: 22px;
      position: relative;
      .store-first-row {
        display: flex;
        justify-content: space-between;
        color: $color-35;
        font-size: 32px;
        .store-distance {
          font-size: 28px;
          color: $color-35;
          font-family: PingFang-SC-Medium;
        }
      }
      .store-location {
        color: $color-88;
        font-size: 26px;
        margin-top: 20px;
        width: 480px;
        .icon-address {
          margin-right: 9px;
        }
      }
      .store-nav {
        margin-top: 24px;
        width: 156px;
        height: 50px;
        border: 1px solid $color-008CA7;
        border-radius: 25px;
        color: $color-008CA7;
        font-size: 28px;
        line-height: 50px;
        text-align: center;
        position: absolute;
        bottom: -6px;
        right: 0;
      }
    }
  }
}
</style>
