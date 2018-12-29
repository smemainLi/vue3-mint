/**
 * 将中国标准时间转化为yyyy-MM-dd格式
 * @param {*} val
 */
export const timeFormat = (val) => {
  return val.getFullYear() + '-' + (val.getMonth() + 1) + '-' + val.getDate()
}