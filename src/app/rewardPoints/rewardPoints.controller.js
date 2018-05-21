/**
 * Created by mark on 2/04/2018.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('RewardPointsController', RewardPointsController);

  /** @ngInject */
  function RewardPointsController($log, $rootScope, $state, $window, $filter, jQ, localStorage, player, payment, reward, game, platformId, rPoints) {
    var vm = this;
    $window.VM = vm;
    vm.photoClass = "";
    vm.credit = 0;
    vm.providerList = [];
    vm.freeGroupDetail = {
      currentAmount: 0,
      requiredUnlockAmount: 0
    };
    vm.providerGroupDetail = {};
    player.getPlayerPartner(function () {
      var authenticatedData = angular.fromJson(localStorage.getData());
      vm.playerName = authenticatedData.player.name;
      vm.validCredit = authenticatedData.player.validCredit;
      vm.lockedCredit = authenticatedData.player.lockedCredit;
      vm.credit = vm.validCredit + vm.lockedCredit;
      vm.userCurrentPoint = authenticatedData.player.userCurrentPoint;
      reward.emit("getRewardTask", {playerId: authenticatedData.player.playerId});
      //display user thumbnail
      vm.userData = authenticatedData.player;
      // if (vm.userData.photoUrl && vm.userData.photoUrl != '') {
      //   vm.photoUrl = vm.userData.photoUrl;
      //   vm.photoClass = "/assets/images/portrait/" + vm.userData.photoUrl;
      // }
      // game.emit('getProviderList', {playerId: vm.userData.playerId})
      // getTopupHistory();
      player.emit('getCreditDetail', {});
      player.emit('getWithdrawalInfo',  {platformId: platformId});
    });

    player.on('logoutPlayerPartner', function (data) {
      if (data && data.status == 200) {
        $log.debug("logout成功。");
      } else {
        $log.debug("logout失败。");
      }
      $rootScope.loggedOn = false;
      $rootScope.validCredit = 0;
      $rootScope.lockedCredit = 0;
      $rootScope.totalCredit = 0;
      vm.message = "登出成功。";
      localStorage.removeData();
      jQ('#acModal').modal('show');
      jQ('#acModal').on('hidden.bs.modal', function () {
        $state.go("home");
      })
    });
    rPoints.emit('getMissionList', {platformId: platformId});
    rPoints.on('getMissionList', function(data){
    });
  }
})();
