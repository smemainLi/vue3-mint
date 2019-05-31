<template>
  <div class="index">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item :class="[index===3&&cartGoodsNum?'':'hide-van-info-inco']" v-show="item.iconEmpty||item.shareGif" v-for="(item,index) in tabbarsList" :info="index===3?(cartGoodsNum?cartGoodsNum:''):''" @click="switchTab(item)" :key="index">
        <i :class="active===index?item.iconColor:item.iconEmpty" v-show="item.iconEmpty" slot="icon"></i>
        <span class="tabbar-content" v-show="item.iconEmpty" v-cloak>{{item.tabbarContent}}</span>
        <div class="share-gif" v-show="!item.iconEmpty">
          <img class="gif-content" :src="item.shareGif" alt="">
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      active: 0,
      tabbarsList: [
        { iconEmpty: 'icon-home', iconColor: 'icon-home-color', tabbarContent: '首页', path: '/mall/index/0' },
        { iconEmpty: 'icon-classify', iconColor: 'icon-classify-color', tabbarContent: '分类', path: '/mall/classify/1' },
        { shareGif: '', path: '' },
        { iconEmpty: 'icon-shopping-cart', iconColor: 'icon-shopping-cart-color', tabbarContent: '购物车', path: '/mall/shoppingCart' },
        { iconEmpty: 'icon-personal', iconColor: 'icon-personal-color', tabbarContent: '个人中心', path: '/mcard/index' }
      ]
    }
  },
  methods: {
    ...mapActions({ getCartGoodsNum: 'getCartGoodsNum', getInviteConfig: 'getInviteConfig', getMyInviteConfig: 'getMyInviteConfig' }),
    switchTab (tabbar) {
      this.$router.push({ path: tabbar.path })
    },
    /* 加载分享配置信息 */
    async loadInviteConfig () {
      const result = await this.getInviteConfig()
      if (result.status !== 200) return
      if (result.data.status !== '0') return
      this.tabbarsList[2].shareGif = result.data.img
      this.tabbarsList[2].path = result.data.pageUrl
    }
  },
  computed: {
    ...mapGetters({ cartGoodsNum: 'cartGoodsNum' })
  },
  created () {
    if (!this.$route.params.active) this.$router.replace(this.tabbarsList[0].path)
    else this.active = Number(this.$route.params.active)
    this.getCartGoodsNum()// 获取购物车商品件数
    this.loadInviteConfig()
  },
  updated () {
    this.active = Number(this.$route.params.active)
  }
}
</script>

<style lang="scss" scoped>
.index {
  /deep/ .van-tabbar {
    height: 98px;
    .van-tabbar-item {
      font-size: 20px;
      color: $color-88;
      z-index: 999;
      .van-tabbar-item__icon {
        font-size: 36px;
        .van-info {
          font-size: 24px;
          border-radius: 32px;
          padding: 0 6px;
          min-width: 32px;
          line-height: 28px;
          right: -6px;
          top: -10px;
          background-color: $color-F56E72;
        }
        .icon-shopping-cart,
        .icon-shopping-cart-color {
          font-size: 46px !important;
        }
      }
      .van-tabbar-item__text {
        color: $color-00;
        z-index: 999;
      }
    }
    .hide-van-info-inco {
      .van-info {
        display: none;
      }
    }
    .van-tabbar-item--active {
      font-size: 20px;
      color: $color-008CA7;
      .van-tabbar-item__text {
        color: $color-008CA7;
        z-index: 999;
      }
    }
    .share-gif {
      width: 120px;
      height: 124px;
      margin-bottom: 66px;
      .gif-content {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
