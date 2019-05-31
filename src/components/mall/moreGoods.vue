<template>
  <div class="more-goods">
    <div class="goods-info" v-for="(item,index) in rowList" @click="checkGoodsDetail(item)" :key="index">
      <goods :goodsItem="item"></goods>
    </div>
  </div>
</template>

<script>
import goods from './goods.vue'
export default {
  data () {
    return {
    }
  },
  props: ['rowList'],
  components: { goods },
  methods: {
    checkGoodsDetail (goods) {
      this.$router.push({ path: '/mall/goodsDetail', query: { productId: goods.goodsId } })
    }
  }
}
</script>

<style lang="scss" scoped>
.more-goods {
  width: 100%;
  padding: 0 22px 72px;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  background-color: $color-ff;
  .goods-info {
    margin-left: 10px;
    /deep/ .search-content-style {
      color: $color-028EA9;
    }
  }
}
</style>
