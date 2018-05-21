/**
 * Created by mark on 16/05/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('PartnerTransactionController', PartnerTransactionController);

  /** @ngInject */
  function PartnerTransactionController($log, $rootScope, $state, $window, $filter, jQ, localStorage, player, partner, pagination, common) {
    var vm = this;

    vm.startTime= ""; //"2017-03-01 00:00:00";
    vm.endTime= ""; //"2017-04-16 00:00:00";
    vm.domain = "";
    vm.playerName = "";
    vm.registerUserAnalysis = [];

    vm.providerList = [];
    vm.providerId = '';
    vm.totalValidAmount = 0;

    vm.pgLimit = '5';
    vm.pgLimits = [5,10,20,50];
    vm.tab2pg = 0;

    vm.subTotalBonusAmount = 0;
    vm.subServiceFee = 0;
    vm.subPlatformFee = 0;
    vm.subProfitAmount = 0;
    vm.totalLength = 0;


    vm.proposalStatus = {
        'none':'请选择',
        'Approved':'审批通过',
        'Rejected':'审批拒绝',
        'Success':'成功',
        'Fail':'失败',
        'PrePending':'系统异常',
        'Pending':'待审核',
        'Cancel':'已取消',
        'Processing':'处理中'
    }
    vm.proposalState = 'none';



    /* pickadate datepicker options */
    vm.pickerOption = {
        // Strings and translations
        monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
        monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'],
        weekdaysFull: ['日', '一', '二', '三', '四', '五', '六'],
        weekdaysShort: ['日', '一', '二', '三', '四', '五', '六'],

        // Buttons
        today: '今日',
        clear: '清除',
        close: '关闭',

        // Accessibility labels
        labelMonthNext: '下个月',
        labelMonthPrev: '上个月',
        labelMonthSelect: '选择月份',
        labelYearSelect: '选择年份',

        // Formats
        format: 'yyyy-mm-dd'
    }
    vm.pickerOption.min = common.getMinDate();
    vm.pickerOption.max = common.getMaxDate();
    /* pickadate datepicker */
    jQ('#startDate').pickadate(vm.pickerOption);
    jQ('#endDate').pickadate(vm.pickerOption);
    jQ('#startDate').pickadate('picker').set('select', new Date())
    jQ('#endDate').pickadate('picker').set('select', new Date())


    vm.hrs = [];
    vm.mins = [];
    vm.csHour ="";
    vm.csMin ="";
    vm.ceHour ="";
    vm.ceMin ="";

    /* get data from localstorage */
    var lstore = angular.fromJson(localStorage.getData())
    if(lstore){

        if(!lstore.partner){
            $state.go('partnerlogin')
        }
        vm.partnerId = lstore.partner.partnerId;
    }


    vm.toTab = function(tab){
        jQ('.recordTabs li').removeClass('uLine');
        vm.tab = tab;
        jQ('.recordTabs li').eq(tab-1).addClass('uLine');
    }

    vm.timeArrange = function () {
      vm.startDate = jQ('#startDate').val();
      vm.endDate = jQ('#endDate').val();
    }

    /* search query */
    vm.searchTransaction = function(initSearch){
        vm.timeArrange();
        var index;
        if(initSearch){
            index = 0;
            vm.tab2pg = 1;
            jQ('.pagin2 li').removeClass('active');
        }else{
            index = vm.tab2pg;
        }
        partner.emit('getPartnerPlayerPaymentReport',{
            startTime:vm.startTime+" 00:00:00",
            endTime:vm.endTime+" 23:59:00",
            startIndex:index,
            requestCount:parseInt(vm.pgLimit),
            partnerId:vm.partnerId
        });
    }
    partner.on('getPartnerPlayerPaymentReport',function(data){

      vm.transactionRecord = data.data;
      vm.subTotalBonusAmount = 0;
      vm.subServiceFee = 0;
      vm.subPlatformFee = 0;
      vm.subProfitAmount = 0;

      if(data.data){
        vm.transactionRecordStats = data.data.stats.totalCount;
        var dataLength = data.data.stats.totalCount;
        vm.totalLength = 40;
        vm.totalPg = pagination.buildPagin(dataLength, vm.pgLimit, vm.tab2pg);
        if(vm.tab2pg==1){
            vm.pickPage(1);
        }
      }
    })
    /* websocket result */

    /* get proposal status name */
    vm.getStatus = function(name){
        if(vm.proposalStatus[name]){
            return vm.proposalStatus[name]
        }else{
            return name
        }

    }
    /* redirect to specific page by pagination */
    vm.tabtoPg = function(num){

        jQ('.pagin2 li').removeClass('active');
        vm.tab2pg = pagination.pagePicker(num, vm.tab2pg, vm.pgLimit, vm.totalLength);

        vm.searchTransaction();
        var pgNum = parseInt(vm.tab2pg / vm.pgLimit)+1;
        // highlight chosen page
        vm.pickPage(pgNum);
    }

    vm.pickPage = function(pgNum){
        jQ('.pagin2 li').each(function(){
            if(jQ(this).attr('data-current')==pgNum){
                jQ(this).addClass('active');
            }
        })
    }


  }
})();
