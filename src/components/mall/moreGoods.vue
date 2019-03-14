<template>
  <div class="more-goods">
    <div class="goods-info" v-for="(item,index) in rowList" @click="$router.push('/mall/goodsDetail')" :key="index">
      <!-- <div class="goods-img">
        <img class="img-content" :src="item.goodsImg" alt="">
      </div>
      <div class="goods-introduce" v-cloak>{{item.goodsIntroduce}}</div>
      <div class="last-row">
        <div class="goods-price" v-cloak>{{item.goodsPrice}}</div>
        <div class="goods-num" v-cloak>{{item.goodsNum}}</div>
      </div> -->
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
  components: { goods }
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
    // .goods-img {
    //   width: 338px;
    //   height: 338px;
    //   .img-content {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }
    // .goods-introduce {
    //   width: 338px;
    //   font-size: 28px;
    //   color: $color-35;
    //   overflow: hidden;
    //   text-overflow: ellipsis;
    //   white-space: nowrap;
    //   margin-top: 12px;
    // }
    // .last-row {
    //   display: flex;
    //   align-items: center;
    //   justify-content: space-between;
    //   margin-top: 22px;
    //   .goods-price {
    //     font-size: 32px;
    //     color: $color-008CA7;
    //   }
    //   .goods-num {
    //     font-size: 24px;
    //     color: $color-88;
    //     margin-right: 28px;
    //   }
    // }
  }
}
</style>
