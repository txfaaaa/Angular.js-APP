'use strict';
angular.module('app').controller('searchCtrl',['dict','$http','$scope',function(dict,$http,$scope){

  //定义search函数
  $scope.search= function(){
  	var name= $scope.name;//定义positionList.json/name=?的值为搜索框ng-model绑定的值
  	$http({method: 'GET',url: 'data/positionList.json'}).then(function successCallback(resp) {
  			var data=resp.data;
  			var res=[];
    		for(var i=0;i<data.length;i++){
        		if(data[i].cityName==name||data[i].companyName==name||data[i].job==name){
          		 	res.push(data[i]);
        	    }
      		}
      		if(res.length==0){
      			$scope.positionList=data;//如果没有结果,就返回所有数据,包括一开始的页面
      		}
      		else{$scope.positionList=res;}  //搜索后的页面显示    		
  		});
  }
  $scope.search();
  $scope.sheet={};//点击城市,薪水,规模都出现列表
  //定义tab指令上的接口,tabList(城市,薪水和公司规模)[一般是json数据,小规模的,前台自己写]和tClick
  $scope.tabList= [
  {
    id:'city',
    name:'城市'
  },{
      id:'salary',
      name:'薪水'
  },{
      id:'scale',
      name:'公司规模'
  }];
  $scope.filterObj={};
  var tabId='';
  $scope.tClick=function(id,name){//上面的城市/薪水点击事件
    tabId=id;//tabId=city/salary/scale
    $scope.sheet.list=dict[id].data;//点击哪个,出现哪个列表
    $scope.sheet.visible= true;
  }
  $scope.sClick=function(id,name){//下方列表选择项点击事件
    
    if(id){//如果sheet里面没有选择空ID选项,则把城市/薪水/公司规模 替换成选择的选项,如上海/3000以上/不少于50人
      angular.forEach($scope.tabList,function(item){
        if(item.id===tabId){
          item.name=name;
        }
      });
      console.log(tabId);
      $scope.filterObj[tabId +'Id']=id;
    }//全国的id为空,如果是全国,则城市/薪水/公司规模 字不变
    else{
        delete $scope.filterObj[tabId+'Id'];
        angular.forEach($scope.tabList,function(item){
        if(item.id===tabId){
          switch(item.id){
            case 'city':
              item.name='城市';
              break;
            case 'salary':
              item.name='薪水';
              break;
            case 'scale':
              item.name='公司规模';
              break;
            default:
          }
        }
      });
    }
  }
}


 

]);
