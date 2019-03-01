/* 首页 */
export const Index = r => require.ensure([], () => r(require('../views/index.vue')), e => console.log(e), 'Index')

/* 预约 */
export const order = r => require.ensure([], () => r(require('../views/order/index.vue')), e => console.log(e), 'order')
export const onlineBooking = r => require.ensure([], () => r(require('../views/order/onlineBooking.vue')), e => console.log(e), 'onlineBooking')
export const addOrEdit = r => require.ensure([], () => r(require('../views/order/addOrEdit.vue')), e => console.log(e), 'addOrEdit')
export const payment = r => require.ensure([], () => r(require('../views/order/payment.vue')), e => console.log(e), 'payment')
export const orderSuccess = r => require.ensure([], () => r(require('../views/order/orderSuccess.vue')), e => console.log(e), 'orderSuccess')
export const payPassword = r => require.ensure([], () => r(require('../views/order/payPassword.vue')), e => console.log(e), 'payPassword')

/* 缴费 */
export const pay = r => require.ensure([], () => r(require('../views/pay/index.vue')), e => console.log(e), 'pay')

/* 精选项目 */
export const choice = r => require.ensure([], () => r(require('../views/choice/index.vue')), e => console.log(e), 'choice')

/* 同道商城 */
export const mall = r => require.ensure([], () => r(require('../views/mall/index.vue')), e => console.log(e), 'mall')
export const addOrEditAddress = r => require.ensure([], () => r(require('../views/mall/addOrEditAddress.vue')), e => console.log(e), 'addOrEditAddress')
export const paymentSuccess = r => require.ensure([], () => r(require('../views/mall/paymentSuccess.vue')), e => console.log(e), 'paymentSuccess')
export const chooseAddress = r => require.ensure([], () => r(require('../views/mall/chooseAddress.vue')), e => console.log(e), 'chooseAddress')
export const shoppingCart = r => require.ensure([], () => r(require('../views/mall/shoppingCart.vue')), e => console.log(e), 'shoppingCart')

/* 在线咨询 */
export const consult = r => require.ensure([], () => r(require('../views/consult/index.vue')), e => console.log(e), 'consult')

/* 预约记录 */
export const arecord = r => require.ensure([], () => r(require('../views/arecord/index.vue')), e => console.log(e), 'arecord')
export const appointmentDetails = r => require.ensure([], () => r(require('../views/arecord/appointmentDetails.vue')), e => console.log(e), 'appointmentDetails')

/* 缴费记录 */
export const precord = r => require.ensure([], () => r(require('../views/precord/index.vue')), e => console.log(e), 'precord')

/* 我买的商品 */
export const bought = r => require.ensure([], () => r(require('../views/bought/index.vue')), e => console.log(e), 'bought')

/* 会员卡 */
export const mcard = r => require.ensure([], () => r(require('../views/mcard/index.vue')), e => console.log(e), 'mcard')
export const login = r => require.ensure([], () => r(require('../views/mcard/login.vue')), e => console.log(e), 'login')
export const protocol = r => require.ensure([], () => r(require('../views/mcard/protocol.vue')), e => console.log(e), 'protocol')
export const onceProtocol = r => require.ensure([], () => r(require('../views/mcard/onceProtocol.vue')), e => console.log(e), 'onceProtocol')
export const consumptionList = r => require.ensure([], () => r(require('../views/mcard/consumptionList.vue')), e => console.log(e), 'consumptionList')
export const consumptionDetail = r => require.ensure([], () => r(require('../views/mcard/consumptionDetail.vue')), e => console.log(e), 'consumptionDetail')
export const myPatients = r => require.ensure([], () => r(require('../views/mcard/myPatients.vue')), e => console.log(e), 'myPatients')
export const mcardBalance = r => require.ensure([], () => r(require('../views/mcard/mcardBalance.vue')), e => console.log(e), 'mcardBalance')
export const cashWithdrawals = r => require.ensure([], () => r(require('../views/mcard/cashWithdrawals.vue')), e => console.log(e), 'cashWithdrawals')
export const allBills = r => require.ensure([], () => r(require('../views/mcard/allBills.vue')), e => console.log(e), 'allBills')
export const withdrawalsSuccess = r => require.ensure([], () => r(require('../views/mcard/withdrawalsSuccess.vue')), e => console.log(e), 'withdrawalsSuccess')
export const walletPayment = r => require.ensure([], () => r(require('../views/mcard/walletPayment.vue')), e => console.log(e), 'walletPayment')
export const myBankCard = r => require.ensure([], () => r(require('../views/mcard/myBankCard.vue')), e => console.log(e), 'myBankCard')
export const recharge = r => require.ensure([], () => r(require('../views/mcard/recharge.vue')), e => console.log(e), 'recharge')