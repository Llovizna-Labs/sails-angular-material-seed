(function() {
  'use strict';

  angular
    .module('app.components.users')
    .controller('UsersController', users)

  users.$inject = ['$q', '$state', '$mdDialog', '$sails','UserService'];

  function users($q, $state, $mdDialog, $sails, UserService) {
    var vm = this;
    vm.tableTitle = 'Users';
    vm.addUser = addUser;
    vm.selected = [];
    vm.onPaginate = onPaginate;
    vm.editUser = editUser;
    vm.removeFilter = removeFilter;
    vm.filter =  false;
    vm.activate = activate;
    vm.setAsAdmin = setAsAdmin;

    vm.query = {
      order: 'name',
      limit: '5',
      page: 1
    };

    init();



    function init() {
      $q.all([getUsers()]).then(function() {
        console.log('users View activated');
        subscribeToSocket();
      });
    }

    function subscribeToSocket(){
      $sails.get("/user").success(function(response) {
        console.log(response);
      }).error(function(response) {
        console.log('error');
      });

      $sails.on("user", function(message) {
        if (message.verb === "created") {
          console.log(message);
          getUsers();
        }
      });
    }
    function getUsers(query) {
      vm.promise = UserService.getUsers(query || vm.query).then(success, err);
    }

    function success(res){
      vm.data = res.data;
      vm.count = res.count;
    }

    function err(err) {
      console.log(err);
    }

    function onPaginate(page , limit){
      getUsers({page: page, limit: limit, sort: ''});
    }

    function removeFilter() {
      vm.filter = false;
    }

    function addUser(event) {
      $mdDialog.show({
        clickOutsideToClose: true,
        controller: 'AddUserController',
        controllerAs: 'ctrl',
        focusOnOpen: false,
        targetEvent: event,
        fullscreen: true,
        templateUrl: 'app/components/users/addUser.html',
      }).then(getUsers);
    };

    function activate(user) {
      vm.promise = UserService.activateUser(user.id).then(
        function (resp) {
          user.activated = resp.activated;
        },
        function (err) {
          console.log(err);
        }
      );
    }

    function setAsAdmin(user) {
      vm.promise = UserService.setAsAdmin(user.id).then(
        function (resp) {
          user.activated = resp.activated;
        },
        function (err) {
          console.log(err);
        }
      );
    }

    function editUser() {
      console.log(vm.selected);
    }
  }

})();
