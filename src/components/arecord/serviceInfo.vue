<template>
  <div class="service-info">
    <div class="navigation" v-show="subitemStatus===success">
      <i class="icon-navigation"></i>
      <div class="nav-content" v-cloak>{{navContent}}</div>
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
      success: '预约成功'
    }
  },
  props: ['subitemStatus', 'serviceList'],
  components: { field }
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
    }
    .nav-content {
      font-size: 28px;
    }
  }
}
</style>