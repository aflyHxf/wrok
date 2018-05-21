/**
 * Created by aeson on 12/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .directive('compareTo', compareTo);

  /** @ngInject */
  function compareTo() {
    var directive = {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function (scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      }
    };

    return directive;
  }

})();
