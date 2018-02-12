export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear())
  }
  // if (/(M+)/.test(fmt)) {
  //   fmt = fmt.replace(RegExp.$1, date.getMonth() + 1)
  // }
  let map = {
    'M+': date.getMonth() + 1,
    'dd': date.getDay(),
    'hh': date.getHours(),
    'mm': date.getMinutes()
  }
  for (let key in map) {
    if (new RegExp(`(${key})`).test(fmt)) {
      const str = map[key] + ''
      fmt = fmt.replace(RegExp.$1, str.length === 2 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
