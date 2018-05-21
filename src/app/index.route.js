(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'register'
      })
      .state('resetpassword', {
        url: '/resetpassword',
        templateUrl: 'app/resetPassword/resetPassword.html',
        controller: 'ResetPasswordController',
        controllerAs: 'rp'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'app/account/account.html',
        controller: 'AccountController',
        controllerAs: 'account'
      })
      .state('accountcenter', {
        url: '/accountcenter',
        templateUrl: 'app/accountCenter/accountCenter.html',
        controller: 'AccountCenterController',
        controllerAs: 'ac'
      })
      .state('bank', {
        url: '/bank/:type',
        templateUrl: 'app/bank/bank.html',
        controller: 'BankController',
        controllerAs: 'bank'
      })
      .state('setting', {
        url: '/setting',
        templateUrl: 'app/setting/setting.html',
        controller: 'SettingController',
        controllerAs: 'setting'
      })
      .state('news', {
        url: '/news',
        templateUrl: 'app/news/news.html',
        controller: 'NewsController',
        controllerAs: 'news'
      })
      .state('inbox', {
        url: '/inbox',
        templateUrl: 'app/inbox/inbox.html',
        controller: 'InboxController',
        controllerAs: 'inbox'
      })
      .state('rewardpoints', {
        url: '/rewardpoints',
        templateUrl: 'app/rewardPoints/rewardPoints.html',
        controller: 'RewardPointsController',
        controllerAs: 'rewardpoints'
      })
      .state('password', {
        url: '/password',
        templateUrl: 'app/password/password.html',
        controller: 'PasswordController',
        controllerAs: 'password'
      })
      .state('recordhistory', {
        url: '/recordhistory',
        templateUrl: 'app/recordHistory/recordHistory.html',
        controller: 'RecordHistoryController',
        controllerAs: 'recordhistory'
      })
      .state('cashInOut', {
        url: '/cashInOut/:type',
        templateUrl: 'app/cashInOut/cashInOut.html',
        controller: 'CashInOutController',
        controllerAs: 'cashInOut'
      })
      .state('advertising', {
        url: '/advertising',
        templateUrl: 'app/advertising/advertising.html',
        controller: 'AdvertisingController',
        controllerAs: 'advertising'
      })
      .state('transfer', {
        url: '/transfer',
        templateUrl: 'app/transfer/transfer.html',
        controller: 'TransferController',
        controllerAs: 'transfer'
      })
      .state('aliPay', {
        url: '/aliPay',
        templateUrl: 'app/cashInOut/aliPay.html',
        controller: 'CashInOutController',
        controllerAs: 'cashInOut'
      })
      .state('wechatPay', {
        url: '/wechatPay',
        templateUrl: 'app/cashInOut/wechatPay.html',
        controller: 'CashInOutController',
        controllerAs: 'cashInOut'
      })
      .state('aliPayStatus', {
        url: '/alipaystatus',
        templateUrl: 'app/aliPayStatus/aliPayStatus.html',
        controller: 'AliPayStatusController',
        controllerAs: 'aliPayStatus'
      })
      .state('manualPayStatus', {
        url: '/manualpaystatus',
        templateUrl: 'app/manualPayStatus/manualPayStatus.html',
        controller: 'ManualPayStatusController',
        controllerAs: 'manualPayStatus'
      })
      .state('reward', {
        url: '/reward',
        templateUrl: 'app/reward/rewardMain.html',
        controller: 'RewardController',
        controllerAs: 'reward'
      })
      .state('rewardconsumption', {
        url: '/rewardconsumption',
        templateUrl: 'app/reward/rewardConsumption.html',
        controller: 'RewardConsumptionController',
        controllerAs: 'rewardconsumption'
      })
      .state('rewardtopup', {
        url: '/rewardtopup',
        templateUrl: 'app/rewardTopup/rewardTopup.html',
        controller: 'RewardTopupController',
        controllerAs: 'rewardtopup'
      })
      .state('rewardchest', {
        url: '/rewardchest',
        templateUrl: 'app/rewardChest/rewardChest.html',
        controller: 'RewardChestController',
        controllerAs: 'rewardchest'
      })
      .state('rewardtopupselection', {
        url: '/rewardtopupselection',
        templateUrl: 'app/rewardTopup/rewardTopupSelection.html',
        controller: 'RewardTopupSelectionController',
        controllerAs: 'rewardtopupselection'
      })
      .state('rewardten', {
        url: '/rewardten',
        templateUrl: 'app/rewardTen/rewardTen.html',
        controller: 'RewardTenController',
        controllerAs: 'rewardten'
      })
      .state('rewardfirstdeposit', {
        url: '/rewardfirstdeposit',
        templateUrl: 'app/rewardFirstDeposit/rewardFirstDeposit.html',
        controller: 'RewardFirstDepositController',
        controllerAs: 'rewardfirstdeposit'
      })
      .state('rewardvip', {
        url: '/rewardvip',
        templateUrl: 'app/rewardVIP/rewardVIP.html',
        controller: 'RewardVIPController',
        controllerAs: 'rewardvip'
      })
      .state('rewardxima', {
        url: '/rewardxima',
        templateUrl: 'app/rewardXima/rewardXima.html',
        controller: 'RewardXimaController',
        controllerAs: 'rewardxima'
      })
      .state('survey', {
        url: '/survey',
        templateUrl: 'app/survey/survey.html',
        controller: 'SurveyController',
        controllerAs: 'survey'
      })
      .state('partnerlogin', {
        url: '/plogin',
        templateUrl: 'app/partnerLogin/partnerLogin.html',
        controller: 'PartnerLoginController',
        controllerAs: 'partnerlogin'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard'
      })
      .state('partner', {
        url: '/partner',
        templateUrl: 'app/partner/partner.html',
        controller: 'PartnerController',
        controllerAs: 'partner'
      })
      .state('partnerCashout', {
        url: '/partnercashout',
        templateUrl: 'app/partnerCashout/partnerCashout.html',
        controller: 'PartnerCashoutController',
        controllerAs: 'partnercashout'
      })
      .state('partnerbank', {
        url: '/partnerbank',
        templateUrl: 'app/partnerCashout/partnerBank.html',
        controller: 'PartnerBankController',
        controllerAs: 'partnerbank'
      })
      .state('quicksearch', {
        url: '/quicksearch',
        templateUrl: 'app/partner/partnerQuicksearch.html',
        controller: 'PartnerQuicksearchController',
        controllerAs: 'partnerquicksearch'
      })
      .state('realtime', {
        url: '/realtime',
        templateUrl: 'app/partner/partnerRealtime.html',
        controller: 'PartnerRealtimeController',
        controllerAs: 'partnerrealtime'
      })
      .state('partnercredit', {
        url: '/partnercredit',
        templateUrl: 'app/partnerCredit/partnerCredit.html',
        controller: 'PartnerCreditController',
        controllerAs: 'partnercredit'
      })
      .state('partnerrefer', {
        url: '/partnerrefer',
        templateUrl: 'app/partnerRefer/partnerRefer.html',
        controller: 'PartnerReferController',
        controllerAs: 'partnerrefer'
      })
      .state('partnertransaction', {
        url: '/partnertransaction',
        templateUrl: 'app/partner/partnerTransaction.html',
        controller: 'PartnerTransactionController',
        controllerAs: 'partnertransaction'
      })
      .state('wechatcs', {
        url: '/wechatcs',
        templateUrl: 'app/wechatcs/wechatcs.html',
        controller: 'WechatcsController',
        controllerAs: 'wechatcs'
      })
    $urlRouterProvider.otherwise('/home');
  }

})();
