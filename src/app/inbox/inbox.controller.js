(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .controller('InboxController', InboxController);

  /** @ngInject */
  function InboxController($rootScope, jQ, player) {
    var vm = this;
    vm.inboxData = [];
    vm.unreadInboxData = [];

    // sync read or sync unread messages from inbox data
    var syncUnreadMessages = function () {
      vm.inboxData.forEach(function(msg, i) {
        if(msg.hasBeenRead == false) {
          vm.unreadInboxData.push(msg);
        }
      })
    }
    var syncReadMessages = function () {
      vm.unreadInboxData.forEach(function(msg, i) {
        if(msg.hasBeenRead == true) {
          vm.unreadInboxData.splice(i, 1);
        }
      });
    }
    // add into OR remove from unread inbox data
    var addToUnreadInboxData = function (msg) {
      vm.unreadInboxData.push(msg);
    }
    var removeFromUnreadInboxData = function (_id) {
      vm.unreadInboxData.forEach(function(msg, i) {
        if(msg._id == _id) {
          vm.unreadInboxData.splice(i, 1);
        }
      });
    }
    var updateHasNewMail = function () {
      $rootScope.hasNewMail = vm.unreadInboxData.length > 0 ? true : false;
    }
    //sync unread inbox data from inbox data
    var syncUnreadInboxData = function () {
      syncUnreadMessages();
      syncReadMessages();
      updateHasNewMail();
    }

    // notify user of new mail
    var notifyNewMail = function (ev, data) {
      if(data && data.data) {
        vm.inboxData.push(data.data);
        if(data.data.hasBeenRead == false) {
          addToUnreadInboxData(data.data);
        }
      }
    }
    // deleteMail
    var deleteAllMail = function (readStatus) {
      var sendData = {};
      if (readStatus !== undefined) {
        sendData.hasBeenRead = Boolean(readStatus);
      }
      player.emit('deleteAllMail', sendData);
      player.on('deleteAllMail', function () {
        vm.getMail();
      });
    };

    vm.readMail = function (index) {
      if (!vm.inboxData[index].hasBeenRead) {
        var sendData = {mailObjId: ""};

        if (vm.inboxData && vm.inboxData[index] && vm.inboxData[index]._id) {
          sendData.mailObjId = vm.inboxData[index]._id;
        }
        player.emit('readMail', sendData);
        player.on('readMail', function (data) {
          vm.inboxData[index] = data.data;
          removeFromUnreadInboxData(data.data._id);
          updateHasNewMail();
        });
      }
    };

    vm.deleteMail = function (index) {
      var sendData = {mailObjId: ""};

      if (vm.inboxData && vm.inboxData[index] && vm.inboxData[index]._id) {
        sendData.mailObjId = vm.inboxData[index]._id;
      }
      player.emit('deleteMail', sendData);
      player.on('deleteMail', function (data) {
        if (data && data.data) {
          vm.inboxData.splice(index, 1);
        }
      });
    };
    vm.deleteAllMail = function () {
      deleteAllMail();
    };
    vm.deleteAllReadMail = function () {
      deleteAllMail(true);
    };
    vm.deleteAllUnreadMail = function () {
      deleteAllMail(false);
    };
    
    vm.getMail = function () {
      player.emit('getMailList', {});
      player.on('getMailList', function (data) {
        vm.inboxData = data.data;
        syncUnreadInboxData();
      });
    };
    vm.getUnreadMail = function () {
      player.emit('getUnreadMail', {});
      player.on('getUnreadMail', function (data) {
        vm.unreadInboxData = data.data;
      });
    };

    vm.getMail();
    $rootScope.$on('newMail', notifyNewMail);
  }
})();
