/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(jQ, player, $state) {

    var vm = this;
    vm.collapseState = false;

    vm.toggleCollapse = function(){
        jQ('#collapseMenu').collapse('toggle');
    }
    jQ('#collapseMenu').on('hide.bs.collapse', function () {
      vm.collapseState = true;
    })
    jQ('#collapseMenu').on('show.bs.collapse', function () {
      vm.collapseState = false;
    })

    player.on('logoutPlayerPartner', function(){
        $state.go('partnerlogin')

    });

  }
})();
