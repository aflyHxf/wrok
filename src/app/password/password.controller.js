(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('PasswordController', PasswordController);

  /** @ngInject */
  function PasswordController($log, $rootScope, $location, $state, $interval, jQ, player, localStorage, platformId) {
    var vm = this;
    var lstore = angular.fromJson(localStorage.getData());
    vm.phoneNumber = lstore.player.phoneNumber;
    vm.domain = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    $log.debug(vm.domain);

    function updatePassword() {
      var params = {
        newPassword: vm.newPassword,
        oldPassword: vm.oldPassword,
        playerId: lstore.player ? lstore.player.playerId : "",
        // partnerId: lstore.partner.partnerId,
        smsCode: vm.smsCode
      };
      player.emit('updatePassword', params);
    }
    vm.getSMSCode = function(){
      player.emit('sendSMSCodeToPlayer', { platformId: platformId, purpose: "updatePassword"});
      player.on('sendSMSCodeToPlayer',function(data){
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


    vm.updatePassword = updatePassword;

    player.on('updatePassword', function (data) {
      if (data.status == 200 && (data)) {
        vm.passwordOK = true;
        vm.message = "尊敬的会员您好，您的密码已经修改完成，请您下次使用新的用户密码进行登录，感谢您的支持";
        jQ('#passwordModal').modal('show');
        jQ('#passwordModal').on('hidden.bs.modal', function () {
          $state.go("user");
        });
        $log.debug("updatePassword成功。");
      }
      else {
        vm.message = data.errorMessage;
        jQ('#passwordModal').modal('show');
        jQ('#passwordModal').on('hidden.bs.modal', function () {
          location.reload();
        });
        $log.debug(data.status + "\n" + data.errorMessage);
      }
    });
  }
})();
