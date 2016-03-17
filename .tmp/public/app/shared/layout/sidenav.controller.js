(function() {
  'use strict';

  angular
    .module('app.shared.layout')
    .controller('SidenavController', Controller);

  Controller.$inject = ['$rootScope', '$state', '$mdSidenav', '$log', 'LocalService', 'Auth'];

  /* @ngInject */
  function Controller($rootScope, $state, $mdSidenav, $log, LocalService, Auth) {
    var vm = this;
    vm.changeState = changeState;
    vm.show = !Auth.isAuthenticated();
    vm.logout = logout;
    activate();

    function activate() {
      console.log(vm.user);

    }

    function changeState(state) {
      $state.go(state);
    }


    /**
     * [logout description]
     * @method logout
     * @return {[type]} [description]
     */
    function logout() {
      Auth.logout();
    }

    vm.user = LocalService.get('user');

    vm.menuItems = [{
      icon: 'dashboard',
      name: 'Dashboard',
      state: 'home.index',
      admin: false,
    }, {
      icon: 'business',
      name: 'Clinics',
      state: 'home.clinic',
      admin: false,
    }, {
      icon: 'supervisor_account',
      name: 'Users',
      state: 'home.users',
      admin: true
    }, {
      icon: 'account_circle',
      name: 'Account',
      state: 'home.account',
      admin: false
    }, {
      icon: 'settings',
      name: 'Settings',
      state: 'home.account',
      admin: false
    }];


  }
})();
