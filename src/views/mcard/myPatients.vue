<template>
  <div class="my-patients">
    <action-item :actionItem="item" v-for="(item,index) in patientList" @click.native="$router.push({path:'/order/editPatient',query:{patientId:item.remarkId}})" :key="index"></action-item>

    <button class="add-button" @click="addPatient">
      <span class="btn-name" v-cloak>{{btnName}}</span>
    </button>
  </div>
</template>

<script>
import actionItem from '../../components/mcard/actionItem.vue'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      btnName: '添加就诊人',
      patientList: []
    }
  },
  components: { actionItem },
  methods: {
    ...mapActions({ getPatientList: 'getPatientList' }),
    loadPatientList () {
      this.$indicator.open({ text: '加载中...', spinnerType: 'fading-circle' })
      this.getPatientList().then((res) => {
        console.log(res)
        this.$indicator.close()
        this.patientList = []
        this.patientList.length = 0
        if (res.status === 200) {
          res.data.relationships.forEach(item => {
            this.patientList.push({
              remarkId: item.relationshipId,
              remarkContent: item.relationshipName,
              hasBr: true
            })
          })
        }
        if (res.data.relationships.length !== 0) this.patientList[this.patientList.length - 1].hasBr = false
      }).catch((err) => {
        this.$toast('数据错误')
        throw err
      })
    },
    addPatient () {
      if (this.patientList.length === 5) {
        this.$toast({ message: '最多只能添加5位就诊人', duration: 1000 })
        return
      }
      this.$router.push({ path: '/order/addPatient' })
    }
  },
  created () {
    this.loadPatientList()
  }
}
</script>

<style lang="scss" scoped>
.my-patients {
  .add-button {
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
