/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('WechatcsController', WechatcsController);

  /** @ngInject */
  function WechatcsController(jQ, localStorage, $state) {

    var vm = this;
    vm.collapseState = false;

  }
})();
