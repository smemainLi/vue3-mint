import Vue from 'vue'
import Router from 'vue-router'
import wx from 'weixin-js-sdk'
import * as routerPath from '../route/path'
import { getCookie } from '../utils/tools'
import { isLogin, getAuthorizeUrl, getJsSdkConfig } from '../utils/getData'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    /* 首页 */
    { path: '/', name: 'index', meta: { title: '首页' }, component: routerPath.Index },
    /* 预约 */
    { path: '/order/index', meta: { title: '在线预约' }, name: 'order', component: routerPath.order },
    { path: '/order/onceProtocol', meta: { title: '预约须知' }, name: 'onceProtocol', component: routerPath.onceProtocol },
    { path: '/order/onlineBooking', meta: { title: '在线预约', keepAlive: true }, name: 'onlineBooking', component: routerPath.onlineBooking },
    { path: '/order/appointmentProtocol', meta: { title: '预约须知' }, name: 'appointmentProtocol', component: routerPath.protocol },
    { path: '/order/addPatient', meta: { title: '添加就诊人' }, name: 'addPatient', component: routerPath.addOrEdit },
    { path: '/order/editPatient', meta: { title: '编辑就诊人' }, name: 'editPatient', component: routerPath.addOrEdit },
    { path: '/order/payment', meta: { title: '支付' }, name: 'payment', component: routerPath.payment },
    { path: '/order/orderSuccess', meta: { title: '预约成功' }, name: 'orderSuccess', component: routerPath.orderSuccess },
    { path: '/order/payPassword', meta: { title: '支付' }, name: 'payPassword', component: routerPath.payPassword },
    /* 缴费 */
    { path: '/pay/index', meta: { title: '缴费' }, name: 'pay', component: routerPath.pay },
    /* 精选项目 */
    { path: '/choice/index', meta: { title: '服务项目' }, name: 'choice', component: routerPath.choice },
    /* 同道商城 */
    { path: '/mall/index', meta: { title: '同道商城' }, name: 'mall', component: routerPath.mall },
    /* 在线咨询 */
    { path: '/consult/index', meta: { title: '在线客服' }, name: 'consult', component: routerPath.consult },
    /* 预约记录 */
    { path: '/arecord/index', meta: { title: '我的预约' }, name: 'arecord', component: routerPath.arecord },
    { path: '/arecord/appointmentDetails', meta: { title: '我的预约' }, name: 'appointmentDetails', component: routerPath.appointmentDetails },
    /* 缴费记录 */
    { path: '/precord/index', meta: { title: '我的门店消费' }, name: 'precord', component: routerPath.precord },
    /* 我买的商品 */
    { path: '/bought/index', meta: { title: '我买的商品' }, name: 'bought', component: routerPath.bought },
    /* 会员卡 */
    { path: '/mcard/index', meta: { title: '会员卡' }, name: 'mcard', component: routerPath.mcard },
    { path: '/mcard/login', meta: { title: '登录/开通会员卡' }, name: 'login', component: routerPath.login },
    { path: '/mcard/userProtocol', meta: { title: '会员卡协议' }, name: 'userProtocol', component: routerPath.protocol },
    { path: '/mcard/consumptionList', meta: { title: '我的门店消费' }, name: 'consumptionList', component: routerPath.consumptionList },
    { path: '/mcard/consumptionDetail', meta: { title: '我的门店消费' }, name: 'consumptionDetail', component: routerPath.consumptionDetail },
    { path: '/mcard/myPatients', meta: { title: '我的就诊人' }, name: 'myPatients', component: routerPath.myPatients },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
    // if (!getCookie('qi_openid')) {
    //   /**
    //    * 登录之前进行微信鉴权
    //    * 判断微信是否授权，如果未授权，请求授权
    //    * 如果已经授权，可以请求sdk认证
    //    */
    //   // 微信授权
    //   getAuthorizeUrl({ pageUri: to.path }).then((res) => {
    //     console.log(res)
    //     location.href = res.data.authorizeUrl
    //   }).catch((err) => {
    //     throw new Error(err)
    //   })
    // } else {
    //   /* 判断是否登录过 */
    //   isLogin().then((res) => {
    //     console.log(res)
    //     localStorage.setItem('isLogin', res.data.login)
    //     if (!res.data.login && to.path !== '/' && to.path !== '/order/index' && to.path !== '/mcard/userProtocol') next({ path: '/mcard/login' })
    //   }).catch((err) => {
    //     throw new Error(err)
    //   })

  //   /* sdk认证 */
  //   getJsSdkConfig({ url: to.path }).then((res) => {
  //     console.log(res)
  //     wx.config({
  //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //       appId: res.data.appid, // 必填，公众号的唯一标识
  //       timestamp: res.data.timestamp, // 必填，生成签名的时间戳
  //       nonceStr: res.data.noncestr, // 必填，生成签名的随机串
  //       signature: res.data.sign, // 必填，签名
  //       jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表
  //     })
  //   }).catch((err) => {
  //     throw new Error(err)
  //   });
  // }

  /* 判断是否登录过 */
  isLogin().then((res) => {
    console.log(res)
    localStorage.setItem('isLogin', res.data.login)
    if (!res.data.login && to.path !== '/' && to.path !== '/order/index' && to.path !== '/mcard/userProtocol') next({ path: '/mcard/login' })
  }).catch((err) => {
    throw new Error(err)
  })
  next()
})

export default router