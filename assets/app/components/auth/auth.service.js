(function() {
  'use strict';

  angular
    .module('app.components.auth')
    .factory('Auth', Auth)
    .factory('AuthInterceptor', AuthInterceptor)
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
      $httpProvider.defaults.withCredentials = true;
    });

  Auth.$inject = ["$http", "$q","$state", "LocalService"];

  function Auth($http, $q, $state, LocalService) {

    var Auth = {
      authorize: authorize,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout
    }

    return Auth;

    /**
     * [login description]
     * @method login
     * @return {[type]} [description]
     */
    function login(credentials) {
      var login = $http.post('/auth/login', credentials);

      login.then(function(response) {
          var jwt = $http.get('/user/jwt');
          jwt.then(function(response) {
            LocalService.set('access_token', JSON.stringify(response.data));
            $state.go('home.index');
          });
        },
        function(err) {
          console.log(err);
        })
    }

    /**
     * [logout description]
     * @method logout
     * @return {[type]} [description]
     */
    function logout() {
      LocalService.unset('access_token');
      $state.go('home.login');
    }

    /**
     * [isAuthenticated description]
     * @method isAuthenticated
     * @return {Boolean}       [description]
     */
    function isAuthenticated() {
      if (LocalService.get('access_token')){
        var token = angular.fromJson(LocalService.get('access_token'));
        return true;
      }
      return false;
    }

    /**
     * [authorize description]
     * @method authorize
     * @return {[type]}  [description]
     */
    function authorize() {

    }
  }

  /**
   * [AuthInterceptor description]
   * @method AuthInterceptor
   */
  function AuthInterceptor($q, LocalService, $injector) {

    var AuthInterceptor = {
      request: request,
      responseError: responseError
    };

    return AuthInterceptor;

    function request(config) {

      var token;
      if (LocalService.get('access_token')) {
        token = angular.fromJson(LocalService.get('access_token')).token;
      }
      if (token) {
        config.headers.access_token = token;
      }
      return config;
    }

    function responseError(response) {
      if (response.status === 401 || response.status === 403) {
        LocalService.unset('access_token');
        //$injector.get('$state').go('home.login');
      }
      return $q.reject(response);
    }

  }
})();