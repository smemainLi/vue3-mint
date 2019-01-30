<template>
  <div class="use-info">
    <div class="use-item" v-for="(item,index) in useInfoList" :key="index">
      <div class="item-row" :class="['item-row',item.hasBr?'':'item-row-no-br']">
        <div class="use-title">
          <div class="title-name" v-cloak>{{item.titleName}}</div>
          <div class="title-flag"><img class="flag-img" :src="item.titleFlag" alt=""></div>
        </div>
        <div class="use-param">
          <div class="use-money" v-cloak>{{item.userMoney}}</div>
          <div class="use-num" v-cloak>{{item.useNum}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleName: '补牙',
      titleFlag: require('../../assets/images/mcard/serviceIcon.png'),
      userMoney: '￥162',
      useNum: 'x2',
      useInfoList: [
        { titleName: '补牙', titleFlag: require('../../assets/images/mcard/serviceIcon.png'), userMoney: '￥162', useNum: 'x2', hasBr: true },
        { titleName: '口腔护理药水', titleFlag: require('../../assets/images/mcard/goodsIcon.png'), userMoney: '￥10', useNum: 'x2', hasBr: false }
      ]
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.use-info {
  margin-bottom: 24px;
  .use-item {
    background-color: $color-ff;
    padding: 0 32px;
    .item-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid $color-e5;
      padding: 12px 0 6px 0;
      .use-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .title-name {
          font-size: 28px;
          color: $color-35;
        }
        .title-flag {
          width: 68px;
          height: 68px;
          .flag-img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .use-param {
        .use-money {
          font-size: 28px;
          color: $color-008CA7;
          float: right;
        }
        .use-num {
          font-size: 24px;
          color: $color-88;
          clear: both;
          float: right;
        }
      }
    }
    .item-row-no-br {
      border: 0px;
    }
  }
}
</style>
