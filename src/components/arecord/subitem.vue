<template>
  <div class="subitem">
    <div class="subitem-row-one">
      <div class="subitem-location">
        <i class="icon-address"></i>
        <div class="clinic-name" v-cloak>{{subitem.clinicName}}</div>
      </div>
      <div class="amount-spent" v-cloak>{{subitem.amountSpent}}</div>
    </div>
    <div class="subitem-row-next">
      <div class="subitem-time-message">
        <div class="time-style appointment-time" v-cloak>
          <span class="title-style" v-cloak>{{appointmentTitle}}</span>
          {{subitem.appointmentTime}}
        </div>
        <div class="time-style order-time" v-cloak>
          <span class="title-style" v-cloak>{{orderTitle}}</span>
          {{subitem.orderTime}}
        </div>
      </div>
      <div class="subitem-nav" @click.stop="consultAMap">
        <i class="icon-guidepost"></i>
        <span class="nav-content" v-cloak>{{navContent}}</span>
      </div>
    </div>
    <div :class="['subitem-row-last',subitem.subitemStatus===successStatus?'':'subitem-not-success-appointment']">
      <div class="subitem-status" v-cloak>{{subitem.subitemStatus}}</div>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      appointmentTitle: '预约时间',
      orderTitle: '下单时间',
      navContent: '导航',
      successStatus: '预约成功'
    }
  },
  props: ['subitem', 'latitude', 'longitude'],
  methods: {
    /* 查看地图接口 */
    consultAMap () {
      let _this = this
      wx.ready(function () {
        wx.openLocation({
          latitude: _this.latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude: _this.longitude, // 经度，浮点数，范围为180 ~ -180。
          name: _this.subitem.clinicName, // 位置名
          address: _this.subitem.clinicAddress, // 地址详情说明
          scale: 12, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.subitem {
  padding: 28px 32px 28px;
  margin-bottom: 24px;
  background-color: $color-ff;
  .subitem-row-one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    color: $color-35;
    .subitem-location {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon-address {
        font-size: 25px;
        color: $color-008CA7;
      }
      .clinic-name {
        font-size: 32px;
      }
    }
    .amount-spent {
      font-size: 28px;
      font-family: PingFang-SC-Medium;
    }
  }
  .subitem-row-next {
    display: flex;
    justify-content: space-between;
    .subitem-time-message {
      font-size: 24px;
      color: $color-88;
      .time-style {
        margin-bottom: 4px;
      }
    }
    .subitem-nav {
      width: 156px;
      height: 50px;
      margin-top: 14px;
      border: 1px solid $color-008CA7;
      border-radius: 25px;
      color: $color-008CA7;
      font-size: 28px;
      line-height: 50px;
      text-align: center;
    }
  }
  .subitem-row-last {
    margin-top: 20px;
    font-size: 28px;
    color: $color-008CA7;
  }
  .subitem-not-success-appointment {
    color: $color-88;
  }
}
</style>
