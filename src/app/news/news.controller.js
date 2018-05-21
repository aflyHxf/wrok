(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('NewsController', NewsController);

  /** @ngInject */
  function NewsController(jQ, player, localStorage, platform, platformId) {
    var vm = this;
    vm.newsData = [];
    platform.emit('getPlatformAnnouncements',{platformId: platformId});

    platform.on('getPlatformAnnouncements', function(data){
      vm.newsData = data.data;
    })
  }
})();
