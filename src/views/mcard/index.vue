<template>
  <div class="mcard">
    <top @showQrcode="showQrcode"></top>
    <div class="my-shop-action">
      <action-item :actionItem="item" v-for="(item,index) in shopActionList" :key="index"></action-item>
    </div>
    <div class="my-account-action">
      <action-item :actionItem="item" v-for="(item,index) in shopAccountList" :key="index"></action-item>
    </div>
    <div class="qrcode-mask" v-show="qrcodeDisplay">
      <qrcode-show @closeQrcode="closeQrcode"></qrcode-show>
    </div>
    <button class="exit-button" @click="logout">
      <span class="btn-name" v-cloak>{{btnName}}</span>
    </button>
  </div>
</template>

<script>
import top from '../../components/mcard/top.vue'
import actionItem from '../../components/mcard/actionItem.vue'
import qrcodeShow from '../../components/mcard/qrcodeShow.vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      qrcodeDisplay: false,
      btnName: '退出登录',
      shopActionList: [
        {
          imgContent: require('../../assets/images/mcard/alarmClock.png'),
          remarkContent: '我的预约',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/consumption.png'),
          remarkContent: '我的门店消费',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/goods.png'),
          remarkContent: '我买过的商品',
          hasBr: false
        }
      ],
      shopAccountList: [
        {
          imgContent: require('../../assets/images/mcard/patientImg.png'),
          remarkContent: '我的就诊人',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/phone.png'),
          remarkContent: '修改绑定手机',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/payPassword.png'),
          remarkContent: '修改支付密码',
          hasBr: false
        }
      ]
    }
  },
  components: {
    top, actionItem, qrcodeShow
  },
  methods: {
    ...mapActions({ userLogout: 'userLogout' }),
    /* 显示二维码 */
    showQrcode (flag) {
      this.qrcodeDisplay = flag
    },
    /* 关闭显示 */
    closeQrcode (flag) {
      this.qrcodeDisplay = flag
    },
    /* 用户退出登录 */
    logout () {
      this.userLogout().then((res) => {
        console.log(res)
        this.$toast({ message: res.message, duration: 1000 })
        setTimeout(() => {
          this.$router.push({ path: '/mcard/login' })
        }, 1000)
      }).catch((err) => {
        this.$toast('数据错误')
        throw new Error(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mcard {
  .my-shop-action {
    margin: 24px 0;
  }
  .qrcode-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba($color: $color-00, $alpha: 0.58);
  }
  .exit-button {
    width: 100%;
    height: 88px;
    color: $color-35;
    font-size: 36px;
    background: $color-ff;
    margin-top: 24px;
    .btn-name {
      margin-left: 14px;
      letter-spacing: 2px;
    }
  }
}
</style>
