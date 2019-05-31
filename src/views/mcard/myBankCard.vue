<template>
  <div class="my-bank-card">
    <div class="tip-message">
      <span class="tip-content" v-cloak>{{tipContent}}</span>
    </div>
    <!-- 银行 -->
    <div class="field-row field-select">
      <div class="field-label">
        <span class="label-content" v-cloak>{{bank}}</span>
      </div>
      <select class="field-option" name="bank" v-model="bankVal">
        <option v-for="(item,index) in bankList" :value="item.bankItem" :key="index">{{item.bankItem}}</option>
      </select>
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 银行卡号 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{bankNum}}</span>
      </div>
      <input class="field-input" type="text" maxlength="19" :placeholder="bankNumPlaceholder" v-model="bankNumVal" oninput="value=value.replace(/[^\d]/g,'')">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 持卡人 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{cardholder}}</span>
      </div>
      <input class="field-input" :readonly="$route.query.isBinding === 'hasCard'" type="text" :placeholder="cardholderPlaceholder" v-model="cardholderVal">
    </div>

    <div class="bank-card-btn">
      <general-button :btnName="btnName" :isAgree="isAgree" @click.native="confirmBankCard"></general-button>
    </div>
  </div>
</template>

<script>
import generalButton from '../../components/common/generalButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      bank: '银行',
      bankVal: '', // 银行名称
      bankList: [
        { bankItem: '请选择' }
      ],
      bankNum: '银行卡号',
      bankNumVal: '', // 银行卡号
      bankNumPlaceholder: '请填写银行卡卡号',
      cardholder: '持卡人',
      cardholderVal: '', // 持卡人
      cardholderPlaceholder: '请填写持卡人姓名',
      btnName: '提交',
      tipContent: '请谨慎填写信息，持卡人姓名一旦提交则不能修改',
      isAgree: true
    }
  },
  components: { generalButton },
  methods: {
    ...mapActions({ getBankList: 'getBankList', addBankCard: 'addBankCard', updateBankCard: 'updateBankCard' }),
    /* 提交银行卡信息 */
    confirmBankCard () {
      if (this.bankVal === '请选择') this.$toast('请选择银行')
      else if (!this.bankNumVal) this.$toast('请填写银行卡号')
      else if (this.bankNumVal && this.bankNumVal.length < 16) this.$toast('银行卡号填写有误')
      else if (!this.cardholderVal) this.$toast('请填写持卡人')
      else if (this.$route.query.isBinding === 'hasCard') { // 已绑定了银行卡，调用修改银行卡接口
        this.isAgree = false
        this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
        this.updateBankCard({ bankName: this.bankVal, cardNumber: this.bankNumVal }).then((res) => {
          this.$indicator.close()
          if (res.status === 200) {
            this.$toast({ message: res.message, duration: 1000 })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        }).catch((err) => {
          throw err
        })
      } else { // 未绑定银行卡，调用添加银行卡接口
        this.isAgree = false
        this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
        this.addBankCard({ bankName: this.bankVal, cardNumber: this.bankNumVal, cardholder: this.cardholderVal }).then((res) => {
          this.$indicator.close()
          if (res.status === 200) {
            this.$toast({ message: res.message, duration: 1000 })
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        }).catch((err) => {
          throw err
        })
      }
    }
  },
  created () {
    this.getBankList().then((res) => {
      if (res.status === 200) {
        res.data.list.forEach(bank => {
          this.bankList.push({ bankItem: bank })
        })
        this.bankVal = this.bankList[0].bankItem// 下拉框默认选中第一项
        if (this.$route.query.isBinding) { // 匹配银行卡名称
          for (let i = 0; i < this.bankList.length; i++) {
            if (this.$route.query.bankName === this.bankList[i].bankItem) {
              this.bankVal = this.bankList[i].bankItem// 下拉框默认选中第一项
              break
            }
          }
        }
      }
    }).catch((err) => {
      throw err
    })
    // this.bankVal = this.$route.query.bankName// 银行名称
    this.bankNumVal = this.$route.query.bankNumVal// 银行卡号
    this.cardholderVal = this.$route.query.cardholderVal// 持卡人
  }
}
</script>

<style lang="scss" scoped>
.my-bank-card {
  .tip-message {
    height: 68px;
    width: 100%;
    line-height: 68px;
    padding-left: 32px;
    box-sizing: border-box;
    .tip-content {
      font-size: 24px;
      color: $color-008CA7;
    }
  }
  .field-row {
    background-color: $color-ff;
    width: 100%;
    height: 88px;
    display: flex;
    align-items: center;
    font-size: 28px;
    padding: 0 32px;
    box-sizing: border-box;
    .field-label {
      color: $color-35;
      display: inline-block;
      width: 120px;
    }
    .field-input {
      color: $color-35;
      margin-left: 56px;
      width: 64%;
      font-size: 28px;
    }
    .field-option {
      color: $color-35;
      margin-left: 56px;
      width: 74%;
      font-size: 28px;
      height: 100%;
    }
  }
  .field-select:after {
    content: "";
    width: 48px;
    height: 48px;
    background: url("../../assets/images/mcard/pullDown.png") no-repeat center;
    background-size: 48px 48px;
    position: absolute;
    right: 32px;
    top: 90px;
    /* //给自定义的图标实现点击下来功能 */
    pointer-events: none;
  }
  .field-br {
    padding: 0 32px;
    box-sizing: border-box;
    text-align: center;
    background-color: $color-ff;
    border: 0;
    height: 1px;
    .br-style {
      border: 1px solid $color-e5;
    }
  }
  .bank-card-btn {
    margin-top: 140px;
  }
}
</style>
