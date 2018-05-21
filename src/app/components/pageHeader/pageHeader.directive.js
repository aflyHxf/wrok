/**
 * Created by aeson on 11/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .directive('pageHeader', pageHeader);

  /** @ngInject */
  function pageHeader() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/pageHeader/pageHeader.html',
      scope: {
        title: '=',
        background: '=',
        logo: '=',
        back: '=',
        cs: '=',
        credit: '=',
        login: '=',
        href: '=',
        logout: '=',
        dashboardpage: '=',
        logoutpartner: '='
      },
      controller: PageHeaderController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function PageHeaderController($state, $rootScope, $window, $timeout, $document, $http, jQ, customerService, localStorage, player, platform, platformId) {
      var vm = this;
      vm.showPopup = false;
      jQ.noConflict();
      jQ($document).ready(function () {
        if (vm.background) {
          jQ(".fk-page-header").css({"background-color": "#0c6cb9"});
        }
        else {
          jQ(".fk-page-header").css({"background-color": ""});
        }
      })
      vm.url = vm.href || "#/home"

      function clearSelctedCs() {
        vm.webcs = false;
        vm.qq = false;
        vm.mobile = false;
        vm.phone = false;
        vm.qr = false;
      }

      vm.clearSelctedCs = clearSelctedCs;
      vm.qqUrl1 = "http://wpd.b.qq.com/page/webchat.html?nameAccount=800805366";
      vm.qqUrl2 = "http://wpd.b.qq.com/page/webchat.html?nameAccount=800803663";
      vm.wechatUrl = "https://tochat333.com/chat/chatClient/chatbox.jsp?companyID=313&configID=237&jid=";

      function openWebChat() {
        var e = customerService,
          t = encodeURIComponent($document.URL),
          n = encodeURIComponent($document.referrer);
        $window.open(e + "&enterurl=" + t + "&pagereferrer=" + n)
      }

      vm.openWebChat = openWebChat;

      function requestCallBack() {
        // return this.phoneChatModule ? this.phoneChatModule.show() : (this.phoneChatModule = xjs.createView("ui.phoneChat"), void this.phoneChatModule.show())
        jQ('#callbackModal').modal('show');
        var authenticatedData = angular.fromJson(localStorage.getData());
        // if (authenticatedData && authenticatedData.player && authenticatedData.player.phoneNumber) {
        //   vm.phoneNo = authenticatedData.player.phoneNumber;
        // }
      }

      vm.requestCallBack = requestCallBack;

      function getCaptcha() {
        vm.random = new Date().getTime();
        vm.captchaUrl = 'https://www.phoneapichat.com/servlet/GetMaCode?random=' + new Date().getTime();
      }

      vm.getCaptcha = getCaptcha;
      getCaptcha();

      function submitCallBack() {
        $http.jsonp('https://www.phoneapichat.com/servlet/TelephoneApplication?phone=' + vm.phoneNo + "&captcha=" + vm.captcha + "&platform=xbetbuyu&random=" + vm.random + "&callback=JSON_CALLBACK", {jsonpCallbackParam: 'callback'}
        ).then(function (resp) {
          if (resp && resp.data && resp.data.code == 0) {
            confirm("正在呼叫，请稍等。");
          }
          else {
            if (resp && resp.data && resp.data.msg) {
              getCaptcha();
              alert(resp.data.msg);
            }
          }
        })
      }

      vm.submitCallBack = submitCallBack;

      function logoutNow() {
        var authenticatedData = angular.fromJson(localStorage.getData());

        if(authenticatedData.player){
          player.emit('logoutPlayerPartner', {
            playerId: authenticatedData.player.playerId,
          });
        }
        if(authenticatedData.partner){
          player.emit('logoutPlayerPartner', {
            partnerId: authenticatedData.partner ? authenticatedData.partner.partnerId : ""
          });
        }
      }

      vm.logoutNow = logoutNow;

      function notifyNewMail(data) {
        $rootScope.hasNewMail = true;
        $rootScope.$emit('newMail', data);
      }
      player.on('notifyNewMail', notifyNewMail);

      function isApp() {
        var result = false;
        var isIosApp = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
        var isAndroidApp = window.native ? 1 : 0;
        if(isIosApp || isAndroidApp){
           result = true;
        }
        return result
      }
      
      function registerClickCount() {
        var deviceName = 'H5玩家'
        var deviceApp = isApp();
        if(deviceApp){
            deviceName = 'APP玩家'
        }
        platform.emit('clickCount',{
            platformId: platformId,
            device: deviceName,
            pageName: '注册',
            buttonName: '注册'
        })
        platform.on('clickCount', function(data){
          console.log(data);
        })
      }
      vm.registerClickCount = registerClickCount;

      function loginClickCount() {
        var deviceName = 'H5玩家'
        var deviceApp = isApp();
        if(deviceApp){
            deviceName = 'APP玩家'
        }
        platform.emit('clickCount',{
            platformId: platformId,
            device: deviceName,
            pageName: '登录',
            buttonName: '登录'
        })
        platform.on('clickCount', function(data){
          console.log(data);
        })
      }
      vm.loginClickCount = loginClickCount;
    }
  }

})
();
