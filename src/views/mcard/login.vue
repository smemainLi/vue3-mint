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
        <input class="login-field" type="text" :readonly="inputReadonly" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" :placeholder="phonePlaceholder" v-model="phone">
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
          <span :class="['button-content',noClick?'count-down-content':'']" v-cloak>{{buttonContent}}</span>
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
      loginBtn: '登录',
      updateBindPhoneBtn: '提交',
      forgetPayPwdBtn: '下一步',
      phone: '',
      phonePlaceholder: '请输入您的手机号码',
      gvCode: '', // 图形码
      gvCodePlaceholder: '请输入图形码',
      gvCodeImg: '',
      mvCode: '', // 短信验证码
      mvCodePlaceholder: '请输入短信中的验证码',
      buttonContent: '获取验证码',
      count: 60,
      timer: '', // 计时器
      noClick: false, // 禁止按钮点击
      isAgree: true,
      protocolName: '会员卡协议',
      flag: 'login',
      tipContent: '修改后需用新手机登录',
      inputReadonly: false
    }
  },
  components: { generalButton, agreeNotice },
  created () {
    this.getGvCode()
    if (this.$route.query.pageFlag === 'forgetPayPwd') {
      this.inputReadonly = true
      this.phone = localStorage.getItem('currentPhone')
    }
  },
  methods: {
    ...mapActions({ getCodePic: 'getCodePic', getPhoneCode: 'getPhoneCode', userLogin: 'userLogin', sendCodeByForgetPayPassword: 'sendCodeByForgetPayPassword', validateSmsCode: 'validateSmsCode', updateMobile: 'updateMobile', userLogout: 'userLogout' }),
    /* 获取图形码 */
    async getGvCode () {
      const picCodeRes = await this.getCodePic()
      if (picCodeRes.status !== 200) return
      this.gvCodeImg = picCodeRes.data.vcodeImage
    },
    /* 发送短信验证码 */
    async getMvCode () {
      if (this.phone === '') {
        this.$toast({ message: '请输入手机号码', duration: 1000 })
        return
      }
      if (this.phone.length !== 11) {
        this.$toast({ message: '手机号码填写有误', duration: 1000 })
        return
      }
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.noClick = true
      if (this.$route.query.pageFlag === 'forgetPayPwd') { /* 忘记支付密码 */
        const codeByForgPwdRes = await this.sendCodeByForgetPayPassword({ mobile: this.phone, picCode: this.gvCode })
        this.$indicator.close()
        this.$toast({ message: codeByForgPwdRes.message, duration: 1000 })
        if (codeByForgPwdRes.status !== 200) {
          this.gvCode = ''
          this.noClick = false
          return
        }
        this.buttonContent = `倒计时 ${this.count}s`
        this.countDown()
      } else { /* 登录&修改手机号码 */
        const phoneCodeRes = await this.getPhoneCode({ mobile: this.phone, picCode: this.gvCode })
        this.$indicator.close()
        this.$toast({ message: phoneCodeRes.message, duration: 1000 })
        if (phoneCodeRes.status !== 200) {
          this.gvCode = ''
          this.noClick = false
          this.getGvCode()
          return
        }
        this.buttonContent = `倒计时 ${this.count}s`
        this.countDown()
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
          _this.buttonContent = '获取验证码'
          return
        }
        _this.count--
        _this.buttonContent = `倒计时 ${_this.count}s`
      }, 1000)
    },
    async confirmInfo () {
      if (!this.phone) this.$toast({ message: '请输入手机号码', duration: 1000 })
      else if (this.phone.length !== 11) this.$toast({ message: '手机号码填写有误', duration: 1000 })
      else if (!this.gvCode) this.$toast({ message: '请填写图形码', duration: 1000 })
      else if (!this.mvCode) this.$toast({ message: '请填写短信验证码', duration: 1000 })
      else {
        if (this.$route.query.pageFlag === 'updateBindPhone') { /* 修改绑定手机 */
          const updateRes = await this.updateMobile({ mobile: this.phone, smsCode: this.mvCode })
          this.$toast({ message: updateRes.message, duration: 1000 })
          if (updateRes.status !== 200) {
            setTimeout(() => {
              this.phone = ''// 手机号码
              this.gvCode = ''// 图形码
              this.mvCode = ''// 短信验证码
            }, 1000)
            return
          }
          const logoutRes = await this.userLogout()
          if (logoutRes.status !== 200) return
          setTimeout(() => {
            this.phone = ''
            this.gvCode = ''
            this.mvCode = ''
            sessionStorage.setItem('loopFlag', 'updateBindPhone')
            this.getGvCode()
            this.$router.push({ path: '/mcard/login' })
          }, 1000)
        } else if (this.$route.query.pageFlag === 'forgetPayPwd') { /* 忘记支付密码 */
          const valiSmsRes = await this.validateSmsCode({ mobile: this.phone, smsCode: this.mvCode })
          this.$toast({ message: valiSmsRes.message, duration: 1000 })
          if (valiSmsRes.status !== 200) {
            setTimeout(() => {
              this.gvCode = ''
              this.mvCode = ''
            }, 1000)
            return
          }
          localStorage.setItem('token', valiSmsRes.data.token)
          setTimeout(() => {
            this.$router.push({ path: '/order/payPassword', query: { forgetPayPwdFlag: 'forgetPayPwd' } })
          }, 1000)
        } else { /* 登录 */
          const loginRes = await this.userLogin({ mobile: this.phone, smsCode: this.mvCode })
          this.$toast({ message: loginRes.message, duration: 1000 })
          setTimeout(() => {
            this.gvCode = ''
            this.mvCode = ''
          }, 1000)
          if (loginRes.status !== 200) return
          localStorage.setItem('currentPhone', this.phone)// 存储当前用户登录的手机号，以便忘记密码时候使用
          if (sessionStorage.getItem('loopFlag') === 'updateBindPhone') setTimeout(() => this.$router.push('/mcard/index'), 1000)// 修改绑定手机成功之后跳转会员卡页面
          else setTimeout(() => this.$router.go(-1), 1000)// 登录成功回退上一页
        }
      }
    },
    isAgreeProtocol (val) {
      this.isAgree = val
    }
  },
  beforeRouteLeave (to, from, next) {
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
      color: $color-35;
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
          color: $color-008CA7;
          white-space: nowrap; //文本强制不换行
        }
        .count-down-content {
          color: $color-88;
        }
      }
      .button-no-click {
        background-color: $color-e5;
      }
    }
  }
}
</style>
