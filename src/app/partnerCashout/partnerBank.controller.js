(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('PartnerBankController', PartnerBankController);

  /** @ngInject */
  function PartnerBankController(jQ, player, partner, localStorage, $timeout, $log, $stateParams, payment, platformId, $interval) {
    var vm = this;
    vm.bankAcc = null;
    vm.bankType = null;
    vm.editData = {};
    vm.partnerId = null;

    vm.provinces = [];
    vm.cities = [];
    vm.districts = [];
    vm.errorMessage = "";
    vm.bankAccountType = "1";
    vm.bankAccountTypeList = {
      '2': '借记卡',
      '1': '信用卡'
    }
    vm.lastPage = $stateParams.type;
    if (vm.lastPage == 'cashInOut') {
      vm.links = '#/cashInOut/cashOut';
    } else if (vm.lastPage == 'user') {
      vm.links = '#/user'
    } else if (vm.lastPage == 'manualpaystatus') {
      vm.links = '#/manualpaystatus'
    } else if (vm.lastPage == 'partnercashout') {
      vm.links = '#/partnercashout'
    } else {

    }


    partner.getPartner(function () {
      var authenticatedData = angular.fromJson(localStorage.getData());
      vm.userData = authenticatedData.partner;
      vm.disabledBankAccountName = vm.userData.realName;
      vm.bankAccountName = vm.userData.realName;
      if (vm.userData.partnerId) {
        vm.partnerId = vm.userData.partnerId;
      }
      vm.updateForm();
    });

    /*emit - banktype list/province list */
    payment.emit('getBankTypeList', {}, 99);
    payment.emit('getProvinceList', {}, 99);

    /* listen- banktype list/province list */
    payment.on('getBankTypeList', function (data) {
      vm.allBankTypeList = {};
      data.data.forEach(function (item) {
        if (item && item.bankTypeId) {
          vm.allBankTypeList[item.id] = item.name;
        }
      })
    })
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

    vm.getBankCardTypeTextbyId = function (id) {
      if (!vm.allBankTypeList) {
        return id;
      } else {
        return vm.allBankTypeList[id];
      }
    }
    vm.selectProvince = function (provinceId) {
      payment.emit('getCityList', {provinceId: provinceId})
    }

    vm.selectCity = function (cityId) {
      payment.emit('getDistrictList', {provinceId: vm.editData.province, cityId: cityId})
    }


    vm.updateForm = function () {
        vm.editData.bankAccount = vm.userData.bankAccount;
        vm.editData.bankAddress = vm.userData.bankAddress;
        vm.editData.bankAccountType = vm.userData.bankAccountType;
        vm.editData.bankType = vm.userData.bankName;

        vm.selectProvince(vm.userData.bankAccountProvince);
        vm.editData.province = vm.userData.bankAccountProvince;
        vm.selectCity(vm.userData.bankAccountCity);
        vm.editData.city = vm.userData.bankAccountCity;
        vm.editData.district = vm.userData.bankAccountDistrict;
    }

    vm.getSMSCode = function () {
      partner.emit('sendSMSCodeToPlayer', { platformId: platformId, purpose: "updateBankInfoFirst"});
      partner.on('sendSMSCodeToPlayer',function(data){
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
      });
    }

    vm.validateBankAccount = function () {
      if(vm.editData.bankAccount && (vm.editData.bankAccount.length != 19
        && vm.editData.bankAccount.length !=16 || !(/^\d+$/).test(vm.editData.bankAccount))) {
          vm.invalidBankAccount = true;
        } else {
          vm.invalidBankAccount = false;
        }
    }

    vm.updatePlayerPayment = function () {
      var sendData = {};

      // validation
      if(vm.editData.bankAccount && (vm.editData.bankAccount.length != 19
        && vm.editData.bankAccount.length != 16 || !(/^\d+$/).test(vm.editData.bankAccount))) {
          vm.invalidBankAccount = true;
          return ;
      } else {
        vm.invalidBankAccount = false;
      }

      sendData.partnerId = vm.partnerId;
      sendData.bankAccountName = vm.bankAccountName;
      sendData.bankAccount = vm.editData.bankAccount;
      sendData.bankName = vm.editData.bankType;
      sendData.bankAccountProvince = vm.editData.province;
      sendData.bankAccountCity = vm.editData.city;
      sendData.bankAccountDistrict = vm.editData.district;
      sendData.bankAddress = vm.editData.bankAddress;
      sendData.bankAccountType = parseInt(vm.bankAccountType);
      sendData.smsCode = vm.editData.smsCode;
      $log.info('send', sendData);

      partner.emit('fillBankInformation', sendData);
      partner.on('fillBankInformation', function (data) {
        $log.info(data);
        if (data.status == 200) {
          jQ('#bankSuccessModal').modal('show');
          jQ('#bankSuccessModal').on('hidden.bs.modal', function () {
            //fetch the latest data
            partner.getPartner(function () {
              var authenticatedData = angular.fromJson(localStorage.getData());
              vm.userData = authenticatedData.partner;
            });
          })
        } else {
          if (data.errorMessage) {
            vm.errorMessage = data.errorMessage;
          }
          if (!data.errorMessage) {
            vm.errorMessage = "修改银行资料失败";
          }
          jQ('#bankFailModal').modal('show');
          jQ('#bankFailModal').on('hidden.bs.modal', function () {
          })
        }
      })
    }
  }
})();
