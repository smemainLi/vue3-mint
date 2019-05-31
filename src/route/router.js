import Vue from 'vue'
import Router from 'vue-router'
import wx from 'weixin-js-sdk'
import * as routerPath from '../route/path'
import store from '../store/index'
import { getCookie, getUrlParam } from '../utils/tools'
import { isLogin, getAuthorizeUrlSuper, getJsSdkConfig, getProductDetail, getInviteConfig } from '../utils/getData'
import { getCurrentLocation, getTitle, updateTimelineShareDataApi, onMenuShareTimelineApi, updateAppMessageShareDataApi, onMenuShareAppMessageApi, ordinaryShare, judgeUrlParam } from '../utils/wxConfig'

Vue.use(Router)

const noLoginRequired = [
  '/',
  '/order/index',
  '/mall/index/0',
  '/mall/classify/1',
  '/mall/search',
  '/mcard/userProtocol',
  '/mall/goodsDetail',
  '/mcard/inviteFriendsResult',
  '/mall/downloadPage'
]

const shareSpecialPage = [
  '/mcard/inviteFriendsOne'
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    /* 首页 */
    { path: '/', name: 'temporaryIndex', meta: { title: '首页' }, component: routerPath.temporaryIndex },
    {
      path: '/mall/:type/:active',
      name: 'Index',
      meta: { title: '同道商城' },
      component: routerPath.Index,
      children: [
        { path: '/mall/index/:active', meta: { title: '同道商城' }, name: 'mall', component: routerPath.mall },
        { path: '/mall/classify/:active', meta: { title: '分类' }, name: 'classify', component: routerPath.classify }
      ]
    },
    /* 预约 */
    { path: '/order/index', meta: { title: '在线预约', sdkConfig: true, jsApiList: ['getLocation', 'openLocation'] }, name: 'order', component: routerPath.order },
    { path: '/order/onceProtocol', meta: { title: '预约须知' }, name: 'onceProtocol', component: routerPath.onceProtocol },
    { path: '/order/onlineBooking', meta: { title: '在线预约', keepAlive: true }, name: 'onlineBooking', component: routerPath.onlineBooking },
    { path: '/order/appointmentProtocol', meta: { title: '预约须知' }, name: 'appointmentProtocol', component: routerPath.protocol },
    { path: '/order/addPatient', meta: { title: '添加就诊人' }, name: 'addPatient', component: routerPath.addOrEdit },
    { path: '/order/editPatient', meta: { title: '编辑就诊人' }, name: 'editPatient', component: routerPath.addOrEdit },
    { path: '/order/payment', meta: { title: '支付', sdkConfig: true, jsApiList: ['chooseWXPay'] }, name: 'payment', component: routerPath.payment },
    { path: '/order/orderSuccess', meta: { title: '预约成功' }, name: 'orderSuccess', component: routerPath.orderSuccess },
    { path: '/order/payPassword', meta: { title: '' }, name: 'payPassword', component: routerPath.payPassword },
    /* 缴费 */
    { path: '/pay/index', meta: { title: '缴费' }, name: 'pay', component: routerPath.pay },
    /* 精选项目 */
    { path: '/choice/index', meta: { title: '服务项目' }, name: 'choice', component: routerPath.choice },
    /* 同道商城 */
    { path: '/mall/addAddress', meta: { title: '收货地址' }, name: 'addAddress', component: routerPath.addOrEditAddress },
    { path: '/mall/editAddress', meta: { title: '收货地址' }, name: 'editAddress', component: routerPath.addOrEditAddress },
    { path: '/mall/paymentSuccess', meta: { title: '付款成功' }, name: 'paymentSuccess', component: routerPath.paymentSuccess },
    { path: '/mall/chooseAddress', meta: { title: '下单' }, name: 'chooseAddress', component: routerPath.chooseAddress },
    { path: '/mall/shoppingCart', meta: { title: '购物车' }, name: 'shoppingCart', component: routerPath.shoppingCart },
    { path: '/mall/coupon', meta: { title: '' }, name: 'coupon', component: routerPath.coupon },
    { path: '/mall/placeOrder', meta: { title: '下单', keepAlive: true }, name: 'placeOrder', component: routerPath.placeOrder },
    { path: '/mall/search', meta: { title: '搜索' }, name: 'search', component: routerPath.search },
    { path: '/mall/goodsDetail', meta: { title: '商品详情', sdkConfig: true, jsApiList: ['updateTimelineShareData', 'onMenuShareTimeline'] }, name: 'goodsDetail', component: routerPath.goodsDetail },
    { path: '/mall/downloadPage', meta: { title: '下载页' }, name: 'downloadPage', component: routerPath.downloadPage },
    /* 在线咨询 */
    { path: '/consult/index', meta: { title: '在线客服' }, name: 'consult', component: routerPath.consult },
    /* 预约记录 */
    { path: '/arecord/index', meta: { title: '我的预约', sdkConfig: true, jsApiList: ['getLocation', 'openLocation'] }, name: 'arecord', component: routerPath.arecord },
    { path: '/arecord/appointmentDetails', meta: { title: '我的预约', sdkConfig: true, jsApiList: ['getLocation', 'openLocation'] }, name: 'appointmentDetails', component: routerPath.appointmentDetails },
    /* 缴费记录 */
    { path: '/precord/index', meta: { title: '我的门店消费' }, name: 'precord', component: routerPath.precord },
    /* 我买的商品 */
    { path: '/bought/index', meta: { title: '我的商城订单' }, name: 'bought', component: routerPath.bought },
    { path: '/bought/orderDetail', meta: { title: '我的商城订单' }, name: 'orderDetail', component: routerPath.orderDetail },
    { path: '/bought/logistics', meta: { title: '物流信息' }, name: 'logistics', component: routerPath.logistics },
    /* 会员卡 */
    { path: '/mcard/index', meta: { title: '会员卡' }, name: 'mcard', component: routerPath.mcard },
    { path: '/mcard/login', meta: { title: '登录', keepAlive: true }, name: 'login', component: routerPath.login },
    { path: '/mcard/forgetPayPwd', meta: { title: '忘记支付密码' }, name: 'forgetPayPwd', component: routerPath.login },
    { path: '/mcard/updateBindPhone', meta: { title: '修改绑定手机' }, name: 'updateBindPhone', component: routerPath.login },
    { path: '/mcard/userProtocol', meta: { title: '会员卡协议' }, name: 'userProtocol', component: routerPath.protocol },
    { path: '/mcard/membershipAmountProtocol', meta: { title: '会员卡金额规则' }, name: 'membershipAmountProtocol', component: routerPath.protocol },
    { path: '/mcard/consumptionList', meta: { title: '我的门店消费' }, name: 'consumptionList', component: routerPath.consumptionList },
    { path: '/mcard/consumptionDetail', meta: { title: '我的门店消费' }, name: 'consumptionDetail', component: routerPath.consumptionDetail },
    { path: '/mcard/myPatients', meta: { title: '我的就诊人' }, name: 'myPatients', component: routerPath.myPatients },
    { path: '/mcard/mcardBalance', meta: { title: '会员卡余额' }, name: 'mcardBalance', component: routerPath.mcardBalance },
    { path: '/mcard/cashWithdrawals', meta: { title: '提现' }, name: 'cashWithdrawals', component: routerPath.cashWithdrawals },
    { path: '/mcard/allBills', meta: { title: '我的账单' }, name: 'allBills', component: routerPath.allBills },
    { path: '/mcard/withdrawalsSuccess', meta: { title: '提现' }, name: 'withdrawalsSuccess', component: routerPath.withdrawalsSuccess },
    { path: '/mcard/walletPayment', meta: { title: '付款' }, name: 'walletPayment', component: routerPath.walletPayment },
    { path: '/mcard/myBankCard', meta: { title: '我的银行卡' }, name: 'myBankCard', component: routerPath.myBankCard },
    { path: '/mcard/recharge', meta: { title: '充值', sdkConfig: true, jsApiList: ['chooseWXPay'] }, name: 'recharge', component: routerPath.recharge },
    { path: '/mcard/myCoupon', meta: { title: '我的优惠券' }, name: 'myCoupon', component: routerPath.coupon },
    { path: '/mcard/upgradeSuccess', meta: { title: '升级成功' }, name: 'upgradeSuccess', component: routerPath.upgradeSuccess },
    { path: '/mcard/offlineCouponSuccess', meta: { title: '领取成功' }, name: 'offlineCouponSuccess', component: routerPath.offlineCouponSuccess },
    { path: '/mcard/memberUpgrade', meta: { title: '升级会员' }, name: 'memberUpgrade', component: routerPath.memberUpgrade },
    { path: '/mcard/membershipInterests', meta: { title: '会员权益' }, name: 'membershipInterests', component: routerPath.membershipInterests },
    { path: '/mcard/inviteFriendsOne', meta: { title: '邀请好友' }, name: 'inviteFriendsOne', component: routerPath.inviteFriendsOne },
    { path: '/mcard/inviteFriendsResult', meta: { title: '邀请好友' }, name: 'inviteFriendsResult', component: routerPath.inviteFriendsResult },
    { path: '/mcard/appInvite', meta: { title: '邀请好友' }, name: 'appInvite', component: routerPath.appInvite },
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  if (getUrlParam('shareId')) {
    localStorage.setItem('shareId', getUrlParam('shareId'))
  }
  /**
   * 针对线下活动
   * 链接携带参数，经过微信授权回调地址之后会导致链接上的参数丢失，所以先将参数存储
   */
  if (to.path === '/mall/coupon' && to.query.pageFlag === 'mall' && getUrlParam('id')) {
    sessionStorage.setItem('offId', getUrlParam('id'))
  }
  if (to.path === '/mcard/appInvite' || to.path === '/mcard/login') {
    next()
  } else if (!getCookie('qi_openid')) {
    /**
     * 登录之前进行微信鉴权
     * 判断微信是否授权，如果未授权，请求授权
     * 如果已经授权，可以请求sdk认证
     */
    // 微信授权
    getAuthorizeUrlSuper({ pageUri: to.path }).then((res) => {
      location.href = res.data.authorizeUrl
    }).catch((err) => {
      throw err
    })
  } else {
    /* 判断是否登录过 */
    isLogin().then((res) => {
      store.commit('setLoginStatus', res.data.login)
      if (!res.data.login && !noLoginRequired.includes(to.path)) next({ path: '/mcard/login' })
    }).catch((err) => {
      throw err
    })

    /* sdk认证 */
    const jsSdkConRes = await getJsSdkConfig({ url: to.fullPath })
    if (jsSdkConRes.status !== 200) return
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: jsSdkConRes.data.appid, // 必填，公众号的唯一标识
      timestamp: jsSdkConRes.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: jsSdkConRes.data.noncestr, // 必填，生成签名的随机串
      signature: jsSdkConRes.data.sign, // 必填，签名
      jsApiList: ['getLocation', 'openLocation', 'chooseWXPay', 'updateTimelineShareData', 'onMenuShareTimeline', 'updateAppMessageShareData', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    });
    wx.ready(async function () {
      const loginRes = await isLogin()
      if (loginRes.status !== 200) return
      if (!loginRes.data.login) {
        ordinaryShare(to.path, to.query.productId || '', window.location.href, location.origin)
      } else {
        const inviteConRes = await getInviteConfig()
        if (inviteConRes.status !== 200) return
        if (inviteConRes.data.status !== '0') { //活动未开启
          ordinaryShare(to.path, to.query.productId || '', window.location.href, location.origin)
        } else {
          const myInvConRes = await store.dispatch('getMyInviteConfig')
          if (myInvConRes.status !== 200) return
          if (to.path === '/mall/goodsDetail') {
            const prodDeRes = await getProductDetail({ productId: to.query.productId })
            if (prodDeRes.status !== 200) return
            let data = {
              title: prodDeRes.data.product.name,
              desc: '一起来享受高端服务',
              link: decodeURIComponent(`${window.location.href}&?shareId=${myInvConRes.data.shareId}`),
              imgUrl: prodDeRes.data.product.images[0]
            }
            updateTimelineShareDataApi(data)
            onMenuShareAppMessageApi(data)
            updateAppMessageShareDataApi(data)
            onMenuShareTimelineApi(data)
          } else {
            let data = {
              title: getTitle(to.path) || to.meta.title,
              desc: '一起来享受高端服务',
              link: shareSpecialPage.includes(to.path) 
                    ? 
                    (judgeUrlParam(to.query) ? decodeURIComponent(`${myInvConRes.data.sharePageUrl}&?shareId=${myInvConRes.data.shareId}`) : decodeURIComponent(`${myInvConRes.data.sharePageUrl}?shareId=${myInvConRes.data.shareId}`))
                    : 
                    (judgeUrlParam(to.query) ? decodeURIComponent(`${window.location.href}&?shareId=${myInvConRes.data.shareId}`) : decodeURIComponent(`${window.location.href}?shareId=${myInvConRes.data.shareId}`)),
              imgUrl: `${location.origin}/static/img/inviteImg.8b9f908a.png`
            }
            updateTimelineShareDataApi(data)
            onMenuShareAppMessageApi(data)
            updateAppMessageShareDataApi(data)
            onMenuShareTimelineApi(data)
          }
        }
      }
    })
  }

  if (!localStorage.latitude || !localStorage.longitude) {
    const LAL = await getCurrentLocation()
    localStorage.setItem('latitude', LAL.latitude)
    localStorage.setItem('longitude', LAL.longitude)
  }
  next()
})

export default router