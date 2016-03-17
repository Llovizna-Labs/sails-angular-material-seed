(function() {
  'use strict';

  angular
    .module('app.components.users')
    .controller('AddUserController', users)

  users.$inject = ['$q', '$state', '$mdDialog', 'UserService'];

  function users($q, $state, $mdDialog, UserService) {
    var vm = this;
    vm.title = 'Add User';

    init();

    vm.cancel = $mdDialog.cancel;

    function init() {
      console.log('add user view activated');
    }

    function success(data) {
      $mdDialog.hide(data);
    }


    vm.addUser = function() {
      console.log(vm.user);
      UserService.registerUser(vm.user).then(function(resp) {
        success(resp);
      }, function(err) {
        console.log(err);
      });
    };

  }

})();
