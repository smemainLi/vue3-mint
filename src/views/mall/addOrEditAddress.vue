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
      <input class="field-input" type="text" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" :placeholder="phonePlaceholder" v-model="phoneVal">
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
    <div class="address-add-btn" v-show="$route.query.pageFlag==='addAddress'">
      <general-button :btnName="btnName" :isAgree="!noAllowClick" @click.native="handleAddress"></general-button>
    </div>
    <!-- 地址编辑按钮 -->
    <div class="address-edit-btn" v-show="$route.query.pageFlag==='editAddress'">
      <button class="com-button delete-button" :disabled="noAllowClick" @click="addressDelete" v-cloak>{{deleteButton}}</button>
      <button class="com-button confirm-button" :disabled="noAllowClick" @click="handleAddress" v-cloak>{{btnName}}</button>
    </div>

    <van-popup v-model="areaSelect" position="bottom">
      <div class="addres-select">
        <div @click.stop="cancel">取消</div>
        <div @click.stop="confirm">确定</div>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" valueKey="name" class="picker-class"></mt-picker>
    </van-popup>

  </div>
</template>

<script>
import generalButton from '../../components/common/generalButton.vue'
import { Toast } from 'vant'
import { mapActions } from 'vuex'

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
      areaVal: '', // 地区信息展示
      province: '', // 省
      provinceCode: '', // 省编号
      city: '', // 市
      cityCode: '', // 市编号
      county: '', // 区
      countyCode: '', // 区编号
      areaPlaceholder: '请选择',
      areaSelect: false,
      detailedAddr: '详细地址',
      detailedAddrVal: '',
      detailedAddrPlaceholder: '街道、小区门牌等详细地址',
      setting: '设为默认',
      checked: false,
      deleteButton: '删除',
      btnName: '提交',
      noAllowClick: false,
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'right'
        }, {
          flex: 1,
          values: [],
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'left'
        }
      ],
      addressSelect: {}, // 选中的地址,
      addressMsg: [], // 获取到的全部地址信息
      currentProvince: {}, // 当前选中的省份以及省份的下一级children
      currentProvinceIndex: 0, // 当前索引
      currentCity: {}, // 当前选中的城市以及城市的下一级children
      currentCityIndex: 0, // 当前索引
      currentCounty: {}, // 当前选中的区
      currentCountyIndex: 0, // 当前索引
      editFirstClick: true // 进入编辑页面第一次点击地区选择器
    }
  },
  components: { generalButton },
  methods: {
    ...mapActions({ getAreaList: 'getAreaList', addAddress: 'addAddress', updateAddress: 'updateAddress', deleteAddress: 'deleteAddress' }),
    /* 地址提交 */
    handleAddress () {
      if (this.receiverVal === '') this.$toast({ message: '请填写收货人', duration: 1000 })
      else if (this.phoneVal === '') this.$toast({ message: '请填写手机号码', duration: 1000 })
      else if (this.phoneVal.length !== 11) this.$toast({ message: '手机号码填写有误', duration: 1000 })
      else if (this.addressSelect.province === '') this.$toast({ message: '请选择所在地区', duration: 1000 })
      else if (this.detailedAddrVal === '') this.$toast({ message: '请填写详细地址', duration: 1000 })
      else {
        this.noAllowClick = true
        Toast.loading({ mask: true, duration: 0, message: '加载中...' })
        let data = {
          address: this.detailedAddrVal, // 详细地址
          city: this.addressSelect.city || this.city, // 市
          citycode: this.addressSelect.cityCode || this.cityCode, // 市编号
          district: this.addressSelect.county || this.county, // 区
          districtcode: this.addressSelect.countyCode || this.countyCode, // 区编号
          isdefault: this.checked ? 1 : 0, // 0 不是 1是 设置默认
          mobile: this.phoneVal, // 电话
          name: this.receiverVal, // 收货人
          province: this.addressSelect.province || this.province, // 省
          provincecode: this.addressSelect.provinceCode || this.provinceCode// 省编号
        }
        if (this.$route.query.pageFlag === 'addAddress') { // 添加地址
          this.addAddress(data).then((res) => {
            Toast.clear()
            if (res.status === 200) {
              this.$toast({ message: '添加成功', duration: 1000 })
              this.$route.query.actionFlag && setTimeout(() => { this.$router.go(-1) }, 1000)// 表明是从下单页面跳转过来的，添加地址
              !this.$route.query.actionFlag && setTimeout(() => { this.$router.replace('/mall/chooseAddress') }, 1000)
            }
          }).catch(() => { })
        } else { // 修改地址
          data.id = JSON.parse(this.$route.query.addressDetail).addressId // 地址id
          this.updateAddress(data).then((res) => {
            Toast.clear()
            if (res.status === 200) {
              this.$toast({ message: '修改成功', duration: 1000 })
              setTimeout(() => { this.$router.go(-1) }, 1000)
            }
          }).catch(() => { })
        }
      }
    },
    // 取消
    cancel () {
      this.areaSelect = false
    },
    // 地址确认
    confirm () {
      this.areaVal = `${this.addressSelect.province} ${this.addressSelect.city} ${this.addressSelect.county}`
      this.areaSelect = false
    },

    // 地址选择
    onValuesChange (picker, values) {
      let getValueOne = picker.getSlotValue(0)
      let getValueTwo = picker.getSlotValue(1)
      this.$nextTick(() => {
        picker.setSlotValues(1, getValueOne ? (getValueOne.children) : values[0].children[0].children)
        if (getValueTwo) {
          picker.setSlotValues(2, getValueTwo.children)
          values.forEach((item, index) => {
            if (!item) return
            switch (index) {
              case 0:
                this.addressSelect.province = item.name
                this.addressSelect.provinceCode = item.value
                break
              case 1:
                this.addressSelect.city = item.name
                this.addressSelect.cityCode = item.value
                break
              case 2:
                this.addressSelect.county = item.name
                this.addressSelect.countyCode = item.value
                break
            }
          })
        }
      })
    },

    /* 获取地域信息 */
    loadAreaList () {
      this.getAreaList().then((res) => {
        console.log(res)
        if (res.msg === 'success') {
          if (res.data.length === 0) return
          this.$nextTick(() => {
            this.addressMsg = res.data
            this.$set(this.slots, 0, {
              flex: 1,
              defaultIndex: 0,
              values: this.addressMsg,
              className: 'slot1',
              textAlign: 'right'
            })
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    /* 删除地址 */
    addressDelete () {
      this.noAllowClick = true
      Toast.loading({ mask: true, duration: 0, message: '加载中...' })
      console.log(JSON.parse(this.$route.query.addressDetail))
      this.deleteAddress({ id: JSON.parse(this.$route.query.addressDetail).addressId }).then((res) => {
        Toast.clear()
        if (res.status === 200) {
          console.log(res)
          this.$toast({ message: '删除成功', duration: 1000 })
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      }).catch((err) => { console.log(err) })
    }
  },

  created () {
    this.loadAreaList()
  },

  mounted () {
    console.log(this.$route.query.pageFlag)
    console.log(this.$route.query.addressDetail)
    if (this.$route.query.addressDetail) {
      let addressDetail = JSON.parse(this.$route.query.addressDetail)
      console.log(addressDetail)
      this.province = addressDetail.province // 省
      this.provinceCode = addressDetail.provinceCode // 省编号
      this.city = addressDetail.city // 市
      this.cityCode = addressDetail.cityCode // 市编号
      this.county = addressDetail.district // 区
      this.countyCode = addressDetail.districtCode // 区编号
      this.receiverVal = addressDetail.nickname
      this.phoneVal = addressDetail.phone
      this.areaVal = `${addressDetail.province} ${addressDetail.city} ${addressDetail.district}`
      this.detailedAddrVal = addressDetail.detailAddress
      this.checked = addressDetail.isDefault
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
  .addres-select {
    padding: 32px;
    display: flex;
    justify-content: space-between;
    div {
      color: #0168b7;
    }
  }
  /* .picker-class /deep/ .picker-item{
  font-size: 30px
} */
  .picker-class /deep/ .picker-item {
    font-size: 28px;
  }
}
</style>
