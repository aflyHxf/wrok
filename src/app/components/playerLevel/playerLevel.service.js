(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('playerLevel', playerLevel);

  /** @ngInject */
  function playerLevel($window, base) {

    angular.extend(playerLevel.prototype, base);
    var vm = this;
    vm.serviceName = 'playerLevel';
  }
})();
