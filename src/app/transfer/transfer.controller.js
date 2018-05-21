(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('TransferController', TransferController);

  /** @ngInject */
  function TransferController(jQ, $log, player, localStorage, payment, game) {
    var vm = this;
    vm.transferType ="0";
    var lstore = angular.fromJson(localStorage.getData())
    vm.providerList = [];
    // hardcode EBETFISH provider
    vm.provider = 69;
    vm.gameStatus = {
        0: "维护",
        1: "正常",
        2: "禁登游戏",
        3: "禁用",
        4: "黑名单",
        5: "关注"
    };
    //GameProvider State
    if(lstore){
      player.emit('get',{playerId:lstore.player.playerId},99);
      payment.emit('getBankTypeList', {},99 );
    }
    player.on('get',function(data){
      $log.info(data);
      vm.credit = (data.data.validCredit+data.data.lockedCredit).toFixed(2);
    });

    vm.transferCredit = function(){
      var ans = confirm("确定执行？");
      if(ans){
        if(vm.transferType==0){
          //Transfer of credits from player account to a provider’s game credit account (将本地额度转出到CP账号的游戏额度)
          game.emit('transferToProvider',{
              playerId:lstore.player.playerId,
              providerId: vm.provider
          })
        }else if(vm.transferType==1){
          //Transfer of credits from provider’s game credit account to player account (将游戏额度从CP账号转入到本地额度)
          game.emit('transferFromProvider',{
              playerId:lstore.player.playerId,
              providerId: vm.provider
          })
        }
      }

    }
    game.on('transferToProvider',function(data){
      if(data.status==200){
        alert('成功');
      }else{
        if(data.errorMessage){
          alert(data.errorMessage);
        }
      }
      vm.getUserCredit();
      vm.refreshGameProviders();
    })
    game.on('transferFromProvider',function(data){

      if(data.status==200){
        alert('成功');
      }else{
        if(data.errorMessage){
          alert(data.errorMessage);
        }
      }

      vm.getUserCredit();
      vm.refreshGameProviders();
    })
    vm.getStatusName = function(status){
      if(vm.gameStatus[status]){
        return vm.gameStatus[status];
      }else{
        return status;
      }

    }

    vm.getUserCredit = function(){
      player.emit('get',{playerId:lstore.player.playerId},99);
      player.on('get',function(data){
        vm.credit = (data.data.validCredit+data.data.lockedCredit).toFixed(2);
      })
    }
    vm.chosenProvider = function(providerId){
      jQ("input:radio").attr("checked", false);
      vm.provider = providerId;
    }
    vm.refreshGameProviders = function(){
      for(var item in vm.providerList){
        game.emit('getGameProviderCredit', {providerId:vm.providerList[item].providerId})
      }
    }

    game.emit('getProviderList',{playerId:lstore.player.playerId})

    game.on('getProviderList', function(data){
      if(data){
        data.data.forEach(function(pr){
          var provider = {};
          provider.providerId = pr.providerId;
          provider.name = pr.name;
          provider.nickname = pr.nickName ? pr.nickName.replace('AG','').replace('2','') : pr.name;
          provider.status = pr.status;
          provider.statusName = vm.getStatusName(pr.status);
          provider.credit = 0;
          vm.providerList.push(provider);
        })
      }
      vm.refreshGameProviders();
    });

    game.on('getGameProviderCredit',function(data){

      if(data.data){
        var result = data.data;
        vm.providerList.forEach(function(provider){
          if(provider.providerId == result.providerId){
            provider.credit = result.credit;
          }
        })
      }
    })

  }
})();
