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
    /* 缴费记录 */
    { path: '/precord/index', meta: { title: '我的门店消费' }, name: 'precord', component: routerPath.precord },
    /* 我买的商品 */
    { path: '/bought/index', meta: { title: '我买的商品' }, name: 'bought', component: routerPath.bought },
    /* 会员卡 */
    { path: '/mcard/index', meta: { title: '会员卡' }, name: 'mcard', component: routerPath.mcard }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router