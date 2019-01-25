import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
// import store from './store'
import store from './store/index'
import MintUI from 'mint-ui'
import $axios from './utils/http'
// import Vconsole from 'vconsole'
import { PasswordInput, NumberKeyboard } from 'vant'
import './styles/common.scss'
import './assets/icons/style.css'

Vue.config.productionTip = false
Vue.prototype.$axios = $axios
Vue.use(MintUI)
Vue.use(PasswordInput).use(NumberKeyboard)
  /* Vue.use(new Vconsole()) */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')