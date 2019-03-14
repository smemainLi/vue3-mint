<template>
  <div class="login">
    <div class="tip-message" v-show="$route.query.pageFlag==='updateBindPhone'">
      <span class="tip-content" v-cloak>{{tipContent}}</span>
    </div>
    <div class="login-form">
      <div class="login-account">
        <i class="icon-phone">
          <span class="path1"></span><span class="path2"></span>
        </i>
        <input class="login-field" type="number" onkeyup="value=value.replace(/[^\d]/g,'')" :placeholder="phonePlaceholder" v-model="phone">
      </div>
      <div class="login-gv-code">
        <div class="login-gv-input">
          <i class="icon-graphic-code">
            <span class="path1"></span><span class="path2"></span>
          </i>
          <input class="login-field" :placeholder="gvCodePlaceholder" v-model="gvCode">
        </div>
        <div class="gv-code-img" @click="getGvCode">
          <img class="img-content" :src="`data:image/png;base64,${gvCodeImg}`" alt="">
        </div>
      </div>
      <div class="login-mv-code">
        <div class="login-mv-input">
          <i class="icon-password">
            <span class="path1"></span><span class="path2"></span>
          </i>
          <input class="login-field" type="number" :placeholder="mvCodePlaceholder" v-model="mvCode">
        </div>
        <button :class="['mv-code-button',noClick?'button-no-click':'']" :disabled="noClick" @click="getMvCode">
          <span class="button-content" v-cloak>{{buttonContent}}</span>
        </button>
      </div>
    </div>
    <general-button :isAgree="isAgree" :btnName="$route.query.pageFlag==='updateBindPhone'?updateBindPhoneBtn:$route.query.pageFlag==='forgetPayPwd'?forgetPayPwdBtn:loginBtn" @click.native="confirmInfo"></general-button>
    <agree-notice :protocolName="protocolName" :flag="flag" v-show="!$route.query.pageFlag" @isAgreePro="isAgreeProtocol"></agree-notice>
  </div>
</template>

