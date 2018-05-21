/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('rPoints', rPoints);

  /** @ngInject */
  function rPoints($window, base) {

    angular.extend(rPoints.prototype, base);
    var vm = this;
    vm.serviceName = 'rewardPoints';
  }
})();
