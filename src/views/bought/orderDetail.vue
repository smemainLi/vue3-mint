<template>
  <div class="order-detail">
    <div class="order-status-tips" v-cloak>{{orderStatusTips}}</div>
    <logistics v-show="!isServer"></logistics>
    <address-item v-show="!isServer" class="order-detail-address" :addressItem="addressItem"></address-item>
    <goods-item :goodsItem="item" v-for="(item,index) in goodsList" :key="'goods'+index"></goods-item>
    <qrcode-consumption></qrcode-consumption>
    <situation-row :situationItem="item" v-for="(item,index) in situationList" :key="'situation'+index"></situation-row>
    <div class="order-detail-system">
      <system-row :systemItem="item" v-for="(item,index) in systemList" :key="'system'+index"></system-row>
    </div>
    <div class="order-detail-btn">
      <small-button :smallBtnItem="item" v-for="(item,index) in smallBtnList" :key="'smallBtn'+index"></small-button>
    </div>
  </div>
</template>

<script>
import logistics from '../../components/bought/logistics.vue'
import addressItem from '../../components/mall/addressItem.vue'
import goodsItem from '../../components/mall/goodsItem.vue'
import qrcodeConsumption from '../../components/bought/qrcodeConsumption.vue'
import situationRow from '../../components/bought/situationRow.vue'
import systemRow from '../../components/bought/systemRow.vue'
import smallButton from '../../components/bought/smallButton.vue'
export default {
  data () {
    return {
      // orderStatusTips: '待收货',
      orderStatusTips: '待消费',
      isServer: true, // 测试使用
      addressItem: { nickname: '露玖小姐姐', phone: '18838868886', isDefault: false, operateFlag: 'orderDetail', address: '珠海市上冲14村里面4455号一般早上在家早上在家早上在家。', hasBr: false },
      goodsList: [
        // { goodsImg: require('../../assets/images/bought/consumeImg1.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', goodsNum: 'x2', hasBr: true }
        // { goodsImg: require('../../assets/images/bought/consumeImg1.png'), goodsIntroduce: '3件装 | MEDIHEAL 美迪惠尔N.M.F针剂水库保湿面膜 10片/盒', goodsPrice: '￥150', goodsNum: 'x2', hasBr: true },
        { goodsImg: require('../../assets/images/bought/consumeImg2.png'), goodsIntroduce: '隐适美隐形正畸牙齿矫正成人牙齿整形优雅套餐', goodsPrice: '￥368', goodsNum: 'x1', hasBr: false }
      ],
      situationList: [
        // { rowTitle: '运费', rowContent: '￥10', isLight: false, hasBr: true },
        // { rowTitle: '留言备注', rowContent: '尽量快点发货吧，我急。', isLight: true, hasBr: true },
        { rowTitle: '商品总价', rowContent: '￥676', isLight: false, hasBr: true },
        { rowTitle: '满减', rowContent: '-￥76', isLight: false, hasBr: true },
        { rowTitle: '优惠券', rowContent: '-￥76', isLight: false, hasBr: true },
        { rowTitle: '订单金额', rowContent: '￥600', isLight: false, hasBr: false }
      ],
      systemList: [
        { systemTitle: '订单编号：', systemContent: '654896567568' },
        { systemTitle: '创建时间：', systemContent: '2019-01-02 14:25' },
        { systemTitle: '付款时间：', systemContent: '2019-01-02 14:30' },
        { systemTitle: '付款方式：', systemContent: '微信支付' }
      ],
      smallBtnList: [
        { smallBtnName: '售后', isDeep: false }, { smallBtnName: '确认收货', isDeep: false }, { smallBtnName: '查看物流', isDeep: true }
      ]
    }
  },
  components: { logistics, addressItem, goodsItem, situationRow, systemRow, smallButton, qrcodeConsumption }
}
</script>

<style lang="scss" scoped>
.order-detail {
  padding-bottom: 120px;
  .order-status-tips {
    width: 100%;
    height: 88px;
    font-size: 28px;
    color: $color-028EA9;
    padding: 0 0 0 32px;
    box-sizing: border-box;
    line-height: 88px;
    background-color: $color-F2FDFF;
  }
  .order-detail-address {
    margin-bottom: 24px;
  }
  .order-detail-system {
    margin-top: 24px;
    padding: 12px 32px;
    background-color: $color-ff;
  }
  .order-detail-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 98px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 24px 32px;
    box-sizing: border-box;
    background-color: $color-ff;
  }
}
</style>
