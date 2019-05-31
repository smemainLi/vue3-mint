<template>
  <div class="add-or-edit">
    <div class="tip-message">
      <span class="tip-content" v-cloak>{{tipContent}}</span>
    </div>
    <add-or-edit-form></add-or-edit-form>
  </div>
</template>

<script>
import addOrEditForm from '../../components/order/addOrEditForm.vue'

export default {
  data () {
    return {
      tipContent: '请填写真实信息，有利于医生更好的诊断'
    }
  },
  components: {
    addOrEditForm
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/order/onlineBooking') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.add-or-edit {
  .tip-message {
    height: 68px;
    width: 100%;
    line-height: 68px;
    padding-left: 32px;
    box-sizing: border-box;
    .tip-content {
      font-size: 24px;
      color: $color-008CA7;
    }
  }
}
</style>
