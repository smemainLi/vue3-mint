<template>
  <div class="mall">
    <swipe-image v-show="totalLoopImages.length" :totalLoopImages="totalLoopImages" :loopImageFlag="loopImageFlag"></swipe-image>
    <product-list v-show="productList.length" :productList="productList"></product-list>
    <div class="preferential-benefits" v-show="benefitsList.length" @click="$router.push({ path: '/mall/coupon', query: { pageFlag: 'mall' } })">
      <div class="benefits-img" v-for="(item,index) in benefitsList" :key="index">
        <img class="img-content" :src="item.benefitsImg" alt="">
      </div>
    </div>
    <div class="title-common-style" v-show="recommendTitle" v-cloak>
      <!-- <span class="title-bar">--</span> --><span v-cloak>{{recommendTitle}}</span><!-- <span class="title-bar">--</span> -->
    </div>
    <recommend :recommendItem="item" v-for="(item,index) in recommendProductList" :key="'recommend'+index"></recommend>
    <div :class="['title-common-style', !hasListData ? 'no-more-data':'']" v-cloak><span class="title-bar">—</span><span v-cloak>{{moreGoodsTitle}}</span><span class="title-bar">—</span></div>
    <van-list :class="[!hasListData?'no-more-data':'']" v-model="loading" :finished="finished" :finished-text="noMore" @load="loadMoreProduct">
      <more-goods :rowList="item" v-for="(item,index) in goodsList" :key="'goods'+index"></more-goods>
      <!-- <div class="placeholder-info" v-if="!hasListData">
        <div class="placeholder-img">
          <img class="img-content" :src="placeholderImg" alt="">
          <div class="tips-content" v-cloak>{{tipsContent}}</div>
        </div>
      </div> -->
    </van-list>
  </div>
</template>

