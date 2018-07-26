import Socket from '@/util/socket-vue'
import config from '@/util/config'
import store from '@/store'

let WS = new Socket(config, store)
let api = {}
// TODO: 心机包
//  用于验证玩家webSocket链接是否有效。
api.authenticate = function (service, data) {
  return WS.send({
    service: service,
    functionName: 'authenticate',
    data: data
  })
}
// TODO: 玩家
//  登录
api.login = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'login',
    data
  })
}

//  获取用户信息
api.get = (data) => {
  return WS.send({
    service: 'player',
    functionName: 'get',
    data
  })
}

//  获取手机验证码
api.getSMSCode = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'getSMSCode',
    data
  })
}

//   获取图片验证码
api.captcha = function () {
  return WS.send({
    service: 'player',
    functionName: 'captcha'
  })
}

//  玩家开户
api.create = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'create',
    data
  })
}

//  退出
api.logout = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'logout',
    data
  })
}

//  更改头像
api.updatePhotoUrl = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'updatePhotoUrl',
    data
  })
}

//  登入后获取手机验证码
api.sendSMSCodeToPlayer = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'sendSMSCodeToPlayer',
    data
  })
}

//  修改玩家登录密码
api.updatePassword = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'updatePassword',
    data
  })
}

//  获取玩家短信设置
api.getSmsStatus = function () {
  return WS.send({
    service: 'player',
    functionName: 'getSmsStatus'
  })
}
// 获取玩家手机号码
api.updatePhoneNumberWithSMS = (data) => {
  return WS.send({
    service: 'player',
    functionName: 'updatePhoneNumberWithSMS',
    data
  })
}

// 修改玩家短信设置
api.setSmsStatus = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'setSmsStatus',
    data
  })
}

// 获取站内信列表
api.getMailList = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'getMailList',
    data
  })
}

// 读取站内信
api.readMail = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'readMail',
    data
  })
}

//  获取玩家额度
api.getCreditDetail = function (data) {
  return WS.send({
    service: 'player',
    functionName: 'getCreditDetail',
    data
  })
}

// TODO: 平台
//  获取平台信息
api.getPlatformDetails = function () {
  return WS.send({
    service: 'platform',
    functionName: 'getPlatformDetails'
  })
}

//  获取平台信息
api.getConfig = (data) => {
  return WS.send({
    service: 'platform',
    functionName: 'getConfig',
    data
  })
}

//  搜索平台投注记录
api.searchConsumptionRecord = function (data) {
  return WS.send({
    service: 'platform',
    functionName: 'searchConsumptionRecord',
    data
  })
}

// 获取最新消息
api.getPlatformAnnouncements = function (data) {
  return WS.send({
    service: 'platform',
    functionName: 'getPlatformAnnouncements',
    data
  })
}

// TODO: 游戏相关

// 获取游戏列表->获取游戏id
api.getGameGroupInfo = function (data) {
  return WS.send({
    service: 'game',
    functionName: 'getGameGroupInfo',
    data
  })
}

// 获取游戏路径
api.getLoginURL = function (data) {
  return WS.send({
    service: 'game',
    functionName: 'getLoginURL',
    data
  })
}

//  游戏金额转换
api.transferToProvider = function (data) {
  return WS.send({
    service: 'game',
    functionName: 'transferToProvider',
    data
  })
}

api.transferFromProvider = function (data) {
  return WS.send({
    service: 'game',
    functionName: 'transferFromProvider',
    data
  })
}

//  获取游戏提供商列表
api.getProviderList = () => {
  return WS.send({
    service: 'game',
    functionName: 'getProviderList'
  })
}

//
api.getTestLoginURL = (data) => {
  return WS.send({
    service: 'game',
    functionName: 'getTestLoginURL',
    data
  })
}

// TODO:记录相关
//  投注记录
api.search = function (data) {
  return WS.send({
    service: 'consumption',
    functionName: 'search',
    data
  })
}
// TODO:reward 优惠相关
//  优惠记录
api.getPlayerRewardList = function (data) {
  return WS.send({
    service: 'reward',
    functionName: 'getPlayerRewardList',
    data
  })
}

// 优惠列表
api.getRewardList = function (data) {
  return WS.send({
    service: 'reward',
    functionName: 'getRewardList',
    data
  })
}

//  获取优惠信息
api.getSlotInfo = function (data) {
  return WS.send({
    service: 'reward',
    functionName: 'getSlotInfo',
    data
  })
}

// 获取优惠活动
api.applyRewardEvent = function (data) {
  return WS.send({
    service: 'reward',
    functionName: 'applyRewardEvent',
    data
  })
}

// TODO:payment 充值相关

//  获取在线充值方式
api.getOnlineTopupType = function (data) {
  return WS.send({
    service: 'payment',
    functionName: 'getOnlineTopupType',
    data
  })
}

//  获取已经存在的手工充值记录
api.getManualTopupRequestList = function (data) {
  return WS.send({
    service: 'payment',
    functionName: 'getManualTopupRequestList',
    data
  })
}

//  获取可用银行卡类型
api.requestBankTypeByUserName = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'requestBankTypeByUserName',
    data
  })
}

//  获取省份
api.getProvinceList = () => {
  return WS.send({
    service: 'payment',
    functionName: 'getProvinceList'
  })
}

//  获取城市
api.getCityList = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'getCityList',
    data
  })
}

//  获取地区
api.getDistrictList = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'getDistrictList',
    data
  })
}

// requestManualTopup
api.requestManualTopup = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'requestManualTopup',
    data
  })
}

//  取消手工存款申请单
api.cancelManualTopupRequest = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'cancelManualTopupRequest',
    data
  })
}

//  创建在线充值提案
api.createOnlineTopupProposal = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'createOnlineTopupProposal',
    data
  })
}

//  获取支付宝和微信充值状态
api.getPlayerAliPayStatus = () => {
  return WS.send({
    service: 'payment',
    functionName: 'getPlayerAliPayStatus'
  })
}

api.getPlayerWechatPayStatus = () => {
  return WS.send({
    service: 'payment',
    functionName: 'getPlayerWechatPayStatus'
  })
}

//  提交支付宝和微信充值订单
api.requestAlipayTopup = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'requestAlipayTopup',
    data
  })
}

api.requestWechatTopup = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'requestWechatTopup',
    data
  })
}

//  获取已存在的支付宝或微信订单
api.getAlipayTopupRequestList = () => {
  return WS.send({
    service: 'payment',
    functionName: 'getAlipayTopupRequestList'
  })
}

api.getWechatTopupRequestList = () => {
  return WS.send({
    service: 'payment',
    functionName: 'getWechatTopupRequestList'
  })
}

//  获取银行卡列表
api.getBankTypeList = () => {
  return WS.send({
    service: 'payment',
    functionName: 'getBankTypeList'
  })
}

//  提款
api.applyBonus = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'applyBonus',
    data
  })
}

//  修改银行卡资料
api.updatePaymentInfo = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'updatePaymentInfo',
    data
  })
}

//  充值记录
api.getTopupHistory = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'getTopupHistory',
    data
  })
}

api.getBonusRequestList = (data) => {
  return WS.send({
    service: 'payment',
    functionName: 'getBonusRequestList',
    data
  })
}

export default api
