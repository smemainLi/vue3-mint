<template>
  <div class="mcard">
    <top :headImg="headImg" :userName="userName" :cardBalance="cardBalance" :walletStatus="walletStatus" @showQrcode="showQrcode"></top>
    <div class="my-shop-action">
      <action-item :actionItem="item" v-for="(item,index) in shopActionList" @click.native="selectAction(item)" :key="'shop'+index"></action-item>
    </div>
    <div class="my-account-action">
      <action-item :actionItem="item" v-for="(item,index) in shopAccountList" @click.native="selectAction(item)" :key="'account'+index"></action-item>
    </div>
    <div class="qrcode-mask" v-show="qrcodeDisplay">
      <qrcode-show :qrcodeImg="qrcodeImg" @closeQrcode="closeQrcode"></qrcode-show>
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
      headImg: '',
      userName: '',
      cardBalance: '',
      qrcodeImg: '',
      walletStatus: false, // 钱包开通状态 false 表示未开通 true 表示已开通
      shopActionList: [
        {
          imgContent: require('../../assets/images/mcard/alarmClock.png'),
          remarkContent: '我的预约',
          path: '/arecord/index',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/consumption.png'),
          remarkContent: '我的门店消费',
          path: '/mcard/consumptionList',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/goods.png'),
          remarkContent: '我买过的商品',
          path: '/bought/index',
          hasBr: false
        }
      ],
      shopAccountList: [
        {
          imgContent: require('../../assets/images/mcard/patientImg.png'),
          remarkContent: '我的就诊人',
          path: '/mcard/myPatients',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/phone.png'),
          remarkContent: '修改绑定手机',
          path: '/mcard/updateBindPhone',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/payPassword.png'),
          remarkContent: '修改支付密码',
          path: '/order/payPassword',
          hasBr: false
        }
      ]
    }
  },
  components: {
    top, actionItem, qrcodeShow
  },
  methods: {
    ...mapActions({ getPersonalInfo: 'getPersonalInfo', getPersonalQrCode: 'getPersonalQrCode', userLogout: 'userLogout' }),
    /* 显示二维码 */
    showQrcode (flag) {
      this.qrcodeDisplay = flag
    },
    /* 关闭显示 */
    closeQrcode (flag) {
      this.qrcodeDisplay = flag
    },
    selectAction (actionRow) {
      console.log(actionRow)
      if (actionRow.path === '/order/payPassword') {
        if (!this.walletStatus) this.$toast({ message: '请先开通会员卡支付', duration: 1000 })
        else this.$router.push({ path: '/order/payPassword', query: { updateFlag: 'isUpdate' } })
      } else if (actionRow.path === '/mcard/updateBindPhone') this.$router.push({ path: '/mcard/updateBindPhone', query: { pageFlag: 'updateBindPhone' } })
      else { this.$router.push({ path: actionRow.path }) }
    },
    /* 加载个人信息 */
    loadPersonalInfo () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getPersonalInfo().then((res) => {
        this.$indicator.close()
        console.log(res)
        if (res.status === 200) {
          this.headImg = res.data.headimgurl
          this.userName = res.data.name
          this.cardBalance = `￥${res.data.balance}`
          this.walletStatus = !!res.data.walletStatus
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 加载个人二维码 */
    loadPersonalQrCode () {
      this.getPersonalQrCode().then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.qrcodeImg = res.data.qrcode
        }
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 用户退出登录 */
    logout () {
      this.$messagebox({
        message: '是否退出登录',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        console.log(action)
        if (action === 'confirm') {
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.userLogout().then((res) => {
            console.log(res)
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 1000 })
            if (res.status === 200) {
              setTimeout(() => {
                this.$router.push({ path: '/mcard/login' })
              }, 1000)
            }
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        }
      })
    }
  },
  created () {
    this.loadPersonalInfo()
    this.loadPersonalQrCode()
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
