import Vue from 'vue'
import tool from '@/util/tool'
/* eslint-disable */
const errMsg = {
  '该手机号码已被注册，请更换或联系客服。': '联系电话号码已存在，请联系客服人员核实',
  '无可用短信验证码，请重新获取': '验证码已失效，请重新获取',
  '没有可分配银行卡或更换金额从新申请': '银行卡被占用，请更换金额或方式重新申请',
  '未达到周期内存款笔数条件': '本次申请不符合要求，请联系客服核实',
  '超出周期内可领取优惠次数，无法同时领取优惠': '您已领取过此优惠，请选择其他优惠类型进行充值并在存款后领取其他优惠哦'
}

// 用户未登录处理
function notLogin(store) {
  store.dispatch('setLogout', () => {
    Vue.$vux({
      content: '验证失败, 请先登录',
      confirmText: '去登录',
      onConfirm() {
        tool.router.push('/login');
      },
      onCancel () {}
    })
  })
}

function Socket(config, store) {
  this.url = config.url;
  this.connectCount = 0;
  this.tryCount = 0;
  this.store = store;
  this.platformId = config.platformId;
  this.count = 1;
  this.heartBeat = {
    open: true,
    valid: true,
    intervalTime: 40000,
    timeOut: 15000,
    maxTry: 100,
    checkQueue: {}
  };
  this.delayQueue = [];
  // this.loadQueue = [];
  this.callback = {};
  this.fromCallback = {};
  this.valid = false;
  this.isOpen = false;
  this.err = false;
  this.init();
}

