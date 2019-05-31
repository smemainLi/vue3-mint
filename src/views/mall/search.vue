<template>
  <div class="search">
    <form action="/">
      <van-search v-model.trim="searchVal" :placeholder="searchPlaceholder" autofocus show-action @search="onSearch">
        <div slot="action" :class="[allowSearch?'':'search-event-click']" @click="onSearch">搜索</div>
      </van-search>
    </form>
    <van-list :class="[placeholderShow()?'search-no-goods':'']" v-model="loading" :finished="finished" :finished-text="noMore" @load="productSearch">
      <more-goods class="search-more-goods" :rowList="item" v-for="(item,index) in goodsList" :key="'goods'+index"></more-goods>
      <div class="placeholder-info" v-if="placeholderShow()">
        <div class="placeholder-img">
          <img class="img-content" :src="placeholderImg" alt="">
        </div>
        <div class="tips-content" v-cloak>{{tipsContent}}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
import moreGoods from '../../components/mall/moreGoods.vue'
import { Toast } from 'vant'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      placeholderImg: require('../../assets/images/order/placeholderImg.png'),
      tipsContent: '找不到相关商品，换个词试试',
      searchVal: '',
      isSearch: false, // 是否点击过‘搜索’
      // firstEnter: true, // 首次进入页面
      searchPlaceholder: '可输入商品名称搜索',
      pageNo: 1, // 页码
      pageSize: 6, // 每页有多少条记录
      goodsList: [],
      loading: false,
      finished: false,
      noMore: '没有更多了',
      firstPaging: true, // true 第一个分页请求  false 非第一个分页请求
      hasListData: true, // false 无数据  true 有数据
      allowSearch: true// 允许查询
    }
  },
  methods: {
    ...mapActions({ searchProduct: 'searchProduct' }),
    onSearch () {
      this.pageNo = 1
      this.goodsList = []
      this.goodsList.length = 0
      this.allowSearch = false
      this.productSearch()
    },
    async productSearch () {
      if (!this.searchVal && !this.isSearch) {
        this.isSearch = true
        this.loading = false
        return
      }
      if (!this.searchVal && this.isSearch) {
        this.loading = false
        this.$toast({ message: '请输入商品名称搜索', duration: 1000 })
        return
      }

      let replaceReg = new RegExp(this.searchVal, 'g')// 匹配关键字正则
      let replaceStr = `<span class="search-content-style">${this.searchVal}</span>`
      Toast.loading({ mask: true, duration: 0, message: '加载中...' })
      const result = await this.searchProduct({ keyword: this.searchVal, pageNo: this.pageNo, pageSize: this.pageSize })
      this.allowSearch = true
      Toast.clear()
      if (result.status === 200) {
        this.pageNo += 1// 符合条件页码加一
        /* 在goodsList中存储多个数组，每个数组的元素最多2个 */
        let n = 0// 辅助
        let currentItem = []// 辅助
        this.firstPaging && (this.hasListData = !!result.data.list.length)// 在第一个分页请求回来之后对hasListData进行判断，之后都不需要进行判断了
        this.firstPaging = false
        result.data.list.length && result.data.list.forEach(goodsItem => {
          let afterName = goodsItem.name.replace(replaceReg, replaceStr)
          currentItem.push({
            goodsId: goodsItem.id,
            goodsImg: goodsItem.image,
            goodsIntroduce: afterName,
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
          this.firstPaging = true
        }
      }
    },
    placeholderShow () {
      if (!this.isSearch && !this.searchVal) return false
      else if (this.searchVal && !this.hasListData) return true
    }
  },
  components: { moreGoods },
  watch: {
    searchVal: function (newVal, oldVal) {
      this.hasListData = true
      if (newVal === '') {
        this.isSearch = false
        this.finished = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  background-color: $color-ff;
  /deep/ .van-search {
    padding: 14px 30px;
    background-color: $color-ff !important;
    .van-cell {
      height: 66px;
      padding: 0 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      font-size: 28px;
      background-color: $color-f5;
      .van-icon,
      .van-icon-search,
      .van-cell__left-icon {
        font-size: 32px;
        font-weight: bolder;
        margin: 0 0 6px 0;
        color: $color-008CA7 !important;
      }
      // .van-cell__clear {
      //   // line-height: 66px;
      // }
      .van-field__body {
        display: static;
        line-height: 66px;
        .van-field__control {
          line-height: 33px;
          padding: 0 0 0 15px;
        }
      }
    }
    .search-event-click {
      pointer-events: none;
    }
  }
  .search-more-goods {
    margin-top: 14px;
  }
  /deep/ .van-list__finished-text {
    display: none;
  }
  .search-no-goods {
    background-color: $color-f5;
    /deep/ .van-list__finished-text {
      display: none;
    }
    .placeholder-info {
      text-align: center;
      padding-top: 360px;
      .placeholder-img {
        width: 227px;
        // height: 214px;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        .img-content {
          width: 100%;
          height: 100%;
        }
      }
      .tips-content {
        font-size: 28px;
        color: $color-88;
        margin-top: 30px;
      }
    }
  }
}
</style>
