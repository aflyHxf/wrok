/**
 * Created by mark on 03/05/2017.
 */
 (function () {
  'use strict';

  angular
  .module('fishingKingMobile')
  .controller('PartnerReferController', PartnerReferController);

  /** @ngInject */
  function PartnerReferController($log, $rootScope, $state, $window, $filter, $interval, $location, jQ, localStorage, player, platformId) {
    var vm = this;
    var lstore = angular.fromJson(localStorage.getData());
    if(lstore.partner){
      vm.partnerName = lstore.partner.partnerName;
    }
    vm.domain = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    $log.debug(vm.domain);


    function signup() {
      var data = {
        name: vm.username,
        password: vm.password,
        realName: vm.realname,
        phoneNumber: vm.mobile,
        email: vm.email,
        // captcha: vm.code,
        smsCode: vm.sms,
        domain: vm.domain,
        partnerName: vm.partnerName,
        platformId: platformId
      };
      player.emit('create', data);
    }

    vm.signup = signup;

    player.on('create', function (data) {
      if (data.status == 200 && data.data) {

        vm.message = "会员开户成功。";
        jQ('#signupModal').modal('show');
        jQ('#signupModal').on('hidden.bs.modal', function () {
          $state.go("partner");
        })
        $log.debug("会员开户成功。");

      } else {

        vm.message = data.errorMessage;
        jQ('#signupModal').modal('show');
        getCaptcha();
        $log.debug("会员开户失败。");
      }
    });

    function getSMSCode() {
      if (!vm.mobile) {
        $window.alert("请填写手机获取验证码");
        return;
      }
      player.emit('getSMSCode', {phoneNumber: vm.mobile, platformId: platformId});
    }

    vm.getSMSCode = getSMSCode;


    player.on('getSMSCode', function (data) {
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

    function getCaptcha() {
      // if (!vm.phone) {
      //     $window.alert("请填写手机获取验证码");
      //   }
      player.emit('captcha', {});
    }

    vm.getCaptcha = getCaptcha;
    getCaptcha();

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
}
})();
