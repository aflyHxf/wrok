(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('platform', platform);

  /** @ngInject */
  function platform($window, base) {

    angular.extend(platform.prototype, base);
    var vm = this;
    vm.serviceName = 'platform';
  }
})();
