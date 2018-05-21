(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('game', game);

  /** @ngInject */
  function game($window, base) {

    angular.extend(game.prototype, base);
    var vm = this;
    vm.serviceName = 'game';
  }
})();
