/**
 * Created by jazz on 14/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('SettingController', SettingController);

  /** @ngInject */
  function SettingController(jQ, $log, localStorage, player, platform) {
    var vm = this;
    var lstore = angular.fromJson(localStorage.getData())
    player.emit('get',{'playerId':lstore.player.playerId});

    player.on('get', function(data){
        vm.latestSettings = data.data.smsSetting;
        platform.emit('getPlatformSmsGroups', { 'platformObjId':lstore.player.playerLevel.platform });

        platform.on('getPlatformSmsGroups', function(data){
            vm.smsGroups = data.data;
            vm.settings = vm.getSmsSettings(vm.smsGroups);
        });
    })


    vm.getSmsSettings = function(input) {
        function isAllSmsTrue (smsArray) {
            var isAllTrue = true
            smsArray.forEach(function(v){
                if(!vm.latestSettings[v]) {
                    isAllTrue = false;
                }
            });
            return isAllTrue;
        }
        if(input) {
            var smsSettingsList = {};
            var smsSettings = {};
            var smsParentList = {};

            input.forEach(function(v){
                if(v.smsParentSmsId == -1) {
                    smsSettingsList[v.smsName] = [];
                    smsParentList[v.smsId] = v.smsName;
                }
            });
            input.forEach(function(v){
                if(v.smsParentSmsId != -1) {
                    smsSettingsList[smsParentList[v.smsParentSmsId]].push(v.smsName);
                }
            });
            for(var i in smsSettingsList) {
                smsSettings[i] = {
                    list: []
                };
                smsSettings[i].list = smsSettingsList[i];
                smsSettings[i].isTrue = isAllSmsTrue(smsSettings[i].list);
            }
            smsSettingsList = {};
            return smsSettings;
        }
    };

    vm.changeButton = function(smsGroupName) {
        var sendData = {};
        var isTrue = vm.settings[smsGroupName].isTrue;
        if(isTrue){
            if(vm.settings[smsGroupName].list.length > 0){
                vm.settings[smsGroupName].list.forEach(function(smsGroup){
                    sendData[smsGroup] = false;
                })
            }
        }else{
            if(vm.settings[smsGroupName].list.length > 0){
                vm.settings[smsGroupName].list.forEach(function(smsGroup){
                    sendData[smsGroup] = true;
                })
            }
        }

        player.emit('updateSmsSetting', sendData);
        player.on('updateSmsSetting', function(data){
            vm.latestSettings = data.data.smsSetting;
            platform.emit('getPlatformSmsGroups', { 'platformObjId':lstore.player.playerLevel.platform });
        });
    }
  }
})();
