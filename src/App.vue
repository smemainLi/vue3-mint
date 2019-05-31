<template>
  <div id="app">
    <div class="placeholder-info" v-show="connectStatus">
      <div class="placeholder-img">
        <img class="img-content" :src="placeImg" alt="">
        <div class="tips-content" v-cloak>{{tipsContent}}</div>
      </div>
    </div>
    <div class="app-content" v-if="!connectStatus">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script>
// import noConnect from './components/mcard/noConnect.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      placeImg: '',
      tipsContent: '暂无网络'
    }
  },
  // components: { noConnect },
  computed: {
    ...mapState({
      connectStatus: (state) => { return state.mcard.noConnect }
    })
  },
  created () {
    localStorage.setItem('placeImg', '/static/img/placeholderImg.c0b7d2b0.png')
    this.placeImg = localStorage.getItem('placeImg')
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  .placeholder-info {
    height: 100%;
    padding-top: 360px !important;
    box-sizing: border-box;
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
  .app-content {
    width: 100%;
    height: 100%;
  }
}
</style>
