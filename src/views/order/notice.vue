<template>
  <div class="notice">
    <div class="notice-message">
      <div class="content-title">
        <span class="title">- 预约须知 -</span>
      </div>
      <div class="notice-content" v-cloak>
        {{noticeContent}}
      </div>
    </div>
    <router-link :to="{path:'/order/onlineBooking'}">
      <bottom-button :btnName="btnName"></bottom-button>
    </router-link>
  </div>
</template>

<script>
import bottomButton from '../../components/common/bottomButton.vue'

export default {
  data () {
    return {
      btnName: '下一步',
      noticeContent: '医院，由于它是各种病患者集中出入检查治疗的场所。因此，医院的急救室、门诊室、病房往往是各种细菌病毒交叉传播的重污染场所，空气污染状况要比其它公共场合更加严重！主要有： 1. 各种流行性脑脊髓膜炎、流行性感冒、麻疹、百日咳、白喉、肺结核、肺炭疽病非典型肺炎、军团病、肺鼠疫、支原体肺炎等等靠空气传播的细菌和病毒。2. 病人口腔和身上以及伤口释放出的各类细菌和异味。病人因知觉丧失或不便所排泄物、呕吐物的气味。3. 医院消毒液，如福尔马林（甲醛）、氯化消毒剂等各种药品的挥发性有机物气体所造成的空气污染对医务人员和患者都是最大的危害。4. 病房内的污浊气体和空调孔凤管道内寄生的细菌是其它场合的10倍以上。'
    }
  },
  components: {
    bottomButton
  }
}
</script>

<style lang="scss" scoped>
.notice {
  background-color: $color-ff;
  .notice-message {
    padding: 56px 32px 46px;
    font-size: 32px;
    color: $color-35;
    .content-title {
      text-align: center;
    }
    .notice-content {
      margin-top: 22px;
    }
  }
}
</style>
