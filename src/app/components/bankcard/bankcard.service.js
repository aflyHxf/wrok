(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('bankcard', bankcard);

  /** @ngInject */
  function bankcard(base) {

    angular.extend(bankcard.prototype, base);
    var vm = this;
    vm.serviceName = 'bankcard';
  }
})();