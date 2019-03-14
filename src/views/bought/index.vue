<template>
  <div class="bought">
    <tabs :tabList="tabList"></tabs>
    <date-shopping :dateShoppingItem="item" v-for="(item,index) in dateShoppingList" :key="index"></date-shopping>
  </div>
</template>

<script>
import tabs from '../../components/bought/tabs.vue'
import dateShopping from '../../components/bought/dateShopping.vue'
export default {
  data () {
    return {
      tabList: [
        { tabName: '全部' },
        { tabName: '待付款' },
        { tabName: '待发货' },
        { tabName: '待收货' }
      ],
      shoppingStatus: '已完成',
      dateShoppingList: [
        {
          shoppingDate: '2018-12-10',
          shoppingStatus: '已完成',
          goodsList: [
            {
              goodsImg: require('../../assets/images/bought/consumeImg1.png'),
              goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: true
            },
            {
              goodsImg: require('../../assets/images/bought/consumeImg1.png'),
              goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: false
            }
          ],
          smallBtnList: [{ smallBtnName: '查看详情', path: '/bought/orderDetailCopy', isDeep: false }],
          /* ['已完成', '已消费', '待发货'].includes(this.shoppingStatus) ? [{ smallBtnName: '查看详情', isDeep: false }]
            : this.shoppingStatus === '待消费' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '查看劵码', isDeep: true }]
              : this.shoppingStatus === '待付款' ? [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }]
                : this.shoppingStatus === '待收货' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }]
                  : [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: false }], // 已经取消 */
          totalNum: '共2件',
          totalMoneyContent: '￥336'
        },
        {
          shoppingDate: '2018-12-10',
          shoppingStatus: '待消费',
          goodsList: [
            {
              goodsImg: require('../../assets/images/bought/consumeImg2.png'),
              goodsInfo: '隐适美隐形正畸牙齿矫正成人牙齿整形优雅套餐',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: false
            }
          ],
          smallBtnList: [{ smallBtnName: '查看详情', path: '/bought/orderDetail', isDeep: false }, { smallBtnName: '查看劵码', path: '/bought/orderDetail', isDeep: true }],
          /* ['已完成', '已消费', '待发货'].includes(this.shoppingStatus) ? [{ smallBtnName: '查看详情', isDeep: false }]
            : this.shoppingStatus === '待消费' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '查看劵码', isDeep: true }]
              : this.shoppingStatus === '待付款' ? [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }]
                : this.shoppingStatus === '待收货' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }]
                  : [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: false }], // 已经取消 */
          totalNum: '共1件',
          totalMoneyContent: '￥336'
        },
        {
          shoppingDate: '2018-12-10',
          shoppingStatus: '已消费',
          goodsList: [
            {
              goodsImg: require('../../assets/images/bought/consumeImg1.png'),
              goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: false
            }
          ],
          smallBtnList: [{ smallBtnName: '查看详情', isDeep: false }],
          /* ['已完成', '已消费', '待发货'].includes(this.shoppingStatus) ? [{ smallBtnName: '查看详情', isDeep: false }]
            : this.shoppingStatus === '待消费' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '查看劵码', isDeep: true }]
              : this.shoppingStatus === '待付款' ? [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }]
                : this.shoppingStatus === '待收货' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }]
                  : [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: false }], // 已经取消 */
          totalNum: '共1件',
          totalMoneyContent: '￥336'
        },
        {
          shoppingDate: '2018-12-10',
          shoppingStatus: '待付款',
          goodsList: [
            {
              goodsImg: require('../../assets/images/bought/consumeImg1.png'),
              goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: false
            }
          ],
          smallBtnList: [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }],
          /* ['已完成', '已消费', '待发货'].includes(this.shoppingStatus) ? [{ smallBtnName: '查看详情', isDeep: false }]
            : this.shoppingStatus === '待消费' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '查看劵码', isDeep: true }]
              : this.shoppingStatus === '待付款' ? [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }]
                : this.shoppingStatus === '待收货' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }]
                  : [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: false }], // 已经取消 */
          totalNum: '共1件',
          totalMoneyContent: '￥336'
        },
        {
          shoppingDate: '2018-12-10',
          shoppingStatus: '待发货',
          goodsList: [
            {
              goodsImg: require('../../assets/images/bought/consumeImg1.png'),
              goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: false
            }
          ],
          smallBtnList: [{ smallBtnName: '查看详情', isDeep: false }],
          /* ['已完成', '已消费', '待发货'].includes(this.shoppingStatus) ? [{ smallBtnName: '查看详情', isDeep: false }]
            : this.shoppingStatus === '待消费' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '查看劵码', isDeep: true }]
              : this.shoppingStatus === '待付款' ? [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }]
                : this.shoppingStatus === '待收货' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }]
                  : [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: false }], // 已经取消 */
          totalNum: '共1件',
          totalMoneyContent: '￥336'
        },
        {
          shoppingDate: '2018-12-10',
          shoppingStatus: '待收货',
          goodsList: [
            {
              goodsImg: require('../../assets/images/bought/consumeImg1.png'),
              goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: false
            }
          ],
          smallBtnList: [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }],
          /* ['已完成', '已消费', '待发货'].includes(this.shoppingStatus) ? [{ smallBtnName: '查看详情', isDeep: false }]
            : this.shoppingStatus === '待消费' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '查看劵码', isDeep: true }]
              : this.shoppingStatus === '待付款' ? [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }]
                : this.shoppingStatus === '待收货' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }]
                  : [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: false }], // 已经取消 */
          totalNum: '共1件',
          totalMoneyContent: '￥336'
        },
        {
          shoppingDate: '2018-12-10',
          shoppingStatus: '已取消',
          goodsList: [
            {
              goodsImg: require('../../assets/images/bought/consumeImg2.png'),
              goodsInfo: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒',
              goodsPrice: '￥168.00',
              goodsNumber: 'x2',
              hasBr: false
            }
          ],
          smallBtnList: [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: true }],
          /* ['已完成', '已消费', '待发货'].includes(this.shoppingStatus) ? [{ smallBtnName: '查看详情', isDeep: false }]
            : this.shoppingStatus === '待消费' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '查看劵码', isDeep: true }]
              : this.shoppingStatus === '待付款' ? [{ smallBtnName: '取消订单', isDeep: false }, { smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '立即支付', isDeep: true }]
                : this.shoppingStatus === '待收货' ? [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }]
                  : [{ smallBtnName: '查看详情', isDeep: false }, { smallBtnName: '删除', isDeep: false }], // 已经取消 */
          totalNum: '共1件',
          totalMoneyContent: '￥336'
        }
      ]
    }
  },
  components: { tabs, dateShopping },
  methods: {
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.bought {
  padding: 0 0 120px 0;
}
</style>
