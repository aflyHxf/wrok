/**
 * Created by aeson on 01/06/2017.
 */
(function () {
  'use strict';

  angular.module('fishingKingMobile').controller('PartnerCashoutController', PartnerCashoutController);

  function PartnerCashoutController($log, $stateParams, $state, $location, jQ, player, localStorage, payment, partner) {

    var vm = this;
    vm.bankTypeName = '';
    vm.userData = '';
    vm.paymentMessage = '';
    vm.showAlipayTopUp = false;
    vm.aliPayProposal = "";
    vm.tabName = $stateParams.type || "cashOut";
    vm.editData = {};
    vm.timeLeftText = '';

    vm.domain = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    vm.bankAccountTypeList = {
      '1': '网银转帐',
      '2': 'ATM自动柜员机',
      '3': '银行人工柜台'
    };

    vm.proposalStatus = {
      'none': '请选择',
      'Approved': '审批通过',
      'Rejected': '审批拒绝',
      'Success': '成功',
      'Fail': '失败',
      'PrePending': '系统异常',
      'Pending': '待审核 ...',
      'Cancel': '已取消',
      'Processing': '处理中'
    }

    partner.getPartner(function () {
      var authenticatedData = angular.fromJson(localStorage.getData());
      vm.userData = authenticatedData.player || {};
      vm.partnerData = authenticatedData.partner;
      if (vm.userData && vm.userData.bankAccount) {
        vm.userData.bankAccount = vm.userData.bankAccount.slice(-3);
      } else {
        vm.userData.bankAccount = '';
      }

      getBankTypeList();
    });

    function getBankTypeList() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      payment.emit('getBankTypeList', {}, 99, requestId);
      payment.on('getBankTypeList', function (data) {
        vm.allBankTypeList = [];
        data.data.forEach(function (item) {
          if (item && item.bankTypeId && item.bankTypeId == vm.userData.bankName) {
            vm.userBank = item.name;
          }
          if (item && item.bankTypeId) {
            vm.allBankTypeList[item.id] = item.name + ' (' + item.bankTypeId + ')';
          }
        })
      }, {requestId: requestId})
    }

    function applyBonus(bonusId) {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();

      var data = {
        bonusId: bonusId,
        amount: vm.cashOutAmount,
        honoreeDetail: ''
      };
      partner.emit('applyBonus', data, 99, requestId);


      partner.on('applyBonus', function (data) {
        if (data.errorMessage) {
          vm.paymentMessage = data.errorMessage;
          $log.debug(data.status + "\n" + data.errorMessage);
          jQ('#paymentModal').modal('show');
          jQ('#paymentModal').on('hidden.bs.modal', function () {
            if (data.status == 420) {
              vm.redirectToOtherPage('#/login');
            } else {
              jQ('#cashOutAmount').focus();
            }
          });
        } else if (data.status == 200) {
          vm.paymentMessage = "提款提交成功";
          $log.debug(data.status + "\n" + "提款提交成功");
          jQ('#paymentModal').modal('show');
          jQ('#paymentModal').on('hidden.bs.modal', function () {
            location.reload();
          });
        } else {
          $state.go('#/home');
        }
      }, {requestId: requestId})
    }

    vm.applyBonus = applyBonus;

  }
})();
