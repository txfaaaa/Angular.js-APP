'use strict';
angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
  $http({method: 'GET',url: 'data/positionList.json'})
  .then(function successCallback(resp) {
    console.log(resp);
    $scope.list= resp.data;
  }, function errorCallback(response) {
  });
}]);
