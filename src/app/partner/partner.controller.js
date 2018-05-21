/**
 * Created by mark on 28/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('PartnerController', PartnerController);

  /** @ngInject */
  function PartnerController($log, $rootScope, $state, $window, $filter, $interval, $document, $location, jQ, localStorage, partner) {
    var vm = this;
    vm.pastMonthTopUpSum = 0;
    vm.childrenSum = 0;
    vm.commissionAmountFromChildren = 0;
    vm.partnerName = '';
    vm.registrationTime = '';
    vm.currentDate = new Date();
    vm.lastCommissionSettleTime = '';
    vm.countdown = '';

    vm.domain = "";

    // vm.domain = $location.protocol() + "://" + $location.host();
    // if (!$rootScope.loggedOn) {
    //   $state.go("register");
    //   return;
    // }
    jQ('.carousel1').carousel('pause');
    jQ('.carousel2').carousel('pause');
    jQ('.carousel3').carousel('pause');

    vm.prevSlide1 = function () {
      jQ('.carousel1').carousel('prev');
    }
    vm.nextSlide1 = function () {
      jQ('.carousel1').carousel('next');
    }
    vm.prevSlide2 = function () {
      jQ('.carousel2').carousel('prev');
    }
    vm.nextSlide2 = function () {
      jQ('.carousel2').carousel('next');
    }
    vm.prevSlide3 = function () {
      jQ('.carousel3').carousel('prev');
    }
    vm.nextSlide3 = function () {
      jQ('.carousel3').carousel('next');
    }

    partner.getPartner(function (pdata) {
      var data = pdata.data;
      vm.partnerName = data.partnerName;
      // slider 2-1
      vm.childrenSum = data.totalReferrals;
      // slider 3-1
      vm.commissionAmountFromChildren = data.commissionAmountFromChildren;
      // slider 2-3, 3-2
      vm.validPlayers = data.validPlayers;

      vm.registrationTime = data.registrationTime;
      vm.domainParams = "/#/register?r=" + data.partnerName;
      vm.lastCommissionSettleTime = new Date(data.lastCommissionSettleTime).getTime();
      if (vm.lastCommissionSettleTime != 0) {
        vm.settlementCountDown();
      } else {
        vm.countdown = "0天 " + "0时 " + "0分 ";
      }

      partner.emit('getPartnerCommission', {
        startTime: firstDay,
        endTime: new Date(),
        startIndex: 0,
        requestCount: 5
      });

      partner.emit('getPartnerPlayerPaymentReport', {
        startTime: firstDay,
        endTime: new Date(),
        startIndex: 0,
        requestCount: 5,
        domain: vm.domain,
        playerName: vm.partnerName
      });

      getDomainList();
    }, function (err) {
      console.log(err);
      $state.go("partnerlogin");
      return;
    });

    function getDomainList() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      partner.emit("getDomainList", {}, 99, requestId);
      partner.on("getDomainList", function (respData) {
        if (respData && respData.status == 200 && respData.data) {
          var playerSpreadUrl = respData.data && respData.data.playerSpreadUrl ? respData.data.playerSpreadUrl:'';
          vm.domain = respData.data.playerSpreadUrl || '';
          vm.domainUrl = playerSpreadUrl + vm.domainParams;
        }
      }, {
        requestId: requestId
      });
    }

    vm.settlementCountDown = function () {
      // Update the count down every 1 second
      var x = $interval(function () {
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = vm.lastCommissionSettleTime - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        // Display the result in the element with id="demo"
        vm.countdown = days + "天 " + hours + "时 " + minutes + "分 ";
        // If the count down is finished, write some text
        if (distance < 0) {
          $interval.cancel(x);
        }
      }, 1000);
    }

    vm.copyClipboard = function () {

      var clipboard = new Clipboard('.copytoClipboard');
      clipboard.on('success', function (e) {
        e.clearSelection();
      });
      clipboard.on('error', function (e) {});
    }

    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var firstDay = new Date(y, m, 1);


    partner.on('getPartnerCommission', function (data) {
      vm.partnerCommission = data.data;
      vm.monthTotalTopUpAmount = 0;
      vm.monthTotalBonusAmount = 0;
      vm.monthProfitAmount = 0;

      if (data.data) {
        // slider 1-1
        vm.monthTotalTopUpAmount = data.data.total.totalTopUpAmount;
        // slider 1-2
        vm.monthTotalBonusAmount = data.data.total.totalBonusAmount;
        // slider 1-3
        vm.monthProfitAmount = data.data.total.profitAmount;
      }
    })


    partner.on('getPartnerPlayerPaymentReport', function (data) {
      if (data.data) {
        // slider 2-2
        vm.totalTopUpTimes = data.data.summary.totalTopUpTimes;
      }
    })


  }
})();
