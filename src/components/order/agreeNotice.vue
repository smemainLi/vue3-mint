<template>
  <div class="agree-notice">
    <div class="notice-row">
      <div class="notice-icon" @click="agreeProtocol">
        <i class="icon-unselected" v-show="!agree"></i>
        <i class="icon-single-election" v-show="agree"></i>
      </div>
      <div class="notice-content" v-cloak>
        {{noticeConFront}}<router-link class="content-behind" :to="{path:flag==='login'?'/mcard/userProtocol':'/order/appointmentProtocol',query:{flag:flag}}" tag="span" v-cloak>{{protocolName}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      agree: true, // true表示同意  false表示不同意
      noticeConFront: '我已经阅读并同意'
      // noticeConBehind: '预约须知'
    }
  },
  props: ['protocolName', 'flag'],
  methods: {
    agreeProtocol () {
      this.agree = !this.agree
      /* 子组件向父组件传值 */
      this.$emit('isAgreePro', this.agree)// 第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
    }
  }
}
</script>

<style lang="scss" scoped>
.agree-notice {
  margin: 48px 0 114px 32px;
  .notice-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .notice-icon {
      font-size: 26px;
      margin-right: 12px;
      .icon-unselected {
        color: $color-88;
      }
      .icon-single-election {
        color: $color-1E8FA5;
      }
    }
    .notice-content {
      font-size: 26px;
      color: $color-88;
      .content-behind {
        color: $color-008CA7;
      }
    }
  }
}
</style>
