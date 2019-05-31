<template>
  <div class="logistics">
    <iframe id="logistics-iframe" :src="logisticsLink" frameborder="no" scrolling="auto" border="0" marginwidth="0" marginheight="0" allowtransparency="yes">
    </iframe>
    <div class="mask-btn">查询结果</div>
    <div class="mask-bottom"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logisticsLink: ''
    }
  },
  created () {
    this.logisticsLink = `https://m.kuaidi100.com/index_all.html?postid=${this.$route.query.logisticsNo}`
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.logistics {
  width: 100%;
  height: 100%;
  position: relative;
  #logistics-iframe {
    width: 100%;
    height: 100%;
  }
  .mask-btn {
    width: 100%;
    height: 120px;
    color: $color-ff;
    font-size: 58px;
    font-weight: bold;
    position: absolute;
    top: 0px;
    text-align: center;
    line-height: 120px;
    background: #4690cd;
  }
  .mask-bottom {
    width: 100%;
    height: 328px;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    bottom: 0;
  }
  #saveBtn {
    display: none;
  }
}
</style>
