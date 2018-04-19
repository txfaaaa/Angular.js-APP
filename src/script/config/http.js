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
