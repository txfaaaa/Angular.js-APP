'use strict';

angular.module('app').directive('appPositionList',['$http',function($http){
  return{
    restrict:"A",
    replace:true,
    templateUrl:'view/template/positionList.html',
    scope:{
      data:'=',
      filterObj:'=',//过滤器接口,可以在search页面直接使用
      isFavorite:'='
    },
    link:function($scope){
    	$scope.select=function(item){
    		//星星图标点击之后,从后台取消
    		$http.post('data/favorite.json',{
    			id: item.id,
    			select: !item.select
    		}).success(function(resp){
    			item.select=!item.select;
    		})
    		
    	}
    }
  }
}])
