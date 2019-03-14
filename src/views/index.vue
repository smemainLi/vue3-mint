<template>
  <div class="index">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in tabbarsList" :info="item.infoCount" @click="switchTab(item)" :key="index">
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
export default {
  data () {
    return {
      active: 0,
      tabbarsList: [
        { iconEmpty: 'icon-home', iconColor: 'icon-home-color', infoCount: '6', tabbarContent: '首页', path: '/mall/index' },
        { iconEmpty: 'icon-classify', iconColor: 'icon-classify-color', infoCount: '6', tabbarContent: '分类', path: '/mall/classify' },
        { shareGif: require('../assets/images/mall/share.gif') },
        { iconEmpty: 'icon-shopping-cart', iconColor: 'icon-shopping-cart-color', infoCount: '6', tabbarContent: '购物车', path: '/mall/shoppingCart' },
        { iconEmpty: 'icon-personal', iconColor: 'icon-personal-color', infoCount: '6', tabbarContent: '个人中心', path: '/mcard/index' }
      ]
    }
  },
  methods: {
    switchTab (tabbar) {
      this.$router.push({ path: tabbar.path })
      // sessionStorage.setItem('active', this.active)
    }
  },
  created () {
    // if (sessionStorage.getItem('active')) {
    //   this.active = Number(sessionStorage.getItem('active'))
    //   this.$router.push(this.tabbarsList[Number(sessionStorage.getItem('active'))].path)
    // } else this.$router.push(this.tabbarsList[this.active].path)
    this.$router.push(this.tabbarsList[this.active].path)
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
      }
      .van-tabbar-item__text {
        color: $color-00;
        z-index: 999;
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
      width: 180px;
      height: 180px;
      margin-bottom: 70px;
      .gif-content {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
