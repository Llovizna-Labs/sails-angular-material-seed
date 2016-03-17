(function() {
  'use strict';

  angular
    .module('app.components.auth')
    .controller('AuthController', auth)

  auth.$inject = ["$scope", "$state", "$mdToast", "$log", "$mdDialog", "Auth"];

  function auth($scope, $state, $mdToast, $log, $mdDialog, Auth) {
    var vm = this;
    vm.login = login;
    vm.error = false;
    vm.errorText = 'error';
    vm.loading = false;
    vm.credentials = {

    };
		init();

    function init(){
      console.log('Auth Controller Activated');
    }

    /**
     * Login Attempt
     * @method
     * @return {[type]} [description]
     */
    function login(){
      vm.loading = true;
      setTimeout(function () {
        Auth.login(vm.credentials).then(function(data){
          console.log(data);
          vm.loading = false;
          $state.go('home.index');
        }, function(resp){
            vm.error = true;
            vm.errorText = resp.err;
            vm.loading = false;
        });
      }, 5000);
    }

  }
})();
