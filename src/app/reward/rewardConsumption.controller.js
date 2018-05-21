/**
 * Created by jazz on 19/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('RewardConsumptionController', RewardConsumptionController);

  /** @ngInject */
  function RewardConsumptionController($log, reward, platformId, $state, localStorage) {
    var vm = this;
    vm.RewardStatus = {
      '0':'未达成',
      '1':'可领取',
      '2':'已领取'
    }

    vm.signInfo = "";
    reward.emit('getSignInfo', {platformId: platformId, code: 'qrlb'});

    reward.on('getSignInfo', function (data) {
      if (data.status == 200) {
        // vm.signInfo = JSON.stringify(data.data, null, 4);
        vm.signInfo = data.data;
      }
    });

    function applyRewardEvent() {
      var lstore = angular.fromJson(localStorage.getData())
      if(!lstore || !lstore.player){
          $state.go('login');
          return
      }
      var ans = confirm("确定申请？");
      if (ans) {
        var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
        reward.emit('getSignBonus', {
          code: "qrlb",
          data: {}
        }, 99, requestId);
        reward.on('getSignBonus', function (data) {
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
