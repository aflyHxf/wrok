/**
 * Created by aeson on 13/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('AccountCenterController', AccountCenterController);

  /** @ngInject */
  function AccountCenterController($log, $rootScope, $state, $window, $filter, jQ, localStorage, player, payment, reward, game, platformId) {
    var vm = this;
    $window.VM = vm;
    vm.photoClass = "";
    vm.credit = 0;
    vm.providerList = [];
    vm.freeGroupDetail = {
      currentAmount: 0,
      requiredUnlockAmount: 0
    };

    var authenticatedData = angular.fromJson(localStorage.getData());
    if(!authenticatedData || !authenticatedData.player){
        $state.go('login')
    }
    vm.providerGroupDetail = {};
    player.getPlayerPartner(function () {

      vm.playerName = authenticatedData.player.name;
      vm.validCredit = authenticatedData.player.validCredit;
      vm.lockedCredit = authenticatedData.player.lockedCredit;
      vm.playerLevel = authenticatedData.player.playerLevel.name || '';
      vm.credit = vm.validCredit + vm.lockedCredit;
      vm.totalCredit = $rootScope.totalCredit || 0;
      vm.userCurrentPoint = authenticatedData.player.userCurrentPoint;
      reward.emit("getRewardTask", {playerId: authenticatedData.player.playerId});
      //display user thumbnail
      vm.userData = authenticatedData.player;
      if (vm.userData.photoUrl && vm.userData.photoUrl != '') {
        vm.photoUrl = vm.userData.photoUrl;
        vm.photoClass = "/assets/images/portrait/" + vm.userData.photoUrl;
      }else{
        vm.photoClass = "/assets/images/portrait/1.jpg";
      }
      game.emit('getProviderList', {playerId: vm.userData.playerId})
      getTopupHistory();
      player.emit('getCreditDetail', {});
      player.emit('getWithdrawalInfo',  {platformId: platformId});
    });

    player.on('getCreditDetail', function (data) {
      var lockedCreditList = data.data && data.data.lockedCreditList instanceof Array ? data.data.lockedCreditList: [];

      for (var i = 0; i < lockedCreditList.length; i++) {
        var lockedGroup = lockedCreditList[i];
        if (!vm.providerGroupDetail[lockedGroup.nickName]) {
          vm.providerGroupDetail[lockedGroup.nickName] = {};
        }

        vm.providerGroupDetail[lockedGroup.nickName].credit = lockedGroup.lockCredit;
        vm.providerGroupDetail[lockedGroup.nickName].consumptionAmount = vm.providerGroupDetail[lockedGroup.nickName].consumptionAmount || 0;
        vm.providerGroupDetail[lockedGroup.nickName].requiredConsumptionAmount = vm.providerGroupDetail[lockedGroup.nickName].requiredConsumptionAmount || 0;

        if (data && data.status == "200" && data.data) {
          vm.totalCredit = 0;
          var creditDetail = data.data;
          var validCredit = Number(creditDetail.credit);
          var gameCredit = 0;
          var groupCredit = 0;
          if (creditDetail.gameCreditList && creditDetail.gameCreditList.length > 0) {
            creditDetail.gameCreditList.map(function (game) {
              if (game.validCredit && game.validCredit !== "unknown") {
                gameCredit += Number(game.validCredit);
              }
            });
          }

          if (creditDetail.lockedCreditList && creditDetail.lockedCreditList.length > 0) {
            creditDetail.lockedCreditList.map(function (group) {
              if (group.validCredit && group.validCredit !== "unknown") {
                groupCredit += Number(group.validCredit);
              }
            })
          }

          vm.totalCredit = validCredit + gameCredit + groupCredit;
        }
      }
    });

    player.on('getWithdrawalInfo', function (data) {
      if(data.status==459){
          vm.freeGroupDetail.currentAmount = 100;
          vm.freeGroupDetail.requiredUnlockAmount = 100;
      }else{
          vm.freeGroupDetail.currentAmount = data.data ? data.data.currentFreeAmount : 0;
          vm.freeGroupDetail.requiredUnlockAmount = data.data ? data.data.freeAmount : 0;
      }

      var lockedGroupList = data.data && data.data.lockList instanceof Array ? data.data.lockList : [];
      for (var i = 0; i < lockedGroupList.length; i++) {
        var lockedGroup = lockedGroupList[i];
        if (!vm.providerGroupDetail[lockedGroup.name]) {
          vm.providerGroupDetail[lockedGroup.name] = {};
        }

        vm.providerGroupDetail[lockedGroup.name].credit = vm.providerGroupDetail[lockedGroup.name].credit || 0;
        vm.providerGroupDetail[lockedGroup.name].consumptionAmount = lockedGroup.currentLockAmount;
        vm.providerGroupDetail[lockedGroup.name].requiredConsumptionAmount = lockedGroup.lockAmount;
      }

    });

    player.on('logoutPlayerPartner', function (data) {
      if (data && data.status == 200) {
        $log.debug("logout成功。");
      } else {
        $log.debug("logout失败。");
      }
      $rootScope.loggedOn = false;
      $rootScope.totalCredit = 0;
      $rootScope.validCredit = 0;
      $rootScope.lockedCredit = 0;
      vm.message = "登出成功。";
      localStorage.removeData();
      jQ('#acModal').modal('show');
      jQ('#acModal').on('hidden.bs.modal', function () {
        $state.go("home");
      })
    });

    function getTopupHistory() {
      var now = new Date();
      var startDate = new Date(now.setMonth(now.getMonth() - 1));
      now = new Date();
      var endDate = new Date(now.setDate(now.getDate() + 1));
      payment.emit("getTopupHistory", {
        startTime: $filter('date')(startDate, 'yyyy-MM-dd'),
        endTime: $filter('date')(endDate, 'yyyy-MM-dd'),
        startIndex: 0,
        status: "Pending",
        requestCount: 10
      });
    }

    vm.timeConvert = function (validTime) {
        var validTM = new Date(validTime).getTime();
        var createAt = new Date().getTime();
        var leftTime = validTM - createAt;
        if(leftTime < 0){
            leftTime = 0;
        }
        var leftTimeText = vm.displayTime(leftTime);
        return leftTimeText;
    }

    vm.displayTime = function (leftTime) {

      var leftTimes = "";
      var days = Math.floor(leftTime / (1000 * 60 * 60 * 24));
      var hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));

      hours = ("0" + hours).slice(-2);
      minutes = ("0" + minutes).slice(-2)
      // Display the result in the element with id="demo"
      leftTimes = hours + ":" + minutes;
      return leftTimes;
    }

    payment.on("getTopupHistory", function (data) {
      if (data && data.status == 200) {
        vm.cashinList = data.data.records;
        vm.cashinList.forEach(function (d) {

          if (d.data.validTime) {
            d.formattedValidTime = vm.timeConvert(d.data.validTime)
          }
          else {
            d.formattedValidTime = 0;
          }
          if (d.type == 1) {
            d.typeText = "银行手工充值";
          } else if (d.type == 2) {
            d.typeText = "在线充值";
          }
          else {
            d.type = 3;
            d.typeText = "支付宝手工充值";
          }
        })
      }
    })

    function getBonusRequestList() {
      var now = new Date();
      var startDate = new Date(now.setMonth(now.getMonth() - 1));
      now = new Date();
      var endDate = new Date(now.setDate(now.getDate() + 1));
      payment.emit("getBonusRequestList", {
        startTime: $filter('date')(startDate, 'yyyy-MM-dd'),
        endTime: $filter('date')(endDate, 'yyyy-MM-dd'),
        startIndex: 0,
        status: "Pending",
        requestCount: 10
      });
    }

    getBonusRequestList();

    payment.on("getBonusRequestList", function (data) {
      if (data && data.status == 200) {
        vm.cashoutList = data.data.records;
      }
    })

    // function getRewardTask() {
    //   reward.emit("getRewardTask", {playerId: authenticatedData.player.playerId});
    // }
    //
    // getRewardTask();

    reward.on("getRewardTask", function (data) {
      if (data && data.status == 200) {
        vm.reward = data.data;
      }
    })

    function cancelCashout() {
      var proposalId = vm.selectedCashout;
      if (proposalId) {
        vm.cashoutList.forEach(function (d) {
          if (d.proposalId == proposalId) {
            cancelBonusRequest(d);
          }
        });
      }
    }

    vm.cancelCashout = cancelCashout;

    function cancelBonusRequest(proposal) {
      payment.emit("cancelBonusRequest", {proposalId: proposal.proposalId}, 99);
    }

    payment.on("cancelBonusRequest", function (data) {
      if (data && data.status == 200) {
        vm.message = "您的提款请求已取消！";
        jQ('#acModal').modal('show');
        jQ('#acModal').on('hidden.bs.modal', function () {
          getBonusRequestList();
        })
      }
      else {
        vm.message = "系统出现异常，请联系客服。";
        jQ('#acModal').modal('show');
      }
    })

    function cancelCashin() {
      var proposalId = vm.selectedCashin;
      if (proposalId) {
        vm.cashinList.forEach(function (d) {
          if (d.proposalId == proposalId) {
            if (d.type == 1) {
              cancelManualTopupRequest(d);
            }
            else {
              cancelAlipayTopup(d);
            }
          }
        });
      }
    }

    vm.cancelCashin = cancelCashin;


    function cancelManualTopupRequest(proposal) {
      payment.emit("cancelManualTopupRequest", {proposalId: proposal.proposalId}, 99);
    }

    payment.on("cancelManualTopupRequest", function (data) {
      if (data && data.status == 200) {
        vm.message = "您的转账订单已取消！";
        jQ('#acModal').modal('show');
        jQ('#acModal').on('hidden.bs.modal', function () {
          getTopupHistory();
        })
      }
      else {
        vm.message = "系统出现异常，请联系客服。";
        jQ('#acModal').modal('show');
      }
    })

    function cancelAlipayTopup(proposal) {
      payment.emit("cancelAlipayTopup", {proposalId: proposal.proposalId}, 99);
    }

    payment.on("cancelAlipayTopup", function (data) {
      if (data && data.status == 200) {
        vm.message = "您的转账订单已取消！";
        jQ('#acModal').modal('show');
        jQ('#acModal').on('hidden.bs.modal', function () {
          getTopupHistory();
        })
      }
      else {
        vm.message = "系统出现异常，请联系客服。";
        jQ('#acModal').modal('show');
      }
    })
    function userPg() {
      $state.go('user');
    }

    vm.userPg = userPg;

    //get Game Provider / Game Credit

    game.on('getProviderList', function (data) {
      if (data) {
        data.data.forEach(function (pr) {
          var provider = {};
          provider.providerId = pr.providerId;
          provider.name = pr.name;
          provider.nickname = pr.nickName ? pr.nickName.replace('AG', '').replace('2', '') : pr.name;
          provider.credit = 0;
          vm.providerList.push(provider);
        })
      }
      vm.refreshGameProviders();
    })

    game.on('getGameProviderCredit', function (data) {
      if (data.data) {
        var result = data.data;
        vm.providerList.forEach(function (provider) {
          if (provider.providerId == result.providerId) {
            provider.credit = result.credit;
          }
        })
      }
    })

    vm.refreshGameProviders = function () {
      for (var item in vm.providerList) {
        game.emit('getGameProviderCredit', {providerId: vm.providerList[item].providerId})
      }
    }


  }
})();
