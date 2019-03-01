<template>
  <div class="service-info">
    <div class="navigation" @click.stop="consultAMap" v-if="subitemStatus===success||subitemStatus===toBePaid">
      <i class="icon-navigation"></i>
      <div class="nav-content" v-cloak>{{navContent}}</div>
    </div>
    <div class="telephone" @click="call(serviceList[1].value)">
      <i class="icon-telephone"></i>
      <div class="telephone-content" v-cloak>{{telephoneContent}}</div>
    </div>
    <field v-for="(item,index) in serviceList" :label="item.label" :value="item.value" :hasBr="item.hasBr" :key="index"></field>
  </div>
</template>

<script>
import field from '../../components/common/field.vue'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      navContent: '导航',
      telephoneContent: '拨打',
      success: '已预约',
      toBePaid: '待支付'
    }
  },
  props: ['subitemStatus', 'latitude', 'longitude', 'clinicAddress', 'serviceList'],
  components: { field },
  methods: {
    call (callNum) {
      console.log(callNum)
      window.location.href = `tel:${callNum}`
    },
    /* 查看地图接口 */
    consultAMap () {
      let _this = this
      wx.ready(function () {
        wx.openLocation({
          latitude: _this.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: _this.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: _this.serviceList[0].value, // 位置名
          address: _this.clinicAddress, // 地址详情说明
          scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.service-info {
  margin-bottom: 143px;
  .navigation {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    background-color: $color-ff;
    position: absolute;
    right: 32px;
    line-height: 88px;
    color: $color-008CA7;
    .icon-navigation {
      font-size: 24px;
      margin-right: 6px;
    }
    .nav-content {
      font-size: 28px;
    }
  }
  .telephone {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    background-color: $color-ff;
    position: absolute;
    right: 32px;
    line-height: 87px;
    margin-top: 90px;
    color: $color-008CA7;
    .icon-telephone {
      font-size: 28px;
      margin-right: 6px;
    }
    .telephone-content {
      font-size: 28px;
    }
  }
}
</style>