'use strict';
angular.module("app").directive('appPositionClass', ['$http', function($http){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionClass.html',
    scope: {
      com:'='
    },
    link: function($scope){
      $scope.showPositionList =function(idx){
      	$scope.positionList = $scope.com.positionClass[idx].positionList;
        $scope.isActive = idx;
      }
      //因为可能调用showPositionList函数时,com还没有传入,导致positionList无法传入
      $scope.$watch('com', function(newVal){
        if(newVal) $scope.showPositionList(0);//默认第一位职位被点击选取
      });
    }
  }
}]);
