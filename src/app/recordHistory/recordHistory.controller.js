(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('RecordHistoryController', RecordHistoryController);

  /** @ngInject */
  function RecordHistoryController(jQ, $log, $state, player, localStorage, game, consumption, payment, reward, pagination, common) {
    var vm = this;
    vm.tab = 1;
    vm.providerList = [];
    vm.startTime = ""; //"2017-03-01 00:00:00";
    vm.endTime = ""; //"2017-04-16 00:00:00";
    vm.providerId = '';
    vm.totalValidAmount = 0;
    vm.cancelNo = null;
    /* pagination */
    vm.tab1pg = 0;
    vm.tab2pg = 0;
    vm.tab3pg = 0;
    vm.tab4pg = 0;

    vm.pgLimit = 5;
    vm.totalTab1pg = 1;
    vm.totalTab2pg = 1;
    vm.totalTab3pg = 1;
    vm.totalTab4pg = 1;
    vm.topUpType = "";

    vm.proposalOption = {
      'Pending': '待审核',
      'Processing': '审核中',
      'Success': '成功',
      'Cancel': '已取消'
    }

    vm.proposalStatus = {
      // 'none': '请选择',
      'Pending': '待审核',
      'Processing': '审核中',
      'Success': '成功',
      'Cancel': '已取消',
      'Approved': '审批通过',
      'Rejected': '审批拒绝',
      'Fail': '失败',
      'PrePending': '系统异常',
      'CsPending': '待客服审核',
      'Undetermined': '提款待定'
    }
    vm.proposalState = 'none';

    /* pickadate datepicker options */
    vm.pickerOption = {
      // Strings and translations
      monthsFull: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
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
    vm.csHour = {
      'num': 0,
      'name': '00'
    };
    vm.csMin = {
      'num': 0,
      'name': '00'
    };
    vm.ceHour = {
      'num': 23,
      'name': '23'
    };
    vm.ceMin = {
      'num': 59,
      'name': '59'
    };

    /* get data from localstorage */
    var lstore = angular.fromJson(localStorage.getData())
    if (lstore) {
      game.emit('getProviderList', {
        playerId: lstore.player.playerId
      }, 99);
    }
    if(!lstore || !lstore.player){
        $state.go('login')
    }

    payment.emit('getAllTopUpType', {})
    payment.on('getAllTopUpType', function (data) {
      $log.info(data)
    })


    vm.toTab = function (tab) {
      jQ('.recordTabs li').removeClass('uLine');
      vm.tab = tab;
      jQ('.recordTabs li').eq(tab - 1).addClass('uLine');
    }
    vm.dateValidate = function(){
      var result = true;
      vm.timeArrange();
      if(vm.startTime > vm.endTime){
          result = false;
      }
      return result;
    }
    vm.search = function (tab) {
      var dateValid = vm.dateValidate();

      if(!dateValid){
          alert('结束时间不能小于启始时间');
          return
      }
      switch (tab) {
        case 1:
          vm.t1search();
          break;
        case 2:
          vm.t2search();
          break;
        case 3:
          vm.t3search();
          break;
        case 4:
          vm.t4search();
          break;
        default:
          vm.t1search();
          break;
      }
    }
    /* search query */
    vm.t1search = function () {
      vm.timeArrange();
      consumption.emit('search', {
        startTime: vm.startTime,
        endTime: vm.endTime,
        providerId: vm.providerId,
        playerId: lstore.player.playerId
      });
    }
    vm.t2search = function () {
      vm.timeArrange();
      payment.emit('getTopupHistory', {
        startTime: vm.startTime,
        endTime: vm.endTime,
        requestCount: 5,
        sort: false,
        startIndex: vm.tab2pg,
        topupType: vm.topUpType
      })
    }
    vm.t3search = function () {
      vm.timeArrange();
      payment.emit('getBonusRequestList', {
        startTime: vm.startTime,
        endTime: vm.endTime,
        proposalStatus: vm.proposalState,
        requestCount: 5,
        sort: false,
        startIndex: vm.tab3pg
      })
    }
    vm.t4search = function () {
      vm.timeArrange();
      reward.emit('getPlayerRewardList', {
        startTime: vm.startTime,
        endTime: vm.endTime,
        requestCount: 5,
        sort: false,
        startIndex: vm.tab4pg
      })
    }
    vm.timeArrange = function () {
      var csDate = jQ('#startDate').val();
      var csHour = vm.csHour.name;
      var csMin = vm.csMin.name;
      vm.startTime = csDate + " " + csHour + ":" + csMin;
      var ceDate = jQ('#endDate').val();
      var ceHour = vm.ceHour.name;
      var ceMin = vm.ceMin.name;
      vm.endTime = ceDate + " " + ceHour + ":" + ceMin;
    }
    vm.fillZero = function (number) {
      if (number < 10) {
        return '0' + number;
      } else {
        return number;
      }
    }
    vm.generateNumbers = function (min, max) {
      var result = [];
      for (var i = min; i <= max; i++) {
        var name = "";
        if (i == 0) {
          name = vm.fillZero(i);
          result.push({
            num: i,
            name: name
          });
        } else {
          name = vm.fillZero(i);
          result.push({
            num: i,
            name: name
          });
        }
      }
      return result;
    }
    vm.cancelRedraw = function (proposalId) {
      vm.cancelNo = proposalId;
    }

    vm.cancelBonusRequest = function (proposalId) {
      payment.emit('cancelBonusRequest', {
        proposalId: proposalId,
        playerId: lstore.player.playerId
      });
      vm.t3search();
      jQ('#myModal').modal('hide');
    }
    /* generate hrs/min select option in template */
    vm.hrs = vm.generateNumbers(0, 23);
    vm.mins = vm.generateNumbers(0, 60);

    /* websocket result */
    game.on('getProviderList', function (data) {
      if (data.data) {
        vm.providerList = data.data;
      }
    });

    consumption.on('search', function (data) {
      if (data.data) {
        vm.totalValidAmount = data.data.stats.totalValidAmount.toFixed(2);
      }
    })
    payment.on('getTopupHistory', function (data) {
      if (data.data) {
        $log.info(data.data);
        vm.topUpHistory = data.data.records;
        vm.topUpHistoryStats = data.data.stats;
        for (var topup in vm.topUpHistory) {
          vm.topUpHistory[topup].statusName = vm.getStatus(vm.topUpHistory[topup].status);
          if (vm.topUpHistory[topup].type == 1) {
            vm.topUpHistory[topup].typeText = "手动存款";
          } else if (vm.topUpHistory[topup].type == 2) {
            vm.topUpHistory[topup].typeText = "在线充值";

          } else if (vm.topUpHistory[topup].type == 3) {
            vm.topUpHistory[topup].typeText = "支付宝充值";
          } else if (vm.topUpHistory[topup].type == 4) {
          vm.topUpHistory[topup].typeText = "个人微信";
        }

        }
        vm.p2totalLength = vm.topUpHistoryStats.totalCount;
        vm.totalTab2pg = pagination.buildPagin(vm.topUpHistoryStats.totalCount, vm.pgLimit, vm.tab2pg, 2);
      }
    })

    payment.on('getBonusRequestList', function (data) {
      if (data.data) {
        $log.info(data.data);
        vm.bonusRequestList = data.data.records;
        vm.bonusRequestListStats = data.data.stats;
        for (var bonus in vm.bonusRequestList) {
          vm.bonusRequestList[bonus].statusName = vm.getStatus(vm.bonusRequestList[bonus].status);
        }
        vm.p3totalLength = vm.bonusRequestListStats.totalCount;
        vm.totalTab3pg = pagination.buildPagin(vm.bonusRequestListStats.totalCount, vm.pgLimit, vm.tab3pg, 3);
      }
    })
    reward.on('getPlayerRewardList', function (data) {
      if (data.data) {
        $log.info(data.data);
        vm.playerRewardList = data.data.records;
        vm.playerRewardListStats = data.data.stats;
        for (var pReward in vm.playerRewardList) {
          vm.playerRewardList[pReward].statusName = vm.getStatus(vm.playerRewardList[pReward].status);
        }
        vm.p4totalLength = vm.playerRewardListStats.totalCount;
        vm.totalTab4pg = pagination.buildPagin(vm.playerRewardListStats.totalCount, vm.pgLimit, vm.tab4pg, 4);
      }

    })
    payment.on('cancelBonusRequest', function (data) {
      $log.info(data);
    })
    /* get proposal status name */
    vm.getStatus = function (name) {
      if (vm.proposalStatus[name]) {
        return vm.proposalStatus[name];
      } else {
        return name;
      }
    }
    vm.tab2toPg = function (num) {
      jQ('.pagin2 li').removeClass('active');
      vm.tab2pg = pagination.pagePicker(num, vm.tab2pg, vm.pgLimit, vm.p2totalLength);

      vm.t2search();
      var pgNum = parseInt(vm.tab2pg / vm.pgLimit) + 1;
      // highlight chosen page
      vm.pickPage(2, pgNum);
    }
    vm.tab3toPg = function (num) {
      jQ('.pagin3 li').removeClass('active');
      vm.tab3pg = pagination.pagePicker(num, vm.tab3pg, vm.pgLimit, vm.p3totalLength);

      vm.t3search();
      var pgNum = parseInt(vm.tab3pg / vm.pgLimit) + 1;
      // highlight chosen page
      vm.pickPage(3, pgNum);
    }
    vm.tab4toPg = function (num) {
      jQ('.pagin4 li').removeClass('active');
      vm.tab4pg = pagination.pagePicker(num, vm.tab4pg, vm.pgLimit, vm.p4totalLength);

      vm.t4search();
      var pgNum = parseInt(vm.tab4pg / vm.pgLimit) + 1;
      // highlight chosen page
      vm.pickPage(4, pgNum);
    }

    vm.pickPage = function (tab, pgNum) {
      jQ('.pagin' + tab + ' li').each(function () {
        if (jQ(this).attr('data-current') == pgNum) {
          jQ(this).addClass('active');
        }
      })
    }


  }
})();
