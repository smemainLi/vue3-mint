<template>
  <div class="cash-withdrawals">
    <div class="withdrawals-top" @click="checkAdvertisement" v-if="withdrawalsImg">
      <img class="withdrawals-img" :src="withdrawalsImg" alt="">
    </div>
    <div class="withdraw-tips" v-cloak>{{withdrawTips}}</div>
    <amount-input :tipsTitle="inputTitle" :tipsContent="inputContent" :moneyPlaceholder="moneyPlaceholder" @getAmountMoney="getAmountMoneyVal"></amount-input>
    <div class="bank-card-action">
      <action-item :actionItem="bankCardAction" @click.native="bankCardInfo(bankCardAction)"></action-item>
    </div>
    <div class="withdrawals-btn">
      <general-button :btnName="btnName" @click.native="confirmWithdrawals"></general-button>
    </div>
  </div>
</template>

<script>
import amountInput from '../../components/mcard/amountInput.vue'
import actionItem from '../../components/mcard/actionItem.vue'
import generalButton from '../../components/common/generalButton.vue'
import { typeJump } from '../../utils/tools'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      withdrawalsImg: '',
      withdrawTips: '提现需要1-3天，请耐心等待',
      bankCardAction: { remarkContent: '提现至', arrowInfo: '去添加银行卡', flag: 'bank', path: '/mcard/myBankCard', hasBr: false },
      takeAbleBalance: '', // 可提现金额
      isBinding: 'noCard', // 是否绑定银行卡  'noCard' 未绑定 'hasCard' 已绑定
      isAgree: false,
      bankName: '', // 银行名称
      bankNumVal: '', // 银行卡号
      cardholderVal: '', // 持卡人
      minAmount: '', // 最小可提现金额
      withdrawAmount: '', // 输入的提现金额
      btnName: '确定提现',
      inputTitle: '',
      inputContent: '', // 可提现金额或者最小可提现金额
      moneyPlaceholder: '', // 输入框提示语
      advertisementInfo: {}
    }
  },
  components: { amountInput, actionItem, generalButton },
  methods: {
    ...mapActions({ getCashWithdrawal: 'getCashWithdrawal', getAdvertisement: 'getAdvertisement' }),
    bankCardInfo (actionRow) {
      this.$router.push({ path: actionRow.path, query: { isBinding: this.isBinding, bankName: this.bankName, bankNumVal: this.bankNumVal, cardholderVal: this.cardholderVal } })
    },
    /* 提现金额 */
    confirmWithdrawals () {
      if (this.isBinding === 'noCard') this.$toast('请先添加银行卡')
      else if (Number(this.withdrawAmount) === 0 || Number(this.withdrawAmount) < this.minAmount || Number(this.withdrawAmount) > this.takeAbleBalance) {
        this.$toast('请填写正确金额')
      } else this.$router.push({ path: '/order/payPassword', query: { withdrawAmount: this.withdrawAmount } })
    },
    /* 获取输入金额 */
    getAmountMoneyVal (amountMoney) {
      this.withdrawAmount = amountMoney
    },
    /* 获取提现广告图片 */
    async loadAdvertisement () {
      const result = await this.getAdvertisement({ code: 'withdraw' })
      if (result.status !== 200) return
      if (!result.data.list.length) return
      this.withdrawalsImg = result.data.list[0].image
      this.advertisementInfo = {
        type: result.data.list[0].type,
        targetId: result.data.list[0].targetId,
        url: result.data.list[0].url
      }
    },
    /* 查看广告 */
    checkAdvertisement () {
      typeJump(this.advertisementInfo)
    }
  },
  created () {
    this.inputTitle = '可提现金额：'// 初始化
    this.loadAdvertisement()
    this.getCashWithdrawal().then((res) => {
      if (res.status === 200) {
        /* 已经绑定银行卡，显示银行卡号后四位 */
        if (res.data.backStatus) this.bankCardAction = { remarkContent: '提现至', arrowInfo: `${res.data.bankName} ${res.data.cardNumber.slice(-4)}`, flag: 'bank', path: '/mcard/myBankCard', hasBr: false }
        /* 未绑定银行卡 */
        else this.bankCardAction = { remarkContent: '提现至', arrowInfo: '去添加银行卡', flag: 'bank', path: '/mcard/myBankCard', hasBr: false }
        this.inputContent = `￥${res.data.takeAbleBalance}`// 初始化
        this.takeAbleBalance = res.data.takeAbleBalance
        this.bankName = res.data.bankName
        this.isBinding = res.data.backStatus ? 'hasCard' : 'noCard'
        this.bankNumVal = res.data.cardNumber
        this.cardholderVal = res.data.cardholder
        this.minAmount = res.data.minWithdrawAmount
        this.moneyPlaceholder = `最小提现金额￥${res.data.minWithdrawAmount}`
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
    margin-bottom: 24px;
    .withdrawals-img {
      width: 100%;
      height: 100%;
    }
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
