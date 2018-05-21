/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('payment', payment);

  /** @ngInject */
  function payment($window, base) {

    angular.extend(payment.prototype, base);
    var vm = this;
    vm.serviceName = 'payment';
  }
})();
