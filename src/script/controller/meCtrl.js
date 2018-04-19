'use strict';
angular.module('app').controller('meCtrl', ['$state', 'cache', '$http', '$scope', function($state, cache, $http, $scope){
  if(cache.get('name')) {
  	//从cookies中获取name和image,cache.get
    $scope.name = cache.get('name');
    $scope.image = cache.get('image');
  }
  //如果退出登录,则清除cookies,并跳转至main首页
  $scope.logout = function() {
    cache.remove('id');
    cache.remove('name');
    cache.remove('image');
    $state.go('main');
  };
}]);

