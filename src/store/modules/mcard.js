import $axios from '../../utils/http'
const mcard = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    getCodePic: ({ commit }, data) => { return $axios.post('/wx/getCodePic') },
    protocolInfo: ({ commit }, data) => { return $axios.post('/wx/copywriting/', data) },
    getPhoneCode: ({ commit }, data) => { return $axios.post('/wx/sendCodeByLogin', data) },
    userLogin: ({ commit }, data) => { return $axios.post('/wx/login', data) },
    userLogout: ({ commit }, data) => { return $axios.post('/wx/logout') }
  }
}

export default mcard