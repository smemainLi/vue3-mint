import Vue from 'vue'
import Router from 'vue-router'
import * as routerPath from '../route/path'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    /* 首页 */
    { path: '/', name: 'index', meta: { title: '首页' }, component: routerPath.Index },
    /* 预约 */
    { path: '/order/index', meta: { title: '在线预约' }, name: 'order', component: routerPath.order },
    { path: '/order/notice', meta: { title: '在线预约' }, name: 'notice', component: routerPath.notice },
    { path: '/order/onlineBooking', meta: { title: '在线预约' }, name: 'onlineBooking', component: routerPath.onlineBooking },
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
    { path: '/mcard/login', meta: { title: '登录/开通会员卡' }, name: 'login', component: routerPath.login }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router