<template>
  <div class="pay-password">
    <div class="pay-tip">
      <div class="member-tip" v-cloak>
        {{tipsSelect()}}
        <!-- :$route.query.pageFlag?validateIdentity -->
      </div>
      <!-- 密码输入框 -->
      <van-password-input :value="password" @focus="showKeyboard=true" />
      <div class="forget-tip" v-show="forgetTipShow()" @click="$router.push({path:'/mcard/forgetPayPwd',query:{pageFlag:'forgetPayPwd'}})" v-cloak>{{forgetTip}}</div>
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
    ...mapActions({ openPayPassword: 'openPayPassword', verifyPassword: 'verifyPassword', validatePayPassword: 'validatePayPassword', updatePayPassword: 'updatePayPassword', forgetPayPassword: 'forgetPayPassword', withdraw: 'withdraw' }),
    onInput (key) {
      // 截取字符串'this.password+key'从下标0到6不包含下标为6的一串字符串
      this.password = (this.password + key).slice(0, 6)

      if (this.password.length !== 6) return
      /* ##########################如果参数存在参数payType，表示本页为支付页面或修改绑定手机需要支付密码验证身份或体现支付页面########################## */
      if (this.$route.query.payType || this.$route.query.withdrawAmount || this.$route.query.pageFlag === 'updateBindPhone') {
        if (this.$route.query.payType) { // 预约支付
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.verifyPassword({ payId: localStorage.getItem('payId'), payPassword: this.password }).then((res) => {
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 500 })
            if (res.status !== 200) {
              this.password = ''
              return
            }
            setTimeout(() => {
              if (this.$route.query.payType && this.$route.query.orderType === 'mallOrder') this.$router.replace({ path: '/mall/paymentSuccess' })
              else if (this.$route.query.payType && this.$route.query.orderType === 'upgradeOrder') this.$router.replace({ path: '/mcard/upgradeSuccess' })
              else if (this.$route.query.payType) this.$router.replace({ path: '/order/orderSuccess' })
            }, 1000)
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        } else if (this.$route.query.pageFlag === 'updateBindPhone') {
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.validatePayPassword({ payPassword: this.password }).then((res) => { /* 验证支付密码 */
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 500 })
            if (res.status === 200) {
              setTimeout(() => {
                this.password = ''
                this.$router.push({ path: '/mcard/updateBindPhone', query: { pageFlag: 'updateBindPhone' } })
              }, 1000)
            } else {
              this.password = ''
            }
          }).catch(() => { })
        } else if (this.$route.query.withdrawAmount) { // 提现支付
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.withdraw({ payPassword: this.password, withdrawAmount: Number(this.$route.query.withdrawAmount) }).then((res) => {
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 500 })
            if (res.status === 200) {
              setTimeout(() => {
                this.$router.push({ path: '/mcard/withdrawalsSuccess', query: { bankName: res.data.bankName, cardNumber: res.data.cardNumber, withdrawAmount: res.data.withdrawAmount } })
              }, 1000)
            } else this.password = ''
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        }
      } else if (this.$route.query.isSetPayPassword) { /* ##########################如果参数存在参数isSetPayPassword且为1，表示本页为设置支付密码页面########################## */
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
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.openPayPassword({ payPassword: this.password }).then((res) => {
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 500 })
            if (res.status === 200) {
              setTimeout(() => {
                /* ****************************************************看需求----跳转充值界面 */
                if (this.$route.query.openFlag === 'mallOrder') {
                  this.$router.replace({ path: '/mcard/recharge', query: { openFlag: this.$route.query.openFlag, balanceMoneyContent: this.$route.query.balanceMoneyContent } })/* 跳转充值页面并携带标志openFlag，充值完跳转到payment页面 */
                } else if (this.$route.query.openFlag === 'upgradeOrder') {
                  this.$router.replace({ path: '/mcard/recharge', query: { openFlag: this.$route.query.openFlag, balanceMoneyContent: this.$route.query.balanceMoneyContent } })/* 跳转充值页面并携带标志openFlag，充值完跳转到payment页面 */
                } else if (this.$route.query.openFlag === 'orderPay') {
                  this.$router.replace({ path: '/mcard/recharge', query: { openFlag: this.$route.query.openFlag, balanceMoneyContent: this.$route.query.balanceMoneyContent } })/* 跳转充值页面并携带标志openFlag，充值完跳转到payment页面 */
                } else if (this.$route.query.openFlag === 'walletPay') {
                  this.$router.replace({ path: '/mcard/recharge', query: { openFlag: this.$route.query.openFlag, balanceMoneyContent: this.$route.query.balanceMoneyContent } })/* 跳转充值页面并携带标志openFlag，充值完跳转到payment页面 */
                } else if (this.$route.query.openFlag === 'mcardPay') {
                  this.$router.replace({ path: '/mcard/index' })
                }
                // if (this.$route.query.openFlag === 'orderPay') this.$router.push({ path: '/mcard/recharge', query: { openFlag: this.$route.query.openFlag, balanceMoneyContent: this.$route.query.balanceMoneyContent } })/* 跳转充值页面并携带标志openFlag，充值完跳转到payment页面 */
                // if (this.$route.query.openFlag === 'mcardPay')
              }, 1000)
            }
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        }
      } else if (this.$route.query.updateFlag) { /* ##########################如果参数存在参数updateFlag且为isUpdate，表示本页为修改支付密码页面########################## */
        if (this.updateNum === 1) {
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.validatePayPassword({ payPassword: this.password }).then((res) => {
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 500 })
            if (res.status === 200) {
              this.updateNum = 2// 修改状态
              this.oldPassword = this.password
            }
            this.password = ''
          }).catch(() => { })
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
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.updatePayPassword({ newPayPassword: this.password, payPassword: this.oldPassword }).then((res) => {
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 500 })
            if (res.status === 200) {
              setTimeout(() => {
                this.$router.go(-1)
              }, 1000)
            } else {
              setTimeout(() => {
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
          this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
          this.forgetPayPassword({ payPassword: this.password, token: localStorage.getItem('token') }).then((res) => {
            this.$indicator.close()
            this.$toast({ message: res.message, duration: 500 })
            if (res.status !== 200) {
              setTimeout(() => {
                this.password = ''
                this.$router.go(-1)
              }, 1000)
              return
            }
            setTimeout(() => {
              this.password = ''
              this.$router.go(-2)
            }, 1000)
          }).catch((err) => {
            this.$toast('数据错误')
            throw err
          })
        }
      }
    },
    onDelete () {
      // 截取字符串'this.password'从下标0到this.password字符串总长减去1不包含下标为this.password字符串总长减去1的一串字符串
      this.password = this.password.slice(0, this.password.length - 1)
    },
    /* 密码数据框上的提示语 */
    tipsSelect () {
      const queryParams = this.$route.query
      if (queryParams.pageFlag) {
        return this.validateIdentity
      }
      if (queryParams.isSetPayPassword) {
        if (this.setNum === 1) {
          return this.setPayPassword
        }
        if (this.setNum === 2) {
          return this.againSetPassword
        }
      }
      if (queryParams.updateFlag && this.updateNum === 1) {
        return this.setOriginalPassword
      }
      if ((queryParams.updateFlag && this.updateNum === 2) || (queryParams.forgetPayPwdFlag && this.forgetNum === 1)) {
        return this.setNewPassword
      }
      if ((queryParams.updateFlag && this.updateNum === 3) || (queryParams.forgetPayPwdFlag && this.forgetNum === 2)) {
        return this.confirmNewPassword
      }
      return this.memberTip
    },
    /* ‘忘记密码’提示控制显示 */
    forgetTipShow () {
      if (this.$route.query.isSetPayPassword === 1) {
        return false
      }
      if (this.$route.query.updateFlag === 'isUpdate' ||
        this.$route.query.pageFlag === 'updateBindPhone' ||
        this.$route.query.openFlag === 'mcardPay' ||
        this.$route.query.forgetPayPwdFlag === 'forgetPayPwd') {
        return false
      }
      return true
    },
    selectTitle () {
      if (this.$route.query.withdrawAmount) document.title = '提现'
      else if (this.$route.query.pageFlag === 'updateBindPhone') document.title = '修改绑定手机'
      else if (this.$route.query.updateFlag === 'isUpdate') document.title = '修改支付密码'
      else if (this.$route.query.forgetPayPwdFlag === 'forgetPayPwd') document.title = '忘记支付密码'
      else if (this.$route.query.openFlag === 'mcardPay') document.title = '开通钱包'
      else document.title = '支付'
    }
  },
  created () {
    this.selectTitle()
  },
  updated () {
    this.selectTitle()
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
