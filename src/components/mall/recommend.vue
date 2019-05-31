<template>
  <div class="recommend">
    <div class="recommend-main-product" v-show="recommendItem.mainProduct.mainProductImg" @click="loopClassify(recommendItem.mainProduct)">
      <img class="main-product-img" :src="recommendItem.mainProduct.mainProductImg" alt="">
    </div>
    <div class="recommend-next-list" v-show="recommendItem.nextProductList.length">
      <div class="next-product" v-for="(item,index) in recommendItem.nextProductList" @click="loopClassify(item)" :key="index">
        <div class="next-img">
          <img class="img-content" :src="item.nextProductImg" alt="">
        </div>
        <div class="next-introduce" v-cloak>
          <div class="introduce-text" v-cloak>{{item.nextProductIntroduce}}</div>
        </div>
        <div class="next-price" v-cloak>{{item.nextProductPrice}}</div>
        <div class="next-special" v-show="item.isSpecial" v-cloak>
          <img class="star-img" :src="item.isSpecial" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { typeJump } from '../../utils/tools'
export default {
  data () {
    return {
      mainProductImg: require('../../assets/images/mall/recommendMainImg1.png'),
      nextProductList: [
        {
          nextProductImg: require('../../assets/images/mall/recommendNext1-1.png'),
          nextProductIntroduce: '全洁净齿变速式声波电动牙刷',
          nextProductPrice: '￥28',
          isSpecial: false
        },
        {
          nextProductImg: require('../../assets/images/mall/recommendNext1-1.png'),
          nextProductIntroduce: '全洁净齿变速式声波电动牙刷全洁净齿变速式声波电动牙刷全洁净齿变速式声波电动牙刷',
          nextProductPrice: '￥28',
          isSpecial: true
        },
        {
          nextProductImg: require('../../assets/images/mall/recommendNext1-1.png'),
          nextProductIntroduce: '特效素口水',
          nextProductPrice: '￥108',
          isSpecial: false
        }
      ],
      todaySpecial: '今天特价'
    }
  },
  props: ['recommendItem'],
  methods: {
    loopClassify (product) {
      typeJump(product)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  padding-bottom: 52px;
  background-color: $color-ff;
  .recommend-main-product {
    width: 100%;
    height: 350px;
    .main-product-img {
      width: 100%;
      height: 100%;
    }
  }
  .recommend-next-list {
    padding: 32px 0 0 32px;
    display: flex;
    justify-content: flex-start;
    .next-product {
      width: 206px;
      margin-right: 32px;
      .next-img {
        width: 206px;
        height: 206px;
        .img-content {
          width: 100%;
          height: 100%;
        }
      }
      .next-introduce {
        height: 72px;
        font-size: 28px;
        line-height: 38px;
        color: $color-35;
        margin-top: 12px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .next-price {
        color: $color-008CA7;
        margin-top: 8px;
        font-size: 32px;
      }
      .next-special {
        // display: inline-block;
        // font-size: 24px;
        // color: $color-E08282;
        // border-radius: 4px;
        // margin-top: 10px;
        // padding: 0 6px;
        // border: 1px solid $color-E08282;
        width: 105px;
        height: 36px;
        .star-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
