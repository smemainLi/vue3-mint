<template>
  <div class="system-row" v-show="systemItem.systemContent">
    <span class="system-title" v-cloak>{{systemItem.systemTitle}}</span><span class="system-content" v-cloak>{{systemItem.systemContent}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      systemTitle: '订单编号：',
      systemContent: '654896567568'
    }
  },
  props: ['systemItem']
}
</script>

<style lang="scss" scoped>
.system-row {
  padding: 10px 0;
  .system-title {
    font-size: 28px;
    color: $color-35;
  }
  .system-content {
    font-size: 24px;
    color: $color-88;
  }
}
</style>
