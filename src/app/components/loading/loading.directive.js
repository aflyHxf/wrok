/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .directive('loading', loading);

  /** @ngInject */
  function loading() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/loading/loading.html',
      scope: {},
      controller: LoadingController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function LoadingController($rootScope, jQ) {
      var vm = this;

    }
  }

})();
