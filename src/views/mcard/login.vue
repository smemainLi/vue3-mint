<template>
  <div class="login">
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
          <input class="login-field" type="number" :placeholder="gvCodePlaceholder" v-model="gvCode">
        </div>
        <div class="gv-code-img">
          <img class="img-content" :src="gvCodeImg" alt="">
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
    <general-button :btnName="btnName" @click.native="login"></general-button>
  </div>
</template>

<script>
import generalButton from '../../components/common/generalButton.vue'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      btnName: '登录',
      phone: '',
      phonePlaceholder: '请输入您的手机号码',
      gvCode: '',
      gvCodePlaceholder: '请输入图形验证码',
      gvCodeImg: require('../../assets/images/mcard/mcardBg.png'),
      mvCode: '',
      mvCodePlaceholder: '请输入短信验证码',
      buttonContent: '发送验证码',
      count: 60,
      timer: '', // 计时器
      noClick: false// 禁止按钮点击
    }
  },
  components: { generalButton },
  methods: {
    // ...mapActions(['getCodePic']),
    ...mapActions({ getCodePic: 'getCodePic' }),
    getMvCode () {
      this.noClick = true
      this.buttonContent = `倒计时 ${this.count}s`
      this.countDown()
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
    login () {
      this.getCodePic().then((res) => {
        console.log(res)
      }).catch((err) => {
        this.$toast({ message: err, iconClass: 'mintui  mintui-field-warning' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background-color: $color-ff;
  .login-form {
    padding: 36px 32px 0 32px;
    margin-bottom: 110px;
    .login-field {
      font-size: 28px;
      color: $color-88;
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
        }
      }
      .button-no-click {
        background-color: $color-e5;
      }
    }
  }
}
</style>
