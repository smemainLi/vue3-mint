import vue from 'vue'
/**
 * 将中国标准时间转化为yyyy-MM-dd格式
 * @param {*} val
 */
export const timeFormat = (val) => {
  return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
}

/**
 * 将值存入cookie
 * @param {*} name 
 * @param {*} value 
 */
export const setCookie = (name, value) => {
  var Days = 7; //有效期为7天
  //取出当前日期，加上7天，得出有效截止日期
  var exp = new Date();
  exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expries=" + exp.toGMTString() + ";path=/";
}

/**
 * 获取cookie
 * @param cname 
 */
export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

/**
 * 获取地址栏参数并转码
 * @param name
 * @returns {*}
 */
export const getUrlParam = (name) => {
  //构造一个含有目标参数的正则表达式对象
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  var r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r != null) return decodeURI(r[2]);
  return null;
}

/**
 * 禁止页面滚动
 * @param {boolean} isFixed 
 */
let topVal = 0 //记录滚动的高度
export const stopBodyScroll = (isFixed) => {
  let bodyEl = document.body
  let top = 0
  if (isFixed) {
    top = window.scrollY
    topVal = top // 存储这个值，当点击取消的时候可以用到
    bodyEl.style.position = 'fixed'
    bodyEl.style.top = -top + 'px'
  } else {
    top = topVal
    bodyEl.style.position = ''
    bodyEl.style.top = ''
    window.scrollTo(0, top) // 回到原先的top
  }
}

/**
 * 判断类型，对应跳转  obj.type 1、商品，2、分类，3、url，4、优惠券领取
 * @param {object} obj 
 */
export const typeJump = (obj) => {
  switch (obj.type) {
    case '1':
      location.href = `${location.origin}/mall/goodsDetail?productId=${obj.targetId}`
      break
    case '2':
      location.href = `${location.origin}/mall/classify/1?categoryId=${obj.targetId}`
      break
    case '3':
      location.href = obj.url
      break
    case '4':
      location.href = `${location.origin}/mall/coupon?pageFlag=mall`
      break
    default:
      break
  }
}

/**
 * 将秒数转化为时分秒
 * @param {*} val 
 */
export const formatHMS = (val) => {
  let seconds = Number(val)
  let hh = parseInt(seconds / 3600);
  if (hh < 10) hh = "0" + hh;
  let mm = parseInt((seconds - hh * 3600) / 60);
  if (mm < 10) mm = "0" + mm;
  let ss = parseInt((seconds - hh * 3600) % 60);
  if (ss < 10) ss = "0" + ss;
  let length = hh + "时" + mm + "分" + ss + "秒";
  return length
}


/**
 * 联系客服配置准备
 * @param {number} open 
 */
export const connectService = (open) => {
  (function (m, ei, q, i, a, j, s) {
    m[i] = m[i] || function () {
      (m[i].a = m[i].a || []).push(arguments)
    }
    j = ei.createElement(q)
    s = ei.getElementsByTagName(q)[0]
    j.async = true
    j.charset = 'UTF-8'
    j.src = 'https://static.meiqia.com/dist/meiqia.js?_=t'
    s.parentNode.insertBefore(j, s)
  })(window, document, 'script', '_MEIQIA')
  _MEIQIA('entId', 147569)
  _MEIQIA('clientId', localStorage.currentPhone)
  _MEIQIA('withoutBtn')
  if (open) {
    _MEIQIA('allSet', () => {
      _MEIQIA('showPanel');
    })
  } else {
    _MEIQIA('allSet')
  }
  _MEIQIA('init')
}