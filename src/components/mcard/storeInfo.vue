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
    }
  },
  props: ['storeInfoList'],
  components: { field }
}
</script>

<style lang="scss" scoped>
</style>