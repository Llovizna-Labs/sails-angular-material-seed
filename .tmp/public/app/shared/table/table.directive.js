(function() {
  'use strict';

  angular
    .module('app.shared.table')
    .directive('dynamicTable', Table);

  /** @ngInject */
  function Table() {
    var directive = {
      restrict: 'E',
      templateUrl: '/app/shared/table/table.html',
      controller: TableController,
      scope: {
        tableTitle: '=title',
        data: '=',
        tableHeaders: '=headers'
      },

      bindToController: true,
      controllerAs: 'vm'
    };

    return directive;

    /** @ngInject */
    function TableController($scope) {
      var vm = this;

      vm.querySearch = querySearch;
      vm.createFilterFor = createFilterFor;
      vm.selectedItemChange = selectedItemChange;
      vm.simulateQuery = false;
      vm.isDisabled = false;
      vm.selected = [];
      vm.datatableError = 'not found.';

      vm.query = {
        filter: '',
        order: 'name',
        limit: 5,
        page: 1
      };

      init();

      function init() {
        console.log('init');
        console.log(vm.tableHeaders);
      }

      function querySearch(query) {
        console.log(query);
        var results = query ? vm.data.filter(createFilterFor(query)) : vm.data,
          deferred;
        if (self.simulateQuery) {
          deferred = $q.defer();
          $timeout(function() {
            deferred.resolve(results);
          }, Math.random() * 1000, false);
          return deferred.promise;
        } else {
          return results;
        }
      }

      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
          return (item.description.indexOf(query) === 0);
        };
      }

      function selectedItemChange(item) {
        if (item) {
          console.log(item);
        }
      }

    }
  }

})();
