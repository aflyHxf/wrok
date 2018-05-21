/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('player', player);

  /** @ngInject */
  function player($log, $rootScope, $state, base, localStorage) {

    angular.extend(player.prototype, base);
    var vm = this;
    vm.serviceName = 'player';

    function getPlayerPartner(success, fail, hideLoading) {
      var authenticatedData = angular.fromJson(localStorage.getData());
      if (!authenticatedData) {
        if (fail) {
          fail.apply(this, []);
        }
        else {
          $state.go("login");
        }

        localStorage.removeData();
        $rootScope.loggedOn = false;
        $rootScope.validCredit = 0;
        $rootScope.totalCredit = 0;
        $rootScope.lockedCredit = 0;
        $log.debug("authenticatePlayerPartner失败。");
        return;
      }
      var params = {
        playerId: authenticatedData.player.playerId,
        // partnerId: authenticatedData.partner.data.partnerId,
        token: authenticatedData.token
      };
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      vm.emit('get', params, 99, requestId);
      vm.on('get', function (respData) {
          if (respData && respData.status == 200 && respData.data) {
            authenticatedData.player = respData.data;
            localStorage.setData(angular.toJson(authenticatedData));

            $rootScope.loggedOn = true;
            $rootScope.validCredit = authenticatedData.player.validCredit;
            $rootScope.lockedCredit = authenticatedData.player.lockedCredit;
            $log.debug("getPlayerPartner成功。");

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
              $state.go("login");
            }

            localStorage.removeData();
            $rootScope.loggedOn = false;
            $rootScope.validCredit = 0;
            $rootScope.lockedCredit = 0;
            $rootScope.totalCredit = 0;
            $log.debug("authenticatePlayerPartner失败。");
          }
          else {
            localStorage.removeData();
            $rootScope.loggedOn = false;
            $rootScope.validCredit = 0;
            $rootScope.lockedCredit = 0;
            $rootScope.totalCredit = 0;
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


    vm.on("getCreditDetail", function (data) {
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

    vm.getPlayerPartner = getPlayerPartner;
  }
})
();
