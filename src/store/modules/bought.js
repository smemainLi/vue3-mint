import $axios from '../../utils/http'

const bought = {
  state: {
    tabStatus: [] //订单列表顶部个状态的状态数量
  },
  mutations: {
    setTabStatus: (state, data) => {
      data && data.length && data.forEach(listItem => {
        state.tabStatus.push({
          status: listItem.status,
          num: listItem.num
        })
      })
    }
  },
  getters: {
    getTabStatus: state => state.tabStatus
  },
  actions: {
    /* 订单列表 */
    getBoughtList: ({ commit }, data) => { return $axios.post('/wx/order/mine', data) },
    /* 订单详情 */
    getBoughtDetail: ({ commit }, data) => { return $axios.post('/wx/order/mine/detail', data) },
    /* 取消订单 */
    cancelBoughtOrder: ({ commit }, data) => { return $axios.post('/wx/order/mine/cancel', data) },
    /* 删除订单 */
    deleteBoughtOrder: ({ commit }, data) => { return $axios.post('/wx/order/mine/delete', data) },
    /* 确认收货 */
    confirmBoughtOrder: ({ commit }, data) => { return $axios.post('/wx/order/mine/confirm', data) },
    /* 订单状态对应的数字提醒 */
    getOrderStatusNum: async({ commit }, data) => {
      const result = await $axios.post('/wx/order/mine/number', data)
      commit('setTabStatus', result.data.list)
      return result
    },
    /* 下单选择优惠券 */
    getValidCoupon: ({ commit }, data) => { return $axios.post('/wx/order/getValidCoupon', data) }
  }
}

export default bought