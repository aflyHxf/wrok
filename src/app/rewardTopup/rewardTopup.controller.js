/**
 * Created by jazz on 19/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('RewardTopupController', RewardTopupController);

  /** @ngInject */
  function RewardTopupController(reward, platformId, localStorage, $state) {
    var vm = this;
    vm.topupRewardInfo = {};
    vm.RewardStatus = {
      '0':'未达成',
      '1':'可领取',
      '2':'已领取'
    }

    reward.emit("getSlotInfo", {platformId: platformId, code: "chtha"});
    reward.on("getSlotInfo", function (data) {
      if (data.status == 200) {
        vm.topupRewardInfo = data.data;
      }
    });

    function applyRewardEvent(code) {
      var lstore = angular.fromJson(localStorage.getData())
      if(!lstore || !lstore.player){
          $state.go('login');
          return
      }
      var ans = confirm("确定申请？");
      var topupData = {};
      var topUpRecordId = "";
      if(vm.topupRewardInfo){
          topUpRecordId = vm.topupRewardInfo.topUpRecordId ? vm.topupRewardInfo.topUpRecordId : "";
      }
      if(topUpRecordId){
        topupData = {
            'topUpRecordId':topUpRecordId
        }
      }
      if (ans) {
        var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
        reward.emit('applyRewardEvent', {
          code: code,
          data: topupData
        }, 99, requestId);
        reward.on('applyRewardEvent', function (data) {
          if (data.status == 200) {
            alert('申请成功');
          } else {
            alert(data.errorMessage);
          }
        }, {
          requestId: requestId
        });
      }
    }

    vm.applyRewardEvent = applyRewardEvent;
  }
})();
