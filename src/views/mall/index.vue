<template>
  <div class="mall">
    <swipe-image :mallLoopImages="mallLoopImages"></swipe-image>
    <product-list :productList="productList"></product-list>
    <div class="preferential-benefits" @click="$router.push('/mall/coupon')">
      <div class="benefits-img">
        <img class="img-content" :src="benefitsImg" alt="">
      </div>
    </div>
    <div class="title-common-style" v-cloak><span class="title-bar">—</span><span v-cloak>{{recommendTitle}}</span><span class="title-bar">—</span></div>
    <recommend :recommendItem="item" v-for="(item,index) in recommendProductList" :key="'recommend'+index"></recommend>
    <div class="title-common-style" v-cloak><span class="title-bar">—</span><span v-cloak>{{moreGoodsTitle}}</span><span class="title-bar">—</span></div>
    <more-goods :rowList="item" v-for="(item,index) in goodsList" :key="'goods'+index"></more-goods>
  </div>
</template>

<script>
import swipeImage from '../../components/mall/swipeImage.vue'
import productList from '../../components/mall/productList.vue'
import recommend from '../../components/mall/recommend.vue'
import moreGoods from '../../components/mall/moreGoods.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      mallLoopImages: [], // 轮播图
      productList: [
        { productTitle: '护理产品', productImg: require('../../assets/images/mall/nurseProduct.png') },
        { productTitle: '美容套餐', productImg: require('../../assets/images/mall/beautyPackage.png') },
        { productTitle: '矫正套餐', productImg: require('../../assets/images/mall/correctivePackage.png') },
        { productTitle: '儿童专区', productImg: require('../../assets/images/mall/kids.png') },
        { productTitle: '洁牙套装', productImg: require('../../assets/images/mall/toothPackage.png') }
      ],
      benefitsImg: '', // 优惠券指引跳转图片
      recommendTitle: ' 为你推荐 ',
      recommendProductList: [
        {
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
          ]
        },
        {
          mainProductImg: require('../../assets/images/mall/recommendMainImg2.png'),
          nextProductList: [
            {
              nextProductImg: require('../../assets/images/mall/recommendNext2-1.png'),
              nextProductIntroduce: '全洁净齿变速式声波电动牙刷',
              nextProductPrice: '￥28',
              isSpecial: true
            },
            {
              nextProductImg: require('../../assets/images/mall/recommendNext2-1.png'),
              nextProductIntroduce: '全洁净齿变速式声波电动牙刷全洁净齿变速式声波电动牙刷全洁净齿变速式声波电动牙刷',
              nextProductPrice: '￥28',
              isSpecial: true
            },
            {
              nextProductImg: require('../../assets/images/mall/recommendNext2-1.png'),
              nextProductIntroduce: '特效素口水',
              nextProductPrice: '￥108',
              isSpecial: true
            }
          ]
        }
      ],
      moreGoodsTitle: ' 更多商品 ',
      goodsList: [
        [
          {
            goodsImg: require('../../assets/images/mall/recommendNext2-2.png'),
            goodsIntroduce: '50支装 原线牙线棒',
            goodsPrice: '￥28',
            goodsNum: '销量：500'
          },
          {
            goodsImg: require('../../assets/images/mall/recommendNext2-3.png'),
            goodsIntroduce: '纽西小精灵蜂胶进口牙膏进口牙膏进口牙膏进口牙膏进口牙膏进口牙膏',
            goodsPrice: '￥150',
            goodsNum: '销量：500'
          }
        ],
        [
          {
            goodsImg: require('../../assets/images/mall/recommendNext1-2.png'),
            goodsIntroduce: '50支装 原线牙线棒',
            goodsPrice: '￥28',
            goodsNum: '销量：500'
          },
          {
            goodsImg: require('../../assets/images/mall/recommendNext1-3.png'),
            goodsIntroduce: '纽西小精灵蜂胶进口牙膏进口牙膏进口牙膏进口牙膏进口牙膏进口牙膏',
            goodsPrice: '￥150',
            goodsNum: '销量：500'
          }
        ]
      ]
    }
  },
  components: { swipeImage, productList, recommend, moreGoods },
  methods: {
    ...mapActions({ mallList: 'mallList' })
  },
  created () {
    this.mallList().then((res) => {
      console.log(res)
      if (res.status === 200) {
        if (res.data.Carousel.length !== 0) {
          res.data.Carousel.forEach(loopImage => {
            this.mallLoopImages.push({
              loopImg: loopImage.image
            })
          })
        }
        if (res.data.coupon && res.data.coupon.image) this.benefitsImg = res.data.coupon.image
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.mall {
  padding-bottom: 240px;
  .preferential-benefits {
    padding: 0 0 10px 0;
    background-color: $color-ff;
    .benefits-img {
      margin: 0 auto;
      box-sizing: border-box;
      width: 690px;
      height: 230px;
      .img-content {
        width: 100%;
        height: 100%;
      }
    }
  }
  .title-common-style {
    padding: 22px 0;
    margin-top: 24px;
    color: $color-35;
    font-size: 28px;
    text-align: center;
    background-color: $color-ff;
    .title-bar {
      font-size: 24px;
    }
  }
}
</style>
