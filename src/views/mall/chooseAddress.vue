<template>
  <div class="choose-address">
    <address-item :addressItem="item" v-for="(item,index) in addressList" :key="index"></address-item>
    <button class="add-address-button" @click="$router.push({path:'/mall/addAddress',query:{pageFlag:'addAddress'}})">
      <span class="btn-name" v-cloak>{{btnName}}</span>
    </button>
  </div>
</template>

<script>
import addressItem from '../../components/mall/addressItem.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      addressList: [
        { nickname: '露玖小姐姐', phone: '18838868886', isDefault: true, operateFlag: 'chooseAddress', address: '珠海市上冲14村里面4455号一般早上在家早上在家早上在家。', hasBr: true },
        { nickname: '雅米儿', phone: '18838568886', isDefault: false, operateFlag: 'chooseAddress', address: '广东省珠海市香洲区南方软件园', hasBr: false }
      ],
      btnName: '添加地址'
    }
  },
  components: { addressItem },
  methods: {
    ...mapActions({ getPersonalAddress: 'getPersonalAddress' }),
    async loadPersonalAddress () {
      const result = await this.getPersonalAddress()
      console.log(result)
      if (result.status === 200) {
        this.addressList.length = 0
        this.addressList = []
        if (result.data.address.length === 0) return
        result.data.address.forEach(address => {
          this.addressList.push({
            addressId: address.id,
            nickname: address.name,
            phone: address.mobile,
            isDefault: !!address.isdefault, // 0 不是默认 1默认
            operateFlag: 'chooseAddress',
            province: address.province, // 省
            provinceCode: address.provincecode, // 省编号
            city: address.city, // 市
            cityCode: address.cityCode, // 市编号
            district: address.district, // 区
            districtCode: address.districtcode, // 区编号
            address: `${address.province}${address.city}${address.district}${address.address}`,
            hasBr: true
          })
        })
        this.addressList[this.addressList.length - 1].hasBr = false
      }
    }
  },
  created () {
    this.loadPersonalAddress()
  }
}
</script>

<style lang="scss" scoped>
.choose-address {
  .add-address-button {
    width: 100%;
    height: 88px;
    color: $color-35;
    font-size: 36px;
    background: $color-ff;
    margin-top: 24px;
    .btn-name {
      margin-left: 14px;
      letter-spacing: 2px;
    }
  }
}
</style>
