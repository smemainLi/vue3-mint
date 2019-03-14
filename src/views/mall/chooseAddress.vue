<template>
  <div class="choose-address">
    <address-item :addressItem="item" v-for="(item,index) in addressList" :key="index"></address-item>
    <button class="add-address-button" @click="$router.push('/mall/addAddress')">
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
