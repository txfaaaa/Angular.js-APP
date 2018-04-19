'use strict';
//先从position.json中获取到companyID,再请求company.json获取职位详情页的中的公司数据
angular.module('app').controller('positionCtrl',['$log','$q','$http','$state','$scope','cache',function($log,$q,$http,$state,$scope,cache){
  cache.put('to','you');
  $scope.isLogin= !!cache.get('name');//!!转成布尔值
  $scope.message=$scope.isLogin?'投个简历':'去登陆';
  var id=$state.params.id;
  function getPosition(){
    var def=$q.defer();
    $http({method: 'GET',url: 'data/position.json?id='+$state.params.id})
      .then(function successCallback(resp) {
        var data=resp.data;
        for(var i=0;i<data.length;i++){
          if(data[i].id==id){
            $scope.position=data[i];
            var resp=data[i];
            console.log(resp);
            if(resp.posted){
              $scope.message='已投递';
            }
            def.resolve(resp);
          }
        }
      //  console.log(resp);
        // $scope.position= resp.data;

      }, function errorCallback(err) {
        def.reject(err);
  });
      return def.promise;
  }
  function getCompany(id){
    var id=id;
    $http({method: 'GET',url: 'data/company.json'})
      .then(function successCallback(resp) {
        var data=resp.data;
        for(var i=0;i<data.length;i++){
          console.log(data[i].id);
          if(data[i].id==id){
            $scope.company=data[i];
          }
        }
        //$scope.company= resp.data;
      });
  }
  getPosition().then(function(obj){
  //  console.log(obj.companyId);//得到position.json中的data数据
    getCompany(obj.companyId);
  });

  $scope.go=function(){
    if($scope.message !=='已投递'){
      if($scope.isLogin){
      $http.post('data/handle.json',{
        id: $scope.position.id, 
      }).success(function(resp){
        $log.info(resp);
        $scope.message='已投递';
      })
    }else{
      $state.go('login');
    }
    }
    
  }
}])
