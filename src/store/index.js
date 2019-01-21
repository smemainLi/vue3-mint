import Vue from 'vue'
import Vuex from 'vuex'
import arecord from './modules/arecord'
import bought from './modules/bought'
import choice from './modules/choice'
import consult from './modules/consult'
import mall from './modules/mall'
import order from './modules/order'
import mcard from './modules/mcard'
import pay from './modules/pay'
import precord from './modules/precord'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    arecord,
    bought,
    choice,
    consult,
    mall,
    order,
    mcard,
    pay,
    precord
  }
})