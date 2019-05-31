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
    getRegisterData: ({ commit }, data) => { return $axios.post('/wx/register/register', data) },
    /* 添加就诊人 */
    addPatient: ({ commit }, data) => { return $axios.post('/wx/relationship/add', data) },
    /* 获取就诊人详细信息 */
    getPatientInfo: ({ commit }, data) => { return $axios.post('/wx/relationship/toEdit', data) },
    /* 删除就诊人 */
    deletePatient: ({ commit }, data) => { return $axios.post('/wx/relationship/delete', data) },
    /* 修改就诊人信息 */
    updatePatient: ({ commit }, data) => { return $axios.post('/wx/relationship/update', data) },
    /* 提交预约申请 */
    submitAppointment: ({ commit }, data) => { return $axios.post('/wx/register/registerAdd', data) },
    /* 获取支付渠道 */
    getPayChannel: ({ commit }, data) => { return $axios.post('/wx/pay/getPayChannel', data) },
    /* 获取钱包密码开通状态 */
    // getOpenPasswordStatus: ({ commit }, data) => { return $axios.post('/wx/register/toPay', data) },
    /* 修改支付密码 */
    // updatePayPassword: ({ commit }, data) => { return $axios.post('/wx/member/updatePayPass', data) },
    /* 开通钱包 */
    openPayPassword: ({ commit }, data) => { return $axios.post('/wx/member/wealth/open', data) },
    /* 验证支付密码 */
    verifyPassword: ({ commit }, data) => { return $axios.post('/wx/pay/payOfWealth', data) },
    /* 验证密码 */
    // verifyPassword: ({ commit }, data) => { return $axios.post('/wx/member/memberPass', data) },
    /* 后端存储状态 */
    // backEndSaveStatus: ({ commit }, data) => { return $axios.post('/wx/register/pay', data) },
    /* 获取微信支付配置 */
    getWechatPayConfig: ({ commit }, data) => { return $axios.post('/wx/pay/payOfWeiXin', data) },
    /* 支付成功页面 */
    paySuccessData: ({ commit }, data) => { return $axios.post('/wx/pay/paid', data) }
  }
}

export default order