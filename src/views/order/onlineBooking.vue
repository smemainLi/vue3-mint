<template>
  <div class="online-booking">
    <online-basic-info></online-basic-info>
    <online-service-items></online-service-items>
    <online-description></online-description>
    <online-choose-patient></online-choose-patient>
    <general-button :isAgree="isAgree" :btnName="btnName" @click.native="makeAnAppointment"></general-button>
    <agree-notice @isAgreePro="isAgreeProtocol"></agree-notice>
  </div>
</template>

<script>
import onlineBasicInfo from '../../components/order/onlineBasicInfo.vue'
import onlineServiceItems from '../../components/order/onlineServiceItems.vue'
import onlineDescription from '../../components/order/onlineDescription.vue'
import onlineChoosePatient from '../../components/order/onlineChoosePatient.vue'
import generalButton from '../../components/common/generalButton.vue'
import agreeNotice from '../../components/order/agreeNotice.vue'

export default {
  data () {
    return {
      isAgree: true,
      btnName: '确定预约'
    }
  },
  components: {
    onlineBasicInfo, onlineServiceItems, onlineDescription, onlineChoosePatient, generalButton, agreeNotice
  },
  methods: {
    makeAnAppointment () {
      this.$router.push('/order/payment')
    },
    isAgreeProtocol (val) { // 回调方法，接收子组件传的参数
      this.isAgree = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
