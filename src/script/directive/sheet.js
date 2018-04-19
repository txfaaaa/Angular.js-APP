'use strict';
angular.module('app').directive('appSheet', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      visible: '=',//让父控制器 search控制是否显示
      select: '&'//让父控制器控制
    },
    templateUrl: 'view/template/sheet.html'
  };
}]);
