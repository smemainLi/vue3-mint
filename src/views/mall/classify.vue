<template>
  <div class="classify">
    <div class="classify-search" @click.stop="$router.push('/mall/search')">
      <div class="search-box">
        <i class="icon-search"></i>
        <span class="search-tips" v-cloak>{{searchTips}}</span>
      </div>
    </div>
    <tabs></tabs>
    <more-goods class="classify-goods" :rowList="item" v-for="(item,index) in goodsList" :key="'goods'+index"></more-goods>
  </div>
</template>

<script>
import tabs from '../../components/mall/tabs.vue'
import moreGoods from '../../components/mall/moreGoods.vue'
export default {
  data () {
    return {
      searchTips: '可输入商品名称搜索',
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
  methods: {
  },
  components: { tabs, moreGoods }
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
  .classify-goods {
    padding-top: 45px;
  }
}
</style>
