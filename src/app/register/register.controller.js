/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($log, $rootScope, $location, $state, $window, $interval, jQ, player, platform, localStorage, platformId) {
    var vm = this;
    vm.domain = $location.protocol() + "://" + $location.host(); // + ":" + $location.port();

    var urlParam = $location.search();
    if (urlParam) {
      if (urlParam['r']) {
        vm.referral = urlParam['r'];
        vm.referralEditable = false;
      } else {
        vm.referralEditable = true;
      }
    }

    $log.debug(vm.domain)

    function signup() {
      var data = {
        name: vm.username,
        password: vm.password,
        realName: '', //vm.realname,
        phoneNumber: vm.mobile,
        email: vm.email,
        // captcha: vm.code,
        smsCode:'0000', // vm.sms,
        domain: vm.domain,
        platformId: platformId,
        partnerName: vm.referral
      };
      player.emit('create', data);
    }

    vm.signup = signup;

    player.on('create', function (data) {
      if (data.status == 200 && data.data) {
        var playerData = data.data;
        // var partnerData = data.data[1];
        localStorage.setData(angular.toJson({
          token: data.token,
          player: playerData
        }));
        $rootScope.loggedOn = true;
        $rootScope.validCredit = playerData.validCredit;
        $rootScope.lockedCredit = playerData.lockedCredit;
        player.emit("getCreditDetail", {});

        vm.playerData = playerData;
        vm.message = "";
        jQ('#signupModal').modal('show');
        jQ('#signupModal').on('hidden.bs.modal', function () {
          $state.go("home");
        })
        $log.debug("signup成功。");
      } else {
        localStorage.removeData();
        $rootScope.loggedOn = false;
        vm.message = data.errorMessage;
        jQ('#signupModal').modal('show');
        $log.debug("signup失败。");
      }
    });

    function getSMSCode() {
      if (!vm.mobile) {
        $window.alert("请填写手机获取验证码");
        return;
      }
      if (vm.countDown && vm.countDown > 0) {
        return;
      }
      player.emit('getSMSCode', {
        platformId: platformId,
        phoneNumber: vm.mobile,
        name: vm.username,
        purpose: "registration"
      });
    }

    vm.getSMSCode = getSMSCode;

    player.on('getSMSCode', function (data) {
      if (data && data.status && data.status == 200) {
        vm.countDown = 120;
        vm.intervalPromise = $interval(function () {
          if (vm.countDown && vm.countDown > 0) {
            vm.countDown--;
          } else {
            $interval.cancel(vm.intervalPromise);
          }
          $log.debug(vm.countDown);
        }, 1000)
      } else {
        if (data.errorMessage) {
          alert(data.errorMessage);
        }
      }
    });

    function getCaptcha() {
      player.emit('captcha', {});
    }

    vm.getCaptcha = getCaptcha;

    player.on('captcha', function (data) {
      if (data.status == 200) {
        vm.captcha = bytesToBase64(data.data.data);
      }
    });

    function bytesToBase64(buffer) {
      var binary = '';
      var bytes = new Uint8Array(buffer);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return $window.btoa(binary);
    }

    player.on("getCreditDetail", function (data) {
      $rootScope.totalCredit = 0;
      if (data && data.status == "200" && data.data) {
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

        $rootScope.totalCredit = validCredit + gameCredit + groupCredit;
      }
    });
  }
})();
