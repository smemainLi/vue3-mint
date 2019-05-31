<template>
  <div class="membership-interests">
    <div class="tip-message" v-show="this.interestsList.length">
      <span class="tip-content" v-cloak>{{tipContent}}</span>
      <span class="tip-action" @click="$router.push({path:'/bought/index'})" v-cloak>{{tipAction}}</span>
    </div>
    <interests-item :interestsItem="item" v-for="(item,index) in interestsList" @requestReload="requestReload" :key="index"></interests-item>
  </div>
</template>

<script>
import interestsItem from '../../components/mcard/interestsItem.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tipContent: '请在2019-03-24前领取权益并使用',
      tipAction: '去使用>>',
      interestsList: []
    }
  },
  components: { interestsItem },
  methods: {
    ...mapActions({ memberInterests: 'memberInterests' }),
    async loadMemberInterests () {
      this.interestsList = []
      this.interestsList.length = 0
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      const result = await this.memberInterests()
      this.$indicator.close()
      if (result.status === 200) {
        this.tipContent = `请在${result.data.validDate}前领取权益并使用`
        if (!result.data.list.length) return
        this.interestsList = result.data.list.map((listItem) => {
          return {
            interestsId: listItem.id,
            allowReceive: !listItem.status, // status 0：可领取 1：不可领取
            infoPrice: `￥${listItem.price}`,
            interestsImg: listItem.image,
            infoIntroduce: listItem.name
          }
        })
        console.log(this.interestsList)
      }
    },
    requestReload () {
      this.loadMemberInterests()
    }
  },
  created () {
    this.loadMemberInterests()
  }
}
</script>

<style lang="scss" scoped>
.membership-interests {
  .tip-message {
    height: 68px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 68px;
    padding: 0 32px;
    box-sizing: border-box;
    background-color: $color-f5;
    .tip-content,
    .tip-action {
      font-size: 24px;
      color: $color-008CA7;
    }
  }
}
</style>
