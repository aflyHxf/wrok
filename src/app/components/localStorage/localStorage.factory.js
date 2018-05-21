/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .factory('localStorage', localStorage);

  /** @ngInject */
  function localStorage($window) {
    return {
      setData: function (val) {
        $window.localStorage && $window.localStorage.setItem('fishingKingMobile1', val);
        return this;
      },
      getData: function () {
        return $window.localStorage && $window.localStorage.getItem('fishingKingMobile1');
      },
      removeData: function () {
        return $window.localStorage && delete $window.localStorage.removeItem('fishingKingMobile1');
      }
    }
  }
})();
