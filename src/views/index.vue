<template>
  <div class="index">
    <router-link v-for="(item,index) in list" tag="h3" :to="item.url" :key="index">
      {{item.name}}
    </router-link>
    <!-- <i class="icon-navigation">xcvxcv</i> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { name: '预约', url: '/order/index' },
        { name: '缴费', url: '/pay/index' },
        { name: '精选项目', url: '/choice/index' },
        { name: '同道商城', url: '/mall/index' },
        { name: '在线咨询', url: '/consult/index' },
        { name: '预约记录', url: '/arecord/index' },
        { name: '缴费记录', url: '/precord/index' },
        { name: '我买的商品', url: '/bought/index' },
        { name: '会员卡', url: '/mcard/index' }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.index {
  text-align: center;

  h3 {
    cursor: pointer;
  }
}
</style>
