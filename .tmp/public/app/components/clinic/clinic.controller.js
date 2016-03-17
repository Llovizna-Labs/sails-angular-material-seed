(function() {
  'use strict';

  angular
    .module('app.components.clinic')
    .controller('ClinicController', Controller);

  Controller.$inject = ['$scope','ClinicService'];

  /* @ngInject */
  function Controller($scope,ClinicService) {
    var vm = this;
    vm.tableTitle = 'Available Clinics';
    vm.filter = false;
    vm.selected = [];
    vm.data = [];
    vm.count = 0;

    vm.query = {
      order: 'name',
      limit: '5',
      page: 1
    };

    activate();

    function activate() {
      getClinics();
    }

    function getClinics(query) {
      vm.promise = ClinicService.getClinics(query || vm.query).then(function(resp) {
        vm.data = resp.data;
        vm.count = resp.count;
      }, function(err) {
        console.log(err);
      });
    }

    function onPaginate(page , limit){
      getClinics({page: page, limit: limit, sort: ''});
    }

  }
})();
