import $axios from '../utils/http'

export const isLogin = () => { return $axios.post('/wx/isLogin') }
export const getAuthorizeUrlSuper = (data) => { return $axios.post('/wx/user/account/getAuthorizeUrlSuper', data) }
export const getJsSdkConfig = (data) => { return $axios.post('/wx/user/account/getJsSdkConfig', data) }