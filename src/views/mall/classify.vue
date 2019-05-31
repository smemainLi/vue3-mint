<template>
  <div class="classify">
    <div class="classify-search" @click.stop="$router.push('/mall/search')">
      <div class="search-box">
        <i class="icon-search"></i>
        <span class="search-tips" v-cloak>{{searchTips}}</span>
      </div>
    </div>
    <div class="tabs">
      <van-tabs v-model="tabActive" @click="switchCategory">
        <van-tab :title="item.categoryName" v-for="(item,index) in tabList" :key="index"></van-tab>
      </van-tabs>
    </div>
    <van-list :class="[!hasListData?'no-more-data':'']" v-model="loading" :finished="finished" :finished-text="noMore" @load="firstEnterFlag?'':loadCategoryProductList">
      <more-goods class="classify-goods" :rowList="item" v-for="(item,index) in goodsList" :key="'goods'+index"></more-goods>
      <div class="placeholder-info" v-show="!hasListData">
        <div class="placeholder-img">
          <img class="img-content" :src="placeholderImg" alt="">
          <div class="tips-content" v-cloak>{{tipsContent}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import moreGoods from '../../components/mall/moreGoods.vue'
// import { Toast } from 'vant'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '暂无数据哦~',
      searchTips: '可输入商品名称搜索',
      tabList: [], // 类目列表
      categoryId: '', // 选中的类目id
      pageNo: 1, // 页码
      pageSize: 6, // 每页有多少条记录
      goodsList: [], // 商品列表
      loading: false,
      finished: false,
      noMore: '没有更多了',
      tabActive: 0, // tab默认值
      firstPaging: true, // true 第一个分页请求  false 非第一个分页请求
      hasListData: true, // false 没有数据  true 有数据
      firstEnterFlag: true// 首次进入分类商品页面的时候，默认加载第一列商品，需等待获取类目接口返回类目id，所以首次加载不通过vant list来调用方法
    }
  },
  methods: {
    ...mapActions({ categoryList: 'categoryList', categoryProductList: 'categoryProductList' }),
    /* 加载类目 */
    async getCategoryList () {
      const result = await this.categoryList()
      this.tabList.length = 0
      this.tabList = []
      if (result.status === 200) {
        result.data.categories.length && result.data.categories.forEach((categoryItem, index) => {
          this.$route.query.categoryId === categoryItem.categoryId && (this.tabActive = index)
          this.tabList.push({
            categoryId: categoryItem.categoryId,
            categoryName: categoryItem.categoryName
          })
        })
        this.categoryId = this.$route.query.categoryId || this.tabList[0].categoryId// 首次进入页面，获取分类类目列表的第一项的id，默认加载第一个类目对应的商品
        this.loadCategoryProductList()
        this.firstEnterFlag = false
      }
    },
    /* 加载类目对应的商品 */
    async loadCategoryProductList () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      const result = await this.categoryProductList({
        categoryId: this.categoryId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
      this.$indicator.close()
      if (result.status === 200) {
        this.pageNo += 1// 符合条件页码加一
        this.firstPaging && (this.hasListData = !!result.data.list.length)// 在第一个分页请求回来之后对hasListData进行判断，之后都不需要进行判断了
        this.firstPaging = false
        /* 在goodsList中存储多个数组，每个数组的元素最多2个 */
        let n = 0// 辅助
        let currentItem = []// 辅助
        result.data.list.length && result.data.list.forEach(goodsItem => {
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
        this.finished = false
        if (result.data.list.length === 0 || result.data.list.length < 6) {
          this.finished = true
        }
      }
    },
    /* 切换tab */
    switchCategory (index) {
      this.categoryId = this.tabList[index].categoryId
      this.goodsList = []
      this.goodsList.length = 0
      this.pageNo = 1
      this.firstPaging = true
      this.hasListData = true
      this.loadCategoryProductList()
    }
  },
  components: { moreGoods },
  mounted () {
    this.getCategoryList()
  }
}
</script>

<style lang="scss" scoped>
.classify {
  padding-bottom: 240px;
  .classify-search {
    padding: 10px 32px 12px;
    background-color: $color-ff;
    .search-box {
      height: 66px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      background-color: $color-f5;
      .icon-search {
        font-size: 32px;
        color: $color-008CA7;
        margin: 0 15px 0 20px;
      }
      .search-tips {
        font-size: 28px;
        color: $color-88;
      }
    }
  }
  .tabs {
    /deep/ .van-tabs__wrap {
      height: 88px;
      .van-tabs__line {
        height: 2px;
        border-radius: 1px;
        background-color: $color-1E8FA5;
      }
      .van-tab {
        font-size: 28px;
        color: $color-35;
        line-height: 88px;
      }
      .van-tab--active {
        font-weight: normal;
        color: $color-1E8FA5;
      }
    }
  }
  /deep/ .van-list__finished-text {
    display: none;
  }
  .no-more-data {
    /deep/ .van-list__finished-text {
      display: none;
    }
    .placeholder-info {
      margin-top: 240px !important;
      .placeholder-img {
        width: 227px;
        height: 214px;
        margin: 0 auto;
        text-align: center;
        .img-content {
          width: 100%;
          height: 100%;
        }
        .tips-content {
          font-size: 28px;
          color: $color-88;
          margin-top: 30px;
        }
      }
    }
  }
  .classify-goods {
    padding-top: 45px;
  }
}
</style>
