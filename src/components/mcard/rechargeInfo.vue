<template>
  <div class="recharge-info">
    <div class="recharge-title" v-cloak>{{rechargeTitle}}</div>
    <div class="recharge-list" v-for="(listItem,index) in rechargeList" :key="'listItem'+index">
      <recharge-item :rechargeItem="rechargeItem" v-for="(rechargeItem,index) in listItem" @click.native="selectRecharge(rechargeItem)" :key="'rechargeItem'+index"></recharge-item>
    </div>
  </div>
</template>

<script>
import rechargeItem from './rechargeItem.vue'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      rechargeTitle: '充值'
    }
  },
  props: ['rechargeList'],
  components: { rechargeItem },
  methods: {
    ...mapMutations({ setRechargeInfo: 'setRechargeInfo' }),
    // 充值项目只能选中其中一项
    selectRecharge (rechargeItem) {
      console.log(rechargeItem)
      this.setRechargeInfo(rechargeItem)// 存储到state中
      this.rechargeList.forEach((listItem) => {
        listItem.forEach((item) => {
          item.rechargeSelected = false
        })
      })
      rechargeItem.rechargeSelected = true
      console.log(rechargeItem.rechargeId)
      this.$emit('getRechargeMess', { rechargeId: rechargeItem.rechargeId, chargeInfo: rechargeItem.chargeInfo })
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge-info {
  padding: 0 32px 50px;
  background-color: $color-ff;
  .recharge-title {
    font-size: 26px;
    color: $color-88;
    padding: 28px 0;
  }
  .recharge-list {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
