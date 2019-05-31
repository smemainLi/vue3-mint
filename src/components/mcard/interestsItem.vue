<template>
  <div class="interests-item">
    <div class="interests-item-left">
      <div class="interests-img">
        <img class="img-content" :src="interestsItem.interestsImg" alt="">
      </div>
      <div class="interests-info">
        <div class="info-introduce" v-cloak>{{interestsItem.infoIntroduce}}</div>
        <div class="info-price" v-cloak>{{interestsItem.infoPrice}}</div>
      </div>
    </div>
    <div class="interests-item-right" @click="interestsReceive(interestsItem)">
      <button :class="['receive-btn',interestsItem.allowReceive?'':'has-received']" v-cloak>{{interestsItem.allowReceive?freeReceive:hasReceived}}</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Toast } from 'vant'
export default {
  data () {
    return {
      interestsImg: require('../../assets/images/bought/consumeImg2.png'),
      infoIntroduce: '隐适美隐形正畸牙齿矫正成人牙齿整形优雅套餐整形优雅套餐整形优雅套餐整形优雅套餐',
      infoPrice: '￥368.00',
      freeReceive: '免费领取',
      hasReceived: '已领取'
    }
  },
  props: ['interestsItem'],
  methods: {
    ...mapActions({ receiveInterests: 'receiveInterests' }),
    /* 领取权益 */
    async interestsReceive (interests) {
      Toast.loading({ mask: true, duration: 0, message: '加载中...' })
      const result = await this.receiveInterests({ id: interests.interestsId })
      Toast.clear()
      if (result.status !== 200) {
        this.$toast({ message: result.message, duration: 1000 })
        return
      }
      this.$messagebox({
        title: '领取成功',
        message: '已领取成功，可前往“我的商城订单”预约使用',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: '去预约',
        cancelButtonText: '暂不预约'
      }).then(action => {
        console.log(action)
        if (action === 'confirm') {
          this.$router.push({ path: '/bought/orderDetail', query: { orderId: result.data.orderId, status: 6 } })
        } else {
          this.$emit('requestReload')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.interests-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 56px 32px;
  background-color: $color-ff;
  margin-bottom: 24px;
  .interests-item-left {
    display: flex;
    justify-content: flex-start;
    .interests-img {
      width: 124px;
      height: 124px;
      .img-content {
        width: 100%;
        height: 100%;
      }
    }
    .interests-info {
      width: 310px;
      margin-left: 20px;
      .info-introduce {
        font-size: 28px;
        color: $color-35;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .info-price {
        font-size: 26px;
        color: $color-008CA7;
        margin-top: 16px;
      }
    }
  }
  .interests-item-right {
    .receive-btn {
      width: 157px;
      height: 51px;
      color: $color-008CA7;
      font-size: 28px;
      white-space: nowrap;
      border: 1px solid $color-008CA7;
      border-radius: 8px;
      background: $color-ff;
    }
    .has-received {
      color: $color-88;
      border: 1px solid $color-88;
    }
  }
}
</style>
