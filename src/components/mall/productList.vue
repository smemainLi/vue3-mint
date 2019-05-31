<template>
  <div class="product-list">
    <div class="product-item" v-for="(item,index) in productList" @click="productAction(item)" :key="index">
      <div class="item-img">
        <img class="img-content" :src="item.productImg" alt="">
      </div>
      <div class="item-title" v-cloak>{{item.productTitle}}</div>
    </div>
  </div>
</template>

<script>
import { typeJump } from '../../utils/tools'
export default {
  data () {
    return {
    }
  },
  props: ['productList'],
  methods: {
    productAction (product) {
      typeJump(product)
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
      width: 98px;
      height: 98px;
      margin: 0 auto;
      .img-content {
        width: 100%;
        height: 100%;
      }
    }
    .other-img {
      width: 82px;
    }
    .item-title {
      font-size: 24px;
      color: $color-88;
      margin-top: 6px;
    }
  }
}
</style>
