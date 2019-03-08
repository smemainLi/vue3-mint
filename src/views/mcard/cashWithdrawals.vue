<template>
  <div class="cash-withdrawals">
    <div class="withdrawals-top"></div>
    <div class="withdraw-tips" v-cloak>{{withdrawTips}}</div>
    <amount-input :tipsContent="takeAbleBalance" @getAmountMoney="getAmountMoneyVal"></amount-input>
    <div class="bank-card-action">
      <action-item :actionItem="bankCardAction" @click.native="bankCardInfo(bankCardAction)"></action-item>
    </div>
    <div class="withdrawals-btn">
      <general-button :isAgree="isAgree" :btnName="btnName" @click.native="confirmWithdrawals"></general-button>
    </div>
  </div>
</template>

<script>
import amountInput from '../../components/mcard/amountInput.vue'
import actionItem from '../../components/mcard/actionItem.vue'
import generalButton from '../../components/common/generalButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      withdrawTips: '提现需要1-3天，请耐心等待',
      bankCardAction: { remarkContent: '提现至', arrowInfo: '去添加银行卡', flag: 'bank', path: '/mcard/myBankCard', hasBr: false },
      takeAbleBalance: '',
      isBinding: 'noCard', // 是否绑定银行卡  'noCard' 未绑定 'hasCard' 已绑定
      isAgree: false,
      bankName: '', // 银行名称
      bankNumVal: '', // 银行卡号
      cardholderVal: '', // 持卡人
      minAmount: '', // 最小可提现金额
      btnName: '确定提现'
    }
  },
  components: { amountInput, actionItem, generalButton },
  methods: {
    ...mapActions({ getCashWithdrawal: 'getCashWithdrawal', withdraw: 'withdraw' }),
    bankCardInfo (actionRow) {
      console.log(actionRow)
      this.$router.push({ path: actionRow.path, query: { isBinding: this.isBinding, bankName: this.bankName, bankNumVal: this.bankNumVal, cardholderVal: this.cardholderVal } })
    },
    /* 提现金额 */
    async confirmWithdrawals () {
      await this.withdraw().then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
      // this.$router.push({ path: '/mcard/withdrawalsSuccess' })
    },
    getAmountMoneyVal (amountMoney) { // 获取输入金额
      // console.log(amountMoney)
      if (amountMoney && this.isBinding && amountMoney >= this.minAmount) this.isAgree = true
      else this.isAgree = false
    }
  },
  created () {
    this.getCashWithdrawal().then((res) => {
      console.log(res)
      if (res.status === 200) {
        /* 已经绑定银行卡，显示银行卡号后四位 */
        if (res.data.backStatus) this.bankCardAction = { remarkContent: '提现至', arrowInfo: `${res.data.bankName} ${res.data.cardNumber.slice(-4)}`, flag: 'bank', path: '/mcard/myBankCard', hasBr: false }
        /* 未绑定银行卡 */
        else this.bankCardAction = { remarkContent: '提现至', arrowInfo: '去添加银行卡', flag: 'bank', path: '/mcard/myBankCard', hasBr: false }
        this.takeAbleBalance = `￥${res.data.takeAbleBalance}`
        this.bankName = res.data.bankName
        this.isBinding = res.data.backStatus ? 'hasCard' : 'noCard'
        this.bankNumVal = res.data.cardNumber
        this.cardholderVal = res.data.cardholder
        this.minAmount = res.data.minWithdrawAmount
      }
    }).catch((err) => {
      this.$toast('数据错误')
      throw err
    })
  }
}
</script>

<style lang="scss" scoped>
.cash-withdrawals {
  width: 100%;
  .withdrawals-top {
    height: 375px;
    background: url("../../assets/images/mcard/cashWithdrawalsBg.png") no-repeat
      center;
    background-size: 100% 375px;
    margin-bottom: 24px;
  }
  .withdraw-tips {
    padding: 8px 0 8px 32px;
    font-size: 24px;
    color: $color-048FAA;
    background-color: $color-C9F6FF;
  }
  .bank-card-action {
    margin-top: 24px;
  }
  .withdrawals-btn {
    margin-top: 140px;
  }
}
</style>
