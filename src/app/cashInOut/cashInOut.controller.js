(function () {
  'use strict';

  angular.module('fishingKingMobile').controller('CashInOutController', CashInOutController);

  function CashInOutController($log, $stateParams, $window, $rootScope, $location, $state, jQ, player, localStorage, payment, reward, game) {

    var vm = this;
    var lstore = angular.fromJson(localStorage.getData())


    vm.onlineTopupType = [];
    vm.bankTypeName = '';
    vm.userData = '';
    vm.paymentMessage = '';
    vm.showAlipayTopUp = false;
    vm.showWechatPayTopUp = false;
    vm.aliPayProposal = "";
    vm.tabName = $stateParams.type || "cashIn";
    vm.editData = {};
    vm.timeLeftText = '';
    vm.alipayManualSingleLimit = 0;
    vm.alipaySaomaSingleLimit = 0;
    vm.wechatSaomaSingleLimit = 0;
    vm.wechatPayManualSingleLimit = 0;
    vm.wechatQRcode = '';
    vm.loading = false;
    vm.displayAlipayLimit = '请输入充值金额';
    vm.onlineTopupListTXT = '';

    vm.domain = $location.protocol() + "://" + $location.host() + ":" + $location.port();
    vm.bankAccountTypeList = {
      '1': '网银转帐',
      '2': 'ATM自动柜员机',
      '3': '银行人工柜台'
    };

    vm.proposalStatus = {
      'none': '请选择',
      'Approved': '审批通过',
      'Rejected': '审批拒绝',
      'Success': '成功',
      'Fail': '失败',
      'PrePending': '系统异常',
      'Pending': '待审核 ...',
      'Cancel': '已取消',
      'Processing': '处理中'
    }
    var authenticatedData = angular.fromJson(localStorage.getData());
    if(!authenticatedData || !authenticatedData.player){
        $state.go('login')
    }
    vm.isApp = function () {
       var result = false;
       var isIosApp = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
       var isAndroidApp = window.native ? 1 : 0;
       if(isIosApp || isAndroidApp){
          result = true;
       }
       return result
    },



    player.getPlayerPartner(function () {
      vm.userData = authenticatedData.player;
      if (vm.userData.bankAccount) {
        vm.userData.bankAccount = vm.userData.bankAccount.slice(-3);
      } else {
        vm.userData.bankAccount = '';
      }

      // payment.emit('getBankTypeList', {}, 99);
      reward.emit("getRewardTask", {
        playerId: authenticatedData.player.playerId
      });
      getBankTypeList();
      getAlipaySingleLimit();
      getMerchantSingleLimits();
      getOnlineTopupType();
    });
    getWechatSingleLimit();
    vm.checkGameCredit = function() {
      player.emit('getCreditDetail', {

      });
      player.on('getCreditDetail', function(creditDetail){
        if(creditDetail.data && creditDetail.data.gameCreditList) {
          for(var x = 0; creditDetail.data.gameCreditList.length > x; x++)
          {
            var gameCredit = parseInt(creditDetail.data.gameCreditList[x].validCredit);
            if(!isNaN(gameCredit) && gameCredit > 0) {
                var isLast = creditDetail.data.gameCreditList.length - 1 === x ? true : false;
                var data = {};
                data.credit = gameCredit;
                data.playerId = lstore.player.playerId;
                data.providerId = creditDetail.data.gameCreditList[x].providerId;
                transferFromGame(data, isLast);
            }
          }
        }
      })
    };

    var transferFromGame = function (data, isLast) {
      if (!data.credit) {
          return;
      }
      vm.loading = true;
      game.emit('transferFromProvider',data)
      game.on('transferFromProvider',function() {
        if(isLast) {
          player.getPlayerPartner(function () {
            var authenticatedData = angular.fromJson(localStorage.getData());
            vm.userData = authenticatedData.player;
            if (vm.userData.bankAccount) {
              vm.userData.bankAccount = vm.userData.bankAccount.slice(-3);
            } else {
              vm.userData.bankAccount = '';
            }
          });
          vm.loading = false;
        }
      })
    };

    function getOnlineTopupType () {
      // clienttype 2- h5 , 4- app
      var clientType = getClientType();
      payment.emit('getOnlineTopupType', {clientType: clientType, merchantUse: 1});
    }

    function getClientType(){
      var clientType = 2;
      var browserType = vm.isApp();
      if(browserType){
          clientType = 4;
      }
      return clientType;
    }
    function getAlipaySingleLimit() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      payment.emit('getAlipaySingleLimit', {}, 99, requestId);
      payment.on('getAlipaySingleLimit', function (data) {
        if (data.status == 200 && data.data && data.data.singleLimit) {
          vm.alipayManualSingleLimit = data.data.singleLimit;
          if(data.data.singleLimit){
            vm.displayAlipayLimit = "请输入充值金额 ( 10-" + data.data.singleLimit + ")";
          }else{
            vm.displayAlipayLimit = "请输入充值金额";
          }

        } else {
          if (data.errorMessage) {
            confirm(data.errorMessage);
            $state.go("home");
          }
        }
      }, {
        requestId: requestId
      })
    }

    function getWechatSingleLimit() {

      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      payment.emit('getPlayerWechatPayStatus', {}, 99, requestId);
      payment.on('getPlayerWechatPayStatus', function (data) {
        if (data.status == 200 && data.data && data.data.maxDepositAmount) {
            vm.wechatPayManualSingleLimit = data.data.maxDepositAmount;
        } else {
          if (data.errorMessage) {
            confirm(data.errorMessage);
            $state.go("home");
          }
        }
      }, {
        requestId: requestId
      })
    }

    function getMerchantSingleLimits() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      payment.emit('getMerchantSingleLimits', {}, 99, requestId);
      payment.on('getMerchantSingleLimits', function (data) {
        if (data.status == 200 && data.data && data.data.singleLimitList) {
          vm.alipaySaomaSingleLimit = data.data.singleLimitList.alipay;
          vm.wechatSaomaSingleLimit = data.data.singleLimitList.wechat;
        } else {
          if (data.errorMessage) {
            confirm(data.errorMessage);
            $state.go("home");
          }
        }
      }, {
        requestId: requestId
      })
    }

    function getBankTypeList() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      payment.emit('getBankTypeList', {}, 99, requestId);
      payment.on('getBankTypeList', function (data) {
        vm.allBankTypeList = [];
        data.data.forEach(function (item) {
          if (item && item.bankTypeId && item.bankTypeId == vm.userData.bankName) {
            vm.userBank = item.name;
          }
          if (item && item.bankTypeId) {
            vm.allBankTypeList[item.id] = item.name + ' (' + item.bankTypeId + ')';
          }
        })
      }, {
        requestId: requestId
      })
    }

    //  get Alipay proposal
    payment.emit('getAlipayTopupRequestList', {});
    payment.on('getAlipayTopupRequestList', function (data) {
      if (data.status == 200) {
        if (data.data) {
          vm.showAlipayTopUp = false;
          vm.aliPayProposal = data.data;
          vm.aliPayTimeLeftText = vm.timeConvert(vm.aliPayProposal.data.validTime);

        } else {
          vm.showAlipayTopUp = true;
        }
      }
    });
    payment.emit('getWechatTopupRequestList', {});
    payment.on('getWechatTopupRequestList', function (data) {
      if (data.status == 200) {
        if (data.data) {
          vm.showWechatPayTopUp = false;
          vm.wechatPayProposal = data.data;
          vm.wechatQRcode = vm.wechatPayProposal.data.weChatQRCode;
          vm.wechatTimeLeftText = vm.timeConvert(vm.wechatPayProposal.data.validTime);
        } else {
          vm.showWechatPayTopUp = true;
        }
      }
    });

    //  bank details
    // payment.on('getBankTypeList', function (data) {
    //   vm.allBankTypeList = {};
    //   if (data.data) {
    //     data.data.forEach(function (item) {
    //       if (item && item.bankTypeId) {
    //         vm.allBankTypeList[item.id] = item.name + ' (' + item.bankTypeId + ')';
    //       }
    //     })
    //   }
    //
    // });

    /*emit - banktype list/province list */
    // payment.emit('getBankTypeList', {}, 99);
    payment.emit('getProvinceList', {}, 99);

    /* listen- banktype list/province list */
    // payment.on('getBankTypeList', function (data) {
    //   vm.allBankTypeList = {};
    //   data.data.forEach(function (item) {
    //     if (item && item.bankTypeId) {
    //       vm.allBankTypeList[item.id] = item.name;
    //     }
    //   })
    // })
    payment.on('getProvinceList', function (data) {
      if (data.data) {
        var pList = [];
        var pdata = data.data
        for (var prov in pdata) {
          if (pdata[prov].id <= 650000) {
            pList.push(pdata[prov]);
          }
        }

        vm.provinces = pList;
      }
    })
    payment.on('getCityList', function (data) {
      if (data.data) {
        vm.cities = data.data;
      }
    })
    payment.on('getDistrictList', function (data) {
      if (data.data) {
        vm.districts = data.data;
      }
    })

    payment.on('getOnlineTopupType', function (data) {
      if (data.data) {
        vm.onlineTopupType = data.data;
        if (!vm.onlineTopupType instanceof Array) {
          return;
        }

        for (var i = 0; i < vm.onlineTopupType.length; i++) {
          switch (vm.onlineTopupType[i].type) {
            case 1:
              vm.onlineTopupType[i].name = "网银支付";
              vm.onlineTopupType[i].icon = "icon-online";
              break;
            case 2:
              vm.onlineTopupType[i].name = "微信扫码";
              vm.onlineTopupType[i].icon = "icon icon-wechatPay";
              break;
            case 3:
              vm.onlineTopupType[i].name = "支付宝扫码";
              vm.onlineTopupType[i].icon = "icon icon-aliPay";
              break;
            case 4:
              vm.onlineTopupType[i].name = "微信支付";
              vm.onlineTopupType[i].icon = "icon icon-wechatPay";
              break;
            case 5:
              vm.onlineTopupType[i].name = "支付宝支付";
              vm.onlineTopupType[i].icon = "icon icon-aliPay";
              break;
            case 6:
              vm.onlineTopupType[i].name = "快捷支付";
              vm.onlineTopupType[i].icon = "icon icon-fastPay";
              break;
            case 7:
              vm.onlineTopupType[i].name = "QQ扫码";
              vm.onlineTopupType[i].icon = "icon icon-qqPay";
              break;
            case 8:
              vm.onlineTopupType[i].name = "银联扫码";
              vm.onlineTopupType[i].icon = "icon icon-netPay";
              break;
            case 9:
              vm.onlineTopupType[i].name = "京东扫码";
              vm.onlineTopupType[i].icon = "icon-jdPay";
              break;
            case 10:
              vm.onlineTopupType[i].name = "微信wap";
              vm.onlineTopupType[i].icon = "icon icon-wechatPay";
              break;
            case 11:
              vm.onlineTopupType[i].name = "支付宝wap";
              vm.onlineTopupType[i].icon = "icon icon-aliPay";
              break;
            case 12:
              vm.onlineTopupType[i].name = "QQwap";
              vm.onlineTopupType[i].icon = "icon icon-qqPay";
              break;
            case 13:
              vm.onlineTopupType[i].name = "点卡(PCard)";
              vm.onlineTopupType[i].icon = "";
              break;
            case 14:
              vm.onlineTopupType[i].name = "京东wap";
              vm.onlineTopupType[i].icon = "icon-jdPay";
              break;
          }
        }
        vm.getOnlineTopupLimit();
      }
    });
    vm.getOnlineTopupLimit = function(){
        vm.onlineTopupList = {};
        var data = vm.onlineTopupType;
        if(data.length > 0){
            vm.onlineTopupListTXT = '单笔充值限额最低10元，';
            data.forEach(function(topup){
                vm.onlineTopupList[topup.maxDepositAmount] = vm.onlineTopupList[topup.maxDepositAmount] || {merchantName:[], value:0};
                vm.onlineTopupList[topup.maxDepositAmount].value = topup.maxDepositAmount;
                vm.onlineTopupList[topup.maxDepositAmount].merchantName.push(topup['name']);
            })
        }

        var topupList = [];
        if(Object.keys(vm.onlineTopupList).length > 0){

            topupList = Object.keys(vm.onlineTopupList);
            topupList = topupList.sort();
            topupList.forEach(function(topupData, index){
                var name = vm.onlineTopupList[topupData].merchantName.join('、');
                var maxDepositAmount = vm.onlineTopupList[topupData].value || 0;

                if(maxDepositAmount > 0){
                    vm.onlineTopupListTXT += name +'单笔充值上限最高'+maxDepositAmount+'元';
                    if(topupList.length != (index +1)){
                      vm.onlineTopupListTXT += '，';
                    }else{
                      vm.onlineTopupListTXT += '。';
                    }
                }
            })
        }
    }

    vm.timeConvert = function (validTime) {
        var validTM = new Date(validTime).getTime();
        var createAt = new Date().getTime();
        var leftTime = validTM - createAt;
        if(leftTime < 0){
            leftTime = 0;
        }
        var leftTimeText = vm.displayTime(leftTime);
        return leftTimeText;
    }

    vm.displayTime = function (leftTime) {

      var leftTimes = "";
      var days = Math.floor(leftTime / (1000 * 60 * 60 * 24));
      var hours = Math.floor((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((leftTime % (1000 * 60 * 60)) / (1000 * 60));

      // Display the result in the element with id="demo"
      leftTimes = hours + "小时 " + minutes + "分 ";
      return leftTimes;

    }

    vm.selectProvince = function (provinceId) {
      payment.emit('getCityList', {
        provinceId: provinceId
      })
    }

    vm.selectCity = function (cityId) {
      payment.emit('getDistrictList', {
        provinceId: vm.editData.province,
        cityId: cityId
      })
    }

    vm.getBankCardTypeTextbyId = function (id) {
      if (!vm.allBankTypeList) {
        return id;
      } else {
        return vm.allBankTypeList[id];
      }
    }

    //  top Up
    vm.topUp = function (topupType) {
      var clientType = getClientType();
      $log.debug('\n\n\n topUp \n amount : ', vm.cashInAmount, '\n type :', topupType);
      var data = {
        topupType: topupType,
        amount: vm.cashInAmount,
        clientType: clientType,
        merchantUseType: 1
      };
      payment.emit('createOnlineTopupProposal', data);
    }

    payment.on('createOnlineTopupProposal', function (data) {
      if (data.status == 200) {
        if (data.data.topupDetail.paymentURL) {
          // vm.openInNewTab(data.data.topupDetail.paymentURL);
          vm.payUrl = data.data.topupDetail.paymentURL;
          jQ('#payModal').modal('show');
        }
      } else if (data.errorMessage) {
        vm.paymentMessage = data.errorMessage;
        $log.debug(data.status + "\n" + data.errorMessage);
        jQ('#paymentModal').modal('show');
        jQ('#paymentModal').on('hidden.bs.modal', function () {
          if (data.status == 420) {
            vm.redirectToOtherPage('#/login');
          } else {
            location.reload();
          }
        });
      } else {
        vm.redirectToOtherPage('#/home');
      }
    });

    //  apply bonus
    vm.applyBonus = function (bonusId) {
      var data = {
        bonusId: bonusId,
        amount: vm.cashOutAmount,
        honoreeDetail: ''
      };
      payment.emit('applyBonus', data);
    }

    payment.on('applyBonus', function (data) {
      if (data.errorMessage) {
        vm.paymentMessage = data.errorMessage;
        $log.debug(data.status + "\n" + data.errorMessage);
        jQ('#paymentModal').modal('show');
        jQ('#paymentModal').on('hidden.bs.modal', function () {
          if (data.status == 420) {
            vm.redirectToOtherPage('#/login');
          } else {
            jQ('#cashOutAmount').focus();
          }
        });
      } else if (data.status == 200) {
        vm.paymentMessage = "提款提交成功";
        $log.debug(data.status + "\n" + "提款提交成功");
        jQ('#paymentModal').modal('show');
        jQ('#paymentModal').on('hidden.bs.modal', function () {
          location.reload();
        });
      } else {
        vm.redirectToOtherPage('#/home');
      }
    });


    reward.on("getRewardTask", function (data) {
      if (data && data.status == 200) {
        vm.reward = data.data;
      }
    });

    //  aliPay
    vm.requestAlipayTopup = function () {
      if (vm.aliPayTopUp && vm.aliPayName) {
        var data = {
          amount: vm.aliPayTopUp,
          alipayName: vm.aliPayName
        };

        payment.emit('requestAlipayTopup', data);
        payment.on('requestAlipayTopup', function (data) {
          if (data.status == 200) {
            vm.aliPayMessage = "您的转账申请已提交成功";
            vm.aliPayProposal = data;
            vm.showAlipayTopUp = false;
            vm.showAliPayModal("topUpSuccess");
            payment.emit('getAlipayTopupRequestList', {});
          } else {
            vm.aliPayMessage = data.errorMsg || data.errorMessage;
            vm.showAliPayModal("topUpFailed");
          }
        });
      }
    }

    vm.cancelAlipayTopup = function () {
      if (vm.aliPayProposal.data.proposalId) {

        var data = {
          proposalId: vm.aliPayProposal.data.proposalId
        }

        payment.emit('cancelAlipayTopup', data);

        payment.on('cancelAlipayTopup', function (data) {
          if (data.status == 200) {
            vm.aliPayMessage = "支付宝转账已取消";
            vm.showAlipayTopUp = true;
            vm.showAliPayModal("cancelSuccess");
          } else {
            vm.aliPayMessage = data.errorMsg || data.errorMessage;
            vm.showAliPayModal("cancelfailed");
          }
        });
      }
    }

    vm.showAliPayModal = function (type) {

      jQ('#aliPayModal').modal('show');
      jQ('#aliPayModal').on('hidden.bs.modal', function () {
        if (type == "topUpSuccess") {
          // location.reload();
        } else if (type == "topUpFailed") {
          vm.redirectToOtherPage('#/cashInOut');
        } else if (type == "cancelfailed") {
          vm.redirectToOtherPage('#/cashInOut');
        } else if (type == "cancelSuccess") {
          // vm.redirectToOtherPage('#/aliPay');
        }
      });
    }
    vm.showWechatPayModal = function (type) {

      jQ('#wechatPayModal').modal('show');
      jQ('#wechatPayModal').on('hidden.bs.modal', function () {
        if (type == "topUpSuccess") {
          // location.reload();
        } else if (type == "topUpFailed") {
          vm.redirectToOtherPage('#/cashInOut/cashIn');
        } else if (type == "cancelfailed") {
          vm.redirectToOtherPage('#/cashInOut');
        } else if (type == "cancelSuccess") {
          // vm.redirectToOtherPage('#/aliPay');
        }
      });
    }
    //  wechatPay
    vm.requestWechatTopup = function () {
      if (vm.wechatPayTopUp) {
        var data = {
          amount: vm.wechatPayTopUp,
          notUseQR:true,
          clientType: 2
        };

        payment.emit('requestWechatTopup', data);
        payment.on('requestWechatTopup', function (data) {
          if (data.status == 200) {
            vm.wechatPayMessage = "您的转账申请已提交成功";
            vm.wechatPayProposal = data.data;
            vm.wechatQRcode = vm.wechatPayProposal.result.weChatQRCode || '';
            vm.showWechatPayTopUp = false;
            vm.showWechatPayModal("topUpSuccess");
            payment.emit('getWechatTopupRequestList', {});
          } else {
            vm.wechatPayMessage = data.errorMsg || data.errorMessage;
            vm.showWechatPayModal("topUpFailed");
          }
        });
      }
    }

    vm.cancelWechatTopup = function () {
      if (vm.wechatPayProposal.data.proposalId) {

        var data = {
          proposalId: vm.wechatPayProposal.data.proposalId
        }

        payment.emit('cancelWechatTopup', data);

        payment.on('cancelWechatTopup', function (data) {
          if (data.status == 200) {
            vm.wechatPayMessage = "微信转账已取消";
            vm.showWechatPayTopUp = true;
            vm.showWechatPayModal("cancelSuccess");
          } else {
            vm.wechatPayMessage = data.errorMsg || data.errorMessage;
            vm.showWechatPayModal("cancelFailed");
          }
        });
      }
    }

    vm.showManualPayModal = function (type) {

      jQ('#manualPayModal').modal('show');
      jQ('#manualPayModal').on('hidden.bs.modal', function () {});
    }


    //  others
    vm.setTab = function (name) {
      vm.tabName = name;
    }

    vm.openInNewTab = function (url) {
      $window.open(url, '_blank');
    }

    vm.redirectToOtherPage = function (url) {
      if (url == "#/aliPay" && !(vm.userData)) {
        vm.redirectToOtherPage('#/login');
      } else {
        $window.location.replace(url);
      }
    }

  }
})();
