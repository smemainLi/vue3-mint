<template>
  <div class="dialog-box">
    <div class="bg-mask"></div>
    <div class="box-display">
      <div class="box-content">
        <div class="box-title" v-cloak>{{title}}</div>
        <div class="box-message" v-cloak>{{messageShow()}}</div>
        <div class="box-buttons">
          <button class="com-button btn-cancel" @click="cancel" v-cloak>{{btnCancel}}</button>
          <button class="com-button btn-confirm" @click="confirm" v-cloak>{{btnConfirm}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '取消预约',
      message_c: '当天取消则不退款，请谨慎操作。确定取消吗？',
      message_o: '取消后，挂号费将退至会员钱包',
      message_t: '确定取消该预约吗？',
      btnCancel: '取消',
      btnConfirm: '确定'
    }
  },
  props: ['subitemStatus', 'isIntraday', 'registeredFee'], // isIntraday 是否是当天的预约  false 非当天 true 当天
  methods: {
    cancel () {
      this.$emit('getDialogStatusCancel', false)
    },
    confirm () {
      this.$emit('getDialogStatusConfirm', false)
      this.subitemStatus === '待支付' ? this.$router.push({ path: '/arecord/appointmentDetails', query: { cancelFlag: 'isToBePaid' } }) : this.$router.push({ path: '/arecord/appointmentDetails' })
      /* this.$router.push({ path: '/arecord/appointmentDetails', query: { redirect: '/arecord/appointmentDetails' } }) */
    },
    messageShow () {
      if (this.subitemStatus !== '已预约' || this.registeredFee === 0) return this.message_t
      else if (this.isIntraday) return this.message_c
      else return this.message_o
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-box {
  .bg-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  .box-display {
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    .box-content {
      width: 686px;
      height: 406px;
      background-color: $color-ff;
      color: $color-35;
      text-align: center;
      .box-title {
        font-size: 36px;
        margin: 62px 0 42px 0;
      }
      .box-message {
        font-size: 28px;
      }
      .box-buttons {
        padding: 0 32px;
        display: flex;
        justify-content: space-between;
        margin-top: 88px;
        .com-button {
          width: 293px;
          height: 88px;
          border-radius: 8px;
          font-size: 36px;
        }
        .btn-cancel {
          border: 1px solid $color-008CA7;
          background-color: $color-ff;
          color: $color-008CA7;
        }
        .btn-confirm {
          background: $color-gradient;
          color: $color-ff;
        }
      }
    }
  }
}
</style>
