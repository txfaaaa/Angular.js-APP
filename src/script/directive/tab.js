'use strict';
angular.module('app').directive('appTab', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {//定义父元素上的接口tab页面的父页面,search.html绑定在指令上
      list: '=',
      tabClick: '&'//回调函数
    },
    templateUrl: 'view/template/tab.html',
    link: function($scope) {
      $scope.click = function(tab) {//传过来的是一个item,tab=item
        $scope.selectId = tab.id;
        $scope.tabClick(tab);//通知父控制器这个元素被点击了;在scope中定义接口
      };
    }
  };
}]);
