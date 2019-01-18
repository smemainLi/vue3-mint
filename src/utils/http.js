import axios from 'axios'
import qs from 'qs'

class $axios {
  constructor() {
    this.$http = axios.create({
      baseURL: '',
      timeout: 5000,
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
      console.log('%c 发起请求 =====>', 'color: #4CAF50; font-weight: bold', config)
      if (config.data) {
        config.data = qs.stringify(config.data)
      }
      return config;
    });
    this.$http.interceptors.response.use((response) => {
      console.log('%c 返回数据 <=====', 'color: #4CAF50; font-weight: bold', response.data)
      return response;
    }, (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            error.message = '未找到该资源'
            break;
          default:
            error.message = `连接错误，状态码为${error.response.status}`
            break;
        }
      } else {
        error.message = '连接到服务器失败'
      }
      // this.$toast({ message: error.message, iconClass: 'mintui  mintui-field-warning' })
      return Promise.reject(error.response)
    });
  }

  post(url, data = {}) {
    this.$http.post(url, data).then((res) => {
      return res
    }).catch((err) => {
      return Promise.reject(err)
    });
  }
}

export default new $axios()