<template>
  <div class="service-item">
    <div :class="['item-content',selected?'selected':'']">
      <span v-cloak>{{serviceItem}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['serviceItem', 'selected']
}
</script>

<style lang="scss" scoped>
.service-item {
  margin: 0 18px 32px 0;
  .item-content {
    width: 156px;
    height: 50px;
    color: $color-88;
    border: 1px solid $color-e5;
    background-color: $color-ff;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .selected {
    width: 160px;
    height: 54px;
    border: 0;
    color: $color-ff;
    background: $color-gradient;
  }
}
</style>
