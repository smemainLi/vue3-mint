<template>
  <div class="search">
    <form action="/">
      <van-search v-model="searchVal" :placeholder="searchPlaceholder" autofocus="autofocus" @search="onSearch" />
    </form>
    <more-goods class="search-more-goods" :rowList="item" v-for="(item,index) in goodsList" :key="'goods'+index"></more-goods>
  </div>
</template>

<script>
import moreGoods from '../../components/mall/moreGoods.vue'

export default {
  data () {
    return {
      searchVal: '',
      searchPlaceholder: '可输入商品名称搜索',
      goodsList: [
        [
          {
            goodsImg: require('../../assets/images/mall/recommendNext1-3.png'),
            goodsIntroduce: '50支装 原线牙线棒',
            goodsPrice: '￥28',
            goodsNum: '销量：500'
          }
        ]
      ]
    }
  },
  methods: {
    onSearch (msg) {
      console.log(msg)
    }
  },
  components: { moreGoods }
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
  }
  .search-more-goods {
    margin-top: 14px;
  }
}
</style>
