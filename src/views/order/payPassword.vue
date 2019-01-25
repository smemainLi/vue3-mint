<template>
  <div class="pay-password">
    <div class="pay-tip">
      <div class="member-tip" v-cloak>{{memberTip}}</div>
      <!-- 密码输入框 -->
      <van-password-input :value="password" @focus="showKeyboard=true" />
      <div class="forget-tip" v-cloak>{{forgetTip}}</div>
    </div>
    <!-- 数字键盘 -->
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard=false" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
    ...mapActions({ appointmentPay: 'appointmentPay' }),
    onInput (key) {
      // 截取字符串'this.password+key'从下标0到6不包含下标为6的一串字符串
      this.password = (this.password + key).slice(0, 6)
      if (this.password.length === 6) {
        console.log(this.$route.query.payType)
        console.log(JSON.parse(localStorage.getItem('bookingData')))// 反序列化，JSON.parse()将JSON字符串转成JSON对象
        let data = JSON.parse(localStorage.getItem('bookingData'))
        data.payPass = this.password// 给对象添加新属性
        console.log(data)
        this.appointmentPay(data).then((res) => {
          console.log(res)
          if (res.data.registerId) {
            /* 模拟成功跳转预约详情页面 */
            this.$router.push({ path: '/order/orderSuccess', query: { registerId: res.data.registerId } })
          }
        }).catch((err) => {
          this.$toast('数据错误')
          throw new Error(err)
        })
      }
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
    padding: 40% 32px 0 32px;
    text-align: center;
    position: static;
    .member-tip {
      color: $color-1E8FA5;
      font-size: 34px;
      margin-bottom: 43px;
    }
    .forget-tip {
      color: $color-88;
      font-size: 24px;
      margin-top: 46px;
    }
    /deep/ .van-password-input__security i {
      background-color: $color-008CA7;
    }
  }
}
</style>
