/**
 * Created by aeson on 21/06/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('RewardTopupSelectionController', RewardTopupSelectionController);

  /** @ngInject */
  function RewardTopupSelectionController($log, $state, reward, payment) {
    var vm = this;
    vm.topupHistory = [];

    function getValidTopUpReturnRecordList() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      payment.emit('getValidTopUpReturnRecordList', {
        requestCount: 100,
        sort: false,
        startIndex: 0
      }, 99, requestId);
      payment.on('getValidTopUpReturnRecordList', function (data) {

        if (data.data) {
          if (data.data.records.length == 0) {
            alert("没有充值记录。");
            $state.go("rewardtopup");
          }
          data.data.records.forEach(function (topup) {
            var amount = topup.amount;
            if (amount >= 0) {
              vm.topupHistory.push(topup);
            }
          })
        }
        $log.info(vm.topupHistory)
      }, {
        requestId: requestId
      });
    }

    getValidTopUpReturnRecordList();

    function getChineseNameByTopupType(type) {
      if (type == 1) {
        return "手动存款";
      } else if (type == 2) {
        return "在线充值";
      } else if (type == 3) {
        return "支付宝充值";
      }
    }

    vm.getChineseNameByTopupType = getChineseNameByTopupType;

    function applyRewardEvent() {
      var ans = confirm("确定申请？");
      if (ans) {
        var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
        reward.emit('applyRewardEvent', {
          code: "mbcksjj",
          data: {
            topUpRecordId: vm.selectedTopupId
          }
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
