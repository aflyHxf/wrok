(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('common', common);

  /** @ngInject */
  function common($window, base) {
    var vm = this;
    angular.extend(common.prototype, base);
    vm.serviceName = 'common';
    /* 14 day record search limit */
    vm.getMinDate = function(){

        // limited user can search data within 14 day
        var maxDate =  new Date().getTime();
        var day14 = 14 * 24 * 60 * 60 * 1000;
        var timestamp = maxDate - day14;

        var minDateData = new Date(timestamp);
        var minDate = vm.getDateFormat(minDateData);
        return minDate;
    }

    vm.getDateFormat = function(dateData){

        if(!dateData){
            dateData = new Date();
        }
        var yy = dateData.getFullYear();
        var mm = dateData.getMonth() + 1;
        var dd = dateData.getDate();

        var minDate = yy + '-' + vm.setDateZero(mm) + '-' + vm.setDateZero(dd);
        return minDate;
    }

    vm.setDateZero = function (date) {
        return date < 10 ? '0' + date : date;
    }

    return {
      getMinDate:function(){
        return vm.getMinDate();
      },
      getMaxDate: function(){
        return vm.getDateFormat();
      }
    }
  }
})();
