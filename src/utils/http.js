import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import { Toast, Indicator } from 'mint-ui'

class $axios {
  constructor() {
    this.$http = axios.create({
      baseURL: '',
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Origin': '*',
        'credentials': 'same-origin',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });
    this.$http.interceptors.request.use((config) => {
      if (config.data) {
        config.data = qs.stringify(config.data)
      }
      return config;
    });
    this.$http.interceptors.response.use((response) => {
      return response.data;
    }, (error) => {
      Indicator.close()
      if (error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求'
            break
          case 401:
            error.message = '未授权，请重新登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求错误,未找到该资源'
            break
          case 405:
            error.message = '请求方法未允许'
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器端出错'
            break
          case 501:
            error.message = '网络未实现'
            break
          case 502:
            error.message = '网络错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网络超时'
            break
          case 505:
            error.message = 'http版本不支持该请求'
            break
          default:
            // store.commit('setNoConnect', true)
            error.message = `连接错误${error.response.status}`
        }
      } else {
        store.commit('setNoConnect', true)
        error.message = '连接到服务器失败，请检查网络'
      }
      Toast(error.message)
      throw error.message
      // return Promise.reject(error.response)
    });
  }

  post (url, data = {}) {
    // return this.$http.post(url, data).then((res) => {
    //   return res
    // }).catch((err) => {
    //   // return Promise.reject(err)
    //   return err
    // });
    return this.$http.post(url, data)
  }
}

export default new $axios()