<script>
import generalButton from '../../components/common/generalButton.vue'
import agreeNotice from '../../components/order/agreeNotice.vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      // btnName: '登录',
      loginBtn: '登录',
      updateBindPhoneBtn: '提交',
      forgetPayPwdBtn: '下一步',
      // phone: '13654789641',
      // phone: '13765432190',/* 13426213521 */
      // phone: '13192297496',
      // phone: '13426213521',
      phone: '13426213521',
      phonePlaceholder: '请输入您的手机号码',
      gvCode: '', // 图形验证码
      gvCodePlaceholder: '请输入图形验证码',
      gvCodeImg: '',
      mvCode: '', // 短信验证码
      mvCodePlaceholder: '请输入短信验证码',
      buttonContent: '发送验证码',
      count: 60,
      timer: '', // 计时器
      noClick: false, // 禁止按钮点击
      isAgree: true,
      protocolName: '会员卡协议',
      flag: 'login',
      tipContent: '修改后需用新手机登录'
    }
  },
  components: { generalButton, agreeNotice },
  created () {
    this.getGvCode()
  },
  methods: {
    // ...mapActions(['getCodePic', 'mcardAgreement']),
    ...mapActions({ getCodePic: 'getCodePic', getPhoneCode: 'getPhoneCode', userLogin: 'userLogin', sendCodeByForgetPayPassword: 'sendCodeByForgetPayPassword', validateSmsCode: 'validateSmsCode', updateMobile: 'updateMobile', userLogout: 'userLogout' }),
    getGvCode () {
      this.getCodePic().then((res) => {
        console.log(res)
        if (res.status === 200) this.gvCodeImg = res.data.vcodeImage
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    /* 发送短信验证码 */
    getMvCode () {
      if (this.phone === '' || this.phone.length !== 11) {
        this.$toast({ message: '手机号码有误', duration: 1000 })
        return
      }
      this.noClick = true
      if (this.$route.query.pageFlag === 'forgetPayPwd') { /* 忘记支付密码 */
        this.sendCodeByForgetPayPassword({ mobile: this.phone, picCode: this.gvCode }).then((res) => {
          console.log(res)
          this.$toast(res.message)
          if (res.status === 200) {
            this.buttonContent = `倒计时 ${this.count}s`
            this.countDown()
          } else {
            this.noClick = false
          }
        }).catch((err) => {
          this.$toast('数据错误')
          throw err
        })
      } else { /* 登录&修改手机号码 */
        this.getPhoneCode({ mobile: this.phone, picCode: this.gvCode }).then((res) => {
          console.log(res)
          this.$toast(res.message)
          if (res.status === 200) {
            this.buttonContent = `倒计时 ${this.count}s`
            this.countDown()
          } else {
            this.noClick = false
          }
        }).catch((err) => {
          this.$toast('数据错误')
          throw err
        })
      }
    },
    /* 计时器 */
    countDown () {
      let _this = this
      this.timer = setInterval(() => {
        if (_this.count === 1) {
          clearInterval(_this.timer)
          _this.count = 60
          _this.noClick = false
          _this.buttonContent = '发送验证码'
          return
        }
        _this.count--
        _this.buttonContent = `倒计时 ${_this.count}s`
      }, 1000)
    },
    confirmInfo () {
      if (this.phone === '') this.$toast({ message: '请输入手机号码', duration: 1000 })
      else if (this.gvCode === '') this.$toast({ message: '请填写图形验证码', duration: 1000 })
      else if (this.mvCode === '') this.$toast({ message: '请填写短信验证码', duration: 1000 })
      else {
        if (this.$route.query.pageFlag === 'updateBindPhone') { /* 修改绑定手机 */
          this.updateMobile({ mobile: this.phone, smsCode: this.mvCode }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              /* 退出账号重新登录 */
              this.userLogout().then((res) => {
                console.log(res)
                this.$toast({ message: res.message, duration: 1000 })
                if (res.status === 200) {
                  setTimeout(() => {
                    this.phone = ''// 手机号码
                    this.gvCode = ''// 图形验证码
                    this.mvCode = ''// 短信验证码
                    this.$router.push({ path: '/mcard/login' })
                  }, 1000)
                }
              }).catch((err) => {
                this.$toast('数据错误')
                throw err
              })
            } else {
              setTimeout(() => {
                this.phone = ''// 手机号码
                this.gvCode = ''// 图形验证码
                this.mvCode = ''// 短信验证码
              }, 1000)
            }
            this.$toast({ message: res.message, duration: 1000 })
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        } else if (this.$route.query.pageFlag === 'forgetPayPwd') { /* 忘记支付密码 */
          this.validateSmsCode({ mobile: this.phone, smsCode: this.mvCode }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              localStorage.setItem('token', res.data.token)
              // setTimeout(() => this.$router.go(-1), 1000)// 登录成功回退上一页
              setTimeout(() => {
                this.$router.push({ path: '/order/payPassword', query: { forgetPayPwdFlag: 'forgetPayPwd' } })
              }, 1000)
            }
            this.$toast({ message: res.message, duration: 1000 })
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        } else { /* 登录 */
          this.userLogin({ mobile: this.phone, smsCode: this.mvCode }).then((res) => {
            console.log(res)
            localStorage.setItem('agreement', res.data.agreement)// false：读取协议 true：无需读取协议
            if (res.status === 200) {
              setTimeout(() => this.$router.go(-1), 1000)// 登录成功回退上一页
            }
            this.$toast({ message: res.message, duration: 1000 })
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        }
      }
    },
    isAgreeProtocol (val) {
      this.isAgree = val
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to)
    console.log(from)
    // if (to.path !== '/mcard/userProtocol') this.$router.go(0)
    from.meta.keepAlive = false
    next()
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: $color-ff;
  .tip-message {
    height: 68px;
    width: 100%;
    line-height: 68px;
    padding-left: 32px;
    box-sizing: border-box;
    background-color: $color-f5;
    .tip-content {
      font-size: 24px;
      color: $color-008CA7;
    }
  }
  .login-form {
    padding: 36px 32px 0 32px; /* 这里需要添加判断 */
    margin-bottom: 110px;
    .login-field {
      font-size: 28px;
      color: $color-88;
      width: 72%;
    }
    .login-account {
      width: 686px;
      height: 88px;
      border: 1px solid $color-e5;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 0 20px;
      box-sizing: border-box;
      margin-bottom: 30px;
      .icon-phone {
        color: $color-88;
        font-size: 34px;
        margin-right: 14px;
      }
    }
    .login-gv-code {
      display: flex;
      justify-content: space-between;
      .login-gv-input {
        width: 459px;
        height: 88px;
        border: 1px solid $color-e5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 0 0 20px;
        box-sizing: border-box;
        margin-bottom: 30px;
        .icon-graphic-code {
          color: $color-88;
          font-size: 34px;
          margin-right: 14px;
        }
      }
      .gv-code-img {
        width: 208px;
        height: 88px;
        .img-content {
          width: 100%;
          height: 100%;
          border: 1px solid $color-e5;
        }
      }
    }
    .login-mv-code {
      display: flex;
      justify-content: space-between;
      .login-mv-input {
        width: 459px;
        height: 88px;
        border: 1px solid $color-e5;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 0 0 20px;
        box-sizing: border-box;
        margin-bottom: 30px;
        .icon-password {
          color: $color-88;
          font-size: 34px;
          margin-right: 14px;
        }
      }
      .mv-code-button {
        width: 208px;
        height: 88px;
        background-color: $color-ff;
        border: 1px solid $color-e5;
        .button-content {
          font-size: 28px;
          color: $color-88;
          white-space: nowrap; //文本强制不换行
        }
      }
      .button-no-click {
        background-color: $color-e5;
      }
    }
  }
}
</style>
