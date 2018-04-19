'use strict';
angular.module('app').controller('loginCtrl', ['cache', '$state', '$http', '$scope', function(cache, $state, $http, $scope){
  $scope.submit = function() {
    $http.post('data/login.json', $scope.user).success(function(resp){
    	//登录成功后,将用户id,name,image存入cookies(service/cache.js), 并跳转至main页面
    	console.log(resp);
      	cache.put('id',resp.data.id);
      	cache.put('name',resp.data.name);
      	cache.put('image',resp.data.image);
      	$state.go('main');
    });
  }
}]);

