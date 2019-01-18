<template>
  <div>
    同道商城
    <button @click="testLogin">测试测试</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {

    }
  },
  methods: {
    ...mapActions(['testApi']),
    testLogin () {
      this.testApi({ mobile: '13526262352', smsCode: '339936' }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
        this.$toast({ message: '登录失败' })
      })
      // this.$axios.post('/wx/login', { mobile: '13526262352', smsCode: '339936' }).then((res) => {
      //   console.log(res)
      // }).catch((err) => {
      //   console.log(err)
      //   this.$toast({ message: '登录失败' })
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
