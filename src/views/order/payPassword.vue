<template>
  <div class="pay-password">
    <div class="pay-tip">
      <div class="member-tip" v-cloak>
        {{$route.query.isSetPayPassword&&setNum===1?setPayPassword
        :$route.query.isSetPayPassword&&setNum===2?againSetPassword
        :$route.query.updateFlag&&updateNum===1?setOriginalPassword
        :$route.query.updateFlag&&updateNum===2?setNewPassword
        :$route.query.updateFlag&&updateNum===2?confirmNewPassword
        :memberTip}}
      </div>
      <!-- 密码输入框 -->
      <van-password-input :value="password" @focus="showKeyboard=true" />
      <div class="forget-tip" v-show="!$route.query.isSetPayPassword&&!$route.query.updateFlag" v-cloak>{{forgetTip}}</div>
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

      forgetTip: '忘记密码？',
      password: '',
      showKeyboard: true,
      setNum: 1, // 设置密码次数 1：首次设置支付密码 2：再次输入支付密码
      saveCurrPassword: '', // 存储开通钱包输入的密码，以便再次输入时候进行比较
      updateNum: 1 // 修改密码 1：输入原支付密码 2：输入新支付密码 3：再次输入新支付密码
    }
  },
  methods: {
    ...mapActions({ updatePayPassword: 'updatePayPassword', verifyPassword: 'verifyPassword', backEndSaveStatus: 'backEndSaveStatus' }),
    onInput (key) {
      // 截取字符串'this.password+key'从下标0到6不包含下标为6的一串字符串
      this.password = (this.password + key).slice(0, 6)

      if (this.password.length === 6) {
        console.log(this.$route.query)
        if (this.$route.query.payType) { // 如果参数存在参数payType，表示本页为支付页面
          console.log(this.$route.query.payType)
          // console.log(JSON.parse(localStorage.getItem('bookingData')))// 反序列化，JSON.parse()将JSON字符串转成JSON对象
          // let data = JSON.parse(localStorage.getItem('bookingData'))
          // data.payPass = this.password// 给对象添加新属性
          // console.log(data)
          // this.appointmentPay(data).then((res) => {
          //   console.log(res)
          //   if (res.data.registerId) {
          //     /* 模拟成功跳转预约详情页面 */
          //     this.$router.push({ path: '/order/orderSuccess', query: { registerId: res.data.registerId } })
          //   }
          // }).catch((err) => {
          //   this.$toast('数据错误')
          //   throw new Error(err)
          // })
          this.verifyPassword({ number: this.password }).then((res) => {
            console.log(res)
            if (res.status === 200) {
              this.backEndSaveStatus({ payType: this.$route.query.payType, registerId: localStorage.getItem('registerId') }).then((res) => {
                console.log(res)
                if (res.status === 200) {
                  this.$toast({ message: res.message, duration: 1000 })
                  setTimeout(() => {
                    this.$router.push({ path: '/order/orderSuccess' })
                  }, 1000)
                }
              }).catch((err) => {
                this.$toast('数据错误')
                throw new Error(err)
              })
            } else {
              this.$toast({ message: '密码错误', duration: 1000 })
              this.password = ''
            }
          }).catch((err) => {
            this.$toast('数据错误')
            throw new Error(err)
          })
        } else if (this.$route.query.isSetPayPassword) { // 如果参数存在参数isSetPayPassword且为1，表示本页为设置支付密码页面
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
            this.updatePayPassword({ payPass: this.password }).then((res) => {
              console.log(res)
              if (res.status === 200) {
                this.$toast({ message: '密码设置成功', duration: 1000 })
                setTimeout(() => {
                  this.$router.push({ path: '/order/payment' })
                }, 1000)
              }
            }).catch((err) => {
              this.$toast('数据错误')
              throw new Error(err)
            })
          }
        } else if (this.$route.query.updateFlag) { // 如果参数存在参数updateFlag且为isUpdate，表示本页为修改支付密码页面
          if (this.updateNum === 1) {
            this.verifyPassword({ number: this.password }).then((res) => {
              console.log(res)
              if (res.status === 200) this.updateNum = 2// 修改状态
              else this.$toast({ message: '密码错误', duration: 1000 })
              this.password = ''
            }).catch((err) => {
              this.$toast('数据错误')
              throw new Error(err)
            })
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
            this.updatePayPassword({ payPass: this.password }).then((res) => {
              console.log(res)
              console.log(typeof res.status)
              if (res.status === 200) {
                this.$toast({ message: res.message, duration: 1000 })
                setTimeout(() => {
                  this.$router.push({ path: '/mcard/index' })
                }, 1000)
              }
            }).catch((err) => {
              this.$toast('数据错误')
              throw new Error(err)
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
