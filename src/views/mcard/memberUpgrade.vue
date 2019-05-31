<template>
  <div class="member-upgrade">
    <div class="upgrade-content" v-html="upgradeContent"></div>
    <bottom-button :btnName="btnName" :noClicks="noClicks" @click.native="upgradeMember"></bottom-button>
  </div>
</template>

<script>
import bottomButton from '../../components/common/bottomButton.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      upgradeContent: '',
      noClicks: false, // 按钮禁止点击
      btnName: ''
    }
  },
  components: { bottomButton },
  methods: {
    ...mapActions({ upgradeIntroduce: 'upgradeIntroduce', memberUpgrade: 'memberUpgrade' }),
    /* 立即升级 */
    async upgradeMember () {
      const result = await this.memberUpgrade()
      result.status === 200 && localStorage.setItem('payId', result.data.payId)
      this.$router.push({ path: '/order/payment', query: { orderType: 'upgradeOrder' } })
    }
  },
  mounted () {
    this.upgradeIntroduce().then((res) => {
      if (res.status === 200) {
        this.upgradeContent = res.data.content
        this.btnName = res.data.gradeUpgradeAble ? `￥${res.data.price}立即升级` : '暂无法升级'
        this.noClicks = !res.data.gradeUpgradeAble
      }
    }).catch(() => { })
  }
}
</script>

<style lang="scss" scoped>
.member-upgrade {
  .upgrade-content {
    width: 100%;
    padding-bottom: 88px;
    box-sizing: border-box;
    /deep/ p {
      width: 100%;
      // text-indent: 0 !important;
      img {
        display: block;
        // vertical-align: middle;
        // float: left;
      }
    }
  }
}
</style>
