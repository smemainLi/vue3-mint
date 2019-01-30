import $axios from '../../utils/http'
const mcard = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    /* 获取图片验证码 */
    getCodePic: ({ commit }, data) => { return $axios.post('/wx/getCodePic') },
    /* 获取协议信息 */
    protocolInfo: ({ commit }, data) => { return $axios.post('/wx/copywriting/', data) },
    /* 获取手机验证码 */
    getPhoneCode: ({ commit }, data) => { return $axios.post('/wx/sendCodeByLogin', data) },
    /* 用户登录 */
    userLogin: ({ commit }, data) => { return $axios.post('/wx/login', data) },
    /* 用户登出 */
    userLogout: ({ commit }, data) => { return $axios.post('/wx/logout') },
    /* 获取就诊人列表 */
    getPatientList: ({ commit }, data) => { return $axios.post('/wx/relationship/index', data) }
  }
}

export default mcard