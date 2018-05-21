/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .factory('jQ', jQ);

  /** @ngInject */
  function jQ($window) {
    return $window.jQuery;
  }
})();
