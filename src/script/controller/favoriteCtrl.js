'use strict';
angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){
  $http({method: 'GET',url: '/data/myfavorite.json'})
  .then(function successCallback(resp) {
    console.log(resp);
    $scope.list= resp.data;
  });
}])
