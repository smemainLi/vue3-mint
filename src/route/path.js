/* 首页 */
export const Index = r => require.ensure([], () => r(require('../views/index.vue')), e => console.log(e), 'Index')

/* 预约 */
export const order = r => require.ensure([], () => r(require('../views/order/index.vue')), e => console.log(e), 'order')

/* 缴费 */
export const pay = r => require.ensure([], () => r(require('../views/pay/index.vue')), e => console.log(e), 'pay')

/* 精选项目 */
export const choice = r => require.ensure([], () => r(require('../views/choice/index.vue')), e => console.log(e), 'choice')

/* 同道商城 */
export const mall = r => require.ensure([], () => r(require('../views/mall/index.vue')), e => console.log(e), 'mall')

/* 在线咨询 */
export const consult = r => require.ensure([], () => r(require('../views/consult/index.vue')), e => console.log(e), 'consult')

/* 预约记录 */
export const arecord = r => require.ensure([], () => r(require('../views/arecord/index.vue')), e => console.log(e), 'arecord')

/* 缴费记录 */
export const precord = r => require.ensure([], () => r(require('../views/precord/index.vue')), e => console.log(e), 'precord')

/* 我买的商品 */
export const bought = r => require.ensure([], () => r(require('../views/bought/index.vue')), e => console.log(e), 'bought')

/* 会员卡 */
export const mcard = r => require.ensure([], () => r(require('../views/mcard/index.vue')), e => console.log(e), 'mcard')