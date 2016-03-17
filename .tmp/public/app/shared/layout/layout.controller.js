(function() {
  'use strict';

  angular
    .module('app.shared.layout')
    .controller('LayoutController', layout)


  function layout($mdSidenav, $state, $mdDialog, $rootScope, $sails, Auth) {
    var vm = this;

    vm.isAuthenticated = isAuthenticated;
    vm.logout = logout;
    vm.selectClinic = selectClinic;
    vm.menuItems = [{
      icon: 'account',
      name: 'Account',
      state: 'home.account'
    }];


    function init() {
      //watch();
    }

    /**
     * [isAuthenticated description]
     * @method isAuthenticated
     * @return {Boolean}       [description]
     */
    function isAuthenticated() {
      return Auth.isAuthenticated();
    }

    /**
     * [logout description]
     * @method logout
     * @return {[type]} [description]
     */
    function logout() {
      Auth.logout();
    }


    function selectClinic($event) {
      console.log($event);
      $mdDialog.show({
        controller: 'searchBoxController',
        controllerAs: 'vm',
        templateUrl: 'app/shared/searchbox/searchbox.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        fullscreen: true
      }).then(function(clinic) {
        $rootScope.currentClinic = clinic;
      });
    }


  }

})();
