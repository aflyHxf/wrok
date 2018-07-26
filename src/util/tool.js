// 定义Tool
let Tool = {}
Tool.setSession = function (key, val) {
  sessionStorage.setItem(key, JSON.stringify(val))
}
Tool.getSession = function (key) {
  return JSON.parse(sessionStorage.getItem(key))
}
Tool.removeSession = function (key) {
  return sessionStorage.removeItem(key)
}

Tool.setLocal = function (key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}
Tool.getLocal = function (key) {
  return JSON.parse(localStorage.getItem(key))
}
Tool.removeLocal = function (key) {
  return localStorage.removeItem(key)
}
// 获取设备类型
Tool.clientType = () => {
  let clientType = 2
  let isIosApp = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent)
  let isAndroidApp = window.native ? 1 : 0
  if (isIosApp || isAndroidApp) {
    clientType = 4
  }
  return clientType
}

export default Tool
