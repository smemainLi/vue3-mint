<template>
  <div class="choose-address">
    <address-item :addressItem="item" v-for="(item,index) in addressList" @click.native="selectAddress(item)" :key="index"></address-item>
    <button class="add-address-button" @click.stop="addAddress">
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
      addressList: [],
      btnName: '添加地址'
    }
  },
  components: { addressItem },
  methods: {
    ...mapActions({ getPersonalAddress: 'getPersonalAddress' }),
    async loadPersonalAddress () {
      const result = await this.getPersonalAddress()
      if (result.status === 200) {
        this.addressList.length = 0
        this.addressList = []
        if (result.data.address.length === 0) return
        result.data.address.forEach(address => {
          this.addressList.push({
            addressId: address.id,
            nickname: address.name,
            phone: address.mobile,
            isDefault: !!address.isdefault, // 0 不是默认 1 默认
            operateFlag: 'chooseAddress',
            province: address.province, // 省
            provinceCode: address.provincecode, // 省编号
            city: address.city, // 市
            cityCode: address.citycode, // 市编号
            district: address.district, // 区
            districtCode: address.districtcode, // 区编号
            address: `${address.province}${address.city}${address.district}${address.address}`,
            detailAddress: address.address,
            hasBr: true
          })
        })
        this.addressList[this.addressList.length - 1].hasBr = false
      }
    },
    /* 选择地址 */
    selectAddress (addressItem) {
      sessionStorage.setItem('addressItem', JSON.stringify(addressItem))
      localStorage.getItem('jumpFlag') === '2' && this.$router.go(-2)
      localStorage.getItem('jumpFlag') === '1' && this.$router.go(-1)
    },
    /* 添加地址 */
    addAddress () {
      if (this.addressList.length === 5) this.$toast('收货地址最多只能有5条')
      else {
        localStorage.setItem('jumpFlag', '2')
        this.$router.push({ path: '/mall/addAddress', query: { pageFlag: 'addAddress' } })
      }
    }
  },
  created () {
    this.loadPersonalAddress()
    /* 设置标志，jumpFlag为‘1’的时候，表示从地址列表中选择地址，‘2’表示先添加地址再选择地址 */
    this.$route.query.chooseFlag && localStorage.setItem('jumpFlag', '1')
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/mall/placeOrder') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
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
