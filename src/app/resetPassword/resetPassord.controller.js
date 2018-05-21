/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('ResetPasswordController', ResetPasswordController);

  /** @ngInject */
  function ResetPasswordController($log, $rootScope, $location, $state, $window, $document, $interval, jQ, player, localStorage, customerService, platformId) {
    var vm = this;

    function getSMSCode() {
      if (!vm.mobile) {
        $window.alert("请填写手机获取验证码");
        return;
      }
      if (vm.countDown && vm.countDown > 0) {
        return;
      }
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      player.emit('getSMSCode', {
        platformId: platformId,
        phoneNumber: vm.mobile,
        purpose:"resetPassword"
      }, 99, requestId);

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
      }, {
        requestId: requestId
      });
    }
    vm.getSMSCode = getSMSCode;

    function resetPasswordViaPhone() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      player.emit('resetPasswordViaPhone', {
        password: vm.password,
        phoneNumber: vm.mobile,
        smsCode: vm.sms,
      }, 99, requestId);
      player.on('resetPasswordViaPhone', function (data) {
        if (data && data.status && data.status == 200) {
          alert("密码更换成功");
          $state.go("login");
        } else {
          if (data.errorMessage) {
            alert(data.errorMessage);
          }
        }
      }, {
        requestId: requestId
      });
    }
    vm.resetPasswordViaPhone = resetPasswordViaPhone;

    function openWebChat() {
      var e = customerService, //"https://www.chat800.com/chat/chatClient/chatbox.jsp?companyID=267&configID=26",
        t = encodeURIComponent($document.URL),
        n = encodeURIComponent($document.referrer);
      $window.open(e + "&enterurl=" + t + "&pagereferrer=" + n)
    }

    vm.openWebChat = openWebChat;

  }
})();
