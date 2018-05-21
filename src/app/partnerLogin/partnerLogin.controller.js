/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('PartnerLoginController', PartnerLoginController);

  /** @ngInject */

  function PartnerLoginController($log, $window, $document, customerService, jQ, localStorage, player, partner, $state, $rootScope, $interval, platformId, $http) {
    var vm = this;
    vm.platformId = platformId;
    function partnerLogin() {
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
      partner.emit(funcName, params, 99, requestId);
      partner.on(funcName, function (respData) {
        if (respData && respData.status == 200 && respData.data) {
          var authenticatedData = {
            token: respData.token,
            partner: respData.data
          };
          var originAuthenticatedData = angular.fromJson(localStorage.getData());
          if(originAuthenticatedData && originAuthenticatedData.player){
            authenticatedData.player = originAuthenticatedData.player;
          }
          localStorage.setData(angular.toJson(authenticatedData));
          // $rootScope.loggedOn = true;
          // $rootScope.checkHasNewMail();

          partner.emit("getCreditDetail", {});

          vm.message = "登录成功。";
          jQ('#loginModal').modal('show');
          jQ('#loginModal').on('hidden.bs.modal', function () {
            $state.go("dashboard");
          })
          $log.debug("登录成功。");
        } else {
          // localStorage.removeData();
          // $rootScope.loggedOn = false;
          // $rootScope.validCredit = 0;
          // $rootScope.lockedCredit = 0;
          // $rootScope.totalCredit = 0;

          vm.message = respData.errorMessage;
          jQ('#loginModal').modal('show');
          $log.debug("登录失败。");
        }
      }, {requestId: requestId});


      // player.on('loginPlayerPartner', function (respData) {
      //   if (respData && respData.status == 200 && respData.data && respData.data.length == 2 && respData.data[0] && respData.data[1]) {
      //     var authenticatedData = {
      //       token: respData.token,
      //       player: respData.data[0],
      //       partner: respData.data[1]
      //     };
      //     localStorage.setData(angular.toJson(authenticatedData));
      //     $rootScope.loggedOn = true;
      //     $rootScope.validCredit = authenticatedData.player.validCredit;
      //     $rootScope.lockedCredit = authenticatedData.player.lockedCredit;
      //
      //     player.emit("getCreditDetail", {});
      //
      //     vm.message = "登录成功。";
      //     jQ('#loginModal').modal('show');
      //     jQ('#loginModal').on('hidden.bs.modal', function () {
      //       $state.go("home");
      //     })
      //     $log.debug("登录成功。");
      //   } else {
      //     localStorage.removeData();
      //     $rootScope.loggedOn = false;
      //     $rootScope.validCredit = 0;
      //     $rootScope.lockedCredit = 0;
      //     $rootScope.totalCredit = 0;
      //
      //     vm.message = respData.errorMessage;
      //     jQ('#loginModal').modal('show');
      //     $log.debug("登录失败。");
      //   }
      // }, {requestId: requestId});
    }

    vm.partnerLogin = partnerLogin;

  }
})();
