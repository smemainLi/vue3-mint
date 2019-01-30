<template>
  <div class="service-info">
    <div class="navigation" v-if="subitemStatus===success||subitemStatus===toBePaid">
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

export default {
  data () {
    return {
      navContent: '导航',
      telephoneContent: '拨打',
      success: '已预约',
      toBePaid: '待支付'
    }
  },
  props: ['subitemStatus', 'serviceList'],
  components: { field },
  methods: {
    call (callNum) {
      console.log(callNum)
      window.location.href = `tel:${callNum}`
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