import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import store from './store'
import MintUI from 'mint-ui'
import './styles/common.scss'
import './assets/icons/style.css'

Vue.config.productionTip = false
Vue.use(MintUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')