(function() {
  'use strict';

  angular
    .module('app.components.account')
    .controller('AccountController', AccountController)

  AccountController.$inject = ["$scope", "$state", "$mdToast", "$log", "$mdDialog", "Auth"];

  function AccountController($scope, $state, $mdToast, $log, $mdDialog, Auth) {
    var vm = this;
    vm.login = login;
    vm.credentials = {

    }
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
      console.log(vm.credentials);
      Auth.login(vm.credentials);
    }

  }
})();
