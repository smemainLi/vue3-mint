<template>
  <div class="online-service-items">
    <div class="service-items">
      <div class="service-label">
        <span class="label-content" v-cloak>服务项目</span>
      </div>
      <div class="service-options">
        <service-item :serviceItem="item.serviceName" :selected="item.serviceSelected" v-for="(item,index) in serviceList" @click.native="selectService(item)" :key="index"></service-item>
      </div>
    </div>
  </div>
</template>

<script>
import serviceItem from './serviceItem.vue'
export default {
  data () {
    return {
    }
  },
  props: ['serviceList'],
  components: {
    serviceItem
  },
  methods: {
    // 服务项目只能选中其中一项
    selectService (serviceItem) {
      console.log(serviceItem)
      this.serviceList.map((item) => {
        item.serviceSelected = false
      })
      serviceItem.serviceSelected = true
      console.log(serviceItem.serviceId)

      this.$emit('getServiceItemId', serviceItem.serviceId)
    }
  }
}
</script>

<style lang="scss" scoped>
.online-service-items {
  margin-bottom: 24px;
  .service-items {
    background-color: $color-ff;
    width: 100%;
    font-size: 28px;
    padding: 22px 0 0 32px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    .service-label {
      color: $color-35;
      width: 200px;
    }
    .service-options {
      margin-left: 56px;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
