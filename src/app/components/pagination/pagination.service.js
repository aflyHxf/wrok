(function () {
  'use strict';

  angular
    .module('fishingKingMobile')
    .service('pagination', pagination);

  /** @ngInject */
  function pagination($window, base) {

    angular.extend(pagination.prototype, base);
    var vm = this;
    vm.serviceName = 'pagination';
    vm.pgUnit = 3;

    vm.pagePicker = function(num, index, limit, total){
        var startIndex;
        var curPage = parseInt(index / limit);
        var maxPage = parseInt(total/ limit);
        if(num==='+1'){
            // next page
            // if this is last page , dont let it go "next page" anymore
            if(curPage < maxPage){
                startIndex = parseInt(curPage+1) * parseInt(limit);
            }else{
                startIndex = parseInt(maxPage * limit)
            }
        }else if(num==='-1'){
            //prev page
            // if this is first page , dont let it go "prev page" anymore
            if(curPage > 1){
                startIndex = parseInt(curPage-1) * parseInt(limit);
            }else{
                startIndex = 0;
            }
        }else{
            //other option except prev/next page
            if(num > 1){
                startIndex = parseInt(num-1) * parseInt(limit);
            }else{
                startIndex = 0;
            }
        }
        return startIndex;
    }

    /* create pagination interface */
    vm.buildPagin = function(data, pgLimit, indexNow){
        var pages = data / parseInt(pgLimit);
        if (data == 0) {
          pages = 1;
        } else if (data % pgLimit == 0) {
          pages = data / parseInt(pgLimit);
        } else {
          pages += 1;
        }


        var totalPages = vm.createPage(pages, pgLimit, indexNow);
        return totalPages;

    }
    /* create array for display in angular templates*/
    vm.createPage = function(pages, pgLimit, indexNow){
        var result = [];
        var curPage;
        if(indexNow == 0){
          curPage = 1;
            for(var i=1;i<=vm.pgUnit;i++){
              if(i<pages){
                result.push(i);
              }
            }
        }else{
          curPage = indexNow / parseInt(pgLimit);
          curPage += 1;
          //only show 3 page from current page
          var min = curPage - vm.pgUnit;
          var max = curPage + vm.pgUnit;

          for(var t=1;t<=pages;t++){
            if(t > min && t < max){
              result.push(t);
            }
          }
        }
        return result;
    }
  }
})();