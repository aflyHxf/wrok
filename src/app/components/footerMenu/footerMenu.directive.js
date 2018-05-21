/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .directive('footerMenu', footerMenu);

  /** @ngInject */
  function footerMenu(platform, platformId) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/footerMenu/footerMenu.html',
      scope: {
        name: '='//it should be game,promotion, cashinout, earning or account
      },
      controller: FooterMenuController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterMenuController(jQ) {
      var vm = this;

      jQ(".fk-footer-btn").removeClass("fk-footer-btn-selected");
      jQ(".btn-" + vm.name).addClass("fk-footer-btn-selected");

      jQ(".fk-footer-btn").click(function () {
        if (!jQ(this).hasClass("fk-footer-btn-selected")) {
          jQ(".fk-footer-btn").removeClass("fk-footer-btn-selected");
        }
        jQ(this).addClass("fk-footer-btn-selected");
      });
      jQ(".fk-footer-btn").eq(0).click(function () {
          clickCount();
      });

      function isApp() {
         var result = false;
         var isIosApp = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
         var isAndroidApp = window.native ? 1 : 0;
         if(isIosApp || isAndroidApp){
            result = true;
         }
         return result
      }

      function clickCount(){
          var deviceName = 'H5玩家'
          var deviceApp = isApp();
          if(deviceApp){
              deviceName = 'APP玩家'
          }
          platform.emit('clickCount',{
              platformId: platformId,
              device: deviceName,
              pageName: '首页',
              buttonName: '游戏'
          })
          platform.on('clickCount', function(data){
            console.log(data);
          })
      }
    }
  }

})();
