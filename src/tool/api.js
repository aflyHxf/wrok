import socketVue from '@/tool/socket-vue'
import config from '@/tool/config'
import tool from '@/tool'
import store from '@/store'

// 需本地暂存的数据调取方式
const findSession = (sendDate, data) => {
    let functionName = sendDate.functionName;
    let promise, sessionData = tool.getSession(functionName);
    if (sessionData) {
        promise = new Promise((resolve, reject) => {
            resolve(sessionData)
        });
    } else {
        promise = WS.send(sendDate);
        promise.then(res => {
            tool.setSession(functionName, res, data);
        });
    }
    ;
    return promise;
}


/****************************************创建ws对象************************************/
//
let WS = new socketVue(config, store);
let api = {};

/***************************************心机包***************************************/
//用于验证玩家webSocket链接是否有效。
api.authenticate = function (service, data) {
    return WS.send({
        service: service,
        functionName: 'authenticate',
        data: data
    })
}

/***************************************玩家***************************************/
//登录
api.login = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'login',
        data
    });
}

//获取手机验证码(注册)
api.getSMSCode = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'getSMSCode',
        data
    })
}

//玩家开户
api.create = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'player',
        data
    })
}

//退出
api.logout = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'logout',
        data
    })
}

//更改头像
api.updatePhotoUrl = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'updatePhotoUrl',
        data
    })
}

//登入后获取手机验证码
api.sendSMSCodeToPlayer = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'sendSMSCodeToPlayer',
        data
    })
}

//修改玩家登录密码
api.updatePassword = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'updatePassword',
        data
    })
}


//获取玩家短信设置
api.getSmsStatus = function () {
    return WS.send({
        service: 'player',
        functionName: 'getSmsStatus'
    })
}

//修改玩家短信设置
api.setSmsStatus = function (data) {
    return WS.send({
        service: 'player',
        functionName: 'setSmsStatus',
        data
    })
}

//获取站内信列表
api.getMailList =function(data){
    return WS.send({
        service: 'player',
        functionName: 'getMailList',
        data
    })
}


//读取站内信
api.readMail = function(data){
    return WS.send({
        service: 'player',
        functionName: 'readMail',
        data
    })
}

// 获取玩家额度
api.getCreditDetail = function(data){
    return WS.send({
        service: 'player',
        functionName: 'getCreditDetail',
        data
    })
}


/***************************************平台***************************************/

// 获取平台信息
api.getPlatformDetails = function (data) {
    return findSession({
        service: 'platform',
        functionName: 'getPlatformDetails'
    })
}

// 搜索平台投注记录
api.searchConsumptionRecord = function (data) {
    return WS.send({
        service: 'platform',
        functionName: 'searchConsumptionRecord',
        data
    })
}


//获取最新消息
api.getPlatformAnnouncements = function (data) {
    return WS.send({
        service: 'platform',
        functionName: 'getPlatformAnnouncements',
        data
    })
}

/*************************************** 游戏相关 ***************************************/
//获取游戏列表->获取游戏id
api.getGameGroupInfo = function (data) {
    return WS.send({
        service: 'game',
        functionName: 'getGameGroupInfo',
        data
    })
}

//获取游戏路径
api.getLoginURL = function (data) {
    return WS.send({
        service: 'game',
        functionName: 'getLoginURL',
        data
    })
}

// 游戏金额转换
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

/*************************************** 记录相关 ***************************************/
// 投注记录
api.search = function (data) {
    return WS.send({
        service:'consumption',
        functionName: 'search',
        data
    })
}

/*************************************** reward 优惠相关 ***************************************/

// 优惠记录
api.getPlayerRewardList =function (data) {
    return WS.send({
        service:'reward',
        functionName: 'getPlayerRewardList',
        data
    })
}

//优惠列表
api.getRewardList = function (data) {
    return WS.send({
        service:'reward',
        functionName: 'getRewardList',
        data
    })
}



export default api
