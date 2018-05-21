/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController(jQ, $log, player, localStorage, payment) {
    var vm = this;
    vm.changePic = false;
    vm.pictureNo = null;
    vm.photoUrl = 'dpblank.png';
    vm.fullPhotoUrl = "assets/images/portrait/dpblank.png";
    vm.bankTypeName = '';

    player.getPlayerPartner(function () {
      var authenticatedData = angular.fromJson(localStorage.getData());

      vm.userData = authenticatedData.player;
      if (vm.userData.bankAccount) {
        vm.userData.bankAccount = vm.userData.bankAccount.slice(-3);
      } else {
        vm.userData.bankAccount = '';
      }
      if (vm.userData.photoUrl && vm.userData.photoUrl != '') {
        vm.photoUrl = vm.userData.photoUrl;
        vm.fullPhotoUrl = "assets/images/portrait/" + vm.userData.photoUrl;
      }else{
        vm.fullPhotoUrl = "/assets/images/portrait/1.jpg";
      }
      getBankTypeList();
    });

    vm.selectPic = function (no, fileName) {
      jQ('.userImage div').removeClass('chosenPic')
      vm.pictureName = fileName;
      jQ('.dp' + no).addClass('chosenPic');
    }
    vm.changeDisplayPic = function () {
      vm.changePic = true;
    }
    vm.confirmDisplayPic = function () {
      $log.info(vm.pictureName + 'Update to this picture');
      player.emit('updatePhotoUrl', {photoUrl: vm.pictureName})
      player.on('updatePhotoUrl', function (data) {

        if (data.status == 200) {
          // vm.userData.photoUrl = vm.pictureName;
          vm.reloadDisplayImage();
          $log.info('photo Update Success');
        } else {
          $log.info('photo Update Failed');
        }
        vm.changePic = false;
      })
    }
    vm.reloadDisplayImage = function () {
      if (vm.pictureName) {
        vm.fullPhotoUrl = "assets/images/portrait/" + vm.pictureName;
      } else {
        vm.fullPhotoUrl = "assets/images/portrait/dpblank.png";
      }

    }

    function getBankTypeList() {
      var requestId = Math.floor(Math.random() * 10000) + "" + new Date().getTime();
      payment.emit('getBankTypeList', {}, 99, requestId);
      payment.on('getBankTypeList', function (data) {
        data.data.forEach(function (item) {
          if (item && item.bankTypeId && item.bankTypeId == vm.userData.bankName) {
            vm.userBank = item.name;
          }
        })
      }, {requestId: requestId})
    }
  }
})();
