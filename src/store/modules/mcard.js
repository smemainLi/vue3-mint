import $axios from '../../utils/http'
const mcard = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    getCodePic: ({ commit }, data) => { return $axios.post('/wx/getCodePic') }
  }
}

export default mcard