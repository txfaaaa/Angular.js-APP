'use strict';
angular.module('app').directive('appHeadBar',[function(){
  return {
    restrict: 'A',
    replace:true,
    templateUrl:'view/template/headerBar.html',
    scope:{
      text:"@" //text=一个数值,不加引号
    },
    link: function($scope){
      $scope.back=function(){
        window.history.back();
      }
    }
  }
}])
