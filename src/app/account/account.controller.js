/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController(jQ, localStorage, $state) {

    var vm = this;
    vm.collapseState = false;
    var authenticatedData = angular.fromJson(localStorage.getData());
    if(!authenticatedData || !authenticatedData.player){
        $state.go('login')
    }

    vm.toggleCollapse = function(){
        jQ('#collapseMenu').collapse('toggle');
    }
    jQ('#collapseMenu').on('hide.bs.collapse', function () {
      vm.collapseState = true;
    })
    jQ('#collapseMenu').on('show.bs.collapse', function () {
      vm.collapseState = false;
    })
  }
})();
