<template>
  <div class="online-description">
    <!-- 情况说明 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{situation.label}}</span>
      </div>
      <input class="field-input" type="text" maxlength="30" :placeholder="situation.placeholder" v-model="situationVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 挂号费 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{registeredFee.label}}</span>
      </div>
      <input class="field-input field-fee-input" type="text" readonly="readonly" :placeholder="registeredFee.placeholder" :value="`${feeVal}元`">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      situation: {
        label: '情况说明',
        placeholder: '请描述你的口腔情况或你的需求'
      },
      situationVal: '',
      registeredFee: {
        label: '挂号费',
        placeholder: ''
      },
      registeredFeeVal: ''
    }
  },
  props: [],
  methods: {
  },
  computed: {
    ...mapState({
      feeVal: state => state.order.feeVal
    })
  }
}
</script>

<style lang="scss" scoped>
.online-description {
  margin-bottom: 24px;
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
    .field-fee-input {
      font-size: 32px;
      color: $color-008CA7;
      font-family: PingFang-SC-Medium;
    }
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
}
</style>
