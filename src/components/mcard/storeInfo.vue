<template>
  <div class="store-info">
    <field :label="item.label" :value="item.value" :isMoney="item.isMoney" :hasBr="item.hasBr" v-for="(item,index) in storeInfoList" :key="index"></field>
  </div>
</template>

<script>
import field from '../../components/common/field.vue'
export default {
  data () {
    return {
      storeInfoList: [
        { label: '门店', value: '上冲诊所', isMoney: false, hasBr: true },
        { label: '消费金额', value: '￥868', isMoney: true, hasBr: true },
        { label: '就诊人', value: '居鲁士弟弟', isMoney: false, hasBr: true },
        { label: '医生', value: '乔巴医生', isMoney: false, hasBr: true },
        { label: '收银员', value: '林露玖', isMoney: false, hasBr: true },
        { label: '支付时间', value: '2018-12-18 14:30', isMoney: false, hasBr: true },
        { label: '支付方式', value: '现金', isMoney: false, hasBr: true },
        { label: '订单编号', value: '8888686288', isMoney: false, hasBr: false }
      ]
    }
  },
  components: { field }
}
</script>

<style lang="scss" scoped>
</style>