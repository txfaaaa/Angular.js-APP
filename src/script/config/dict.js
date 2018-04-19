'use strict';
//创建全局变量,时刻调用,需要用时在controller里面声明dict,$dict即可,就如searchCtrl中所示
angular.module('app').value('dict', {}).run(['dict', '$http', function(dict, $http){

	$http({method: 'GET',url: 'data/city.json'}).then(function successCallback(resp) {
		dict.city = resp;
	});
	$http({method: 'GET',url: 'data/salary.json'}).then(function successCallback(resp) {
		dict.salary = resp;
	});
	$http({method: 'GET',url: 'data/scale.json'}).then(function successCallback(resp) {
		dict.scale = resp;
	});

  // $http.get('data/city.json').success(function(resp){
  //   dict.city = resp;
  // });
  // $http.get('data/salary.json').success(function(resp){
  //   dict.salary = resp;
  // });
  // $http.get('data/scale.json').success(function(resp){
  //   dict.scale = resp;
  // });
}]);
