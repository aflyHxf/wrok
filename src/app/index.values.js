/**
 * Created by aeson on 10/04/2017.
 */
(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .value('requestDatas', [])
    .value('responseCallbacks', [])
    // default means to directly connect this server's websocket setting
    .value('webSocketUrl', 'default')
    // .value('webSocketUrl', 'ws://localhost:9280/')
    // .value('webSocketUrl', 'ws://devtest.wsweb.me:9280/')

    // .value('webSocketUrl', 'ws://192.168.12.75:9083/pss')
    // .value('webSocketUrl', 'ws://192.168.13.122:8080/pss')
    // .value('webSocketUrl', 'ws://mgntweb99.fpms8.me:9280/')
    // .value('webSocketUrl', 'ws://101.78.133.210:9280/')
    // .value('webSocketUrl', 'ws://192.168.12.101:8080/pss')
    // .value('uploadFileUrl', 'http://aeson.neweb.me:9036/http/pss/merchantImgUpload')
    // .value('imgUrl', 'http://aeson.neweb.me:9036')
    // .value('webSocketUrl', 'ws://paymentsystemserver99.neweb.me:9038/pss')
    // .value('webSocketUrl', 'ws://192.168.10.140:9036/pss')
    // .value('webSocketUrl', 'ws://192.168.10.180:8080/pay_server/pss')
    // .value('webSocketUrl', 'ws://192.168.13.122:8080/pss')
    // .value('webSocketUrl', 'ws://192.168.17.40:8081/pay/pss')
    .value('platformId', 9)
    .value('customerService', 'https://tochat333.com/chat/chatClient/chatbox.jsp?companyID=313&configID=237&jid=')
    .value('webSocket', undefined);
})();
