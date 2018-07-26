/**
 * 配置编译环境和线上环境之间的切换
 * platformId: 平台ID
 */
let config = {
  platformId: 2,
  url: ''
}
const protocol = window.location.protocol
const host = window.location.host
const head = protocol === 'http:' ? 'ws' : 'wss'
if (process.env.NODE_ENV === 'production') {
  config.url = head + '://' + host + /websocket/
} else {
  // config.url = 'wss://bbetasia-fpms-web.neweb.me/websocket'
  config.url = 'ws://192.168.10.199:9280/'
}

export default config
