'use strict';
angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){
  $http({method: 'GET',url: 'data/myFavorite.json'})
  .then(function successCallback(resp) {
    console.log(resp);
    $scope.list= resp.data;
  });
}])
