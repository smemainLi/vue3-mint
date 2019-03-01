import $axios from '../../utils/http'
const arecord = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    /* 获取预约列表 */
    getAppointmentList: ({ commit }, data) => { return $axios.post('/wx/register/getRegisterList') },
    /* 获取预约详情 */
    getAppointmentDetail: ({ commit }, data) => { return $axios.post('/wx/register/getRegister', data) }
  }
}

export default arecord