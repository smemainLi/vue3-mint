<template>
  <div class="add-or-edit-address">
    <!-- 收货人 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{receiver}}</span>
      </div>
      <input class="field-input" type="text" :placeholder="receiverPlaceholder" v-model="receiverVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 手机号码 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{phone}}</span>
      </div>
      <input class="field-input" type="text" :placeholder="phonePlaceholder" v-model="phoneVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 所在地区 -->
    <div class="field-row field-select" @click="areaSelect=true">
      <div class="field-label">
        <span class="label-content" v-cloak>{{area}}</span>
      </div>
      <input class="field-input" type="text" :readonly="true" :placeholder="areaPlaceholder" v-model="areaVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 详细地址 -->
    <div class="field-row">
      <div class="field-label">
        <span class="label-content" v-cloak>{{detailedAddr}}</span>
      </div>
      <input class="field-input" type="text" :placeholder="detailedAddrPlaceholder" v-model="detailedAddrVal">
    </div>
    <div class="field-br">
      <hr class="br-style">
    </div>

    <!-- 设置为默认 -->
    <div class="field-row field-setting">
      <div class="field-label">
        <span class="label-content" v-cloak>{{setting}}</span>
      </div>
      <van-switch class="switch-btn" v-model="checked" size="5.6vw" active-color="#1AA9C4" inactive-color="#898989" />
    </div>

    <!-- 地址新增按钮 -->
    <div class="address-add-btn">
      <general-button :btnName="btnName"></general-button>
    </div>
    <!-- 地址编辑按钮 -->
    <div class="address-edit-btn" v-show="false">
      <button class="com-button delete-button" v-cloak>{{deleteButton}}</button>
      <button class="com-button confirm-button" v-cloak>{{btnName}}</button>
    </div>

    <!-- 地区选择 -->
    <van-popup v-model="areaSelect" position="bottom">
      <van-area :area-list="areaList" v-show="true" @cancel="closeArea" @confirm="confirmArea" />
    </van-popup>

  </div>
</template>

<script>
import areaList from '../../lang/areaList'
import generalButton from '../../components/common/generalButton.vue'
export default {
  data () {
    return {
      receiver: '收货人',
      receiverVal: '',
      receiverPlaceholder: '请输入收货人姓名',
      phone: '手机号码',
      phoneVal: '',
      phonePlaceholder: '请输入收货人手机号码',
      area: '所在地区',
      areaVal: '',
      areaPlaceholder: '请选择',
      areaSelect: false,
      areaList: areaList,
      detailedAddr: '详细地址',
      detailedAddrVal: '',
      detailedAddrPlaceholder: '街道、小区门牌等详细地址',
      setting: '设为默认',
      checked: false,
      deleteButton: '删除',
      btnName: '提交'
    }
  },
  components: { generalButton },
  methods: {
    /* 取消地区选择 */
    closeArea () {
      this.areaSelect = false
    },
    /* 确定地区选择 */
    confirmArea (areaItem) {
      this.areaVal = ''
      this.areaSelect = false
      console.log(areaItem)
      areaItem.map((item) => {
        // if (this.areaVal !== item.name) { this.areaVal = `${this.areaVal} ${item.name}`.trim() }
        this.areaVal = `${this.areaVal} ${item.name}`.trim()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-or-edit-address {
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
      color: $color-88;
      margin-left: 56px;
      width: 64%;
      font-size: 28px;
    }
    .field-option {
      color: $color-88;
      margin-left: 56px;
      width: 74%;
      font-size: 28px;
      height: 100%;
    }
  }
  .field-setting {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .switch-btn {
      margin-right: 12px;
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
    top: 200px;
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
  .address-add-btn {
    margin-top: 140px;
  }
  .address-edit-btn {
    padding: 140px 32px 0;
    display: flex;
    justify-content: space-between;
    .com-button {
      width: 324px;
      height: 88px;
      border-radius: 8px;
      font-size: 36px;
    }
    .delete-button {
      color: $color-008CA7;
      border: 1px solid $color-008CA7;
      background-color: $color-f5;
    }
    .confirm-button {
      color: $color-ff;
      background: $color-gradient;
    }
  }
}
</style>
