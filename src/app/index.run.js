(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .run(runBlock)
    .run(runReLoginInterval)
    .run(runInitPageContentHeight)
    .run(initLoading);

  /** @ngInject */
  function runBlock($log, partner) {

    $log.debug('runBlock end');
  }

  function reLogin($log, $rootScope, localStorage, player, partner) {

    var authenticatedData = angular.fromJson(localStorage.getData());
    if (authenticatedData) {
      authenticate();
      partnerAuth();
    }
    else {
      authenticatedData = {player: {playerId: "test"}, partner: {partnerId: "test"}, token: "test"};
      authenticate();
      partnerAuth();
    }
    function authenticate() {
      var params = {
        playerId: authenticatedData.player ? authenticatedData.player.playerId : "",
        //partnerId: authenticatedData.partner.partnerId,
        token: authenticatedData.token
      };
      player.emit('authenticate', params, 1);
      player.on('authenticate', function (respData) {
        if (respData && respData.status == 200 && respData.data) {
          $log.debug("authenticatePlayer成功。");
          player.getPlayerPartner(null,null,true);
        } else {
          localStorage.removeData();
          $rootScope.loggedOn = false;
          $rootScope.validCredit = 0;
          $rootScope.lockedCredit = 0;
          $log.debug("authenticatePlayer失败。");
        }
      });
    }
    function partnerAuth() {
      var params = {
        partnerId: authenticatedData.partner ? authenticatedData.partner.partnerId: '',
        token: authenticatedData.token
      };
      if(authenticatedData.partner){
          partner.emit('authenticate', params, 1);
          partner.on('authenticate', function (respData) {
            if (respData && respData.status == 200 && respData.data) {
              $log.debug("authenticatePlayer成功。");
              // player.getPlayerPartner(null,null,true);
            } else {
              localStorage.removeData();
              $log.debug("authenticatePlayer失败。");
            }
          });
      }
    }
  }
  function runInitPageContentHeight($log, $rootScope, $window, $timeout, jQ) {
    $rootScope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        var windowHeight = $window.innerHeight;
        var footerHeight = jQ(".fk-footer").height();
        $log.debug("windowHeight: " + windowHeight);
        $log.debug("footerHeight: " + footerHeight);
        if (windowHeight && footerHeight) {
          jQ(".fk-scrollable").height(windowHeight - footerHeight);
        }
        if (windowHeight) {
          jQ(".fk-login").height(windowHeight);
        }
      }, 0)

    });
    // jQ(window).resize(function () {
    //   $timeout(function () {
    //     var windowHeight = $window.innerHeight;
    //     var footerHeight = jQ(".fk-footer").height();
    //     $log.debug("windowHeight: " + windowHeight);
    //     $log.debug("footerHeight: " + footerHeight);
    //     if (windowHeight && footerHeight) {
    //       jQ(".fk-scrollable").height(windowHeight - footerHeight);
    //     }
    //     if (windowHeight) {
    //       // jQ(".fk-login").height(windowHeight);
    //       // alert(windowHeight);
    //     }
    //   }, 0)
    // })
  }

  function runReLoginInterval($interval, $log, $rootScope, localStorage, player, partner) {
    reLogin($log, $rootScope, localStorage, player, partner);
    $interval(function () {
      $log.info("runReLoginInterval...");
      reLogin($log, $rootScope, localStorage, player, partner);
    }, 20000)
  }

  function initLoading($rootScope, $log, player) {
    $rootScope.hasNewMail = false;
    $rootScope.checkHasNewMail = function() {
      if($rootScope.loggedOn) {
        player.emit('getUnreadMail', {});
        player.on('getUnreadMail', function (data) {
          if(data && data.data && data.data.length > 0) {
            $rootScope.hasNewMail = true;
          }
        });
      }
    }
    $rootScope.checkHasNewMail();

    // $rootScope.$watch("loading", function () {
    //   $log.info("loading: " + $rootScope.loading)
    //   // presence.setGlobal({
    //   //   u: $rootScope.currentUser,
    //   //   s: 'on'
    //   // })
    // })
  }

})();
