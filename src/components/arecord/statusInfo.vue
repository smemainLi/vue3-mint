<template>
  <div class="status-info">
    <field :isStatus="item.isStatus" v-for="(item,index) in statusList" :key="index" :label="item.label" :value="item.value" :hasBr="item.hasBr"></field>
  </div>
</template>

<script>
import field from '../common/field.vue'

export default {
  data () {
    return {
    }
  },
  props: ['statusList'],
  components: { field }
}
</script>

<style lang="scss" scoped>
.status-info {
  margin-bottom: 24px;
}
</style>
