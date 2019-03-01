<template>
  <div class="address-item">
    <div :class="['address-block',addressItem.hasBr?'address-block-br':'']">
      <div class="address-detail">
        <div class="user-info">
          <span class="user-nickname" v-cloak>{{addressItem.nickname}}</span>
          <span class="user-phone" v-cloak>{{addressItem.phone}}</span>
          <span class="default-tips" v-show="addressItem.isDefault" v-cloak>{{defaultTips}}</span>
        </div>
        <div class="address-info" v-cloak>{{addressItem.address}}</div>
      </div>
      <div class="edit-address" @click="$router.push('/mall/editAddress')" v-cloak>{{edit}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nickname: '露玖小姐姐',
      phone: '18838868886',
      defaultTips: '默认',
      isDefault: true,
      address: '珠海市上冲14村里面4455号一般早上在家早上在家早上在家。',
      edit: '编辑',
      hasBr: true
    }
  },
  props: ['addressItem']
}
</script>

<style lang="scss" scoped>
.address-item {
  padding: 0 32px;
  background-color: $color-ff;
  .address-block {
    display: flex;
    justify-content: space-between;
    .address-detail {
      padding: 26px 0 30px 0;
      .user-info {
        font-size: 28px;
        color: $color-35;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .user-phone {
          margin-left: 40px;
        }
        .default-tips {
          font-size: 24px;
          color: $color-008CA7;
          margin-left: 40px;
          padding: 0 4px;
          border: 1px solid $color-008CA7;
          border-radius: 4px;
        }
      }
      .address-info {
        width: 580px;
        font-size: 28px;
        color: $color-88;
        margin-top: 16px;
      }
    }
    .edit-address {
      font-size: 28px;
      color: $color-008CA7;
      margin-top: 52px;
    }
  }
  .address-block-br {
    border-bottom: 1px solid $color-e5;
  }
}
</style>
