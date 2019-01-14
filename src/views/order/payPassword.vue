<template>
  <div class="pay-password">
    <div class="pay-tip">
      <div class="tip-content">
        <div class="member-tip" v-cloak>{{memberTip}}</div>
        <div class="forget-tip" v-cloak>{{forgetTip}}</div>
      </div>
      <!-- 密码输入框 -->
      <van-password-input :value="password" info="密码为 6 位数字" @focus="showKeyboard=true" />
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard=false" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      memberTip: '请输入会员卡支付密码',
      forgetTip: '忘记密码？',
      password: '',
      showKeyboard: true
    }
  },
  methods: {
    onInput (key) {
      // 截取字符串'this.password+key'从下标0到6不包含下标为6的一串字符串
      this.password = (this.password + key).slice(0, 6)
      if (this.password.length === 6) this.$router.push({ path: '/order/orderSuccess' })
    },
    onDelete () {
      // 截取字符串'this.password'从下标0到this.password字符串总长减去1不包含下标为this.password字符串总长减去1的一串字符串
      this.password = this.password.slice(0, this.password.length - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-password {
  .pay-tip {
    padding: 0 32px;
    .tip-content {
      display: flex;
      justify-content: center;
      font-size: 24px;
      padding: 20px 0;
      .member-tip {
        color: $color-1E8FA5;
      }
      .forget-tip {
        position: absolute;
        right: 32px;
        color: $color-88;
      }
    }
    /deep/ .van-password-input__security i {
      background-color: $color-008CA7;
    }
  }
}
</style>
