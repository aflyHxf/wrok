/**
 * Created by aeson on 14/06/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('RewardXimaController', RewardXimaController);

  /** @ngInject */
  function RewardXimaController($log, reward, localStorage, $state) {
    var vm = this;

    function applyRewardEvent() {
      var lstore = angular.fromJson(localStorage.getData())
      if(!lstore || !lstore.player){
          $state.go('login');
          return
      }
      var ans = confirm("确定申请？");
      if (ans) {
        var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
        reward.emit('applyRewardEvent', {
          code: "xima",
          data: {}
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