<script>
import swipeImage from '../../components/mall/swipeImage.vue'
import productList from '../../components/mall/productList.vue'
import recommend from '../../components/mall/recommend.vue'
import moreGoods from '../../components/mall/moreGoods.vue'
// import { Toast } from 'vant'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      placeholderImg: localStorage.getItem('placeImg') || '',
      tipsContent: '暂无数据哦~',
      totalLoopImages: [], // 轮播图
      loopImageFlag: 'mallIndex', // 商城首页轮播图
      productList: [],
      // 优惠券指引跳转图片
      benefitsList: [],
      recommendTitle: '', // 为你推荐标题
      recommendProductList: [
        {
          mainProduct: {},
          nextProductList: []
        },
        {
          mainProduct: {},
          nextProductList: []
        }
      ],
      placeholderImage: require('../../assets/images/mall/placeholderImage.png'),
      moreGoodsTitle: ' 更多商品 ',
      pageNo: 1, // 页码
      pageSize: 6, // 每页有多少条记录
      loading: false,
      finished: false,
      noMore: '没有更多了',
      goodsList: [],
      firstPaging: true, // true 第一个分页请求  false 非第一个分页请求
      hasListData: true// false 没有数据  true 有数据
    }
  },
  components: { swipeImage, productList, recommend, moreGoods },
  methods: {
    ...mapActions({ mallList: 'mallList', moreProduct: 'moreProduct' }),
    /* 加载商城首页列表 */
    async loadMallList () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      const result = await this.mallList()
      this.$indicator.close()
      /* 外部list下面的type：类型：1、轮播图，2、图标导航，3、大图，4、网格，5、标题 */
      /* 内部list下面的type：类型：1、商品，2、分类，3、url，4、优惠券领取 */
      if (result.status !== 200) return
      if (!result.data.list.length) return
      result.data.list.forEach((typeListItem, index) => {
        if (typeListItem.type === 1) {
          this.totalLoopImages = []
          this.totalLoopImages.length = 0
          if (!typeListItem.list.length) return
          typeListItem.list.forEach(listItem => {
            this.totalLoopImages.push({
              loopImg: listItem.image,
              type: listItem.type,
              targetId: listItem.targetId,
              url: listItem.url
            })
          })
        } else if (typeListItem.type === 2) {
          this.productList = []
          this.productList.length = 0
          if (!typeListItem.list.length) return
          typeListItem.list.forEach(listItem => {
            this.productList.push({
              productTitle: listItem.name,
              productImg: listItem.image,
              type: listItem.type,
              targetId: listItem.targetId,
              url: listItem.url
            })
          })
        } else if (typeListItem.type === 3) {
          if (!typeListItem.list.length) return
          if (typeListItem.list[0].width !== '750') {
            // 非全屏图，即福利图片
            this.benefitsList = []
            this.benefitsList.length = 0
            typeListItem.list.forEach(listItem => {
              this.benefitsList.push({
                targetId: listItem.targetId,
                benefitsImg: listItem.image,
                benefitsName: listItem.name,
                url: listItem.url
              })
            })
          } else {
            if (!typeListItem.list.length) return
            this.recommendProductList[index === 4 ? 0 : 1].mainProduct = {
              mainProductImg: typeListItem.list[0].image,
              type: typeListItem.list[0].type,
              targetId: typeListItem.list[0].targetId,
              url: typeListItem.list[0].url
            }
          }
        } else if (typeListItem.type === 4) {
          if (!typeListItem.list.length) return
          typeListItem.list.forEach(listItem => {
            this.recommendProductList[index === 5 ? 0 : 1].nextProductList.push(
              {
                nextProductImg: listItem.image || this.placeholderImage,
                nextProductIntroduce: listItem.name,
                nextProductPrice: `￥${listItem.price}`,
                isSpecial: listItem.note,
                type: listItem.type,
                targetId: listItem.targetId,
                url: listItem.url
              }
            )
          })
        } else if (typeListItem.type === 5) {
          this.recommendTitle = ''
          if (!typeListItem.list.length) return
          typeListItem.list.length &&
            (this.recommendTitle = typeListItem.list[0].name)
        }
      })
    },
    /* 加载商城首页更多商品 */
    async loadMoreProduct () {
      try {
        const result = await this.moreProduct({
          pageNo: this.pageNo,
          pageSize: this.pageSize
        })
        if (result.status === 200) {
          this.pageNo += 1 // 符合条件页码加一
          this.firstPaging && (this.hasListData = !!result.data.list.length)// 在第一个分页请求回来之后对hasListData进行判断，之后都不需要进行判断了
          this.firstPaging = false
          /* 在goodsList中存储多个数组，每个数组的元素最多2个 */
          let n = 0 // 辅助
          let currentItem = [] // 辅助
          result.data.list.length &&
            result.data.list.forEach(goodsItem => {
              currentItem.push({
                goodsId: goodsItem.id,
                goodsImg: goodsItem.image,
                goodsIntroduce: goodsItem.name,
                goodsPrice: `￥${goodsItem.price}`,
                goodsNum: `销量：${goodsItem.sale}`,
                note: goodsItem.note
              })
              n++
              if (n % 2 === 0) {
                this.goodsList.push(currentItem)
                currentItem = []
                currentItem.length = 0
              }
            })
          if (currentItem.length !== 0) this.goodsList.push(currentItem)
          // 加载状态结束
          this.loading = false
          if (result.data.list.length === 0 || result.data.list.length < 6) {
            this.finished = true
          }
        }
      } catch (error) {
        this.loading = false
        this.finished = true
        this.hasListData = false
      }
    }
  },
  created () {
    this.loadMallList()
  }
}
</script>

<style lang="scss" scoped>
.mall {
  padding-bottom: 160px;
  .preferential-benefits {
    // padding: 0 0 10px 0;
    background-color: $color-ff;
    .benefits-img {
      margin: 0 auto;
      box-sizing: border-box;
      width: 740px;
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
  /deep/ .van-list__finished-text {
    display: none;
  }
  .no-more-data {
    display: none;
    /deep/ .van-list__finished-text {
      display: none;
    }
    // .placeholder-info {
    //   .placeholder-img {
    //     margin-top: 360px !important;
    //     width: 227px;
    //     height: 214px;
    //     margin: 0 auto;
    //     text-align: center;
    //     .img-content {
    //       width: 100%;
    //       height: 100%;
    //     }
    //     .tips-content {
    //       font-size: 28px;
    //       color: $color-88;
    //       margin-top: 30px;
    //     }
    //   }
    // }
  }
}
</style>
