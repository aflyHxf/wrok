(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('consumption', consumption);

  /** @ngInject */
  function consumption($window, base) {

    angular.extend(consumption.prototype, base);
    var vm = this;
    vm.serviceName = 'consumption';
  }
})();
