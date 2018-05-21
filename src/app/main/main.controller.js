(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $log, $scope, $state, $window, $timeout, jQ, game, platform, platformId, $location) {
    var vm = this;
    $window.VM = vm;
    $window.$scope = $scope;
    vm.speed = "";
    vm.gameList = [];
    function getGameGroupInfo() {
      vm.gameListDone = false;
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      game.emit('getGameGroupInfo', {
        "platformId": platformId,
        // "providerId": 30,
        "code": "2",
        "startIndex": 0,
        "requestCount": 999,
      }, 1, requestId);
      game.on('getGameGroupInfo', function (respData) {
        if (respData && respData.status && respData.status == 200 && respData.data && respData.data.games && respData.data.games.gameList) {
          vm.gameList = [];
          respData.data.games.gameList.forEach(function (val) {
            vm.gameList[val.game.name] = {id: val.game.gameId, trial: val.game.canTrial};
          })
          vm.gameListDone = true;
        }
      }, {requestId: requestId});
    }

    getGameGroupInfo();
    // var gameList = [];
    // gameList["buyuwang"] = "F363CE54-4A07-41A9-ACCC-45B38A0DF3FB";
    // gameList["ggfish"] = "CFE668B8-10D5-403E-AC67-9EC75EB369F7";
    // // gameList["shenhai"] = "4A7A53A1-4312-4CFF-91A5-CF32F8A09E9C";
    // // gameList["fufish"] = "1AABDA1C-DA0D-4273-9E14-C3FA1838F2BD";

    function playGame(gameName) {
      if (!$rootScope.loggedOn) {
        $state.go("login");
        return;
      }
      if (!vm.gameList[gameName]) {
        vm.message = "敬请期待";
        jQ('#mainModal').modal('show');
        return;
      }
      // vm.myNewTab = vm.openNewTab();
      var protocol = $location.protocol();
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      game.emit('getLoginURL', {
        gameId: vm.gameList[gameName].id,
        clientDomainName: protocol+'://'+window.location.host ,
        clientType: 2
      }, 999, requestId);

      game.on('getLoginURL', function (respData) {
        if (respData && respData.status == 200) {
          // $window.location = respData.data.gameURL;
          vm.gameUrl = respData.data.gameURL;
          $window.location.href = respData.data.gameURL;
          // vm.updateTabLocation(vm.gameUrl, vm.myNewTab);
        }
        else {
          vm.message = respData.errorMessage;
          jQ('#mainModal').modal('show');
        }
      }, {requestId: requestId});
    }

    vm.openNewTab = function(){
         var newTabWindow = $window.open();
         return newTabWindow;
    }

    vm.updateTabLocation = function(tabLocation, tab) {
         if(!tabLocation){
           tab.close();
         }
         tab.location.href = tabLocation;
    }

    vm.playGame = playGame;
    $rootScope.playGame = playGame;
    // var testGameList = [];
    // // testGameList["buyuwang"] = "F363CE54-4A07-41A9-ACCC-45B38A0DF3FB";
    // testGameList["ggfish"] = "CFE668B8-10D5-403E-AC67-9EC75EB369F7";
    // // testGameList["shenhai"] = "4A7A53A1-4312-4CFF-91A5-CF32F8A09E9C";
    // // testGameList["fufish"] = "1AABDA1C-DA0D-4273-9E14-C3FA1838F2BD";
    function testGame(gameName) {
      // if (!$rootScope.loggedOn) {
      //   $state.go("login");
      //   return;
      // }
      var apiName = 'getTestLoginURLWithOutUser';
      if ($rootScope.loggedOn) {
        apiName = 'getTestLoginURL';
      }
      var gameObj = vm.gameList[gameName];
      if ($rootScope.loggedOn && gameObj && !gameObj.trial) {
        vm.message = "本游戏无法试玩。";
        jQ('#mainModal').modal('show');
        return;
      }

      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      game.emit(apiName, {
        gameId: gameObj.id,
        clientDomainName: "http://buyuhuangmobile1.neweb.me",
        clientType: 2
      }, 999, requestId);
      game.on(apiName, function (respData) {
        if (respData && respData.status == 200) {
          // $window.location = respData.data.gameURL;
          vm.myNewTab = vm.openNewTab();
          vm.gameUrl = respData.data.gameURL;
          vm.updateTabLocation(vm.gameUrl, vm.myNewTab);
        }
        else {
          vm.message = respData.errorMessage;
          jQ('#mainModal').modal('show');
        }
      }, {requestId: requestId});
    }

    vm.testGame = testGame;

    function getPlatformAnnouncements() {
      vm.notices = "";
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      platform.emit('getPlatformAnnouncements', {platformId: platformId}, 999, requestId);
      platform.on('getPlatformAnnouncements', function (respData) {
        var notices = "";
        if (respData && respData.status == 200 && respData.data) {
          respData.data.forEach(function (e) {
            notices += e.content;
          });
        }
        $timeout(function () {
          vm.notices = notices;
          adjustSpeed(vm.notices);
        }, 0);
      }, {requestId: requestId});
    }

    function adjustSpeed(notices) {
      var length = notices.length;
      if (length > 0 && length < 80) {
        vm.speed = "fast";
      } else if (length >= 80 && length < 240) {
        vm.speed = "normal";
      } else if (length >= 240 && length < 400) {
        vm.speed = "slow";
      } else {
        vm.speed = "slow";
      }
    }

    getPlatformAnnouncements();
  }
})();
