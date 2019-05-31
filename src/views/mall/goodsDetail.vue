<template>
  <div class="goods-detail">
    <download-tips v-show="downloadApp"></download-tips>
    <goods-main :totalLoopImages="totalLoopImages" :loopImageFlag="loopImageFlag" :goodsMainInfo="goodsMainInfo"></goods-main>
    <image-text :imageTextContent="imageTextContent"></image-text>
    <div class="invite-friend-icon" v-show="inviteIcon" @click="maskDownload=true">
      <img class="icon-img" :src="inviteIcon" alt="">
    </div>
    <goods-operate :goodsOperateInfo="goodsOperateInfo" :loginStatus="loginStatus"></goods-operate>
    <div class="mask-download-popup">
      <van-popup v-model="maskDownload" @click.native="maskDownload=false">
        <div class="invite-point">
          <img class="point-img" :src="invitePoint" alt="">
        </div>
        <div class="invite-tips">
          <img class="tips-img" :src="inviteTips" alt="">
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import downloadTips from '../../components/mall/downloadTips.vue'
import goodsMain from '../../components/mall/goodsMain.vue'
import imageText from '../../components/mall/imageText.vue'
import goodsOperate from '../../components/mall/goodsOperate.vue'
import { getUrlParam } from '../../utils/tools'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      totalLoopImages: [], // 轮播图
      loopImageFlag: 'goodsDetail', // 商品详情页面轮播图
      goodsMainInfo: {}, // 商品主要信息
      goodsOperateInfo: {}, // 商品操作数据
      imageTextContent: '', // 图文详情
      maskDownload: false,
      downloadApp: false,
      inviteIcon: '',
      invitePoint: require('../../assets/images/mcard/invitePoint.png'),
      inviteTips: require('../../assets/images/mcard/inviteTips.png')
    }
  },
  methods: {
    ...mapActions({ productDetail: 'productDetail', getCartGoodsNum: 'getCartGoodsNum', getInviteConfig: 'getInviteConfig' }),
    async loadProductDetail () {
      const result = await this.productDetail({ productId: getUrlParam('productId') || this.$route.query.productId || sessionStorage.getItem('productId') })
      if (result.status === 200) {
        result.data.product.images.length && result.data.product.images.forEach(imageItem => {
          this.totalLoopImages.push({
            loopImg: imageItem
          })
        })
        this.goodsMainInfo = {
          goodsId: result.data.product.id,
          currentPrice: `￥${result.data.product.price}`,
          oldPrice: result.data.product.originalPrice,
          starProduct: result.data.product.note,
          mainName: result.data.product.name,
          mainIntroduct: result.data.product.attributes,
          salesVolume: `销量：${result.data.product.sale}`,
          fullDiscount: Number(result.data.threshold) ? `全场满${result.data.threshold}起送` : '',
          stockBalance: `库存：${result.data.product.stock}`,
          goodsType: result.data.product.type// 0服务 1商品
        }
        this.imageTextContent = result.data.product.detail
        this.goodsOperateInfo = {
          goodsId: result.data.product.id,
          goodsCurrentPrice: `￥${result.data.product.price}`,
          goodsCurrentInventory: `（库存${result.data.product.stock}）`,
          stockNum: result.data.product.stock, // 库存 方便子组件做判断
          goodsType: result.data.product.type, // 0服务 1商品 方便子组件做判断
          threshold: result.data.threshold// 起送门槛
        }
      }
    },
    /* 加载分享配置信息 */
    async loadInviteConfig () {
      const result = await this.getInviteConfig()
      if (result.status !== 200) return
      if (result.data.status === '0') this.inviteIcon = result.data.img
    }
  },
  components: { goodsMain, imageText, goodsOperate, downloadTips },
  computed: {
    ...mapState({
      loginStatus: state => state.mcard.loginStatus
    })
  },
  created () {
    this.downloadApp = getUrlParam('shareType') || sessionStorage.getItem('shareType')
    this.loadProductDetail()
    this.getCartGoodsNum()// 获取购物车商品件数
    this.loadInviteConfig()
  }
}
</script>

<style lang="scss" scoped>
.goods-detail {
  padding-bottom: 120px;
  .invite-friend-icon {
    width: 120px;
    height: 124px;
    position: fixed;
    right: 0;
    bottom: 120px;
    .icon-img {
      width: 100%;
      height: 100%;
    }
  }
  .mask-download-popup {
    /deep/ .van-popup {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      .invite-point {
        width: 378px;
        height: 312px;
        float: right;
        margin: 0 24px 48px 0;
        .point-img {
          width: 100%;
          height: 100%;
        }
      }
      .invite-tips {
        width: 605px;
        height: 296px;
        margin: 0 auto;
        clear: both;
        .tips-img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
