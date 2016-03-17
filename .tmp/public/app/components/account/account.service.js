(function() {
  'use strict';

  angular
    .module('app.components.account')
    .factory('Account', Account)

  Account.$inject = ["$http", "$q","$state", "LocalService"];

  function Account($http, $q, $state, LocalService) {

    var Account = {
      authorize: authorize,
      isAuthenticated: isAuthenticated,
      login: login,
      logout: logout
    }

    return Account;

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
      LocalService.unset('auth_token');
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
        console.log(token);
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

})();
