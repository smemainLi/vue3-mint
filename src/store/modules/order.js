import $axios from '../../utils/http'
const order = {
  state: {
    feeVal: '' // 挂号费
  },
  mutations: {
    changeFeeVal: (state, feeVal) => { state.feeVal = feeVal } // 向state里面设置挂号费
  },
  getters: {},
  actions: {
    /* 获取预约协议 */
    appointmentNotice: ({ commit }, data) => { return $axios.post('/wx/register/protocol', data) },
    /* 获取门店列表 */
    getStoreList: ({ commit }, data) => { return $axios.post('/wx/register/getShop', data) },
    /* 获取预约界面数据 */
    getRegisterData: ({ commit }, data) => { return $axios.post('/wx/register/register') },
    /* 添加就诊人 */
    addPatient: ({ commit }, data) => { return $axios.post('/wx/relationship/add', data) },
    /* 获取就诊人详细信息 */
    getPatientInfo: ({ commit }, data) => { return $axios.post('/wx/relationship/toEdit', data) },
    /* 删除就诊人 */
    deletePatient: ({ commit }, data) => { return $axios.post('/wx/relationship/delete', data) },
    /* 修改就诊人信息 */
    updatePatient: ({ commit }, data) => { return $axios.post('/wx/relationship/update', data) },
    /* 支付页面 */
    appointmentPay: ({ commit }, data) => { return $axios.post('/wx/register/toPay', data) }
  }
}

export default order