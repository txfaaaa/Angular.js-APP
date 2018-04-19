'use strict';

angular.module('app', ['ui.router', 'ngCookies', 'validation','ngAnimate']);

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
}]);

'use strict';
angular.module('app').config(['$provide', function($provide){
  $provide.decorator('$http', ['$delegate', '$q', function($delegate, $q){
    //把post请求修改为get请求,同时返回正确的参数
    $delegate.post = function(url, data, config) {
      var def = $q.defer();
      $delegate({method: 'GET',url: url})
      .then(function successCallback(resp) {
        def.resolve(resp);
      }, function errorCallback(err) {
        def.reject(err);
      });
      return {
        success: function(cb){
          def.promise.then(cb);
        },
        error: function(cb) {
          def.promise.then(null, cb);
        }
      }
    }
    return $delegate;
  }]);
}]);

'use strict';

angular.module('app').config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider){
  $stateProvider.state('main',{
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
  }).state('position',{
    url: '/position/:id',
    templateUrl: 'view/position.html',
    controller: 'positionCtrl'
  }).state('company',{
    url: '/company/:id',
    templateUrl: 'view/company.html',
    controller: 'companyCtrl'
  }).state('search',{
    url: '/search',
    templateUrl: 'view/search.html',
    controller: 'searchCtrl'
  }).state('login',{
    url: '/login',
    templateUrl: 'view/login.html',
    controller: 'loginCtrl'
  }).state('register',{
    url: '/register',
    templateUrl: 'view/register.html',
    controller: 'registerCtrl'
  }).state('me',{
    url: '/me',
    templateUrl: 'view/me.html',
    controller: 'meCtrl'
  }).state('favorite',{
    url: '/favorite',
    templateUrl: 'view/favorite.html',
    controller: 'favoriteCtrl'
  }).state('post',{
    url: '/post',
    templateUrl: 'view/post.html',
    controller: 'postCtrl'
  });
  $urlRouterProvider.otherwise('main');
  $locationProvider.hashPrefix('');
}]);

'use strict';
angular.module('app').config(['$validationProvider', function($validationProvider) {
  var expression = {
    phone: /^1[\d]{10}$/,//以1开头,后面是10位数字
    password: function(value) {
      var str = value + ''
      return str.length > 5;
    },
    required: function(value) {
      return !!value;
    }
  };
  var defaultMsg = {
    phone: {
      success: '',
      error: '必须是11位手机号'
    },
    password: {
      success: '',
      error: '长度至少6位'
    },
    required: {
      success: '',
      error: '不能为空'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);

'use strict';
angular.module('app').controller('companyCtrl',['$http','$scope','$state',function($http,$scope,$state){
  var id=$state.params.id;
  $http({method: 'GET',url: 'data/company.json'})
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

'use strict';
angular.module('app').controller('favoriteCtrl',['$http','$scope',function($http,$scope){
  $http({method: 'GET',url: 'data/myfavorite.json'})
  .then(function successCallback(resp) {
    console.log(resp);
    $scope.list= resp.data;
  });
}])

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


'use strict';
angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
  $http({method: 'GET',url: 'data/positionList.json'})
  .then(function successCallback(resp) {
    console.log(resp);
    $scope.list= resp.data;
  }, function errorCallback(response) {
  });
}]);

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
  	$http({method: 'GET',url: 'data/myPost.json'})
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
  	$http({method: 'GET',url: 'data/code.json'})
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

'use strict';
angular.module('app').directive('appCompany', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '='
    },
    templateUrl: 'view/template/company.html'
  };
}]);

'use strict';

angular.module('app').directive('appFoot',[function(){
  return{
    restrict:"A",
    replace:true,
    templateUrl:'view/template/foot.html'
  }
}])

'use strict';
angular.module('app').directive('appHead',['cache',function(cache){
  return {
    restrict: 'A',
    replace:true,
    templateUrl:'view/template/header.html',
    link:function($scope){
    	$scope.name=cache.get('name') || '';
    }
  }

}])

'use strict';
angular.module('app').directive('appHeadBar',[function(){
  return {
    restrict: 'A',
    replace:true,
    templateUrl:'view/template/headerBar.html',
    scope:{
      text:"@" //text=一个数值,不加引号
    },
    link: function($scope){
      $scope.back=function(){
        window.history.back();
      }
    }
  }
}])

'use strict';
angular.module("app").directive('appPositionClass', ['$http', function($http){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionClass.html',
    scope: {
      com:'='
    },
    link: function($scope){
      $scope.showPositionList =function(idx){
      	$scope.positionList = $scope.com.positionClass[idx].positionList;
        $scope.isActive = idx;
      }
      //因为可能调用showPositionList函数时,com还没有传入,导致positionList无法传入
      $scope.$watch('com', function(newVal){
        if(newVal) $scope.showPositionList(0);//默认第一位职位被点击选取
      });
    }
  }
}]);

'use strict';
angular.module("app").directive('appPositionInfo', ['$http', function($http){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionInfo.html',
    scope: {
      isActive: '=',
      isLogin: '=',
      pos: '='
    },
    link: function($scope){
      $scope.$watch('pos',function(newVal){
        if(newVal){
          $scope.pos.select=$scope.pos.select || false;
          $scope.imagePath=$scope.pos.select?'image/star-active.png':'image/star.png';
        }
      })

      
      $scope.favorite=function(){
        $http.post('data/myFavorite.json',{
          id:$scope.pos.id,
          select: !$scope.pos.select
        }).success(function(resp){
          $scope.pos.select=!$scope.pos.select;
          $scope.imagePath=$scope.pos.select?'image/star-active.png':'image/star.png';
        })
      }
    }
  }
}]);

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

'use strict';
angular.module('app').directive('appSheet', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      visible: '=',//让父控制器 search控制是否显示
      select: '&'//让父控制器控制
    },
    templateUrl: 'view/template/sheet.html'
  };
}]);

'use strict';
angular.module('app').directive('appTab', [function(){
  return {
    restrict: 'A',
    replace: true,
    scope: {//定义父元素上的接口tab页面的父页面,search.html绑定在指令上
      list: '=',
      tabClick: '&'//回调函数
    },
    templateUrl: 'view/template/tab.html',
    link: function($scope) {
      $scope.click = function(tab) {//传过来的是一个item,tab=item
        $scope.selectId = tab.id;
        $scope.tabClick(tab);//通知父控制器这个元素被点击了;在scope中定义接口
      };
    }
  };
}]);

'use strict';
angular.module('app').filter('filterByObj', [function(){
  return function(list, obj) {
    var result = [];
    angular.forEach(list, function(item){
      var isEqual = true;
      for(var e in obj){
        if(item[e]!==obj[e]) {
          isEqual = false;
        }
      }
      if(isEqual) {
        result.push(item);
      }
    });
    return result;
  };
}]);

'use strict';
angular.module('app')
.service('cache', ['$cookies', function($cookies){//自定义服务cache,增删查cookies,需要用到angular-cookies.js
    this.put = function(key, value){
      $cookies.put(key, value);
    };
    this.get = function(key) {
      return $cookies.get(key);
    };
    this.remove = function(key) {
      $cookies.remove(key);
    };
}]);
// .factory('cache', ['$cookies', function($cookies){//自定义工厂cache,和服务作用相同
//     return{
//       get:function(key){
//         return $cookies.get(key);
//       },
//       put:function(key,value){
//         return $cookies.put(key,value);
//       },
//       remove:function(key){
//         return $cookies.remove(key);
//       }
//     }
// }]);
