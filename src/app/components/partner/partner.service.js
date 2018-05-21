(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('partner', partner);

  /** @ngInject */
  function partner($log, $rootScope, $state, base, localStorage) {

    angular.extend(partner.prototype, base);
    var vm = this;
    vm.serviceName = 'partner';

    // getPartner
    function getPartner(success, fail, hideLoading) {
      var authenticatedData = angular.fromJson(localStorage.getData());
      if (!authenticatedData || !authenticatedData.partner) {
        if (fail) {
          fail.apply(this, []);
        }
        else {
          $state.go("partnerlogin");
        }

        // localStorage.removeData();
        // $rootScope.loggedOn = false;
        $log.debug("authenticatePlayerPartner失败。");
        return;
      }
      var params = {
        // playerId: authenticatedData.player.playerId
        partnerId: authenticatedData.partner.partnerId,
        token: authenticatedData.token
      };

      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      vm.emit('get', params, 99, requestId);
      vm.on('get', function (respData) {
          if (respData && respData.status == 200 && respData.data) {
            // authenticatedData.player = respData.data[0];
            if(authenticatedData.player){
                params.playerId = authenticatedData.player.playerId
            }
            localStorage.setData(angular.toJson(authenticatedData));

            // $rootScope.loggedOn = true;
            // $rootScope.validCredit = authenticatedData.player.validCredit;
            // $rootScope.lockedCredit = authenticatedData.player.lockedCredit;
            $log.debug("getPartner成功。");

            vm.emit("getCreditDetail", {});

            if (success) {
              success.apply(this, [respData]);
            }
          }
          else if (respData && respData.status == 420) {
            if (fail) {
              fail.apply(this, [respData]);
            }
            else {
              $state.go("plogin");
            }

            // localStorage.removeData();
            // $rootScope.loggedOn = false;
            // $rootScope.validCredit = 0;
            // $rootScope.lockedCredit = 0;
            // $rootScope.totalCredit = 0;
            $log.debug("authenticatePlayerPartner失败。");
          }
          else {
            // localStorage.removeData();
            // $rootScope.loggedOn = false;
            // $rootScope.validCredit = 0;
            // $rootScope.lockedCredit = 0;
            // $rootScope.totalCredit = 0;
            $log.debug("authenticatePlayerPartner失败。");

            if (fail) {
              fail.apply(this, [respData]);
            }
          }
          if(hideLoading) {$rootScope.loading=false;}
        }
        ,
        {
          requestId: requestId
        }
      );
    }

    vm.getPartner = getPartner;
  }
})();
