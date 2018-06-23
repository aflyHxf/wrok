/**
 * 配置编译环境和线上环境之间的切换
 * platformId: 平台ID
 */
let config={
    platformId:9,
    url:''
}
if (process.env.NODE_ENV === 'production') {
    config.url = head + '://' + host + /websocket/
} else {
    config.url = 'ws://192.168.10.199:9280'
}

export default config
