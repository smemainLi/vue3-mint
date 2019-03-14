<template>
  <div class="product-list">
    <div class="product-item" v-for="(item,index) in productList" @click="productAction" :key="index">
      <div class="item-img">
        <img class="img-content" :src="item.productImg" alt="">
      </div>
      <div class="item-title" v-cloak>{{item.productTitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['productList'],
  methods: {
    productAction () {
      this.$router.push('/mall/classify')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  padding: 49px 32px 36px;
  display: flex;
  justify-content: space-around;
  background-color: $color-ff;
  .product-item {
    text-align: center;
    .item-img {
      width: 68px;
      height: 68px;
      margin: 0 auto;
      .img-content {
        width: 100%;
        height: 100%;
      }
    }
    .item-title {
      font-size: 24px;
      color: $color-88;
    }
  }
}
</style>
