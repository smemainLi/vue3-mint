<template>
  <div class="recharge-tips">
    <div class="tips-row-o">
      <span class="title-common-style" v-cloak>{{chargeTitle}}</span><span class="content-common-style" v-cloak>{{finalCharge?finalCharge:primaryCharge}}</span>
      <span class="title-common-style" v-cloak>{{sendTitle}}</span><span class="content-common-style" v-cloak>{{finalSend?finalSend:primarySend}}</span>
    </div>
    <div class="tips-row-t">
      <span class="title-common-style" v-cloak>{{finallyTitle}}</span><span class="content-common-style" v-cloak>{{finalFinally?finalFinally:primaryFinally}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      chargeTitle: '您的充值金额是：',
      primaryCharge: '￥0', // 初始值
      finalCharge: '', // 最终值

      sendTitle: '，赠送金额：',
      primarySend: '￥0', // 初始值
      finalSend: '', // 最终值

      finallyTitle: '最后获得：',
      primaryFinally: '￥0', // 初始值
      finalFinally: ''// 最终值

    }
  },
  computed: {
    ...mapState({
      rechargeInfo: state => state.mcard.rechargeInfo, // 获取充值信息
      chargeContent: state => state.mcard.rechargeInfo.chargeInfo, // 获取充值金额
      sendContent: state => state.mcard.rechargeInfo.getInfo // 获取赠送金额
    })
  },
  methods: {
  },
  watch: {
    chargeContent: function (newVal) {
      this.finalFinally = `￥${parseInt(this.chargeContent.replace(/[^0-9]/ig, '')) + parseInt(this.sendContent.replace(/[^0-9]/ig, ''))}`
      this.finalCharge = `￥${this.chargeContent.replace(/[^0-9]/ig, '')}`
      this.finalSend = `￥${this.sendContent.replace(/[^0-9]/ig, '')}`
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge-tips {
  margin-top: 24px;
  padding: 26px 32px;
  background-color: $color-ff;
  .tips-row-o,
  .tips-row-t {
    font-size: 28px;
    .title-common-style {
      color: $color-35;
    }
    .content-common-style {
      color: $color-008CA7;
    }
  }
  .tips-row-t {
    margin-top: 10px;
  }
}
</style>
