import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
// import store from './store'
import store from './store/index'
import MintUI from 'mint-ui'
import $axios from './utils/http'
// import Vconsole from 'vconsole'
import { PasswordInput, NumberKeyboard, Popup, Picker, Area, Switch, Tab, Tabs, Swipe, SwipeItem, Tabbar, TabbarItem, Search, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from 'vant'

import './styles/common.scss'
import './assets/icons/style.css'

Vue.config.productionTip = false
Vue.prototype.$axios = $axios
Vue.use(MintUI)
Vue.use(PasswordInput).use(NumberKeyboard).use(Popup).use(Picker).use(Area).use(Switch).use(Tab).use(Tabs).use(Swipe).use(SwipeItem).use(Tabbar).use(TabbarItem).use(Search).use(GoodsAction).use(GoodsActionBigBtn).use(GoodsActionMiniBtn);
// Vue.use(new Vconsole())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')