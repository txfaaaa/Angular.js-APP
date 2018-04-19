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
