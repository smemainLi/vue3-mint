<template>
  <div class="store">
    <div class="store-info">
      <div class="store-picture">
        <img class="store-image" :src="store.storeImg" alt="">
      </div>
      <div class="store-detail">
        <div class="store-first-row">
          <div class="store-name" v-cloak>{{store.storeName}}</div>
          <div class="store-distance" v-cloak>{{store.storeDistance}}</div>
        </div>
        <div class="store-location">
          <i class="icon-address"></i>
          <span class="location-content" v-cloak>{{store.storeLocation}}</span>
        </div>
        <div class="store-nav">
          <i class="icon-guidepost"></i>
          <span class="nav-content" v-cloak>{{store.storeNav}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['store']
}
</script>

<style lang="scss" scoped>
.store {
  width: 100%;
  height: 240px;
  background-color: $color-ff;
  margin-bottom: 24px;
  .store-info {
    padding: 30px 32px;
    display: flex;
    justify-content: flex-start;
    .store-picture {
      width: 180px;
      height: 180px;
      display: block;
      .store-image {
        width: 100%;
        height: 100%;
      }
    }
    .store-detail {
      margin-left: 22px;
      .store-first-row {
        display: flex;
        justify-content: flex-start;
        color: $color-35;
        font-size: 32px;
        .store-distance {
          position: absolute;
          right: 32px;
        }
      }
      .store-location {
        color: $color-88;
        font-size: 26px;
        margin-top: 30px;
        .icon-address {
          margin-right: 9px;
        }
      }
      .store-nav {
        margin-top: 32px;
        width: 156px;
        height: 50px;
        border: 1px solid $color-008CA7;
        border-radius: 25px;
        color: $color-008CA7;
        font-size: 28px;
        line-height: 50px;
        text-align: center;
        position: absolute;
        right: 48px;
      }
    }
  }
}
</style>
