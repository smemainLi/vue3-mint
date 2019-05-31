<template>
  <div class="consult">
    <bottom-button :btnName="btnName" @click.native="customerService" :hasIcon="true" v-if="btnShow"></bottom-button>
  </div>
</template>

<script>
import bottomButton from '../../components/common/bottomButton.vue'
export default {
  data () {
    return {
      btnName: '我还没想好，想先咨询一下',
      btnShow: false
    }
  },
  components: { bottomButton },
  methods: {
    connectService () {
      let _this = this;
      (function (m, ei, q, i, a, j, s) {
        m[i] = m[i] || function () {
          (m[i].a = m[i].a || []).push(arguments)
        }
        j = ei.createElement(q)
        s = ei.getElementsByTagName(q)[0]
        j.async = true
        j.charset = 'UTF-8'
        j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t'
        s.parentNode.insertBefore(j, s)
      })(window, document, 'script', '_MEIQIA')
      // eslint-disable-next-line no-undef
      _MEIQIA('entId', 147569)
      // eslint-disable-next-line no-undef
      _MEIQIA('clientId', localStorage.currentPhone)
      // eslint-disable-next-line no-undef
      _MEIQIA('withoutBtn')
      // eslint-disable-next-line no-undef
      _MEIQIA('allSet', () => {
        // eslint-disable-next-line no-undef
        _MEIQIA('showPanel')
        setTimeout(() => {
          _this.btnShow = true
        }, 500)
      })
      // eslint-disable-next-line no-undef
      _MEIQIA('init')
    },
    customerService () {
      // eslint-disable-next-line no-undef
      _MEIQIA('showPanel')
    }
  },
  created () {
    this.connectService()
  },
  destroyed () {
    // eslint-disable-next-line no-undef
    _MEIQIA('hidePanel')
  }
}
</script>

<style lang="scss" scoped>
</style>
