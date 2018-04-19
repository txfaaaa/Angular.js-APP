'use strict';
angular.module('app').controller('companyCtrl',['$http','$scope','$state',function($http,$scope,$state){
  var id=$state.params.id;
  $http({method: 'GET',url: '/data/company.json'})
    .then(function successCallback(resp) {
    //  $scope.company= resp.data;
      var data=resp.data;
      for(var i=0;i<data.length;i++){
        console.log(data[i].id);
        if(data[i].id==id){
          $scope.company=data[i];
        }
      }
      console.log($scope.company);
    });

}])
