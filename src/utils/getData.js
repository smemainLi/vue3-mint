import $axios from '../utils/http'

export const isLogin = () => { return $axios.post('/wx/isLogin') }
export const getAuthorizeUrl = (data) => { return $axios.post('/wx/user/account/getAuthorizeUrl', data) }
export const getJsSdkConfig = (data) => { return $axios.post('/wx/user/account/getJsSdkConfig', data) }