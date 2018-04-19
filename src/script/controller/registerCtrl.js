'use strict';
angular.module('app').controller('registerCtrl',['$interval','$http','$scope','$state',function($interval,$http,$scope,$state){
  $scope.submit= function(){//定义注册ng-click函数

  	$http.post('data/regist.json',$scope.user).success(function(resp){
  		console.log(resp);//显示regist.json的注册用户信息,注册成功
      	$state.go('login');//跳转至登录页面
    });
  }
  var count = 60;
  $scope.send=function(){//定义发送短信码的操作
  	$http({method: 'GET',url: '/data/code.json'})
  		.then(function successCallback(resp) {
    		console.log(resp.data);
    		if(resp.data.state===1){
    			//倒计时,调用$interval
    			count = 60;
        		$scope.time = '60s';
        		var interval = $interval(function() {
	          		if(count<=0) {
	            		$interval.cancel(interval);
	            		$scope.time = '';
	          		} else {
	            		count--;
	            		$scope.time = count + 's';
	          		}
        		}, 1000);
    		}
  		});
  }
}])
