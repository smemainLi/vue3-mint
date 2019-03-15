<template>
  <div class="address-status">
    <div class="no-add-address" @click="$router.push({path:'/mall/addAddress',query:{pageFlag:'addAddress'}})" v-show="testStatus">
      <div class="address-add-img">
        <img class="img-content" :src="addressStatusImg" alt="">
      </div>
      <div class="address-add-tips" v-cloak>{{addAddressTips}}</div>
    </div>
    <div class="has-add-address" v-show="!testStatus">
      <address-item :addressItem="addressItem"></address-item>
    </div>
  </div>
</template>

<script>
import addressItem from '../../components/mall/addressItem.vue'
export default {
  data () {
    return {
      addressStatusImg: require('../../assets/images/mall/addGoodsImg.png'),
      addAddressTips: '添加收货地址',
      addressItem: { nickname: '露玖小姐姐', phone: '18838868886', isDefault: false, operateFlag: 'placeOrder', address: '珠海市上冲14村里面4455号一般早上在家早上在家早上在家。', hasBr: false }
    }
  },
  props: ['testStatus'],
  components: { addressItem }
}
</script>

<style lang="scss" scoped>
.address-status {
  width: 100%;
  margin-bottom: 24px;
  background-color: $color-ff;
  .no-add-address {
    text-align: center;
    padding: 20px 0 30px 0;
    .address-add-img {
      width: 98px;
      height: 98px;
      margin: 0 auto;
      .img-content {
        width: 100%;
        height: 100%;
      }
    }
    .address-add-tips {
      font-size: 28px;
      color: $color-008CA7;
    }
  }
}
</style>
