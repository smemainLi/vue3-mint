<template>
  <div class="mcard-balance">
    <mcb-amount :balanceMoneyContent="balanceMoneyContent" :cashableBalance="cashableBalance"></mcb-amount>
    <div class="mcard-investment"></div>
    <div class="mcard-balance-action">
      <action-item :actionItem="item" v-for="(item,index) in balanceActionList" @click.native="selectAction(item)" :key="'shop'+index"></action-item>
    </div>
    <mcb-income :mcbIncomeInfo="mcbIncomeInfo"></mcb-income>
  </div>
</template>

<script>
import mcbAmount from '../../components/mcard/mcbAmount.vue'
import actionItem from '../../components/mcard/actionItem.vue'
import mcbIncome from '../../components/mcard/mcbIncome.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      balanceMoneyContent: '', // 卡内余额
      cashableBalance: '', // 可提现余额
      balanceActionList: [
        {
          imgContent: require('../../assets/images/mcard/bill.png'),
          remarkContent: '账单明细',
          path: '/mcard/allBills',
          hasBr: true
        },
        {
          imgContent: require('../../assets/images/mcard/withdrawal.png'),
          remarkContent: '提现',
          path: '/mcard/cashWithdrawals',
          hasBr: false
        }
      ],
      mcbIncomeInfo: {}
    }
  },
  components: { mcbAmount, actionItem, mcbIncome },
  methods: {
    ...mapActions({ getMyWalletInfo: 'getMyWalletInfo' }),
    selectAction (actionRow) {
      console.log(actionRow)
      this.$router.push({ path: actionRow.path })
    },
    loadMyWalletInfo () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getMyWalletInfo().then((res) => {
        console.log(res)
        this.$indicator.close()
        if (res.status === 200) {
          this.balanceMoneyContent = res.data.balance
          this.cashableBalance = `可提现余额：￥${res.data.takeAbleBalance}`
          this.mcbIncomeInfo = {
            accumulatedIncomeNum: `￥${res.data.income}`,
            shareFriendsNum: `${res.data.friendsNumber}个`,
            saveForFriendsNum: `￥${res.data.economical}`
          }
        }
      }).catch((err) => {
        console.log(err)
        throw err
      })
    }
  },
  created () {
    this.loadMyWalletInfo()
  }
}
</script>

<style lang="scss" scoped>
.mcard-balance {
  .mcard-investment {
    height: 177px;
    background: url("../../assets/images/mcard/investmentBg.png") no-repeat
      center;
    background-size: 100% 177px;
    margin-top: 24px;
  }
  .mcard-balance-action {
    margin: 24px 0;
  }
}
</style>
