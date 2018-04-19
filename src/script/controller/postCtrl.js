'use strict';
angular.module('app').controller('postCtrl',['$http','$scope',function($http,$scope){
	$scope.tabList=[{
		id: 'all',
		name:'全部'
	},{
		id:'pass',
		name:'邀请面试'
	},{
		id:'fail',
		name:'不合适'
	}];
  	$http({method: 'GET',url: '/data/myPost.json'})
  	.then(function successCallback(resp) {
    	console.log(resp);
    	$scope.positionList= resp.data;
  	});
  	$scope.filterObj = {};
  	$scope.tClick=function(id,name){
  		switch (id) {
	      case 'all':
	        delete $scope.filterObj.state;
	        break;
	      case 'pass'://通过面试的,resp.data.state=1
	        $scope.filterObj.state = '1';
	        break;
	      case 'fail':
	        $scope.filterObj.state = '-1';         
	        break;
	      default:

	    }
  	}
}])
