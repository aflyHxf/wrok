(function () {
  'use strict';

  angular.module('fishingKingMobile').controller('ManualPayStatusController', ManualPayStatusController);

  function ManualPayStatusController($log, $stateParams, $window, $rootScope, $location, $state, jQ, player, localStorage, payment, reward) {

    var vm = this;
    vm.bankTypeName = '';
    vm.userData = '';
    vm.paymentMessage = '';
    vm.showAlipayTopUp = false;
    vm.aliPayProposal = "";
    vm.tabName = $stateParams.type || "cashIn";
    vm.editData = {};
    vm.proposal = {};
    vm.isProposal = false;
    vm.timeLeft = 0;
    vm.timeLeftText = '';

    vm.domain = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    vm.bankAccountTypeList = {
      '1': '网银转帐',
      '2': 'ATM自动柜员机',
      '3': '银行人工柜台',
      '4': '支付宝转账',
      '5': '微信转账'
    }
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

    player.getPlayerPartner(function () {
      var authenticatedData = angular.fromJson(localStorage.getData());
      vm.userData = authenticatedData.player;
      if (vm.userData.bankAccount) {
        vm.userData.bankAccount = vm.userData.bankAccount;
      } else {
        vm.userData.bankAccount = '';
      }
    });
    payment.emit('getBankTypeList', {}, 99);

    payment.emit('requestBankTypeByUserName', {'clientType': 1});
    payment.on('requestBankTypeByUserName', function (data) {

        vm.allBankTypeList = {};
        vm.bankTypeListName = {};
        var bankList = data.data.data;
        bankList.forEach(function(item){
            vm.allBankTypeList[item.depositMethod] = item.data;
            if(item.data.length > 0){
              item.data.forEach(function(bankData){
                  vm.bankTypeListName[bankData.id] = bankData;
              })
            }
        })
    })
    payment.emit('getManualTopupRequestList', {});
    payment.on('getManualTopupRequestList', function (data) {
      if (data.data) {
        vm.proposal = data.data;
        vm.isProposal = true;
        vm.timeLeftText = vm.timeConvert(vm.proposal.data.validTime, vm.proposal.createTime);
      }
    })

    // manualPay
    vm.manualTopUp = function () {
      var manualTopUp = {
        lastBankcardNo: vm.editData.lastBankcardNo,
        amount: vm.editData.amount,
        depositMethod: vm.editData.depositMethod,
        provinceId: vm.editData.province,
        cityId: vm.editData.city,
        districtId: vm.editData.district,
        remark: vm.editData.remark,
        realName: vm.userData.realName,
        bPMSGroup: true
      };

      if (['1','2','3'].indexOf(vm.editData.depositMethod) > -1) {
        manualTopUp.bankTypeId = vm.editData.bankTypeId;
      }
      payment.emit('requestManualTopup', manualTopUp);
    }

    payment.on('requestManualTopup', function (data) {
      if (data.status == 200) {
        vm.manualPayMessage = "您的手工充值申请已提交成功";
        vm.showManualpayTopUp = false;
        vm.isProposal = true;
        vm.showManualPayModal("topUpSuccess");
        payment.emit('getManualTopupRequestList', {});
      } else {
        vm.manualPayMessage = data.errorMessage || data.errorMsg;
        vm.showManualPayModal("topUpFailed");
      }
    });

    /* bankcard related */
    //  bank details

    /*emit - banktype list/province list */
    payment.emit('getProvinceList', {}, 99);

    /* listen- banktype list/province list */
    payment.on('getProvinceList', function (data) {
      if (data.data) {
        var pList = [];
        var pdata = data.data
        for (var prov in pdata) {
          if (pdata[prov].id <= 650000) {
            pList.push(pdata[prov]);
          }
        }
        vm.provinces = pList;
      }
    })
    payment.on('getCityList', function (data) {
      if (data.data) {
        vm.cities = data.data;
      }
    })
    payment.on('getDistrictList', function (data) {
      if (data.data) {
        vm.districts = data.data;
      }
    })
    vm.timeConvert = function (validTime, createAtTime) {
      var validTM = new Date(validTime).getTime();
      var createAt = new Date(createAtTime).getTime();
      var leftTime = validTM - createAt;
      var leftTimeText = vm.displayTime(leftTime);
      return leftTimeText;
    }

    vm.displayTime = function (leftTime) {

      var leftTimes = "";
      var days = Math.floor(leftTime / (1000 * 60 * 60 * 24));
      var hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));

      // Display the result in the element with id="demo"
      leftTimes = hours + "小时 " + minutes + "分 ";
      return leftTimes;

    }

    vm.selectProvince = function (provinceId) {
      payment.emit('getCityList', {
        provinceId: provinceId
      })
    }

    vm.selectCity = function (cityId) {
      payment.emit('getDistrictList', {
        provinceId: vm.editData.province,
        cityId: cityId
      })
    }

    vm.filterBank = function(){
      vm.bankResult = [];
      vm.bankResult = vm.allBankTypeList[vm.editData.depositMethod];
    }
    vm.showManualPayModal = function (type) {

      jQ('#manualPayModal').modal('show');
      jQ('#manualPayModal').on('hidden.bs.modal', function () {});
    }
    vm.showBankcardHintModal = function(){
      jQ('#bankcardHint').modal('show');
    }
    vm.cancelManualTopUp = function (proposalId) {
      vm.manualPayMessage = "您的手工充值申请已取消";
      vm.showManualpayTopUp = false;
      vm.showManualPayModal("topUpSuccess");


      payment.emit('cancelManualTopupRequest', {
        'proposalId': proposalId
      });
      payment.on('cancelManualTopupRequest', function (data) {
        if (data.status == 200) {
          vm.manualPayMessage = "您的手工充值申请已取消";
          vm.showManualpayTopUp = false;
          vm.showManualPayModal("topUpSuccess");
          vm.isProposal = false;
          payment.emit('getManualTopupRequestList', {});

        } else {
          vm.manualPayMessage = data.errorMessage || data.errorMsg;
          vm.showManualPayModal("topUpFailed");
        }
      })
    }
    vm.redirectToOtherPage = function (url) {
      if (url == "#/manualpaystatus" && !(vm.userData)) {
        vm.redirectToOtherPage('#/login');
      } else {
        $window.location.replace(url);
      }
    }

  }
})();
