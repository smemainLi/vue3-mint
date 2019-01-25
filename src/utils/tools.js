/**
 * 将中国标准时间转化为yyyy-MM-dd格式
 * @param {*} val
 */
export const timeFormat = (val) => {
  return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
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