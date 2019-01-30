<template>
  <div class="consumption-list">
    <use-info></use-info>
    <store-info></store-info>
  </div>
</template>

<script>
import useInfo from '../../components/mcard/useInfo.vue'
import storeInfo from '../../components/mcard/storeInfo.vue'

export default {
  data () {
    return {

    }
  },
  components: { useInfo, storeInfo }
}
</script>

<style lang="scss" scoped>
</style>
