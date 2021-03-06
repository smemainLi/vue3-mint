import $axios from '../../utils/http'
const mcard = {
  state: {
    rechargeInfo: {}, // 充值信息
    loginStatus: false, // 登录状态
    noConnect: false // false 有网络  true 没有网络
  },
  mutations: {
    setRechargeInfo: (state, rechargeInfo) => { state.rechargeInfo = rechargeInfo }, // 向state里面设置充值信息
    setLoginStatus: (state, loginStatus) => { state.loginStatus = loginStatus }, //向state里面设置登录状态
    setNoConnect: (state, noConnect) => { state.noConnect = noConnect } //向state里面设置网络状态状态
  },
  getters: {},
  actions: {
    /* 获取图片验证码 */
    getCodePic: ({ commit }, data) => { return $axios.post('/wx/getCodePic') },
    /* 获取协议信息 */
    protocolInfo: ({ commit }, data) => { return $axios.post('/wx/copywriting', data) },
    /* 获取手机验证码 */
    getPhoneCode: ({ commit }, data) => { return $axios.post('/wx/sendCodeByLogin', data) },
    /* 用户登录 */
    userLogin: ({ commit }, data) => { return $axios.post('/wx/login', data) },
    /* 用户登出 */
    userLogout: ({ commit }, data) => { return $axios.post('/wx/logout') },
    /* 获取就诊人列表 */
    getPatientList: ({ commit }, data) => { return $axios.post('/wx/relationship/index', data) },
    /* 获取个人信息 */
    getPersonalInfo: ({ commit }, data) => { return $axios.post('/wx/member/index', data) },
    /* 获取个人二维码 */
    getPersonalQrCode: ({ commit }, data) => { return $axios.post('/wx/member/getQrCode', data) },
    /* 取消预约 */
    cancelOrder: ({ commit }, data) => { return $axios.post('/wx/register/cancel', data) },
    /* 获取我的钱包信息 */
    getMyWalletInfo: ({ commit }, data) => { return $axios.post('/wx/member/wealth/index', data) },
    /* 获取门店消费列表 */
    getConsumptionList: ({ commit }, data) => { return $axios.post('/wx/member/consumptionList', data) },
    /* 获取门店消费详情 */
    getConsumptionDetail: ({ commit }, data) => { return $axios.post('/wx/member/consumption', data) },
    /* 获取充值方案 */
    getRechargeWays: ({ commit }, data) => { return $axios.post('/wx/member/wealth/getRechargeList', data) },
    /* 钱包充值 */
    walletRecharge: ({ commit }, data) => { return $axios.post('/wx/member/wealth/recharge', data) },
    /* 修改支付密码 */
    updatePayPassword: ({ commit }, data) => { return $axios.post('/wx/member/wealth/updatePayPassword', data) },
    /* 忘记支付密码-发送短信验证码 */
    sendCodeByForgetPayPassword: ({ commit }, data) => { return $axios.post('/wx/member/wealth/sendCodeByForgetPayPassword', data) },
    /* 忘记支付密码-验证短信验证码 */
    validateSmsCode: ({ commit }, data) => { return $axios.post('/wx/member/wealth/validateSmsCode', data) },
    /* 忘记支付密码-验证token */
    forgetPayPassword: ({ commit }, data) => { return $axios.post('/wx/member/wealth/forgetPayPassword', data) },
    /* 修改手机号码 */
    updateMobile: ({ commit }, data) => { return $axios.post('/wx/member/updateMobile', data) },
    /* 提现准备数据 */
    getCashWithdrawal: ({ commit }, data) => { return $axios.post('/wx/member/wealth/getCashWithdrawalPrepareData', data) },
    /* 获取银行列表 */
    getBankList: ({ commit }, data) => { return $axios.post('/wx/getBankList', data) },
    /* 添加银行卡 */
    addBankCard: ({ commit }, data) => { return $axios.post('/wx/member/wealth/addBankCard', data) },
    /* 修改银行卡 */
    updateBankCard: ({ commit }, data) => { return $axios.post('/wx/member/wealth/updateBankCard', data) },
    /* 钱包-付款码 */
    getPayQrcode: ({ commit }, data) => { return $axios.post('/wx/member/wealth/getPayQrCode', data) },
    /* 钱包-付款码状态 */
    getPayStatusByCode: ({ commit }, data) => { return $axios.post('/wx/member/wealth/getPayStatusByCode', data) },
    /* 钱包-帐单明细 */
    getBillDetails: ({ commit }, data) => { return $axios.post('/wx/member/wealth/list', data) },
    /* 提现 */
    withdraw: ({ commit }, data) => { return $axios.post('/wx/member/wealth/withdraw', data) },
    /* 会员升级介绍 */
    upgradeIntroduce: ({ commit }, data) => { return $axios.post('/wx/member/grade/detail', data) },
    /* 会员升级 */
    memberUpgrade: ({ commit }, data) => { return $axios.post('/wx/member/grade/upgrade', data) },
    /* 我的等级权益 */
    memberInterests: ({ commit }, data) => { return $axios.post('/wx/member/grade/index', data) },
    /* 领取权益 */
    receiveInterests: ({ commit }, data) => { return $axios.post('/wx/member/grade/getGradePack', data) },
    /* 验证支付密码 */
    validatePayPassword: ({ commit }, data) => { return $axios.post('/wx/member/wealth/validatePayPassword', data) },
    /* 获取分享配置信息 */
    getInviteConfig: ({ commit }, data) => { return $axios.post('/wx/share/getConfig', data) },
    /* 获取我的分享配置 */
    getMyInviteConfig: ({ commit }, data) => { return $axios.post('/wx/share/getMyShareConfig', data) },
    /* 获取分享结果数据 */
    getShareResult: ({ commit }, data) => { return $axios.post('/wx/share/getShareDate', data) },
    /* 根据广告位code获取广告 */
    getAdvertisement: ({ commit }, data) => { return $axios.post('/wx/getAdvertByCode', data) }
  }
}

export default mcard