Socket.prototype = {
  init: function () {
    this.ws && this.ws.close();
    this.ws = new WebSocket(this.url);
    this.tryCount++;
    this.ws.onopen = this.onOpenCallback.bind(this);
    this.ws.onerror = this.onErrorCallback.bind(this);
    this.ws.onclose = this.onCloseCallback.bind(this);
    this.ws.onmessage = this.onMessageCallback.bind(this);
    this.isOpen = true;
    this.user = tool.getSession('userInfo') || '';
    return this;
  },
  onOpenCallback: function () {
    //如果是在中途断线链接需重新验证用户有效性
    if (this.user && this.count > 1) {
      this.send({
        data: {
          token: this.user.token,
          _silence: true,
          _closeCONFIRM: true
        }
      }).then(() => {
        this.delayFun();
      }).catch(() => {
        window.location.reload();
      });
    } else {
      this.delayFun();
    }
  },
  delayFun: function () {
    console.log(new Date() + ':服务器连接成功...');
    this.isOpen = false;
    this.valid = true;
    this.err = false;
    this.connectCount++;
    this.tryCount = 0;
    this.delayQueue.length > 0 && this.delayQueue.map(item => {
      this.load(item)
    })
    this.delayQueue = [];
    this.heartBeat.open && this.startHeartBeat();
  },
  onMessageCallback: function (res) {
    let respData = JSON.parse(res.data);
    let name = respData.requestId || null;
    // 服务端主动推送接口
    if (!name) {
      let fun = this.fromCallback[respData.functionName].fun;
      fun && fun(respData.data);
      return;
    }
    let callback = this.callback[name];
    if(!callback.data.data._silence&&this.store){
      this.store.commit('SET_LOADING_STATUS', false)
    }
    if (callback.data.data._heartBeat) {
      this.heartBeat.valid = true;
    }
    //用户未登录status==420
    if (respData['data']['status'] === 420) {
      //用户未登录处理
      if (this.user.playerId) {
        this.send({
          service: 'player',
          functionName: 'authenticate',
          data: {
            token: this.user.token,
            _silence: true,
            _closeCONFIRM: true
          }
        }).then(() => {
          let sendData = callback.data;
          if(!sendData.data._silence){
            this.store.commit('SET_LOADING_STATUS', true)
          }
          this.ws.send(JSON.stringify(sendData));
        })
      } else {
        notLogin(this.store)
      }
    } else if (respData['data']['status'] === 200) {
      callback.promise.resolve(respData['data']);
      delete this.callback[name];
    } else if (respData['data']['status'] !== 200 && respData['data']['status'] !== 420) {
      if(callback.data.data._closeCONFIRM){
        callback.promise.reject(respData['data']);
      }else {
        let errorMessage = respData['data'].errorMessage;
        if (errMsg[respData['data'].errorMessage]) {
          errorMessage = errMsg[respData['data'].errorMessage];
        }
        Vue.$vux.confirm.show({
          content:errorMessage,
          showCancelButton:false,
          onConfirm() {
          },
        })
        callback.promise.reject(respData['data']);
      }
      delete this.callback[name];
    }
  },
  onErrorCallback: function () {
    console.log(new Date() + ':服务器连接发生错误');
    if (!this.err) {
      this.init();
    } else {
      const _this = this
      Vue.$vux.confirm.show({
        content:'网络链接超时,请确认网络通畅后重试',
        confirmText:'重试',
        onConfirm() {
          _this.init();
        }
      })
    }
    this.err = true;
    this.isOpen = false;
  },
  onCloseCallback: function () {
    console.log(new Date() + ':服务器连接关闭');
    this.heartBeatTimer && clearInterval(this.heartBeatTimer);
    if (!this.err) {
      if (this.valid) {
        this.init();
      } else {
        const _this = this
        Vue.$vux.confirm.show({
          content:'网络链接超时,请确认网络通畅后重试',
          confirmText:'重试',
          onConfirm() {
            _this.init();
          }
        })
      }
      if (this.store && this.store.state.loading) {
        this.store.commit('SET_LOADING_STATUS', false)
      }
    }
    this.isOpen = false;
    this.valid = false;
  },
  promiseFun: function (resolve, reject) {
    this.reject = reject;
    this.resolve = resolve;
  },
  createPromise: function () {
    let promise = new Promise(this.promiseFun.bind(this))
    promise.reject = this.reject;
    promise.resolve = this.resolve;
    return promise;
  },
  send: function (opt) {
    let promise = this.createPromise();
    if (this.ws.readyState !== WebSocket.OPEN) {
      !this.delayQueue.includes([opt, promise]) && this.delayQueue.push([opt, promise]);
      if (!this.isOpen) {
        this.init();
      }
      return promise;
    }
    this.load([opt, promise]);
    return promise;
  },
  from: function (opt) {
    this.fromCallback[opt.functionName] = opt;
  },
  load: function (arr) {
    let index = 'RQ' + this.count, sendData = arr[0];
    this.callback[index] = {};
    if (!sendData.data) {
      sendData['data'] = {};
    }
    sendData['data']['requestId'] = index;
    sendData['data']['platformId'] = this.platformId;
    if (this.user) {
      sendData['data']['playerId'] = this.user.playerId
    }
    this.callback[index]['promise'] = arr[1];
    this.callback[index]['data'] = arr[0];
    if (!arr[0].data._silence) {
      this.store.commit('SET_LOADING_STATUS', true)
    }
    this.ws.send(JSON.stringify(arr[0]));
    this.count++;
    return arr[1];
  },
  startHeartBeat: function () {
    this.heartBeatTimer = setInterval(() => {
      this.heartBeat.valid = false;
      this.send({
        service: 'player',
        functionName: 'authenticate',
        data: {
          token: this.user.token,
          _silence: true,
          _heartBeat: true,
          _closeCONFIRM:true
        }
      })
      //在规定时间内服务器未响应 说明服务器链接失效，开始重新链接服务器
      setTimeout(() => {
        if (!this.heartBeat.valid) {
          this.init()
          clearInterval(this.heartBeatTimer)
        }
      }, this.heartBeat.timeOut)
    }, this.heartBeat.intervalTime)
  }
}

export default Socket
