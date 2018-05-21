(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('delivery', delivery);

  /** @ngInject */
  function delivery() {
    var vm = this;
    vm.tabName = 'cashIn';

    return {
      getTab:function(){
        return vm.tabName;
      },
      setTab: function(name){
        vm.tabName = name;
        return vm.tabName;
      }
    }
  }
})();