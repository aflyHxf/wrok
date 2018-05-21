(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('reward', reward);

  /** @ngInject */
  function reward($window, base) {

    angular.extend(reward.prototype, base);
    var vm = this;
    vm.serviceName = 'reward';
  }
})();
