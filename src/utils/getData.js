import $axios from '../utils/http'

export const isLogin = () => { return $axios.post('/wx/isLogin') }
export const getAuthorizeUrlSuper = (data) => { return $axios.post('/wx/user/account/getAuthorizeUrlSuper', data) }
export const getJsSdkConfig = (data) => { return $axios.post('/wx/user/account/getJsSdkConfig', data) }
export const getProductDetail = (data) => { return $axios.post('/wx/product/detail', data) }
export const getInviteConfig = (data) => { return $axios.post('/wx/share/getConfig', data) }