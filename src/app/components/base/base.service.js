/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('base', base);

  /** @ngInject */
  function base($log, $window, $timeout, $rootScope, $state, webSocketUrl, localStorage, platformId, requestDatas, responseCallbacks, $location) {

    var packageData = {
      service: '',
      functionName: '',
      data: {}
    };

    var protocol = $location.protocol();
    var socketProtocol;

    if(protocol == 'https'){
        socketProtocol = 'wss://';
    }else{
        socketProtocol = 'ws://';
    }

    if(webSocketUrl == 'default'){
        if($location.host() == 'localhost'){
            webSocketUrl = socketProtocol + $location.host() + ':9280'
        }else{
            webSocketUrl = socketProtocol + $location.host() + '/websocket'
        }
    }

    var ws = new WebSocket(webSocketUrl);

    ws.onopen = function (evt) {
      $log.debug('onopen: ' + angular.toJson(evt));
      $log.debug(webSocketUrl + ' Connected.');
      var list = requestDatas;
      var sortedList = list.sort(function (a, b) {
        return a.priority - b.priority;
      });
      var filteredList = sortedList.filter(function (tmp) {
        if ($rootScope.authenticating) {
          $log.debug("authenticating...");
          return true;
        }

        if (tmp.functionName == "authenticate" || tmp.functionName == "login" || tmp.functionName == "authenticatePlayerPartner" || tmp.functionName == "loginPlayerPartner") {
          $rootScope.authenticating = true;
        }

        delete tmp.priority;
        ws.send(angular.toJson(tmp));
        $log.debug('REQUEST ON CONNECTED: ' + angular.toJson(tmp));
        return false;
      });
      requestDatas = filteredList;
      $window.requestDatas = requestDatas;
    };

    ws.onclose = function (evt) {
      $log.debug('onclose: ' + angular.toJson(evt));
      delete $window.sessionStorage.token;
      delete $window.sessionStorage.playerId;

      $timeout(function () {
        if (ws.readyState == 3) {
          $log.info('三秒后自动重连。。。');
        }
      }, 1000);
      $timeout(function () {
        if (ws.readyState == 3) {
          $log.info('二秒后自动重连。。。');
        }
      }, 2000);
      $timeout(function () {
        if (ws.readyState == 3) {
          $log.info('一秒后自动重连。。。');
        }
      }, 3000);
      $timeout(function () {
        if (ws.readyState == 3) {
          $log.info('自动重连中。。。');
          var oldWs = ws;
          ws = new WebSocket(webSocketUrl);
          ws.onopen = oldWs.onopen;
          ws.onclose = oldWs.onclose;
          ws.onmessage = oldWs.onmessage;
          ws.onerror = oldWs.onerror;

          var loggedData = angular.fromJson(localStorage.getData());
          if (loggedData) {
            var request = {
              service: "player",
              functionName: "authenticate",
              data: {
                platformId: platformId,
                playerId: loggedData.player.playerId,
                partnerId: loggedData.player.playerId,
                token: loggedData.token
              }
            }
            requestDatas.unshift(angular.toJson(request));
          }
        }
      }, 4000);

      // var confirm = $window.confirm("连接已断开，是否刷新当前页？");
      // if (confirm) {
      //     var oldWs = ws;
      //     ws = new WebSocket(webSocketUrl);
      //     ws.onopen = oldWs.onopen;
      //     ws.onclose = oldWs.onclose;
      //     ws.onmessage = oldWs.onmessage;
      //     ws.onerror = oldWs.onerror;
      // }
      $log.debug('Disconnected.');
    };

    ws.onmessage = function (evt) {
      $log.debug('onmessage: ' + evt.data);
      var response = angular.fromJson(evt.data);
      if (response.data && response.data.status == 420) {
        $rootScope.loading = false;
        $state.go("login");
        return;
      }
      var list = responseCallbacks;
      var list2 = responseCallbacks;
      var count = list.length;
      for (var i = 0; i < count; i++) {
        var tmp = list[i];
        if (tmp && (tmp.funcName == response.functionName && tmp.service == response.service)) {

          if (response.functionName == "authenticate" || tmp.functionName == "login" || response.functionName == "authenticatePlayerPartner" || tmp.functionName == "loginPlayerPartner") {
            $rootScope.authenticating = false;
            var list3 = requestDatas;
            var sortedList = list3.sort(function (a, b) {
              return a.priority - b.priority;
            });
            var filteredList = sortedList.filter(function (tmp) {
              if ($rootScope.authenticating) {
                return true;
              }

              if (tmp.functionName == "authenticate" || tmp.functionName == "login" || tmp.functionName == "authenticatePlayerPartner" || tmp.functionName == "loginPlayerPartner") {
                $rootScope.authenticating = true;
              }
              delete tmp.priority;
              ws.send(angular.toJson(tmp));
              return false;
            });
            requestDatas = filteredList;
          }

          //if requestId exists from the response, then need find out which callback also got same requestId
          if (!(response.requestId && (tmp.requestId != response.requestId))) {
            $log.debug('onmessage callback: ' + (angular.toJson(tmp)));
            if (tmp.loopAll) {
              // tmp.callback.apply(this, [response.data]);
              applyCallback(tmp, this, [response.data]);
            } else {
              $timeout(function () {
                // tmp.callback.apply(this, [response.data]);
                applyCallback(tmp, this, [response.data]);
              });
              if (tmp.once) {
                list2.splice(i, 1);
              }
              break;
            }
          }
        }
      }
      responseCallbacks = list2;
      if (response.functionName != 'authenticate' && response.functionName != 'getPlayerPartner') {
        $rootScope.loading = false;
      }
    }

    function applyCallback(obj, context, dataList) {
      $timeout(function () {
        obj.callback.apply(context, dataList);
      });
    }

    ws.onerror = function (evt) {
      $rootScope.loading = false;
      $log.error('onerror: ' + evt.data);
    };

    function sendRequest(funcName, data, priority, requestId) {
      if (!funcName) {
        $log.error('funcName is empty.');
        return;
      }

      if (funcName != 'authenticate' && funcName != 'getPlayerPartner' &&  funcName != 'get' && funcName != 'getCreditDetail') {
        $rootScope.loading = true;
      }
      if (!data) {
        $log.error('data is empty.');
        return;
      }

      var pacData = angular.fromJson(angular.toJson(packageData));
      // var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      if (requestId) {
        pacData.requestId = requestId;
      }
      pacData.functionName = funcName;
      // data.platformId = platformId;
      pacData.data = data;
      pacData.service = this.serviceName;
      if (priority) {
        pacData.priority = priority;
      } else {
        pacData.priority = 999;
      }

      if (ws.readyState == 0) {
        // var list = requestDatas;
        // var filteredList = list.filter(function(tmp) {
        //     return tmp.functionName != funcName;
        // })
        // filteredList.unshift(pacData);
        // requestDatas = filteredList;
        requestDatas.unshift(pacData);
      } else if (ws.readyState == 1) {
        delete pacData.priority;
        ws.send(angular.toJson(pacData));
        // $log.debug('sendRequest: ' + angular.toJson(pacData));
      } else {
        $rootScope.loading = false;
        var confirm = $window.confirm("连接已断开，是否刷新当前页？");
        if (confirm) {
          var oldWs = ws;
          ws = new WebSocket(webSocketUrl);
          ws.onopen = oldWs.onopen;
          ws.onclose = oldWs.onclose;
          ws.onmessage = oldWs.onmessage;
          ws.onerror = oldWs.onerror;
        }
        $log.debug('Disconnected.');
      }
    }

    function addListener(funcName, callback, options) {
      // var list = responseCallbacks;
      // responseCallbacks = list.filter(function(tmp) {
      //     return tmp.funcName != funcName;
      // })
      var listener = options || {};//options should be like this {loopAll:true,requestId:123}
      listener.service = this.serviceName;
      listener.funcName = funcName;
      listener.callback = callback;
      responseCallbacks.unshift(listener);
    }

    function addOnceListener(funcName, callback) {
      // var list = responseCallbacks;
      // responseCallbacks = list.filter(function(tmp) {
      //     return tmp.funcName != funcName;
      // })

      responseCallbacks.unshift({
        service: this.serviceName,
        funcName: funcName,
        callback: callback,
        once: true
      });
    }

    this.emit = sendRequest;
    this.on = addListener;
    this.once = addOnceListener;
  }
})();
