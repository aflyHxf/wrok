/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('LoginController', LoginController);

  /** @ngInject */

  function LoginController($log, $window, $document, customerService, jQ, localStorage, player, $state, $rootScope, $interval, platform, platformId, $http) {
    var vm = this;
    vm.platformId = platformId;
    function login() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      var params = {};
      var funcName = 'login';
      if (vm.name && vm.password) {
        var params = {
          name: vm.name,
          password: vm.password,
          platformId: vm.platformId
        };
        funcName = 'login';
      }
      else {
        alert("请输入您的用户名以及密码。")
        return;
      }
      player.emit(funcName, params, 99, requestId);
      player.on(funcName, function (respData) {
        if (respData && respData.status == 200 && respData.data) {
          var authenticatedData = {
            token: respData.token,
            player: respData.data,
          };
          localStorage.setData(angular.toJson(authenticatedData));
          $rootScope.loggedOn = true;
          $rootScope.validCredit = authenticatedData.player.validCredit;
          $rootScope.lockedCredit = authenticatedData.player.lockedCredit;
          $rootScope.checkHasNewMail();

          player.emit("getCreditDetail", {});

          vm.message = "登录成功。";
          jQ('#loginModal').modal('show');
          jQ('#loginModal').on('hidden.bs.modal', function () {
            $state.go("home");
          })
          $log.debug("登录成功。");
        } else {
          localStorage.removeData();
          $rootScope.loggedOn = false;
          $rootScope.validCredit = 0;
          $rootScope.lockedCredit = 0;
          $rootScope.totalCredit = 0;

          vm.message = respData.errorMessage;
          jQ('#loginModal').modal('show');
          $log.debug("登录失败。");
        }
      }, {requestId: requestId});


      player.on('loginPlayerPartner', function (respData) {
        if (respData && respData.status == 200 && respData.data && respData.data.length == 2 && respData.data[0] && respData.data[1]) {
          var authenticatedData = {
            token: respData.token,
            player: respData.data[0],
            partner: respData.data[1]
          };
          localStorage.setData(angular.toJson(authenticatedData));
          $rootScope.loggedOn = true;
          $rootScope.validCredit = authenticatedData.player.validCredit;
          $rootScope.lockedCredit = authenticatedData.player.lockedCredit;

          player.emit("getCreditDetail", {});

          vm.message = "登录成功。";
          jQ('#loginModal').modal('show');
          jQ('#loginModal').on('hidden.bs.modal', function () {
            $state.go("home");
          })
          $log.debug("登录成功。");
        } else {
          localStorage.removeData();
          $rootScope.loggedOn = false;
          $rootScope.validCredit = 0;
          $rootScope.lockedCredit = 0;
          $rootScope.totalCredit = 0;

          vm.message = respData.errorMessage;
          jQ('#loginModal').modal('show');
          $log.debug("登录失败。");
        }
      }, {requestId: requestId});


    }

    vm.login = login;

    function openWebChat() {
      var e = customerService,//"https://www.chat800.com/chat/chatClient/chatbox.jsp?companyID=267&configID=26",
        t = encodeURIComponent($document.URL),
        n = encodeURIComponent($document.referrer);
      $window.open(e + "&enterurl=" + t + "&pagereferrer=" + n)
    }

    vm.openWebChat = openWebChat;

    function getSMSCode() {
      if (!vm.mobile) {
        $window.alert("请填写手机获取验证码");
        return;
      }
      if (vm.countDown && vm.countDown > 0) {
        return;
      }
      player.emit('getSMSCode', {phoneNumber: vm.mobile, platformId: platformId});
    }

    vm.getSMSCode = getSMSCode;

    vm.getWechatAuth = function(){


        $http.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appId+"&secret="+secret).then(function(response) {
        });
    }


    player.on('getSMSCode', function (data) {
      if (data && data.status && data.status == 200) {
        vm.countDown = 60;
        vm.intervalPromise = $interval(function () {
          if (vm.countDown && vm.countDown > 0) {
            vm.countDown--;
          }
          else {
            $interval.cancel(vm.intervalPromise);
          }
          $log.debug(vm.countDown);
        }, 1000)
      }
      else {
        if (data.errorMessage) {
          alert(data.errorMessage);
          vm.countDown = 60;
          vm.intervalPromise = $interval(function () {
            if (vm.countDown && vm.countDown > 0) {
              vm.countDown--;
            }
            else {
              $interval.cancel(vm.intervalPromise);
            }
            $log.debug(vm.countDown);
          }, 1000)
        }
      }
    });

    player.on("getCreditDetail", function (data) {
      $rootScope.totalCredit = 0;
      if (data && data.status == "200" && data.data) {
        var creditDetail = data.data;
        var validCredit = Number(creditDetail.credit);
        var gameCredit = 0;
        var groupCredit = 0;
        if (creditDetail.gameCreditList && creditDetail.gameCreditList.length > 0) {
          creditDetail.gameCreditList.map(function (game) {
            if (game.validCredit && game.validCredit !== "unknown") {
              gameCredit += Number(game.validCredit);
            }
          });
        }

        if (creditDetail.lockedCreditList && creditDetail.lockedCreditList.length > 0) {
          creditDetail.lockedCreditList.map(function (group) {
            if (group.validCredit && group.validCredit !== "unknown") {
              groupCredit += Number(group.validCredit);
            }
          })
        }

        $rootScope.totalCredit = validCredit + gameCredit + groupCredit;
      }
    });

  }
})();
