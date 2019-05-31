import wx from 'weixin-js-sdk'
import { getProductDetail } from '../utils/getData'

const shareSpecialPage = [
  '/mcard/inviteFriendsOne'
]

/**
 * 获取用户当前地理位置
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    wx.ready(function () {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        timeout: 3000,
        success: function (res) {
          resolve({ latitude: res.latitude, longitude: res.longitude })
          // localStorage.setItem('latitude', res.latitude)// 经度
          // localStorage.setItem('longitude', res.longitude)// 纬度
        },
        fail: function (err) {
          reject(err)
          throw new Error(err)
        }
      })
    })
  })
}

export const getTitle = function (judgeVal) {
  if (shareSpecialPage.includes(judgeVal)) {
    return '天哪，你居然还不知道有这种好事'
  } else
    return ''
}

/* 分享朋友圈（新版本） */
export const updateTimelineShareDataApi = function (data) {
  wx.updateTimelineShareData({
    title: data.title, // 分享标题
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () {
      // 设置成功
    },
    fail: function (err) { }
  })
}

/* 分享朋友圈（旧版本） */
export const onMenuShareTimelineApi = function (data) {
  wx.onMenuShareTimeline({
    title: data.title, // 分享标题
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () {
      // 用户点击了分享后执行的回调函数
    },
    fail: function () { }
  })
}

/* 分享给朋友（新版本） */
export const updateAppMessageShareDataApi = function (data) {
  wx.updateAppMessageShareData({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    success: function () {
      // 用户点击了分享后执行的回调函数
    },
    fail: function () { }
  })
}

/* 分享给朋友（旧版本） */
export const onMenuShareAppMessageApi = function (data) {
  wx.onMenuShareAppMessage({
    title: data.title, // 分享标题
    desc: data.desc, // 分享描述
    link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.imgUrl, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // 用户点击了分享后执行的回调函数
    },
    fail: function () { }
  });
}

/* 未登录、活动未开启普通分享 */
export const ordinaryShare = (path, paramId, currPath, originPath) => {
  if (path === '/mall/goodsDetail') {
    getProductDetail({ productId: paramId }).then((productResult) => {
      if (productResult.status !== 200) return
      let data = {
        title: productResult.data.product.name,
        desc: '一起来享受高端服务',
        link: decodeURIComponent(currPath),
        imgUrl: productResult.data.product.images[0]
      }
      updateTimelineShareDataApi(data)
      onMenuShareAppMessageApi(data)
      updateAppMessageShareDataApi(data)
      onMenuShareTimelineApi(data)
    }).catch((error) => { });
  } else {
    let data = {
      title: getTitle(path) || to.meta.title,
      desc: '一起来享受高端服务',
      link: decodeURIComponent(currPath),
      imgUrl: `${originPath}/static/img/inviteImg.8b9f908a.png`,
    }
    updateTimelineShareDataApi(data)
    onMenuShareAppMessageApi(data)
    updateAppMessageShareDataApi(data)
    onMenuShareTimelineApi(data)
  }
}

/* 验证地址上面是否携带参数 */
export const judgeUrlParam = (query) => {
  if (JSON.stringify(query) === '{}') return false
  else return true
}

export const linkUrl = (to, configResult, href) => {
  if (shareSpecialPage.includes(to.path)) {
    judgeUrlParam(to.query) ? decodeURIComponent(`${configResult.data.sharePageUrl}&?shareId=${configResult.data.shareId}`) : decodeURIComponent(`${configResult.data.sharePageUrl}?shareId=${configResult.data.shareId}`)
  } else {
    judgeUrlParam(to.query) ? decodeURIComponent(`${href}&?shareId=${configResult.data.shareId}`) : decodeURIComponent(`${href}?shareId=${configResult.data.shareId}`)
  }
}