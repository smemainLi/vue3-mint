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
      <div class="subitem-nav">
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
export default {
  data () {
    return {
      appointmentTitle: '预约时间',
      orderTitle: '下单时间',
      navContent: '导航',
      successStatus: '预约成功'
    }
  },
  props: ['subitem']
}
</script>

<style lang="scss" scoped>
.subitem {
  padding: 38px 32px 28px;
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
