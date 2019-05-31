import $axios from '../../utils/http'

const mall = {
  state: {
    cartGoodsNum: 0 // 购物车商品数量
  },
  mutations: {
    setGoodsNum: (state, data) => {
      state.cartGoodsNum = data
    }
  },
  getters: {
    cartGoodsNum: state => Number(state.cartGoodsNum)
  },
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
    deleteAddress: ({ commit }, data) => { return $axios.post('/wx/address/delete', data) },
    /* 获取购物车商品数量 */
    getCartGoodsNum: async ({ commit }, data) => {
      const res = await $axios.post('/wx/cart/number', data)
      commit('setGoodsNum', res.data.number)
    },
    /* 购物车列表 */
    getShoppingCartList: ({ commit }, data) => { return $axios.post('/wx/cart/index', data) },
    /* 添加购物车 */
    addShoppingCart: ({ commit }, data) => { return $axios.post('/wx/cart/add', data) },
    /* 编辑数量 */
    editCartGoodsNum: ({ commit }, data) => { return $axios.post('/wx/cart/edit', data) },
    /* 购物车删除商品 */
    deleteCartGoods: ({ commit }, data) => { return $axios.post('/wx/cart/delete', data) },
    /* 获取分类类目名 */
    categoryList: ({ commit }, data) => { return $axios.post('/wx/product/category', data) },
    /* 获取分类下的产品 */
    categoryProductList: ({ commit }, data) => { return $axios.post(`/wx/product/search/${data.categoryId}`, data) },
    /* 搜索商品 */
    searchProduct: ({ commit }, data) => { return $axios.post('/wx/product/search', data) },
    /* 商品详情 */
    productDetail: ({ commit }, data) => { return $axios.post('/wx/product/detail', data) },
    /* 获取商城首页的更多商品 */
    moreProduct: ({ commit }, data) => { return $axios.post('/wx/product/list', data) },
    /* 下单界面数据初始化 */
    orderPageData: ({ commit }, data) => { return $axios.post('/wx/order/preOrder', data) },
    /* 提交订单 */
    submitOrderData: ({ commit }, data) => { return $axios.post('/wx/order/placeOrder', data) },
    /* 领取优惠券列表 */
    mallCouponList: ({ commit }, data) => { return $axios.post('/wx/coupon/receivedList', data) },
    /* 我的优惠券列表 */
    getMyCouponList: ({ commit }, data) => { return $axios.post('/wx/coupon/mine', data) },
    /* 领取优惠券 */
    receiveCoupon: ({ commit }, data) => { return $axios.post('/wx/coupon/receive', data) }
  }
}

export default mall