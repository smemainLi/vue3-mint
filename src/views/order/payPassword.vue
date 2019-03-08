<template>
  <div class="pay-password">
    <div class="pay-tip">
      <div class="member-tip" v-cloak>
        {{$route.query.isSetPayPassword&&setNum===1?setPayPassword
        :$route.query.isSetPayPassword&&setNum===2?againSetPassword
        :$route.query.updateFlag&&updateNum===1?setOriginalPassword
        :($route.query.updateFlag&&updateNum===2)||($route.query.forgetPayPwdFlag&&forgetNum===1)?setNewPassword
        :($route.query.updateFlag&&updateNum===3)||($route.query.forgetPayPwdFlag&&forgetNum===2)?confirmNewPassword
        :memberTip}}
        <!-- :$route.query.pageFlag?validateIdentity -->
      </div>
      <!-- 密码输入框 -->
      <van-password-input :value="password" @focus="showKeyboard=true" />
      <div class="forget-tip" v-show="!$route.query.isSetPayPassword&&!$route.query.updateFlag&&!$route.query.forgetPayPwdFlag" @click="$router.push({path:'/mcard/forgetPayPwd',query:{pageFlag:'forgetPayPwd'}})" v-cloak>{{forgetTip}}</div>
      <!-- <div class="forget-tip" v-show="!$route.query.isSetPayPassword&&!$route.query.updateFlag&&!$route.query.forgetPayPwdFlag&&!$route.query.pageFlag" @click="$router.push({path:'/mcard/forgetPayPwd',query:{pageFlag:'forgetPayPwd'}})" v-cloak>{{forgetTip}}</div> -->
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

      setPayPassword: '请设置支付密码开通钱包',
      againSetPassword: '请再次输入支付密码',

      setOriginalPassword: '请输入原支付密码',
      setNewPassword: '请输入新支付密码',
      confirmNewPassword: '请再次输入新支付密码',

      validateIdentity: '请输入支付密码验证身份',

      forgetTip: '忘记密码？',
      password: '',
      showKeyboard: true,
      setNum: 1, // 设置密码次数 1：首次设置支付密码 2：再次输入支付密码
      oldPassword: '', // 存储旧密码
      saveCurrPassword: '', // 存储开通钱包输入的密码，以便再次输入时候进行比较
      updateNum: 1, // 修改密码 1：输入原支付密码 2：输入新支付密码 3：再次输入新支付密码
      forgetNum: 1// 忘记密码 1：输入新支付密码 2：再次输入新支付密码
    }
  },
  methods: {
    ...mapActions({ openPayPassword: 'openPayPassword', verifyPassword: 'verifyPassword', updatePayPassword: 'updatePayPassword', forgetPayPassword: 'forgetPayPassword' }),
    onInput (key) {
      // 截取字符串'this.password+key'从下标0到6不包含下标为6的一串字符串
      this.password = (this.password + key).slice(0, 6)

      if (this.password.length === 6) {
        console.log(this.$route.query)
        if (this.$route.query.payType /* || this.$route.query.pageFlag */) { /* ##########################如果参数存在参数payType，表示本页为支付页面或修改绑定手机需要支付密码验证身份########################## */
          console.log(this.$route.query.payType)
          console.log(this.$route.query.pageFlag)
          this.verifyPassword({ payId: localStorage.getItem('payId'), payPassword: this.password }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.$toast({ message: res.message, duration: 1000 })
              setTimeout(() => {
                if (this.$route.query.payType) this.$router.push({ path: '/order/orderSuccess' })
                /* else this.$router.push({ path: '/mcard/updateBindPhone', query: { pageFlag: 'updateBindPhone' } }) */
              }, 1000)
            } else {
              this.$toast({ message: '密码错误', duration: 1000 })
              this.password = ''
            }
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        } else if (this.$route.query.isSetPayPassword) { /* ##########################如果参数存在参数isSetPayPassword且为1，表示本页为设置支付密码页面########################## */
          console.log(typeof this.$route.query.isSetPayPassword)

          if (this.setNum === 1) {
            this.setNum = 2// 修改状态
            this.saveCurrPassword = this.password// 存储开通钱包输入的密码，以便再次输入时候进行比较
            this.password = ''// 重置密码输入框
          } else {
            if (this.password !== this.saveCurrPassword) {
              this.$toast('两次输入密码不一致！')
              this.password = ''
              return
            }
            this.openPayPassword({ payPassword: this.password }).then((res) => {
              console.log(res)
              if (res.status === 200) {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  /* ****************************************************看需求----跳转充值界面 */
                  if (this.$route.query.openFlag === 'orderPay') this.$router.push({ path: '/mcard/recharge', query: { openFlag: this.$route.query.openFlag, balanceMoneyContent: this.$route.query.balanceMoneyContent } })/* 跳转充值页面并携带标志openFlag，充值完跳转到payment页面 */
                  if (this.$route.query.openFlag === 'mcardPay') this.$router.push({ path: '/mcard/index' })
                }, 1000)
              }
            }).catch((err) => {
              this.$toast('数据错误')
              throw err
            })
          }
        } else if (this.$route.query.updateFlag) { /* ##########################如果参数存在参数updateFlag且为isUpdate，表示本页为修改支付密码页面########################## */
          if (this.updateNum === 1) {
            this.updateNum = 2// 修改状态
            this.oldPassword = this.password
            console.log(this.oldPassword, 'oldPassword')
            this.password = ''
          } else if (this.updateNum === 2) {
            this.updateNum = 3// 修改状态
            this.saveCurrPassword = this.password
            this.password = ''
          } else {
            if (this.password !== this.saveCurrPassword) {
              this.$toast('两次输入密码不一致！')
              this.password = ''
              return
            }
            console.log(this.password)
            this.updatePayPassword({ newPayPassword: this.password, payPassword: this.oldPassword }).then((res) => {
              console.log(res)
              if (res.status === 200) {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  this.$router.go(-1)
                }, 1000)
              } else {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  // this.$router.go(0)
                  this.updateNum = 1
                  this.password = ''
                }, 1000)
              }
            }).catch((err) => {
              this.$toast('数据错误')
              throw err
            })
          }
        } else if (this.$route.query.forgetPayPwdFlag) { /* ##########################如果参数存在参数forgetPayPwdFlag且为forgetPayPwd，表示本页为忘记支付密码页面########################## */
          if (this.forgetNum === 1) {
            this.forgetNum = 2
            this.saveCurrPassword = this.password// 存储忘记支付密码输入的密码，以便再次输入时候进行比较
            this.password = ''
          } else {
            if (this.password !== this.saveCurrPassword) {
              this.$toast('两次输入密码不一致！')
              this.password = ''
              return
            }
            this.forgetPayPassword({ payPassword: this.password, token: localStorage.getItem('token') }).then((res) => {
              console.log(res)
              if (res.status === 200) {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  this.password = ''
                  this.$router.go(-2)
                }, 1000)
              }
            }).catch((err) => {
              this.$toast('数据错误')
              throw err
            })
          }
        }
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
