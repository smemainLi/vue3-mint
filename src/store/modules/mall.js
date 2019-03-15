import $axios from '../../utils/http'

const mall = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    /* 商城主页 */
    mallList: ({ commit }, data) => { return $axios.post('/wx/product/index', data) },
    /* 添加收货地址 */
    addAddress: ({ commit }, data) => { return $axios.post('/wx/address/add', data) },
    /* 获取地域信息 */
    getAreaList: ({ commit }, data) => { return $axios.post('/wx/area/getAll', data) },
    /* 获取个人地址 */
    getPersonalAddress: ({ commit }, data) => { return $axios.post('/wx/address/index', data) },
    /* 修改收货地址 */
    updateAddress: ({ commit }, data) => { return $axios.post('/wx/address/update', data) },
    /* 删除收货地址 */
    deleteAddress: ({ commit }, data) => { return $axios.post('/wx/address/detele', data) }
  }
}

export default mall