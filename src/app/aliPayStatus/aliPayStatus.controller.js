(function () {
  'use strict';

  angular.module('fishingKingMobile').controller('AliPayStatusController', AliPayStatusController);

  function AliPayStatusController($log, $stateParams, $window, $rootScope, $location, $state, jQ, player, localStorage, payment, reward) {

    var vm = this;
    vm.bankTypeName = '';
    vm.userData = '';
    vm.paymentMessage = '';
    vm.showAlipayTopUp = false;
    vm.aliPayProposal = "";
    vm.tabName = $stateParams.type || "cashIn";
    vm.editData = {};
    vm.proposal = {};

    vm.domain = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    vm.bankAccountTypeList = {
      '2':'借记卡',
      '1':'信用卡',
      '4':'储蓄卡',
    }

    // player.getPlayerPartner(function () {
    //   var authenticatedData = angular.fromJson(localStorage.getData());
    //   vm.userData = authenticatedData.player;
    //   if (vm.userData.bankAccount) {
    //     vm.userData.bankAccount = vm.userData.bankAccount.slice(-3);
    //   } else {
    //     vm.userData.bankAccount = '';
    //   }
    //
    //   // payment.emit('getBankTypeList', {}, 99);
    //   // reward.emit("getRewardTask", {playerId: authenticatedData.player.playerId});
    // });

    payment.emit('getAlipayTopupRequestList',{});
    payment.on('getAlipayTopupRequestList',function(data){
      if(data){
       vm.proposal= data.data;

      }
    })



  }
})();
